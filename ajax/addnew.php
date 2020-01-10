<?php
require_once("../conn.php");

$car_make_input = isset($_POST["make"]) && $_POST["make"] != "" ? $_POST["make"] : false;
$car_model_input = isset($_POST["model"]) && $_POST["model"] != "" ? $_POST["model"] : false;
$car_year_input = isset($_POST["year"]) && $_POST["year"] != "" ? $_POST["year"] : false;
$car_nickname_input = isset($_POST["nickname"]) && $_POST["nickname"] != "" ? $_POST["nickname"] : false;


if($car_make_input || $car_model_input || $car_year_input || $car_nickname_input) {
    $new_car = "INSERT INTO cars (make, model, year, nickname) VALUES ('$car_make_input', '$car_model_input', '$car_year_input', '$car_nickname_input')";      
} 

$result = $db->query($new_car);

?>