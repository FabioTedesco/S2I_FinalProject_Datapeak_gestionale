<?php

// Headers per le richieste CORS
header('Access-Control-Allow-Origin: http://localhost:5173'); // Specifica il dominio del frontend
header('Content-Type: application/json');
header('Access-Control-Allow-Methods:  PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Access-Control-Allow-Headers');


// Gestione richiesta preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


include_once '../../core/db.php';
include_once '../../models/Articolo.php';

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
