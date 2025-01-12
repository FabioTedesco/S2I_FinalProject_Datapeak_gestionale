<?php
require '../../core/headers.php';
require '../../core/db.php';
require '../../models/Prodotto.php';

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
