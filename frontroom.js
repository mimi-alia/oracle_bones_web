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
const defBtn = document.querySelector("definitions");
const baclBtn = document.querySelector("back");
const detailBtn = document.querySelector("details");



let currentSelection = null;
let drawSuccess = false;
let selectionHistory = new Set();

function setVisibility(visArr,hidArr){
    visArr.forEach(el => {
        el.style.visibility = "visible";
    })

    hidArr.forEach(el => {
        el.style.visibility = "hidden";
    })
}

function selectCharacter(){
    
    //When the character is selected, remove the other characters' visibility
    options.forEach(option => option.addEventListener("click", () => {
        //set currentSelection to selected div
        currentSelection = option;
        console.log(option);
        //add selected character to selectionHistory variable
        selectionHistory.add(option);

        // make selected character view visible && remove visibility of character selection view to selected character view
        setVisibility([selectionViewSection], [frontroomContainer])

        //add details from the currentSelection to the selectedCharacterContainer

        selectedCharacterContainer.innerHTML = option.getAttribute("class");

    }));
    
}
selectCharacter();

function returnToFrontroom(){
    //make character selection view visible & make selected character view invisible
    setVisibility([frontroomContainer], [selectionViewSection])
}


function showSuccess(){
    selectedCharacterDrawSpace.addEventListener("click", () => {
        if(drawSuccess){
            alert("Activity completed successfully, taking you back to the front room!")
            setTimeout(returnToFrontroom, 2500);
        } else {
            drawSuccess++;
        }  
    })
} 

showSuccess();

