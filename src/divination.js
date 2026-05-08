const frontroomContainer = document.querySelector(".frontroom.container");
const characterSelectionSection = document.querySelector("#character-selection");

const characters = {
    妇 : {
        modernCharacter: "妇",
        pinyin: "fù",
        radicals:["女 (nǚ) woman"],
        definition:"(lit\）woman good. Here, the name of Fu Hao, a wife of the emperor leading the battle",
        text:"",
        references: ["http://jiaguwen.shufami.com/?char=%E5%A6%87&la", "yout=1&size=128&hspace=0&vspace=0&forecolor=%23000000&backcolor=%23d7d5d0&order="],
        images: "",
        bckgrndAudio : "../assets/audio/finals/fuhao.mp3",
        isSuccess: undefined,
    },
    好 : {
        modernCharacter: "好",
        pinyin: "hǎo",
        radicals:["女 (nǚ) woman", "子 (zǐ) child"],
        definition:"(lit\）Good  well. Here, the name of Fu Hao, a wife of the emperor leading the battle",
        text: "",
        references: ["http://jiaguwen.shufami.com/?char=%E5%A6%87&la", "http://jiaguwen.shufami.com/?char=%E5%"],
        images: "",
        bckgrndAudio : "../assets/audio/finals/fuhao.mp3",
        isSuccess: undefined,
    },
    伐 : {
        modernCharacter: "伐",
        pinyin: "fá",
        radicals:["人 (rén) person", "戈 (gē) halberd\； dagger axe"],
        definition: "attack",
        text: "",
        references: ["http://jiaguwen.shufami.com/?char=%E4%BC%90&layout=1&size=128&hspace=0&vspace=0&forecolor=%23000000&backcolor=%23d7d5d0&order="],
        images: "",
        bckgrndAudio : "../assets/audio/finals/fa_415.wav",
        isSuccess: undefined,
    },
    佑 : {
        modernCharacter: "佑",
        pinyin: "yòu",
        radicals: ["人 (rén) person", "右 (yòu)  right-hand side"],
        definition: "Blessing\; protection",
        references: ["http://jiaguwen.shufami.com/?char=%E4%BD%91&layout=1&size=128&hspace=0&vspace=0&forecolor=%23000000&backcolor=%23d7d5d0&order="],
        images: "",
        bckgrndAudio : "../assets/audio/finals/blessed_426.mp3",
        isSuccess: undefined,
    },
    卜: {
        modernCharacter: "卜",
        pinyin: "bo",
        radicals: ["A radical that resembles the crack in the bone"],
        definition: "To divinate",
        references: ["http://jiaguwen.shufami.com/?char=%E5%8D%9C&layout=1&size=128&hspace=0&vspace=0&forecolor=%23000000&backcolor=%23d7d5d0&order="],
        images: "",
        bckgrndAudio : "../assets/audio/finals/divinate.mp3",
        isSuccess: undefined,
    },
    }

/********************************************************
 * UI 
 ********************************************************/

//Function that initializes character selection divs
function createScriptDiv(characterObj){
    const imagesFragment = new DocumentFragment(); 
    //create and style divs, their children, add to fragment

    for (let obj in Object.entries(characterObj)){
        const characterInfo = Object.entries(characterObj)[obj][1];

        const imgDiv = document.createElement("div");


        //add a class set to its index for future targeting
        imgDiv.setAttribute("class", characterInfo.modernCharacter)
        imgDiv.setAttribute("data-id", characterInfo.modernCharacter)

        const holderText = document.createElement("span");
        holderText.innerText = characterInfo.modernCharacter;

        imgDiv.appendChild(holderText);
        

        imagesFragment.appendChild(imgDiv);
    }

    //append fragment to main section
    characterSelectionSection.appendChild(imagesFragment);
    frontroomContainer.style.visibility = "hidden"
}
createScriptDiv(characters);

// const backgroundAudio = new Audio("../assets/audio/finals/fa_415.wav");

// const loopStart = 43;
// const loopEnd = 62;



// backgroundAudio.addEventListener("timeupdate", () => {
//     if (backgroundAudio.currentTime >= loopEnd) {
//         backgroundAudio.currentTime = loopStart;
//         backgroundAudio.play();
//     }
// });


