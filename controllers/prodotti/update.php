<?php

// Headers per le richieste CORS
header('Access-Control-Allow-Origin: http://localhost:5173'); // Specifica il dominio del frontend
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Access-Control-Allow-Headers');
header('Access-Control-Allow-Credentials: true'); // Se necessario per inviare cookie o credenziali

// Gestione richiesta preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


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
