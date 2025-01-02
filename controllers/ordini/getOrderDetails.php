<?php
require '../../models/Articolo.php';
require '../../core/db.php';
require '../../core/headers.php';

//Instatiate DB & connect
$database = new Database();
$db = $database->connect();

//Instantiate Articolo object
$articoli = new Articolo($db);

//Get data
$data = json_decode(file_get_contents("php://input"));

// Verifica se $data è stato ricevuto correttamente
if (!$data || !isset($data->carrello_id)) {
    http_response_code(400); // Bad Request
    echo json_encode(['message' => 'ID carrello mancante o dati non validi']);
    exit();
}



// Assegna il valore di carrello_id
$carrello_id = $data->carrello_id;

// Recupera gli articoli e il prezzo finale
$result = $articoli->getArticoli($carrello_id);


if (count($result) > 0) {
    // Itera e costruisci una risposta dettagliata
    $quantitaTotale = array_sum(array_column($result, 'quantita')); // Somma tutte le quantità se necessario
    echo json_encode([
        'articoli' => $result,

    ]);
} else {
    http_response_code(200); // Not Found
    echo json_encode(['message' => 'Articoli non trovati']);
}