function initializeExperience(){
    const introDiv = document.createElement("div")
    introDiv.setAttribute("id", "intro-div");

    const introTitle = document.createElement("h1");
    const introText = document.createElement("p");
    const instructionText = document.createElement("p");
    const introButton = document.createElement("button");
    const creditList = document.createElement("ul");
    const credits = {
        "Misha Alia Awad" : "Developer, Researcher of Oracle Bone Script",
        "Neil Bhatia" : "Creative Writing and Design",
        "Anna Likhanova" : "Developer",
        "Jasper von Studnitz" : "Digital Art",
        "Owen Setlik": "Audio & Sound",
        "Huiwen Li" : "Continuing Associate Professor of Chinese, Linguistic & Historical Direction"
    }

    Object.entries(credits).forEach( ([k,v]) => {
        const li = document.createElement("li");
        li.innerHTML = k + " : " + v;
        creditList.appendChild(li);
    })

    introTitle.innerText = "About The Oracle Bones Demo"
    introText.innerText = "The Oracle Bones Project is an educational, interactive experience designed to walk players through the history and creation of oracle bones and the etymology of Mandarin characters since the Shang Dynasty. The oracle bones were a form of divination that involved carving a question into a bone or tortoise shell, cracking the bone in a fire, and then interpreting answers the cracks revealed. They are the primary historical record of the time and the earliest known extensive record of ancient Chinese. Our game will offer a unique, tactile glimpse into a relatively obscure, understudied part of history."


    instructionText.innerText = "To play the demo, enter the divination space. You will be prompted to select from 5 characters and taken to the inscription room where you will practice writing Oracle Bone Script. Once that has succeeded, you will be granted access to further information about the text and permitted to return to the divination space. Complete all characters to finish the divination.";

    introButton.innerText = "Continue";

    [introTitle, introText, instructionText, creditList, introButton].forEach( el => {
        introDiv.appendChild(el);
    })

    document.body.appendChild(introDiv);
    

    introButton.addEventListener("click", () => {
        introDiv.remove();
        frontroomContainer.style.visibility = "visible";
    })
}
initializeExperience();


//Functions that handle character selection storage and visualization

//Intro div
const introBtn = document.querySelector("#intro-div>button");

const options = document.querySelectorAll("section#character-selection>div"); //Every character option in the character selection section

//Selected Character View Elements
const selectedCharacterView = document.querySelector("#selection-view"); //Section viz'd after character selected
const selectedCharacterReference = document.querySelector("#character-reference"); // selected character in selection view
//Character draw section for currently selected character
const selectedCharacterDrawSpace = document.querySelector("#character-draw");

//Selected Character View Buttons
const defBtn = document.querySelector("#definitions");
const selectionBackBtn = document.querySelector("#selection-back");
const detailBtn = document.querySelector("#details");

//Definitions view
const definitionsView = document.querySelector("#definitions-view");
const definitionsTable = document.querySelector("#definitions-view>div>table")
const defBackBtn = document.querySelector("#def-back");

//Details view
const detailsView = document.querySelector("#detail-view");
const detailBackBtn = document.querySelector("#detail-back");



//Button functionality

selectionBackBtn.addEventListener("click", () => {
    returnToFrontroom();
})

selectionBackBtn.addEventListener("click", () => {
    setCompleteStyle(options)
})

selectionBackBtn.addEventListener("click", checkAllCharsComplete)

function returnToFrontroom(){
    //make character selection view visible & make selected character view invisible
    setVisibility([frontroomContainer], [selectedCharacterView, defBtn, selectionBackBtn, detailBtn])
}


defBtn.addEventListener("click", () => {
    setTimeout(() => {
        setVisibility([definitionsView], [selectedCharacterView, defBtn, selectionBackBtn, detailBtn]);

    }, 2500);
})

defBackBtn.addEventListener("click", () => {
    setTimeout(() => {
        setVisibility([selectedCharacterView], [definitionsView]);

    }, 2500);
})

detailBtn.addEventListener("click", () => {
    setTimeout(() => {
        setVisibility([detailsView], [selectedCharacterView, defBtn, selectionBackBtn, detailBtn]);

    }, 2500);
})

detailBackBtn.addEventListener("click", () => {
    setTimeout(() => {
        setVisibility([selectedCharacterView], [detailsView]);
    }, 2500);

})

/********************************************************
 * Audio 
 ********************************************************/

const AUDIO = {};

function createAudioFiles(key, src, params = {}){
    AUDIO[key] = new Audio(src);

    const audio = AUDIO[key];
    Object.entries(params).forEach(([k, v]) => {
        audio[k] = v;
        console.log("Audio parameter added: " + v)
   });
}

let currentBG = null;

