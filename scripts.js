const homepage = document.querySelector("#home")

function playAnimation(animation){

}

function changeRoom(link){
    window.location.href = link;
}

 function changeSRC(e, src){
    e.src = `${src}`;
    console.log("success")
}

homepage.addEventListener("click", function(){
    const homepageVideo = document.querySelector("#home > video");
    //background animation will switch to an animation emulating a change
    changeSRC(homepageVideo, "#");
    //
    function enterDivinationSpace(){
        changeRoom("./rooms/frontroom.html");
    }
    setTimeout(enterDivinationSpace, 2500);

    // setTimeout(function(){ window.location.href = "./rooms/frontroom.html"}, 5000)
})