
var totalClicked = 0; /*O folosim pentru a numara cate click-uri a dat utilizatorul*/
var country1_name;
var country2_name;
var country1_id;
var country2_id;
var planesFling = false;

/**
 * Functie prin care , apasand pe mapa ii schimbam culoare din gri in albastru si invers.
 * @param {*} e 
 */

function colorCountry(e) {
    if (e.target.id == "svg2") return;
    if (document.getElementById(e.target.id).style.fill === "blue") {
        document.getElementById(e.target.id).style.fill = "gray";
        if (totalClicked == 2) {
            crashPlane();
            planesFling = false;
            if (e.target.id == country1_id) {
                country1_id = country2_id;
            }
            //document.getElementById(country2_id).addEventListener("mouseover", "fill:red");
        }
        totalClicked = totalClicked - 1;
    }
    else {
        if (totalClicked < 2) {
            document.getElementById(e.target.id).style.fill = "blue";
            totalClicked = totalClicked + 1;
        }
        if (totalClicked == 1) {
            country1_name = e.target.dataset.name;
            country1_id = e.target.id;
        }
        if (totalClicked == 2 && planesFling == false) {
            country2_name = e.target.dataset.name;
            country2_id = e.target.id;
            launchPlane();
            planesFling = true;
        }
    }
    console.log(totalClicked);
}

function launchPlane() {
    var coord1 = getCenter(country1_id);
    var coord2 = getCenter(country2_id);
    var countries = country1_name + '-' + country2_name;
    countMigrations(countries,coord1,coord2);

}

function launchPlaneOnPath() {
    var myanim = document.createElementNS("http://www.w3.org/2000/svg", 'animateMotion');
    myanim.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#plane");
    myanim.setAttribute("id", "myAnimation");
    myanim.setAttribute("begin", "indefinite");
    myanim.setAttribute("repeatCount", "indefinite");
    myanim.setAttribute("fill", "freeze");
    myanim.setAttribute("dur", "5s");
    myanim.setAttribute("rotate", "auto");
    document.getElementById("svg2").appendChild(myanim);


    var specifyPath = document.createElementNS("http://www.w3.org/2000/svg", 'mpath');
    specifyPath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#plane_path");
    document.getElementById("myAnimation").appendChild(specifyPath);

    document.getElementById("myAnimation").beginElement();
}

function addPath(x1, y1, x2, y2) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute("d", "M" + x1 + "," + y1 + " " + x2 + "," + y2 + " Z");
    path.setAttribute("id", "plane_path");
    path.setAttribute("opacity", "0");
    document.getElementById("svg2").appendChild(path);
}

function addPlane() {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "svg/Plane.svg", false);
    xhr.overrideMimeType("image/svg+xml");
    xhr.send("");
    var plane_element = xhr.responseXML.getElementById("plane");
    document.getElementById("svg2").appendChild(plane_element);
}


function getCenter(country) {
    var bbox = document.getElementById(country).getBBox();
    // Calculate the centre of the group
    var cx = bbox.x + bbox.width / 2;
    var cy = bbox.y + bbox.height / 2;
    console.log(country);
    var coord = [cx, cy];
    return coord;
}

function crashPlane() {
    document.getElementById("plane").remove();
    document.getElementById("myAnimation").remove();
    document.getElementById("plane_path").remove();
    /*var elements = document.getElementsByClassName("info_country");
    for (element in elements) {
        if(elements[element].tagName!= null){
            console.log(elements[element].tagName);
            elements[element].remove();
        }
    }*/
    document.getElementById("info_box1").remove();
    document.getElementById("info_box2").remove();
    document.getElementById("info_box_triangle1").remove();
    document.getElementById("info_box_triangle2").remove();
    document.getElementById("info_name1").remove();
    document.getElementById("info_name2").remove();
    document.getElementById("info_number1").remove();
    document.getElementById("info_number2").remove();
}

function addInfo(x, y, name, number, end_id) {
    var width = 50;
    var height = 80;
    var triangle_height = 20;
    var triangle_base = 40;
    var line_space = 30;
    var info_box = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    info_box.setAttribute("id","info_box"+end_id);
    info_box.setAttribute("x", x - width / 2);
    info_box.setAttribute("y", y - height - triangle_height);
    info_box.setAttribute("rx", 10);
    info_box.setAttribute("rx", 10);
    info_box.setAttribute("stroke", "purple");
    info_box.setAttribute("width", width);
    info_box.setAttribute("height", height);
    info_box.setAttribute("fill", "purple");
    document.getElementById("svg2").appendChild(info_box);

    var info_box_triangle = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
    info_box_triangle.setAttribute("id","info_box_triangle"+end_id);
    info_box_triangle.setAttribute("points", x + " " + y + " " + (x - triangle_base / 2) + " " + (y - triangle_height) + " " + (x + triangle_base / 2) + " " + (y - triangle_height));
    info_box_triangle.setAttribute("fill", "purple");
    info_box_triangle.setAttribute("stroke", "purple");
    document.getElementById("svg2").appendChild(info_box_triangle);

    //Migration from ... 
    var info_name = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    info_name.setAttribute("id","info_name"+end_id);
    info_name.setAttribute("y", y - triangle_height - height + line_space);
    info_name.setAttribute("stroke", "white");
    info_name.setAttribute("fill", "white");
    info_name.style.fontSize = "20px";
    document.getElementById("svg2").appendChild(info_name);

    var text = document.createTextNode("Migration from " + name + ":");
    info_name.appendChild(text);

    var text_size = info_name.getBBox().width;

    info_name.setAttribute("x", x - text_size / 2);

    //Number
    var info_number = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    info_number.setAttribute("id","info_number"+end_id);
    info_number.setAttribute("y", y - triangle_height - height + 2 * line_space);
    info_number.setAttribute("stroke", "white");
    info_number.setAttribute("fill", "white");
    info_number.style.fontSize = "20px";
    document.getElementById("svg2").appendChild(info_number);

    var text_number = document.createTextNode(number);
    info_number.appendChild(text_number);

    var text_size_number = info_number.getBBox().width;

    info_number.setAttribute("x", x - text_size_number / 2);


    info_box.setAttribute("width", text_size + 20);
    info_box.setAttribute("x", x - text_size / 2 - 10);
}


function countMigrations(Countries,coord1,coord2) {
    if (Countries.length == 0) {
        console.log("");
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var array = this.responseText.split(" ");
                addPlane();
                addPath(coord1[0], coord1[1], coord2[0], coord2[1]);
                launchPlaneOnPath();
                addInfo(coord1[0], coord1[1], country1_name, array[0],1);
                addInfo(coord2[0], coord2[1], country2_name, array[1],2);
            }
        }
        xmlhttp.open("GET", "includes/migrationrequest.php?q=" + Countries, true);
        xmlhttp.send();
    }
}

