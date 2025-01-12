<?php

require '../../core/db.php';
require '../../models/Prodotto.php';
require '../../core/headers.php';

//Instatiate DB & connect
$database = new Database();
$db = $database->connect();


//Instantiate object
$prodotto = new Prodotto($db);

//Get raw data
$data = json_decode(file_get_contents("php://input"));

$prodotto->nome = $data->nome;
$prodotto->prezzoOriginale = $data->prezzoOriginale;
$prodotto->scontoProdotto = $data->scontoProdotto;
$prodotto->barcode = $data->barcode;
$prodotto->giacenza = $data->giacenza;
$prodotto->categoria = $data->categoria;
$prodotto->colore = $data->colore;
$prodotto->taglia = $data->taglia;


// Verifica se il prodotto esiste già (per nome o barcode)
if ($prodotto->exists()) {
    http_response_code(409);
    echo json_encode(
        array('message' => 'Prodotto esistente, non può essere creato di nuovo. Verificare nome o barcode.')
    );
    exit();
}

//Create prodotto
if ($prodotto->create()) {
    echo json_encode(
        array('message' => 'prodotto creato')
    );
} else {
    echo json_encode(
        array('message' => 'prodotto  NOT created')
    );
}
