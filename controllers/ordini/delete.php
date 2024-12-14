<?php

//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


include_once '../../core/db.php';
include_once '../../models/Ordine.php';

//Instatiate DB & connect
$database = new Database();
$db = $database->connect();


//Instantiate Ordine object
$ordine = new Ordine($db);

//Get data
$data = json_decode(file_get_contents("php://input"));


//delete ordine
if ($ordine->deleteOrdine($data->id)) {
    echo json_encode(
        array('message' => 'Ordine deleted')
    );
} else {
    echo json_encode(
        array('message' => 'Ordine NOT deleted')
    );
}
