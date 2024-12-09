<?php

session_start();


//Headers
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST,  OPTIONS');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

// Gestione delle richieste OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../core/db.php'; // Connessione al database
require_once '../../models/User.php'; // Importa il modello utente

$database = new Database();
$db = $database->connect();

// Prendi i dati dalla richiesta
$data = json_decode(file_get_contents("php://input"));



if (!empty($data->username) && !empty($data->password)) {
    $userModel = new User($db);
    $user = $userModel->getUserByUsername($data->username);

    if ($user && password_verify($data->password, $user['password_hash'])) {
        // Creazione sessione utente
        $_SESSION['user_id'] = $user['userID'];  // Cambia 'id' in 'userID' come nel DB
        $_SESSION['username'] = $user['username'];

        echo json_encode([
            "message" => "Login effettuato con successo.",
            "user" => [
                "userID" => $user['userID'],  // Cambia 'id' in 'userID'
                "username" => $user['username']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Credenziali non valide."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Dati incompleti."]);
}
