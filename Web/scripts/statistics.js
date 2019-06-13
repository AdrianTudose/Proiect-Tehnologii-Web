

/*document.getElementById('formular').onsubmit = function () {
    var firstC = document.getElementById('firstC').value;
    var lastC = document.getElementById('secondC').value;
    var countries = firstC + '-' + lastC;
    displayChart(countries);
};*/

document.addEventListener('DOMContentLoaded', function (event) {
    var url_string = document.URL; //window.location.href
    var url = new URL(url_string);
    var firstC = url.searchParams.get("firstCountry");
    var lastC = url.searchParams.get("secondCountry");
    var countries = firstC + '-' + lastC;
    construct_urls(url_string,firstC,lastC);
    if(firstC!=null && lastC!=null) displayChart(countries);
});


function displayChart(Countries) {
    if (Countries.length == 0) {
        console.log("");
        return;
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == "Tari invalide") {
                    alert("Introdu 2 tari valide !");
                }
                else {
                    var dates = [];
                    var numbermigrations = [];
                    console.log(this.responseText);
                    var jsonData = JSON.parse(this.responseText);


                    jsonData.forEach(function (data) {
                        var string = data.luna + data.an;
                        dates.push(string);
                        numbermigrations.push(data.numar);
                    });

                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: dates,
                            datasets: [{
                                label: 'Number of Migrations',
                                backgroundColor: 'rgba(1, 50, 67, 0.5)',
                                borderColor: 'rgb(1, 50, 67)',
                                data: numbermigrations,
                                opacity: 0.5,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                }
            }
        }
        xmlhttp.open("GET", "../includes/chartrequest.php?q=" + Countries, true);
        xmlhttp.send();
    }
}

function downloadPDF() {
    // only jpeg is supported by jsPDF
    var imgData = document.getElementById("myChart").toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF('landscape');
  
    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save("download.pdf");
  }

function construct_urls(url,firstC,lastC) {
    url = url.substr(7);
    var facebook = "https://facebook.com/sharer/sharer.php?u=http%3A%2F%2F"+ url +"%2Fpages%2Fstatistics.php";
    var twitter = href="https://twitter.com/intent/tweet/?text=HumanMigrationWebReporter&amp;url=http%3A%2F%2F79.112.48.92%2Fpages%2Fstatistics.php%3FfirstCountry%3D"+ firstC+"%26secondCountry%3D" +lastC;
    document.getElementById("share-facebook").setAttribute("href",facebook);
    document.getElementById("share-twitter").setAttribute("href",twitter);
}