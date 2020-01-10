<?php

require_once("../conn.php");

// if is isset
// delete from database
// return success message
$car_id = (isset($_POST["id"])) ? intval($_POST["id"]) : false;

if($car_id) {
    $delete_sql = "DELETE FROM cars WHERE id = $car_id";
    $db->query($delete_sql);

    echo 'success 👽';
}

?>
