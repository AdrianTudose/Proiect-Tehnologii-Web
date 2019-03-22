function functie() {
    if(document.getElementById("MenuButton").offsetWidth == 50)
    {
        /*Button*/
        document.getElementById("MenuButton").style.width = "300px";
        document.getElementById("MenuButtonLine2").style.display="none";
        document.getElementById("MenuButtonLine1").style.transform="rotate(45deg)";
        document.getElementById("MenuButtonLine1").style.top="50%";
        document.getElementById("MenuButtonLine3").style.transform="rotate(-45deg)";
        document.getElementById("MenuButtonLine3").style.top="50%";
        /*Menu*/
        document.getElementById("MenuBar").style.width = "100%";
        const listItems = document.getElementById("MenuBar").getElementsByTagName('li');        
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].style.color="white";
            listItems[i].style.position="relative";
            listItems[i].style.left="300px";
            listItems[i].style.width = String((window.innerWidth-300)/listItems.length).concat("px");
        }
        
        /*Select Menu*/
        document.getElementById("SelectionList").style.width = "300px";
        document.getElementById("SelectionList").style.height = "100%";        
        const listItems1 = document.getElementById("SelectionList").getElementsByTagName('li');        
        for (let i = 0; i < listItems1.length; i++) {
            listItems1[i].style.color="white";
            listItems1[i].style.position="relative";
            listItems1[i].style.top="50px";
            listItems1[i].style.height=String((window.innerHeight-50)/listItems1.length).concat("px");
            listItems1[i].style.width="300px";
            listItems1[i].style.display="block";
        }   
    }
    else
    {
        /*Button*/
        document.getElementById("MenuButton").style.width = "50px";
        document.getElementById("MenuButtonLine2").style.display="block";
        document.getElementById("MenuButtonLine1").style.transform="rotate(0deg)";
        document.getElementById("MenuButtonLine1").style.top="30%";
        document.getElementById("MenuButtonLine1").style.transform="translate(-50%,-50%)";
        document.getElementById("MenuButtonLine3").style.transform="rotate(0deg)";
        document.getElementById("MenuButtonLine3").style.top="70%";
        document.getElementById("MenuButtonLine3").style.transform="translate(-50%,-50%)";
        /*Menu*/        
        document.getElementById("MenuBar").style.width = "50px";
        const listItems = document.getElementById("MenuBar").getElementsByTagName('li');        
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].style.color="transparent";
            listItems[i].style.position="absolute";
            listItems[i].style.left="0px";
            listItems[i].style.top="0px";
            listItems[i].style.width="50px";
        }
        /*Select Menu*/
        document.getElementById("SelectionList").style.width = "50px";
        document.getElementById("SelectionList").style.height = "50px";        
        const listItems1 = document.getElementById("SelectionList").getElementsByTagName('li');        
        for (let i = 0; i < listItems1.length; i++) {
            listItems1[i].style.color="transparent";
            listItems1[i].style.position="absolute";
            listItems1[i].style.left=0;
            listItems1[i].style.top=0;
            listItems1[i].style.height="50px";
            listItems1[i].style.width="50px";
            listItems1[i].style.display="none";
        }
    }
}

