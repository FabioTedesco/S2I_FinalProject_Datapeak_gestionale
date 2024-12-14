<?php
require '../../vendor/autoload.php';
require '../../middleware/authMiddleware.php';
require '../../core/db.php';
require '../../models/User.php';
require '../../core/headers.php';

// Autentica la richiesta
$decodedToken = authenticate();
$userID = $decodedToken->data->sub;

$database = new Database();
$db = $database->connect();

$userModel = new User($db);
$user = $userModel->getUserByID($userID);

if ($user) {
    echo json_encode(['message' => 'Accesso consentito', 'data' => $user]);
} else {
    http_response_code(404); // Not Found
    echo json_encode(['message' => 'Utente non trovato']);
}
