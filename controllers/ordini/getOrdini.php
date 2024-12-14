<?php

require '../../core/db.php';
require '../../models/Ordine.php';
require '../../core/headers.php';

// Instatiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate Ordine object
$ordini = new Ordine($db);

$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

// getOrdini query
$result = $ordini->getOrdini($offset);
// Get row count
$num = $result->rowCount();

// Check if any ordini
if ($num > 0) {
    $ordini_arr = array();
    $ordini_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $ordini_item = array(
            'id' => $id,
            'operatore_id' => $operatore_id,
            'carrello_id' => $carrello_id,
            'totale' => $totale,
            'created_at' => $created_at,
            'metodoPagamento' => $metodoPagamento,
            'emailCliente' => $emailCliente,

        );

        // Push to "data"
        array_push($ordini_arr['data'], $ordini_item);
    }

    // Turn to JSON & output
    echo json_encode($ordini_arr);
} else {
    echo json_encode(
        array('message' => 'Ordini non trovati')
    );
}
