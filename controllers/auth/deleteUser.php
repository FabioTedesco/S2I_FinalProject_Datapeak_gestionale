<?php
require '../../vendor/autoload.php';
require '../../core/db.php';
require '../../models/User.php';
require '../../core/headers.php';

//Instatiate DB & connect
$database = new Database();
$db = $database->connect();

//Instantiate Prodotto object
$userModel = new User($db);

//Get data
$data = json_decode(file_get_contents("php://input"));
$userID = $data->id;

if ($userModel->deleteUser($userID)) {
    echo json_encode(['message' => 'Utente cancellato con successo']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Errore durante la cancellazione']);
}
