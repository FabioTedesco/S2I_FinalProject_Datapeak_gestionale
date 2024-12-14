<?php
require '../../core/headers.php';
require '../../core/db.php';
require '../../models/Ordine.php';

// Instatiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate Ordine object
$ordine = new Ordine($db);

//get totale giornaliero
$result = $ordine->totaleGiornaliero();

echo json_encode($result);
