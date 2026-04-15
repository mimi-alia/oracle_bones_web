const characterSelectionSection = document.querySelector("#character-selection");
const frontroomContainer = document.querySelector(".frontroom.container")
const frontroomSectionTitle = document.createElement("span")

// function styleElement(...styles){}


//Function that initializes character selection divs
function createScriptDiv(scriptImageLinkArr){
    const imagesFragment = new DocumentFragment(); 
    //create and style divs, their children, add to fragment
    for (let imageLink in scriptImageLinkArr){  
        const imgDiv = document.createElement("div");
        //add a class set to its index for future targeting
        imgDiv.setAttribute("class", imageLink)

        const holderText = document.createElement("span");
        holderText.innerText = imageLink;

        imgDiv.appendChild(holderText);
        imgDiv.style.border = "5px solid black";
        imgDiv.style.margin = "2px";
        imgDiv.style.width = "20%";        
        imgDiv.style.height = "200px";

        const image = document.createElement("img");
        image.setAttribute("src", `${imageLink}`);
        image.style.width = "inherit";
        imgDiv.appendChild(image);

        imagesFragment.appendChild(imgDiv);
    }

    //append fragment to main section
    characterSelectionSection.appendChild(imagesFragment);
}

createScriptDiv(["#","#","#","#","#"]);


//Functions that handle character selection storage and visualization

const options = document.querySelectorAll("section#character-selection>div"); //Every character option in the character selection section
const selectionViewSection = document.querySelector("#selection-view"); //Section viz'd after character selected
const selectedCharacterContainer = document.querySelector("#character-reference"); // selected character in selection view
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

defBtn.addEventListener("click", () => {
    setVisibility([definitionsView], [selectionViewSection, defBtn, selectionBackBtn, detailBtn]);
})

defBackBtn.addEventListener("click", () => {
    setVisibility([selectionViewSection], [definitionsView, defBtn, selectionBackBtn, detailBtn]);
})

detailBtn.addEventListener("click", () => {
    setVisibility([detailsView], [selectionViewSection, defBtn, selectionBackBtn, detailBtn]);
})

detailBackBtn.addEventListener("click", () => {
    setVisibility([selectionViewSection], [detailsView, defBtn, selectionBackBtn, detailBtn]);
})


let currentSelection = null;
let drawSuccess = false;
let selectionHistory = new Set();

// function checkOptionsClassName(){
//     for (let option in options){
//         return selectionHistory.has(option);
//     }
// }

function setVisibility(visArr,hidArr){
    if(visArr){
        for (let i in visArr){
            //if the current element to modify is the selection view section, and that section has been visited (is logged in the selection history), then show all buttons
            if (visArr[i] === selectionViewSection && (selectionHistory.has(selectedCharacterContainer.innerHTML))){
                //set iteration to selectionViewSection.childElementCount instead of selectionViewSection.children, because there are extra items in the children list that aren't just child elements
                for(let i = 0; i < selectionViewSection.childElementCount; i++){
                    selectionViewSection.children[i].style.visibility = "visible";
                }
                visArr[i].style.visibility = "visible";
            } else {
                    visArr.forEach(el => {
                    el.style.visibility = "visible";
                })
            }
        }
    } 
    
    if (hidArr) {
        hidArr.forEach(el => {
        el.style.visibility = "hidden";
    })
    }

}

//helper that checks if option has been selected before and populates selection 
function populateSelectionDiv(el){
    if (selectionHistory.has(el.className)){
       console.log(el) 
    } else {
       
    }
}


function selectCharacter(){
    
    //When the character is selected, remove the other characters' visibility
    options.forEach(option => option.addEventListener("click", () => {
        //set currentSelection to selected div
        currentSelection = option;
        console.log(option);
        //add selected character to selectionHistory variable
        selectionHistory.add(option.className);

        // make selected character view visible && remove visibility of character selection view to selected character view
        setVisibility([selectionViewSection], [frontroomContainer])

        //add details from the currentSelection to the selectedCharacterContainer

        selectedCharacterContainer.innerHTML = option.getAttribute("class");

    }));
    
}
selectCharacter();

function returnToFrontroom(){
    //make character selection view visible & make selected character view invisible
    setVisibility([frontroomContainer], [selectionViewSection, defBtn, selectionBackBtn, detailBtn])
}


function showSuccess(){
    selectedCharacterDrawSpace.addEventListener("click", () => {
        if(drawSuccess){
            alert("Activity completed successfully continue exploration?")
            // setTimeout(returnToFrontroom, 2500);
            setVisibility([defBtn, selectionBackBtn, detailBtn]);
        } else {
            drawSuccess++;
        }  
    })
} 

showSuccess();


