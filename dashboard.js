
function openChat() {
    
    if (document.getElementById("chat").classList.contains("show")) {
        $('#main-body').css({'width':'calc(100% - 285px - 73px - 390px)'});
    }
    else {
        var width = document.getElementById("main-body").style.width;
        $('#main-body').css({'width':'calc(100% - 285px - 73px)'});
    }
    document.getElementById("chat").classList.toggle("show");
   
}

