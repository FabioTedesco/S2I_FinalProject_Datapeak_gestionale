<?php

//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
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

//Set ID to update
$prodotto->id = $data->id;
$prodotto->scontoProdotto = $data->scontoProdotto;
$prodotto->giacenza = $data->giacenza;
$prodotto->prezzoOriginale = $data->prezzoOriginale;




//update Prodotto
if ($prodotto->update()) {
    echo json_encode(
        array('message' => 'Prodotto updated')
    );
} else {
    echo json_encode(
        array('message' => 'Prodotto  NOT updated')
    );
}
