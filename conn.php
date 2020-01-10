<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$db_servername = "localhost";
$db_username   = "root";
$db_password   = "root";
$db_name       = "PLAPI_Project01";

// Create Databse Object and connect 
$db = new mysqli($db_servername, $db_username, $db_password, $db_name);

// Check connection
if($db->connect_error) {
    die("Connection Failed: " .$db->connect_error);
}

?>