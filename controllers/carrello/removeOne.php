<?php
require '../../models/Articolo.php';
require '../../core/db.php';
require '../../core/headers.php';



//Instatiate DB & connect
$database = new Database();
$db = $database->connect();


//Instantiate Prodotto object
$articolo = new Articolo($db);

//Get data
$data = json_decode(file_get_contents("php://input"));

//update articolo
if ($articolo->removeOne($data->id)) {

    echo json_encode(
        array('message' => 'Articolo updated')
    );
} else {
    echo json_encode(
        array('message' => 'Articolo  NOT updated')
    );
}
