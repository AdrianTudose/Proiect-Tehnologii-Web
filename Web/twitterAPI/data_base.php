<?php

class MigrationDataBase
{

    private $servername = "localhost";
    private $dBUsername = "root";
    private $dBPassword = "";
    private $dBName = "humanmigration";
    private $conn;

    /**
     * Ne conectam la baza de date.
     */
    function __construct()
    {
        $this->conn = mysqli_connect($this->servername, $this->dBUsername, $this->dBPassword, $this->dBName);
        if (!$this->conn) {
            die("Connection failed : " . mysqli_connect_error());
        }
    }


    /**
     * Functie prin care verificam daca id tweetului exista deja in baza de date.
     * Daca exista nu il adaugam , altfel il adaugam.
     */
    function count_id($id)
    {
        $sql = "SELECT  COUNT(*)  AS 'count' FROM migrations WHERE tweet_id = ?";
        $stmt = mysqli_stmt_init($this->conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            return -1;
        } else {
            mysqli_stmt_bind_param($stmt, "s", $id);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $row = mysqli_fetch_assoc($result);
            return $row['count'];
        }
    }

    /**
     * Functie prin care inseram o migratie noua in baza de date.
     */
    function insert_migration($id_tweet, $countryS, $countryF, $data)
    {
        $sql = "INSERT INTO migrations VALUES(?,?,?,?)";
        $stmt = mysqli_stmt_init($this->conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            return -1;
        } else {
            mysqli_stmt_bind_param($stmt, "ssss", $id_tweet, $countryS, $countryF, $data);
            mysqli_stmt_execute($stmt);
            return 1;
        }
    }

    /**
     * Functie prin care numaram migratiile dintre doua tari date ca parametru
     */

    function count_migrations($countryS, $countryF)
    {
        $migration_from = 0 ;
        $migration_to = 0 ;
        $sql = "SELECT  COUNT(*)  AS 'count' FROM migrations WHERE trim(countryF) = ? AND trim(countryS) = ?";
        $stmt = mysqli_stmt_init($this->conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            return -1;
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $countryF, $countryS);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $row = mysqli_fetch_assoc($result);
            $migration_from = $row['count'];
        }

        $sql = "SELECT  COUNT(*)  AS 'count' FROM migrations WHERE trim(countryF) = ? AND trim(countryS) = ?";
        $stmt = mysqli_stmt_init($this->conn);
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            return -1;
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $countryS, $countryF);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $row = mysqli_fetch_assoc($result);
            $migration_to = $row['count'];
        }

        return $migration_from . ' ' . $migration_to;
    }

    /**
     * Functie prin care returnam un json cu toate migratiile din baza de date pentru a le trimite pe frontend(apel AJAX)
     */
    function migrations_json()
    {

        $sql = mysqli_query($this->conn, "SELECT CountryS,CountryF,Date FROM migrations");
        $rows = array();

        while ($r = mysqli_fetch_assoc($sql)) {
            $rows[] = $r;
        }

        return json_encode($rows);
    }
}
?>
