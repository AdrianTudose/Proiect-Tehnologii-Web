<?php
require "twitter/autoload.php";
require "data_base.php";
use Abraham\TwitterOAuth\TwitterOAuth;

/**
 * Preluarea datelor cu ajutorul Twitter API cautand dupa #HumanMigrationReporter
 */
class MigrattionSearch
{

    private $consumer = "";
    private $consumersecret = "";
    private $accesstoken = "";
    private $secrettoken =  "";
    private $twitter;

    /**
     * In constructor ne conectm la Twitter API cu ajutorul , bibliotecii TwitterOAuth.
     */
    function __construct()
    {
        $this->twitter = new TwitterOAuth($this->consumer, $this->consumersecret, $this->accesstoken, $this->secrettoken);
    }

    /**
     * Functie in care cautam toate tweeturile cu tagul #HumanMigrationReporter.
     */
    function search()
    {
        $statuses = $this->twitter->get('search/tweets', array('q' => '#HumanMigrationReporter'));
        return $statuses;
    }

    /**
     * Functie in care preluam informatiile luate din functia search() si le transformam
     * intr-un array asociativ.
     */
    function transform_into_array($statuses)
    {
        $array = json_decode(json_encode($statuses, JSON_PRETTY_PRINT), True);
        return $array;
    }


    /**
     * Functie care ne ajuta pentru a verifica daca este o Tara valida atunci cand preluam informatii
     * din API de la twitter.
     * Ne ajutam de un json local , in care avem toate tarile (242).
     * Functia va returna 1 daca este o Tara valida , altfel va returna 0.
     */
    function verifyCountry($twitter_country)
    {
        $json = file_get_contents("countries.json");
        $array = json_decode($json, true);
        foreach ($array as $country) {
            if (strtolower($twitter_country) == strtolower($country["name"])) {
                return 1;
            }
        }
        return 0;
    }


    /**
     * Functie in care parsam vectorul "statuses" si adaugam in baza de date migratia 
     * daca nu a fost deja adaugata.
     * Trebuie vazut daca putem accesa data de nastere a utilizatorului.
     */
    function parse($array)
    {
        $number_inserted = 0;
        $Database = new MigrationDataBase();
        foreach ($array["statuses"] as $tweets) {
            //Facem explode pe text dupa #HumanMigrationReporter , si o sa avem doar migratia in $splithashtag[0] .
            $splithashtag = explode("#HumanMigrationReporter", $tweets['text']);

            if (isset($splithashtag[0])) {

                //Facem split pe textul ramas dupa '-' . In verify_country[0] ar trebui sa avem prima tara
                //iar in verify_country[1] a doua tara.
                $verify_country = explode("-", $splithashtag[0]);

                //Verificam daca sunt tari valide , daca sunt tari valide si nu le-am adaugat deja in baza de date
                //actualizam baza de date cu noua Migrare.

                if ($this->verifyCountry(trim($verify_country[0])) == 1 && $this->verifyCountry(trim($verify_country[1])) == 1) {
                    if ($Database->count_id($tweets['id_str']) == 0) {
                        $Database->insert_migration($tweets['id_str'], strtolower($verify_country[0]), strtolower($verify_country[1]), $tweets['created_at']);
                        $number_inserted++;
                    }
                }
            }

            if(isset($splithashtag[1])){
                //Facem split pe textul ramas dupa '-' . In verify_country[0] ar trebui sa avem prima tara
                //iar in verify_country[1] a doua tara.
                $verify_country = explode("-", $splithashtag[1]);

                //Verificam daca sunt tari valide , daca sunt tari valide si nu le-am adaugat deja in baza de date
                //actualizam baza de date cu noua Migrare.

                if ($this->verifyCountry(trim($verify_country[0])) == 1 && $this->verifyCountry(trim($verify_country[1])) == 1) {
                    if ($Database->count_id($tweets['id_str']) == 0) {
                        $Database->insert_migration($tweets['id_str'], strtolower($verify_country[0]), strtolower($verify_country[1]), $tweets['created_at']);
                        $number_inserted++;
                    }
                }
            }
        }
        return $number_inserted;
    }


    /**
     * Functie care ne ajutam sa numaram cate tweeturi primim de la API.
     */
    function countTweets($array)
    {
        $result = 0;
        foreach ($array["statuses"] as $tweets)
            $result++;
        return $result;
    }
}

$Object = new MigrattionSearch();
$result = $Object->transform_into_array($Object->search());
echo $Object->parse($result);

?>