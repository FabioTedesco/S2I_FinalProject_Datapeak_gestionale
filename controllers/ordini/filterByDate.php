<?php

require '../../vendor/autoload.php';
require '../../core/db.php';
require '../../core/headers.php';
require '../../models/Ordine.php';

// Metodo principale
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Recupera i dati dalla richiesta
    $data = json_decode(file_get_contents("php://input"));

    // Valida i dati
    $startDate = isset($data->startDate) ? $data->startDate : null;
    $endDate = isset($data->endDate) ? $data->endDate : null;

    if (!$startDate) {
        http_response_code(400);
        echo json_encode(['message' => 'La data di inizio è obbligatoria']);
        exit;
    }

    // Connessione al database
    $database = new Database();
    $db = $database->connect();

    // Istanzia il modello Ordine
    $ordineModel = new Ordine($db);

    try {
        $ordini = $ordineModel->getOrdiniByDate($startDate, $endDate);

        if (empty($ordini)) {
            http_response_code(404);
            echo json_encode(['message' => 'Nessun ordine trovato nel range specificato']);
        } else {
            http_response_code(200);
            echo json_encode([
                'message' => 'Ordini trovati',
                'ordini' => $ordini,
            ]);
        }
    } catch (Exception $e) {
        // Gestione degli errori
        http_response_code(500);
        echo json_encode(['message' => 'Errore durante il recupero degli ordini', 'error' => $e->getMessage()]);
    }
}
