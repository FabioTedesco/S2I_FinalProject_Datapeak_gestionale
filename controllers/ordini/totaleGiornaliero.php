<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../core/db.php';
include_once '../../models/Ordine.php';

// Instatiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate Ordine object
$ordine = new Ordine($db);

//get totale giornaliero
$result = $ordine->totaleGiornaliero();

echo json_encode($result);
