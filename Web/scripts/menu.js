function menu_function() {
    if(document.getElementById("MenuBar").offsetWidth == 50)
    {
        /*Button*/
        document.getElementById("MenuButton").style.width = "50px";
        document.getElementById("MenuButtonLine2").style.transition="0.5s";
        document.getElementById("MenuButtonLine2").style.opacity="0";
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
            listItems[i].style.left="50px";
            listItems[i].style.width = String((window.innerWidth-50)/listItems.length).concat("px");
        }
    }
    else
    {
        /*Button*/
        document.getElementById("MenuButton").style.width = "50px";
        document.getElementById("MenuButtonLine2").style.transition="3s";
        document.getElementById("MenuButtonLine2").style.opacity="1";
        document.getElementById("MenuButtonLine1").style.transform="rotate(0deg)";
        document.getElementById("MenuButtonLine1").style.top="30%";
        document.getElementById("MenuButtonLine3").style.transform="rotate(0deg)";
        document.getElementById("MenuButtonLine3").style.top="70%";
        /*Menu*/        
        document.getElementById("MenuBar").style.width = "50px";
        const listItems = document.getElementById("MenuBar").getElementsByTagName('li');        
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].style.color="transparent";
            listItems[i].style.position="fixed";
            //listItems[i].style.left="0px";
            //listItems[i].style.top="0px";
            
            listItems[i].style.transform="translateY(0)";
            listItems[i].style.width="0px";
        }
        
    }
}
