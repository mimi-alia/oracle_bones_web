const homepage = document.querySelector("#home");

const backgroundVid = document.createElement("video");
backgroundVid.setAttribute("src", "../assets/media/camera_swap.mp4");
backgroundVid.autoplay = true;
backgroundVid.controls = false;
backgroundVid.muted = true;
backgroundVid.playsInline = true;

homepage.appendChild(backgroundVid);



backgroundVid.addEventListener("timeupdate", () => {
    if (backgroundVid.currentTime >= loopEnd) {
        backgroundVid.currentTime = loopStart;
    }
});


function playSegment(start, end) {
    loopStart = start;
    loopEnd = end;

    backgroundVid.currentTime = start;
    backgroundVid.play();
}


function changeRoom(link){
    window.location.href = link;
}

 function changeSRC(e, src){
    e.src = `${src}`;
    console.log("success");
}



const audioToPlay = document.querySelector("#audioFile");
const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click", () => {
        audioToPlay.play();
        startBtn.remove();
        homepage.style.visibility = "visible";

        playSegment(0.5, 4.5);
});

homepage.addEventListener("click", function(){
    playSegment(4.5, 8);

    setTimeout(() => {
        changeRoom("../enter/divination.html");
    }, 2500);
});