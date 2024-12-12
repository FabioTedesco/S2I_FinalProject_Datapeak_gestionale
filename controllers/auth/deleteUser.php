<?php

require '../../vendor/autoload.php';
include_once '../../core/db.php';
include_once '../../models/User.php';

//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

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
