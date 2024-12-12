<?php
require '../../vendor/autoload.php';
include_once '../../core/db.php';
include_once '../../models/User.php';

use Firebase\JWT\JWT;




if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $username = $data->username;
    $password = $data->password_hash;

    $database = new Database();
    $db = $database->connect();

    $userModel = new User($db);
    $user = $userModel->login($username);

    if ($user && password_verify($password, $user['password_hash'])) {
        $payload = [
            'iss' => JWT_ISSUER,
            'aud' => JWT_AUDIENCE,
            'iat' => time(),
            'nbf' => time(),
            'exp' => time() + JWT_EXPIRATION,
            'data' => [
                'sub' => $user['userID'],
                'username' => $user['username'],
                'role' => $user['role']
            ]
        ];


        $jwt = \Firebase\JWT\JWT::encode($payload, JWT_SECRET, 'HS256');
        echo json_encode([
            'token' => $jwt,
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['message' => 'Credenziali non valide']);
    }
}
