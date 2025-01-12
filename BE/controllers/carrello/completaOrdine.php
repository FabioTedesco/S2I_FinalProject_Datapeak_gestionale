<?php
require '../../vendor/autoload.php';
require '../../models/Carrello.php';
require '../../models/Articolo.php';
require '../../models/Prodotto.php';
require '../../models/Ordine.php';
require '../../core/db.php';
require '../../core/headers.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $operatore_id = $data->operatore_id;
    $metodoPagamento = $data->metodoPagamento;
    $emailCliente = $data->emailCliente;

    $database = new Database();
    $db = $database->connect();

    $carrelloModel = new Carrello($db);
    $articoloModel = new Articolo($db);
    $prodottoModel = new Prodotto($db);
    $ordine = new Ordine($db);


    // Verifica se il carrello esiste
    $carrello = $carrelloModel->getCarrelloAttivo($operatore_id);
    if (!$carrello) {
        http_response_code(404);
        echo json_encode(['message' => 'Carrello non trovato']);
        exit;
    }

    // Calcola totale e totaleIva
    $totali = $articoloModel->calcolaTotaleCarrello($carrello['id']);

    $totaleCarrello = $totali['totaleCarrello'];
    $totaleIva = $totali['totaleIva'];

    //aggiorna la quantità dei prodotti
    $articoli = $articoloModel->getArticoli($carrello['id']);

    foreach ($articoli as $articolo) {
        $prodottoModel->updateQuantita($articolo['prodotto_id'], $articolo['quantita']);
    }

    // Crea l'ordine
    $ordine->createOrdine($operatore_id, $carrello['id'],  $totaleCarrello, $totaleIva, $metodoPagamento, $emailCliente);

    // Aggiorna lo stato del carrello
    $carrelloModel->updateStatus($carrello['id']);


    echo json_encode([
        'message' => 'Ordine confermato',
        'totaleCarrello' => $totaleCarrello,
        'totaleIva' => $totaleIva,
        'Ordine creato' => $ordine->id
    ]);
}
