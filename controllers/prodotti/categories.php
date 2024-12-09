<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../core/db.php';
include_once '../../models/Prodotto.php';

// Instatiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate Prodotto object
$prodotti = new Prodotto($db);

// Chiamata al metodo per ottenere le categorie
$result = $prodotti->getCategories();

// Verifica se ci sono categorie
$num = $result->rowCount();

if ($num > 0) {
    $categories = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $categories[] = $row['categoria'];
    }

    // Output delle categorie in formato JSON
    echo json_encode($categories);
} else {
    echo json_encode([]);
}
