<?php
require '../../models/Articolo.php';
require '../../core/db.php';
require '../../vendor/autoload.php';
require '../../core/headers.php';

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
