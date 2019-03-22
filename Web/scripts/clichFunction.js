function colorCountry(e) {
    if(document.getElementById(e.target.id).style.fill === "blue"){
        document.getElementById(e.target.id).style.fill = "black";
    }
    else{
        document.getElementById(e.target.id).style.fill = "blue";
    }
}

