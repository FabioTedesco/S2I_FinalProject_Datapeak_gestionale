<?php

//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


include_once '../../core/db.php';
include_once '../../models/Totali.php';
include_once '../../models/Ordine.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $database = new Database();
    $db = $database->connect();

    $totali = new Totali($db);
    $incassoTotale = new Ordine($db);

    // Calcola il totale giornaliero
    $totaleGiornaliero = $incassoTotale->totaleGiornaliero();

    // Chiusura cassa
    $totali->chiusuraCassa($totaleGiornaliero);



    echo json_encode([
        'message' => 'Cassa chiusa con successo',
    ]);
}
