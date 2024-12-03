<?php

//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


include_once '../../core/db.php';
include_once '../../models/Prodotto.php';

//Instatiate DB & connect
$database = new Database();
$db = $database->connect();


//Instantiate Prodotto object
$prodotto = new Prodotto($db);

//Get data
$data = json_decode(file_get_contents("php://input"));

//Set ID to delete
$prodotto->id = $data->id;


//delete prodotto
if ($prodotto->delete()) {
    echo json_encode(
        array('message' => 'Prodotto deleted')
    );
} else {
    echo json_encode(
        array('message' => 'Prodotto  NOT deleted')
    );
}
