function showContent(control) {
    if(control == 0){
        document.getElementById("tab1").style.display = "";
        document.getElementById("tab2").style.display = "none";
    }
    else if(control == 1){
        document.getElementById("tab2").style.display = "";
        document.getElementById("tab1").style.display = "none";
    }
}