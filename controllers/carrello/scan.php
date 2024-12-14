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
    $quantita = 1;

    $database = new Database();
    $db = $database->connect();

    $prodottoModel = new Prodotto($db);
    $carrelloModel = new Carrello($db);
    $articoloModel = new Articolo($db);

    $prodotto = $prodottoModel->getByBarcode($barcode);

    if (!$prodotto) {
        http_response_code(404);
        echo json_encode(['message' => 'Prodotto non trovato']);
        exit;
    } else {
    }

    if ($prodotto['giacenza'] < $quantita) {
        http_response_code(400);
        echo json_encode(['message' => 'Quantità non disponibile',]);
        exit;
    }


    $carrelloAttivo = $carrelloModel->getCarrelloAttivo($operatore_id);

    if (!$carrelloAttivo) {
        $nuovoCarrello = $carrelloModel->createCarrello($operatore_id);
        $carrello_id = $nuovoCarrello['id'];
    } else {
        $carrello_id = $carrelloAttivo['id'];
    }


    $articoloModel->aggiungiArticolo(
        $carrello_id,
        $prodotto['id'],
        $quantita,
        $prodotto['prezzoOriginale'],
        $prodotto['prezzoOutlet'],
        $prodotto['scontoProdotto'],
        $barcode
    );

    echo json_encode(['message' => 'Articolo aggiunto al carrello']);
}
