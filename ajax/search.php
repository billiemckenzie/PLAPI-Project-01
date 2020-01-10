<?php
require_once("../conn.php");


// if post search is set, and is not blank, then make it $_POST["search"], otherwise, say it is false
$search = isset($_POST["search"]) && $_POST["search"] != "" ? $_POST["search"] : false;
$modelsearch = isset($_POST["modelsearch"]) && $_POST["modelsearch"] != "" ? $_POST["modelsearch"] : false;
$year = isset($_POST["year"]) && $_POST["year"] != 0 ? $_POST["year"] : false;

$search = $db->real_escape_string($search); //prevents mysqli injection attacks
$modelsearch = $db->real_escape_string($modelsearch);

if($search || $year || $modelsearch) {
    $search_sql = "SELECT * FROM cars
               WHERE nickname LIKE '%$search%' AND CONCAT_WS('', make, model) LIKE '%$modelsearch%'";
               

    if($year !=0){
        $search_sql .= " AND year = $year";
    }

} else {
    $search_sql = "SELECT * FROM cars";
}

$result = $db->query($search_sql);


$cars = array();
while ($row = $result->fetch_assoc() ){
    $cars[] = $row; // append row to the $cars array
}
$db->close(); // close connection when finished

echo json_encode($cars); // return results in JavaScript object notation (JS format)

?>

