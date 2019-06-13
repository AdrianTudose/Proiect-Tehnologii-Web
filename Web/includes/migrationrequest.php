
<?php

require "../twitterAPI/data_base.php";
class requests
{

    function countMigrations()
    {
        $Countries = $_REQUEST['q'];
        $array_country = explode("-", $Countries);
        $Object = new MigrationDataBase();
        $result = $Object->count_migrations($array_country[0], $array_country[1]);
        echo $result;
    }
}

$Object = new requests;
$Object->countMigrations();
?>