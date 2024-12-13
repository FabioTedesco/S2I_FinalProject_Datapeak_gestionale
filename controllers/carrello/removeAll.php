<?php

//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


include_once '../../core/db.php';
include_once '../../models/Articolo.php';

//Instatiate DB & connect
$database = new Database();
$db = $database->connect();


//Instantiate Articolo object
$articolo = new Articolo($db);

//Get data
$data = json_decode(file_get_contents("php://input"));

//delete Articolo
if ($articolo->removeAll($data->id)) {
    echo json_encode(
        array('message' => 'Articolo deleted')
    );
} else {
    echo json_encode(
        array('message' => 'Articolo  NOT deleted')
    );
}
