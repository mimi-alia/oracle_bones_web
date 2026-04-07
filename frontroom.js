const frontroomSection = document.querySelector("#character-selection");

const frontroomSectionTitle = document.createElement("span")

function styleElement(...styles){

}

function createScriptDiv(scriptImageLinkArr){
    const imagesFragment = new DocumentFragment(); 
    for (let imageLink in scriptImageLinkArr){  
        const imgDiv = document.createElement("div");
        imgDiv.style.border = "5px solid black";
        imgDiv.style.margin = "2px";
        imgDiv.style.width = "20%";        
        imgDiv.style.height = "200px";

        const image = document.createElement("img");
        image.setAttribute("src", `${imageLink}`);
        image.style.width = "inehrit";
        imgDiv.appendChild(image);

        imagesFragment.appendChild(imgDiv);
    }

    frontroomSection.appendChild(imagesFragment);
}

createScriptDiv(["#","#","#","#","#"]);
