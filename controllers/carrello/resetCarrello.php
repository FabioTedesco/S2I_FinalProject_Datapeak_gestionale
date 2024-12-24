<?php
require '../../vendor/autoload.php';
require '../../models/Carrello.php';
require '../../core/db.php';
require '../../core/headers.php';

//Instatiate DB & connect
$database = new Database();
$db = $database->connect();


//Instantiate Carrello object
$carrello = new Carrello($db);

//Get data
$data = json_decode(file_get_contents("php://input"));


//delete carrello
if ($carrello->reset($data->id)) {
    echo json_encode(
        array('message' => 'Reset riuscito')
    );
} else {
    echo json_encode(
        array('message' => 'Reset NOT riuscito')
    );
}
