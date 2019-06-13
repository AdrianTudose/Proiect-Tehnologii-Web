<?php
/**
 * Folosim clasa chartrequest ca sa incarcam continutul paginii Chart
 * Apelam acest script de pe frontend cu ajutorul unui apel Ajax.
 */
require "../twitterAPI/data_base.php";
class chartrequest
{

    /**
     * Functie care ne ajuta pentru a verifica daca este o Tara valida atunci cand preluam informatii
     * din API de la twitter.
     * Ne ajutam de un json local , in care avem toate tarile (242).
     * Functia va returna 1 daca este o Tara valida , altfel va returna 0.
     */
    function verifyCountry($twitter_country)
    {
        $json = file_get_contents("../twitterAPI/countries.json");
        $array = json_decode($json, true);
        foreach ($array as $country) {
            if (strtolower($twitter_country) == strtolower($country["name"])) {
                return 1;
            }
        }
        return 0;
    }

    function chartInfo()
    {
        $json_local = file_get_contents("dates.json");
        $Countries = $_REQUEST['q'];
        $array_country = explode("-", $Countries);
        $Object = new MigrationDataBase();

        if ($this->verifyCountry($array_country[0]) && $this->verifyCountry($array_country[1])) {
            $array_local = json_decode($json_local, true);

            $json_db = $Object->migrations_month($array_country[0], $array_country[1]);

            $array_country = json_decode($json_db, true);

            if (isset($array_country)) {
                foreach ($array_country as $i) {

                    foreach ($array_local as $key => $j) {
                        if (($j['luna'] == $i['luna']) && ($j['an'] == $i['an'])) {
                            $array_local[$key]['numar'] = $i['numar'];
                        }
                    }
                }
            }

        /*$json_db_reverse = $Object-> migrations_month($array_country[1],$array_country[0]);

        $array_country_reverse = json_decode($json_db_reverse, true);
        $array_local_reverse = $array_local;

        foreach ($array_country_reverse as $i) {
           
            foreach($array_local_reverse as $key => $j)
            {
                if(($j['luna'] == $i['luna']) && ($j['an'] == $i['an']))
                {
                    $array_local_reverse[$key]['numar'] = $i['numar'];
                }
            }
        }*/

            
            echo json_encode($array_local);
        }
        else echo "Tari invalide";
    }
}

$Object = new chartrequest();
$Object->chartInfo();
