const frontroomSection = document.querySelector("#character-selection");

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
    frontroomSection.appendChild(imagesFragment);
}

createScriptDiv(["#","#","#","#","#"]);


//Functions that handle character selection storage and visualization



function selectScript(){
    //Every character option in the character selection section
    const options = document.querySelectorAll("section#character-selection>div");
    
    //When the character is selected, remove the other characters' visibility
    options.forEach(option => option.addEventListener("click", () => {
        
    }));
    
}

selectScript();
