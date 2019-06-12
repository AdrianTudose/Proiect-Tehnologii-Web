<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Contact Us</title>
    <link rel="stylesheet" type="text/css" href="../css/formstyle.css">
    <link rel="stylesheet" type="text/css" href="../css/main.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <script src="../scripts/menu.js"></script>
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
            <li onclick="location.href='statistics.php'"><i class="far fa-chart-bar"></i>Statistics</li>
            <li><i class="far fa-newspaper"></i>News</li>
            <li onclick="location.href='form.php'"><i class="fa fa-address-book"></i>Contact</li>
        </ul>
    </div>

    <div class="container">
        <div class="inner">
            <div class="panel panel-left">
                <h2>Human Migration Web Reporter</h2>
                <p>This application displays information about migrations across the globe.</p>
                <p>We use Twitter API
                    to take informations about users migrations.You can share a tweet with this format
                    #HumanMigrationReporter Country - Country ,and we will display your migration
                    on our map.You can also view statistics on when these migrations were made.</p>
                <p>If you want you can export the informations about migrations in PDF , HTML , JSON.</p>
                <p>We will have a news page with the migrations that have been made over the past 7 days and their data.</p>
                <img src="../images/migration.png" alt="Smiley face" class="migrationImg">
            </div>
            <div class="panel panel-right">
                <div class="panel-content">
                    <div class="form">
                        <h1>Contact Us</h1>
                        <div class="group">
                            <input type="text" required>
                            <span class="highlight"></span>
                            <label>Your name</label>
                        </div>
                        <div class="group">
                            <input type="text" required>
                            <span class="highlight"></span>
                            <label>Your email</label>
                        </div>
                        <div class="group">
                            <input type="text" required>
                            <span class="highlight"></span>
                            <label>Your message</label>
                        </div>
                        <a class="send-btn">Send</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="menu"></div>
</body>

</html>