<?php
require '../../vendor/autoload.php';
require '../../core/db.php';
require '../../models/User.php';
require '../../core/headers.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;
$role = $data->role;

$passwordHash = password_hash($password, PASSWORD_BCRYPT);

$userModel = new User($db);

// Check if this is the first access
$firstAccess = $userModel->getAllUsers();
// var_dump($firstAccess);


if (is_array($firstAccess) && count($firstAccess) === 1 && $firstAccess[0]['username'] === 'root') {
    // If there is only one user and it is 'root', delete it
    $rootUserId = $firstAccess[0]['userID']; // Assuming 'id' is a key in the result
    if (!$userModel->deleteUser($rootUserId)) { // Call a delete method in your User model
        http_response_code(500);
        echo json_encode(['message' => 'Errore durante la cancellazione dell\'utente root']);
        exit;
    }
    echo json_encode(['message' => 'Root eliminato']);
}

// Create the new user
if ($userModel->createUser($username, $passwordHash, $role)) {
    echo json_encode(['message' => 'Utente registrato con successo']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Errore durante la registrazione']);
}
