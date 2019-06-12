/**
 * Incarcam continutul , doar dupa ce a fost incarcata toata pagina si parsata.
 */
document.addEventListener('DOMContentLoaded', function (event) {
    console.log('DOM fully loaded and parsed');
    reciveNews();
});

/**
 * Functie prin care facem uppercase la prima litera dintr-un cuvant.
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Functie prin care primim de pe backend un JSON cu toate migratiile din baza de date.
 */
function reciveNews() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            /**
             * Primim obiectul de tip json in this.responseText , il transformam in array si afisam continutul in 
             * pagina.
             */
            var iterator = 0;
            var jsonData = JSON.parse(this.responseText);
            jsonData.forEach(function (news) {

                var div = document.createElement("div");
                div.classList.add('container');
                document.getElementById("news").appendChild(div);
                var para = document.createElement("P");  
                var date = news.Date.replace("+0000","");
                news.CountryS = capitalizeFirstLetter(news.CountryS.trim());
                news.CountryF = capitalizeFirstLetter(news.CountryF.trim());
                var string = "There was been a migration between " + news.CountryS + ' - ' + news.CountryF
                 + ' at ' + date;  
                
                var t = document.createTextNode(string);  
                para.appendChild(t);       
                div.appendChild(para);
            });

        }
    }
    xmlhttp.open("GET", "../includes/newsrequest.php", true);
    xmlhttp.send();

}