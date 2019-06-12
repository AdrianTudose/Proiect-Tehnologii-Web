
<?php
/**
 * Folosim clasa newsrequest ca sa incarcam continutul paginii News , cu migratiile care s-au efectuat 
 * in baza de date . Apelam acest script de pe frontend cu ajutorul unui apel Ajax.
 */
require "../twitterAPI/data_base.php";
class newsrequest
{

    function sendNews()
    {
        $Object = new MigrationDataBase();

        echo $Object->migrations_json();
    }
}

$Object = new newsrequest();;
$Object->sendNews();
?>