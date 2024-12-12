<?php

require '../../vendor/autoload.php';
include_once '../../core/db.php';
include_once '../../models/User.php';

//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

//Instatiate DB & connect
$database = new Database();
$db = $database->connect();


$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;
$role = $data->role;

$passwordHash = password_hash($password, PASSWORD_BCRYPT);

$userModel = new User($db);
if ($userModel->createUser($username, $passwordHash, $role)) {
    echo json_encode(['message' => 'Utente registrato con successo']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Errore durante la registrazione']);
}
