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
        references: ["http://jiaguwen.shufami.com/?char=%E4%BD%91&layout=1&size=128&hspace=0&vspace=0&forecolor=%23000000&backcolor=%23d7d5d0&order="],
        images: "",
        isSuccess: undefined,
    },
    卜: {
        modernCharacter: "卜",
        pinyin: "bo",
        radicals: ["A radical that resembles the crack in the bone"],
        definition: "To divinate",
        references: ["http://jiaguwen.shufami.com/?char=%E5%8D%9C&layout=1&size=128&hspace=0&vspace=0&forecolor=%23000000&backcolor=%23d7d5d0&order="],
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
const definitionsTable = document.querySelector("#definitions-view>div>table")
const defBackBtn = document.querySelector("#def-back");

//Details view
const detailsView = document.querySelector("#detail-view");
const detailBackBtn = document.querySelector("#detail-back");



//Button functionality

selectionBackBtn.addEventListener("click", () => {
    setTimeout(returnToFrontroom, 2500);
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
        return false;
    }
}

function showSuccess(){
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
    const successStatus = isSuccess(el);
    if (successStatus){
        showSuccess();
    }
    setDrawSpaceEventListener(successStatus);
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

                        anchor.innerHTML = reference;
                        anchor.setAttribute("href", reference)
                        listItem.appendChild(anchor);
                        linkList.appendChild(listItem);
                    });

                cell.appendChild(linkList);

                //otherwise, as long as the key isnt text or images, add the value to the cell's innerHTML
                } else if (item !== "text" && item !== "images") {
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
        selectionBackBtn.removeEventListener("click", checkAllCharsComplete)
        setTimeout(function(){alert("Congratulations, the divination is complete!");}, 3000)
    }else{
        console.log("There are still more divinations to be made. Continue?")
    }
}