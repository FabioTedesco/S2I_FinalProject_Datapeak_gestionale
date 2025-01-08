<?php

require '../../core/db.php';
require '../../models/Totali.php';
require '../../models/Ordine.php';
require '../../core/headers.php';


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
        'totale' => $totaleGiornaliero
    ]);
}
