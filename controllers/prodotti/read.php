<?php

require '../../core/db.php';
require '../../models/Prodotto.php';
require '../../core/headers.php';

// Instatiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate Prodotto object
$prodotti = new Prodotto($db);

$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;


// prodotti read query
$result = $prodotti->read($offset);
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
