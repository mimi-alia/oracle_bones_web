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
        isSuccess: undefined,
    },
    好 : {
        modernCharacter: "好",
        pinyin: "hǎo",
        radicals:["女 (nǚ) woman", "子 (zǐ) child"],
        definition:"(lit\）woman good. Here, the name of Fu Hao, a wife of the emperor leading the battle",
        text: "",
        references: ["http://jiaguwen.shufami.com/?char=%E5%A6%87&la", "http://jiaguwen.shufami.com/?char=%E5%"],
        images: "",
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
        isSuccess: undefined,
    },
    佑 : {
        modernCharacter: "佑",
        pinyin: "yòu",
        radicals: ["人 (rén) person", "右 (yòu)  right-hand side"],
        definition: "Blessing\; protection",
        references: "http://jiaguwen.shufami.com/?char=%E4%BD%91&layout=1&size=128&hspace=0&vspace=0&forecolor=%23000000&backcolor=%23d7d5d0&order=",
        images: "",
        isSuccess: undefined,
    },
    卜: {
        modernCharacter: "卜",
        pinyin: "bo",
        radicals: ["A radical that resembles the crack in the bone"],
        definition: "To divinate",
        references: "http://jiaguwen.shufami.com/?char=%E5%8D%9C&layout=1&size=128&hspace=0&vspace=0&forecolor=%23000000&backcolor=%23d7d5d0&order=",
        images: "",
        isSuccess: undefined,
    },
    }


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
        imgDiv.style.border = "5px solid black";
        imgDiv.style.margin = "2px";
        imgDiv.style.width = "20%";        
        imgDiv.style.height = "200px";

        const image = document.createElement("img");
        image.setAttribute("src", "#");
        image.style.width = "inherit";
        imgDiv.appendChild(image);

        imagesFragment.appendChild(imgDiv);
    }

    //append fragment to main section
    characterSelectionSection.appendChild(imagesFragment);
}

createScriptDiv(characters);


//Functions that handle character selection storage and visualization

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
const defBackBtn = document.querySelector("#def-back");

//Details view
const detailsView = document.querySelector("#detail-view");
const detailBackBtn = document.querySelector("#detail-back");



//Button functionality

selectionBackBtn.addEventListener("click", () => {
    setTimeout(returnToFrontroom, 2500);
})

function returnToFrontroom(){
    //make character selection view visible & make selected character view invisible
    setVisibility([frontroomContainer], [selectedCharacterView, defBtn, selectionBackBtn, detailBtn])
}


defBtn.addEventListener("click", () => {
    setVisibility([definitionsView], [selectedCharacterView, defBtn, selectionBackBtn, detailBtn]);
})

defBackBtn.addEventListener("click", () => {
    setVisibility([selectedCharacterView], [definitionsView]);
})

detailBtn.addEventListener("click", () => {
    setVisibility([detailsView], [selectedCharacterView, defBtn, selectionBackBtn, detailBtn]);
})

detailBackBtn.addEventListener("click", () => {
    setVisibility([selectedCharacterView], [detailsView]);
})


//Character select and draw div functions and variables

let currentSelection = null;
let completionHistory = new Set();


//Character select div functionality

options.forEach(option => option.addEventListener("click", () => {
    selectCharacter(option);
    setVisibility([selectedCharacterView], [frontroomContainer]);
}
))

//function that takes the data attribute of the character selection and adds it to the character draw and reference divs
function generateCharacterDrawDivData(characterOption){
    const charDataID = characterOption.dataset.id;
    
    selectedCharacterDrawSpace.setAttribute("data-id", charDataID);
    selectedCharacterReference.setAttribute("data-id", charDataID);
}

function selectCharacter(characterOption){
    //set currentSelection to selected div
    currentSelection = characterOption;

    //modify the character view and drawspace divs have the same data id as the div that was selected
    generateCharacterDrawDivData(characterOption);

    //add details from the currentSelection to the selectedCharacterReference
    selectedCharacterReference.innerHTML = characterOption.getAttribute("class");

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
        return true;
    }

    return false; // returns false if some other error
}

function showSuccess(){
    alert("Divination complete! Explore further?");
    setVisibility([defBtn, selectionBackBtn, detailBtn]);
}

function checkSuccess(el){
    if (isSuccess(el)){
        showSuccess();
    } else {
        alert("hm...wonder what went wrong")
    }
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

    if (hidArr) {
        hidArr.forEach(el => {
            el.style.visibility = "hidden"
        })
    }
}



