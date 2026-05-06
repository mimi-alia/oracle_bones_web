// canvas.js
// Exposes:
//   initCanvas()        — call once on page load
//   resetCanvas(char)   — call from divination.js when a new character is selected
//   evaluateDrawing()   — call from divination.js to check if drawing matches reference
 
const REFERENCE_IMAGES = {
    "妇": "../assets/media/妇_type.skyfont.com.png",
    "好": "../assets/media/好_type.skyfont.com.png",
    "伐": "../assets/media/伐_type.skyfont.com.png",
    "佑": "../assets/media/佑_type.skyfont.com.png",
    "卜": "../assets/media/卜_type.skyfont.com.png",
};
 
const SIMILARITY_THRESHOLD = 0.85;
const GUIDE_OPACITY        = 0.15;
const STROKE_COLOR         = "#1a1a1a";
const STROKE_WIDTH         = 20;
 
let canvas, ctx;
let offscreenCanvas, offscreenCtx;
let isDrawing = false;
let currentChar = null;
 
 
// -----------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------
 
function initCanvas() {
    // Create the offscreen canvas once — it persists for the lifetime of the page
    offscreenCanvas        = document.createElement("canvas");
    offscreenCanvas.width  = 400;
    offscreenCanvas.height = 500;
    offscreenCtx           = offscreenCanvas.getContext("2d");
    }
 
// Call every time a new character is selected (AFTER divination.js sets innerHTML)
function resetCanvas(char) {
    // Re-query every time because innerHTML destroys and recreates the element
    canvas        = document.getElementById("character-draw");
    canvas.width  = canvas.offsetWidth  || 400;
    canvas.height = canvas.offsetHeight || 500;
    ctx           = canvas.getContext("2d");
 
    offscreenCanvas.width  = canvas.width;
    offscreenCanvas.height = canvas.height;
    offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
 
    currentChar = char;
    applyStrokeStyles();
 
    // Re-attach listeners every time (old ones are gone after innerHTML)
    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseup",    onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: false });
    canvas.addEventListener("touchend",   onMouseUp);
 
    const src = REFERENCE_IMAGES[char];
    if (src) {
        loadReferenceImage(src);
    // } else {
    //     drawPlaceholderGuide(char);
    //     drawPlaceholderOffscreen(char);
    }
}
 
function evaluateDrawing() {
    console.log("evaluateDrawing called");
    if (!canvas || !ctx) return false;

    const drawn = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const reference = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;

    let referencePixels = 0;
    let matchedPixels = 0;

    for (let i = 0; i < reference.length; i += 4) {
        // Check if the reference pixel is non-transparent
        if (reference[i + 3] > 50) { // Increase threshold for reference pixel opacity
            referencePixels++;
            // Check if the drawn pixel is also non-transparent and matches the reference
            if (drawn[i + 3] > 50) { // Increase threshold for drawn pixel opacity
                matchedPixels++;
            }
        }
    }

    if (referencePixels === 0) {
        console.log("Using coverageCheck fallback");
        return coverageCheck(drawn);
    }

    const similarity = matchedPixels / referencePixels;
    console.log(`Similarity: ${(similarity * 100).toFixed(1)}% (threshold: ${SIMILARITY_THRESHOLD * 100}%)`);
    console.log("Reference Pixels:", referencePixels);
    console.log("Matched Pixels:", matchedPixels);
    return similarity >= SIMILARITY_THRESHOLD;
}
 
 
// -----------------------------------------------------------------------
// Image loading
// -----------------------------------------------------------------------
 
function loadReferenceImage(src) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
        const imgAspectRatio = img.width / img.height;
        const canvasAspectRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgAspectRatio > canvasAspectRatio) {
            // Image is wider than canvas
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgAspectRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            // Image is taller than canvas
            drawWidth = canvas.height * imgAspectRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.save();
        ctx.globalAlpha = GUIDE_OPACITY;
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
        applyStrokeStyles(); // Restore stroke styles after globalAlpha save/restore

        offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        offscreenCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };
    img.onerror = () => {
        console.warn(`canvas.js: Could not load image for "${currentChar}" at "${src}". Check the path and that you're running via a local server, not file://.`);
        drawPlaceholderGuide(currentChar);
        drawPlaceholderOffscreen(currentChar);
    };
    img.src = src;
}
 
 
// -----------------------------------------------------------------------
// Placeholders
// -----------------------------------------------------------------------
 
function drawPlaceholderGuide(char) {
    ctx.save();
    ctx.globalAlpha  = GUIDE_OPACITY;
    ctx.font         = `${canvas.height * 0.8}px serif`;
    ctx.fillStyle    = "#000000";
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char, canvas.width / 2, canvas.height / 2);
    ctx.restore();
    applyStrokeStyles();
}
 
function drawPlaceholderOffscreen(char) {
    offscreenCtx.font         = `${offscreenCanvas.height * 0.8}px serif`;
    offscreenCtx.fillStyle    = "#000000";
    offscreenCtx.textAlign    = "center";
    offscreenCtx.textBaseline = "middle";
    offscreenCtx.fillText(char, offscreenCanvas.width / 2, offscreenCanvas.height / 2);
}
 
 
// -----------------------------------------------------------------------
// Fallback
// -----------------------------------------------------------------------
 
function coverageCheck(pixelData) {
    const totalPixels = canvas.width * canvas.height;
    let drawnPixels   = 0;
    for (let i = 3; i < pixelData.length; i += 4) {
        if (pixelData[i] > 20) drawnPixels++;
    }
    return (drawnPixels / totalPixels) >= 0.3;
}
 
 
// -----------------------------------------------------------------------
// Drawing
// -----------------------------------------------------------------------
 
function applyStrokeStyles() {
    ctx.strokeStyle = STROKE_COLOR;
    ctx.lineWidth   = STROKE_WIDTH;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
}
 
function onMouseDown(e) {
    console.log("Mouse down event triggered");
    isDrawing = true;
    const [x, y] = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
}
 
function onMouseMove(e) {
    console.log("Mouse move event triggered");

    if (!isDrawing) return;
    const [x, y] = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}
 
function onMouseUp() {
    console.log("Mouse up event triggered");

    isDrawing = false;
    ctx.beginPath();
}
 
function onTouchStart(e) {
    e.preventDefault();
    const t = e.touches[0];
    canvas.dispatchEvent(new MouseEvent("mousedown", { clientX: t.clientX, clientY: t.clientY }));
}
 
function onTouchMove(e) {
    e.preventDefault();
    const t = e.touches[0];
    canvas.dispatchEvent(new MouseEvent("mousemove", { clientX: t.clientX, clientY: t.clientY }));
}
 
function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
}
 