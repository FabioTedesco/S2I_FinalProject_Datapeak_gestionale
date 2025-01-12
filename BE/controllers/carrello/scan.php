<?php
require '../../vendor/autoload.php';
require '../../core/db.php';
require '../../core/headers.php';

require '../../models/Prodotto.php';
require '../../models/Carrello.php';
require '../../models/Articolo.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $barcode = $data->barcode;
    $operatore_id = $data->operatore_id;
    $quantita = 1; // Quantità aggiunta per ogni scan

    $database = new Database();
    $db = $database->connect();

    $prodottoModel = new Prodotto($db);
    $carrelloModel = new Carrello($db);
    $articoloModel = new Articolo($db);

    // Recupera il prodotto dal magazzino
    $prodotto = $prodottoModel->getByBarcode($barcode);

    if (!$prodotto) {
        http_response_code(404);
        echo json_encode(['message' => 'Prodotto non trovato']);
        exit;
    }

    // Recupera il carrello attivo per l'operatore
    $carrelloAttivo = $carrelloModel->getCarrelloAttivo($operatore_id);

    if (!$carrelloAttivo) {
        // Crea un nuovo carrello se non esiste
        $nuovoCarrello = $carrelloModel->createCarrello($operatore_id);
        $carrello_id = $nuovoCarrello['id'];
    } else {
        $carrello_id = $carrelloAttivo['id'];
    }

    // Controlla la quantità attualmente presente nel carrello
    $quantitaInCarrello = $articoloModel->getQuantitaArticoloInCarrello($carrello_id, $prodotto['id']);

    // Verifica se la quantità richiesta è disponibile
    if (($quantitaInCarrello + $quantita) > $prodotto['giacenza']) {
        http_response_code(409);
        echo json_encode(['message' => 'Quantità non disponibile']);
        exit;
    }

    // Aggiungi l'articolo al carrello
    $articoloModel->aggiungiArticolo(
        $carrello_id,
        $prodotto['id'],
        $quantita,
        $prodotto['prezzoOriginale'],
        $prodotto['prezzoOutlet'],
        $prodotto['scontoProdotto'],
        $barcode
    );

    // Recupera l'articolo appena aggiunto
    $articoloAggiunto = $articoloModel->getArticoloAggiunto($carrello_id, $prodotto['id']);

    echo json_encode([
        'message' => 'Articolo aggiunto al carrello',
        'articolo' => $articoloAggiunto
    ]);
}