function handleAudioSwitches(key, params = {}) {
    if (currentBG && currentBG !== key) {
        stopAudio(currentBG);
    }

    currentBG = key;
    playAudio(key, params);
}

function playAudio(key, params = {}){
   const audio = AUDIO[key];
   Object.entries(params).forEach(([k, v]) => {
        audio[k] = v;
        console.log("Audio parameter added: " + audio[k])
   });

   audio.play();
   console.log("AUDIO PLAY");
}

function stopAudio(key){
    const audio = AUDIO[key];
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
}

function stopAllAudio() {
    Object.values(AUDIO).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

const audioToAdd = {
    "clickSound": "../assets/audio/soundfx/oracle_click.mp3",
    "charCompleteSound" : "../assets/audio/soundfx/oracle_failure.mp3",
    "gameCompleteSound": "../assets/audio/soundfx/oracle_success_hit.mp3",
    "carveSound": "../assets/audio/soundfx/oracle_long_carve.mp3",
    "backgroundAudio": "../assets/audio/fireplace.wav"
}

/************** Create/Add Audio files to AUDIO Obj ******* */

for (let k in audioToAdd){
    createAudioFiles(k, audioToAdd[k]);
} 

Object.values(characters).forEach(char => {
    createAudioFiles(char.modernCharacter, char.bckgrndAudio)
})

//background

introBtn.addEventListener("click", () => {
    AUDIO.backgroundAudio.currentTime = 0;
    AUDIO.backgroundAudio.loop = true;
    AUDIO.backgroundAudio.play();
})

selectionBackBtn.addEventListener("click", () => {
    if (currentBG && AUDIO[currentBG]) {
        stopAudio(currentBG);
        currentBG = null;
    }
});

options.forEach(option => option.addEventListener("click", () => {
    const charKey = option.dataset.id;

    setTimeout(() => {
        handleAudioSwitches(charKey, {
        loop: true,
        currentTime: 0,
        volume: 0.5
        });
    }, 2500)
    
}
))

//Interaction Sound fx
document.addEventListener("click", (e) => {
    if (e.target !== selectedCharacterDrawSpace){
        AUDIO.clickSound.currentTime = 0;
        AUDIO.clickSound.play();
    } 
});

let isMoving = false;
let moveTimeout;

selectedCharacterDrawSpace.addEventListener("mousedown", () => {
    isDrawing = true;
});

document.addEventListener("mouseup", () => {
    isDrawing = false;
    isMoving = false;

    AUDIO.carveSound.pause();
    AUDIO.carveSound.currentTime = 0;
});

selectedCharacterDrawSpace.addEventListener("mousemove", () => {
    if (!isDrawing) return;

    isMoving = true;

    // start playing if not already
    if (AUDIO.carveSound.paused) {
        AUDIO.carveSound.loop = true;
        AUDIO.carveSound.volume = 0.75;
        AUDIO.carveSound.play();
    }

    // detect when movement stops
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
        isMoving = false;

        AUDIO.carveSound.pause();
        AUDIO.carveSound.currentTime = 0;
    }, 200); 
});

/********************************************************
 * Background Video 
 ********************************************************/

const backgroundVid = document.createElement("video");

backgroundVid.src = "../assets/media/camera_swap.mp4";
backgroundVid.autoplay = false;
backgroundVid.controls = false;
backgroundVid.muted = true;
backgroundVid.playsInline = true;
backgroundVid.preload = "auto";

document.body.appendChild(backgroundVid);


/***********************
 * VIDEO STATE
 ************************/

let loopStart = 0;
let loopEnd = 0;
let shouldLoop = false;
let activeTimeout = null;


/***********************
 * VIDEO LOOP HANDLER
 ************************/

backgroundVid.addEventListener("timeupdate", () => {

    if (!shouldLoop) return;

    if (backgroundVid.currentTime >= loopEnd) {
        backgroundVid.currentTime = loopStart;
    }
});


/***********************
 * CORE PLAY FUNCTION
 ************************/

function playSegment(start, end, loop = false) {

    // cancel pending transitions
    if (activeTimeout) {
        clearTimeout(activeTimeout);
        activeTimeout = null;
    }

    shouldLoop = loop;

    loopStart = start;
    loopEnd = end;

    backgroundVid.pause();

    backgroundVid.currentTime = start;

    backgroundVid.onseeked = () => {

        const playPromise = backgroundVid.play();

        if (playPromise !== undefined) {
            playPromise.catch(err => console.log(err));
        }

        backgroundVid.onseeked = null;
    };
}


