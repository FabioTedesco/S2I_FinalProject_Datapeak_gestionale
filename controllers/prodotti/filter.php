<?php

require '../../core/db.php';
require '../../models/Prodotto.php';
require '../../core/headers.php';

// Instatiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate Prodotto object
$prodotti = new Prodotto($db);

// Get parameters from URL
$params = [
    'id' => isset($_GET['id']) ? $_GET['id'] : null,
    'nome' => isset($_GET['nome']) ? $_GET['nome'] : null,
    'barcode' => isset($_GET['barcode']) ? $_GET['barcode'] : null,
    'categoria' => isset($_GET['categoria']) ? $_GET['categoria'] : null,
    'taglia' => isset($_GET['taglia']) ? $_GET['taglia'] : null,
    'limit' => isset($_GET['limit']) ? $_GET['limit'] : null,
    'offset' => isset($_GET['offset']) ? $_GET['offset'] : null,
];

// prodotti filter query
$result = $prodotti->filter($params);
// Get row count
$num = $result->rowCount();

// Check if any products
if ($num > 0) {
    $prodotti_arr = array();
    $prodotti_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $prodotti_item = array(
            'id' => $id,
            'nome' => $nome,
            'descrizione' => $descrizione,
            'prezzoOriginale' => $prezzoOriginale,
            'prezzoOutlet' => $prezzoOutlet,
            'scontoProdotto' => $scontoProdotto,
            'barcode' => $barcode,
            'giacenza' => $giacenza,
            'categoria' => $categoria,
            'colore' => $colore,
            'taglia' => $taglia
        );

        // Push to "data"
        array_push($prodotti_arr['data'], $prodotti_item);
    }

    // Turn to JSON & output
    echo json_encode($prodotti_arr);
} else {
    echo json_encode(
        array('message' => 'Prodotti non trovati')
    );
}
