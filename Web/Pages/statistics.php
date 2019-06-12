<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Contact Us</title>
    <link rel="stylesheet" type="text/css" href="../css/statistics.css">
    <link rel="stylesheet" type="text/css" href="../css/main.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <script src="../scripts/menu.js"></script>
    <script src="../scripts/statistics.js"></script>
</head>

<body>

    <div id="MenuButton" onclick="menu_function()">
        <div id="MenuButtonLine1"></div>
        <div id="MenuButtonLine2"></div>
        <div id="MenuButtonLine3"></div>
    </div>
    <div id="MenuBar">
        <ul>
            <li onclick="location.href='../index.php'"><i class="fas fa-map"></i>Map</li>
            <li><i class="far fa-chart-bar"></i>Statistics</li>
            <li><i class="far fa-newspaper"></i>News</li>
            <li onclick="location.href='form.php'"><i class="fa fa-address-book"></i>Contact</li>
        </ul>
    </div>

    <div id="content-container">
        <div id="content">
            <object type="image/svg+xml" data="../svg/chart.svg" width="300px" height="300px">
                Your browser does not support SVG
            </object>
        </div>
    </div>
</body>

</html>