/***********************
 * TRANSITION HELPER
 ************************/

function transitionVideo(
    transitionStart,
    transitionEnd,
    idleStart,
    idleEnd
) {

    // play transition ONCE
    playSegment(transitionStart, transitionEnd, false);

    // calculate exact duration
    const duration =
        (transitionEnd - transitionStart) * 1000;

    // after transition, begin idle loop
    activeTimeout = setTimeout(() => {

        playSegment(idleStart, idleEnd, true);

    }, duration);
}


/********************************************************
 * VIDEO EVENTS
 ********************************************************/


/******** FRONTROOM IDLE ********/

introBtn.addEventListener("click", () => {

    console.log("intro video");

    playSegment(0.5, 4.5, true);
});


/******** RETURN TO FRONTROOM ********/

selectionBackBtn.addEventListener("click", () => {

    console.log("back to frontroom");

    playSegment(0.5, 4.5, true);
});


/******** CHARACTER SELECT ********/

document.addEventListener("click", (e) => {

    if (e.target.closest("#character-selection > div")) {

        console.log("character select");

        transitionVideo(
            4.0, 7.0,     // transition
            6.5, 8.5      // idle loop
        );
    }
});


/******** DEFINITIONS ********/

defBtn.addEventListener("click", () => {

    console.log("definitions");

    transitionVideo(
        15.0, 17.5,
        17, 18.0
    );
});


/******** DEFINITIONS BACK ********/

defBackBtn.addEventListener("click", () => {

    console.log("definitions back");

    transitionVideo(
        18, 20.5,
        6.5, 8.5  
    );
});


/******** DETAILS ********/

detailBtn.addEventListener("click", () => {

    console.log("details");

    transitionVideo(
        8.5, 10.7,
        10.7, 11.5
    );
});


/******** DETAILS BACK ********/

detailBackBtn.addEventListener("click", () => {

    console.log("details back");

    transitionVideo(
        12, 14,
        6.5, 8.5
    );
});
/********************************************************
 * Character select and draw div functions and variables
 ********************************************************/

let currentSelection = null;
let completionHistory = new Set();

//Div styling
//character selection div styling based on completion 

function setCompleteStyle(charDivs){

    charDivs.forEach(div => {
        const charKey = div.getAttribute("data-id");
        if (completionHistory.has(charKey)){
            div.setAttribute("class", `${charKey} completed`);
        }
    })
}


//Character select div functionality

options.forEach(option => option.addEventListener("click", () => {
    selectCharacter(option);
    setTimeout(() => {
        setVisibility([selectedCharacterView], [frontroomContainer]);
    }, 2500);
}
))

//function that takes the data attribute of the character selection and adds it to the character draw and reference divs
function generateCharacterDrawDivData(characterOption){
    const charDataID = characterOption.dataset.id;
    
    selectedCharacterDrawSpace.setAttribute("data-id", charDataID);
    // selectedCharacterReference.setAttribute("data-id", charDataID);
}

function selectCharacter(characterOption){
    //set currentSelection to selected div
    currentSelection = characterOption;

    //modify the character view and drawspace divs have the same data id as the div that was selected
    generateCharacterDrawDivData(characterOption);

    //add details from the currentSelection to the selectedCharacterReference
    selectedCharacterDrawSpace.innerHTML = characterOption.getAttribute("class");

    resetCanvas(characterOption.dataset.id); 

}



//Character draw div functionality

selectedCharacterDrawSpace.addEventListener("click", (e) => {
    checkSuccess(e.currentTarget); 
});


function isSuccess(el){
    const elementDataID = el.dataset.id;
    if (!completionHistory.has(elementDataID)) {
        completionHistory.add(elementDataID);
        return true;
    } else {
        return false;
    }
}

function showSuccess(){
    AUDIO.charCompleteSound.currentTime = 0;
    AUDIO.charCompleteSound.play();
    alert("Divination complete! Explore further?");
    setVisibility([defBtn, selectionBackBtn, detailBtn]);
}

function setDrawSpaceEventListener(status){
    if(status){
        selectedCharacterDrawSpace.removeEventListener("click", checkSuccess);
    } else {
        selectedCharacterDrawSpace.addEventListener("click", (e) => {
    checkSuccess(e.currentTarget); 
        })
    }
}

