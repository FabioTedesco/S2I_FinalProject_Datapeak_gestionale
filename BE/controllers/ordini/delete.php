<?php

require '../../core/db.php';
require '../../core/headers.php';
require '../../models/Ordine.php';

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