function checkSuccess(el){
    if (!evaluateDrawing()) return;
    const successStatus = isSuccess(el);
    if (successStatus){
        showSuccess();
    }
    setDrawSpaceEventListener(successStatus);
    console.log("checkSuccess called");
    console.log("evaluateDrawing result:", evaluateDrawing());
    
}



//helper function that checks if a character has successfully been drawn and sets style of character draw view based on that ---obsolete 

// function styleSelectedCharacterView(el){
//     if (completionHistory.has(selectedCharacterDrawSpace.dataset.id)){
//         el.style.visibility = "visible";
//         for(let i = 0; i < el.childElementCount; i++){
//             el.children[i].style.visibility = "visible";
//         }
//     } else {
//         el.style.visibility = "visible";
//     }
// }

// function hideSelectedCharacterView(el){
//     el.style.visibility = "hidden";
//         for(let i = 0; i < el.childElementCount; i++){
//             el.children[i].style.visibility = "hidden";
//         }
// }

function setVisibility(visArr,hidArr){
    console.log("set visibility function triggered")
    if (visArr){
        visArr.forEach(el => {
            el.style.visibility = "visible";
        })
    }

    if (visArr?.includes(selectedCharacterView)) {
        if (completionHistory.has(selectedCharacterDrawSpace.dataset.id)){
            defBtn.style.visibility = "visible";
            selectionBackBtn.style.visibility = "visible";
            detailBtn.style.visibility = "visible";
        }
    }

    if (visArr?.includes(definitionsView)) {
        renderDefinitionsTable(characters);
    }


    if (hidArr) {
        hidArr.forEach(el => {
            el.style.visibility = "hidden"
        })
    }
}

//table loading functionaloity


function renderDefinitionsTable(characters){
    const entries  = Object.values(characters);

    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    const headerRow = document.createElement("tr")
    const headerRowFragment = new DocumentFragment();
    const bodyRowFragment = new DocumentFragment();

    const headers = ["Modern Character", "Pinyin", "Radicals", "Definition", "References"]

    //Remove previous entries so they are not copied each load
    while (definitionsTable.firstChild) {
        definitionsTable.removeChild(definitionsTable.firstChild);
    }

    headers.forEach(header => {
        const th = document.createElement("th");
        th.setAttribute("scope", "col")
        th.innerHTML = header;
        headerRowFragment.append(th);
    })

    entries.forEach(entry => {

        //adds in order of character object, not completionHistory
        if (completionHistory.has(entry.modernCharacter)){
            const bodyRow = document.createElement("tr");
        
            for (let item in entry){

                //if an item is falsy, continue / skip
                if (!entry[item]) continue;

                //create a table cell for each truthy item in entry (object)
                const cell = document.createElement("td");

                //if the entry key is references, create an unordered list with anchor list items and add them to the cells
                if (item === "references") {
                    const linkList = document.createElement("ul");

                    entry.references.forEach(reference => {
                        const listItem = document.createElement("li");
                        const anchor = document.createElement("a");
                        anchor.setAttribute("target", "_blank")

                        anchor.innerHTML = reference;
                        anchor.setAttribute("href", reference)
                        listItem.appendChild(anchor);
                        linkList.appendChild(listItem);
                    });

                cell.appendChild(linkList);

                //otherwise, as long as the key isnt text or images, add the value to the cell's innerHTML
                } else if (item !== "text" && item !== "images" && item !== "bckgrndAudio") {
                    cell.innerHTML = entry[item];
                }

            //Append the cell to the row
             bodyRow.appendChild(cell);
            }

            //Add the row to the fragment, then add that fragment to the table body
            bodyRowFragment.append(bodyRow);
        }
        tableBody.appendChild(bodyRowFragment);
    })

    headerRow.appendChild(headerRowFragment);
    tableHead.appendChild(headerRow);
    definitionsTable.appendChild(tableHead);
    definitionsTable.appendChild(tableBody);
}

//Completion function -- checks if all 5 charachter drawings have been completed;

function checkAllCharsComplete(){
    let completionCount = 0; 
    for (let d=0; d<options.length; d++){
        options[d].classList.forEach(c => {
            if (c === "completed"){
                completionCount++;
            }
        })
    }
    if (completionCount === 5){
        selectionBackBtn.removeEventListener("click", checkAllCharsComplete);
        setTimeout(function(){AUDIO.gameCompleteSound.play()}, 3000);
        setTimeout(function(){alert("Congratulations, the divination is complete!");}, 3000)
    }else{
        console.log("There are still more divinations to be made. Continue?")
    }
}

initCanvas();

