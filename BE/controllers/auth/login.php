<?php
require '../../vendor/autoload.php';
require '../../models/User.php';
require '../../core/db.php';
require '../../core/headers.php';



define('JWT_ISSUER', getenv('JWT_ISSUER'));
define('JWT_AUDIENCE', getenv('JWT_AUDIENCE'));
define('JWT_EXPIRATION',  getenv('JWT_EXPIRATION'));
define('JWT_SECRET', getenv('JWT_SECRET'));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Debugging: Check the raw input
    error_log("Raw input: " . file_get_contents("php://input"));

    if (!$data || !isset($data->username) || !isset($data->password_hash)) {
        http_response_code(400); // Bad Request
        echo json_encode(['message' => 'Invalid input data']);
        exit();
    }

    $username = $data->username;
    $password = $data->password_hash;

    $database = new Database();
    $db = $database->connect();

    // Debugging: Check if the database connection is successful
    if (!$db) {
        http_response_code(500);
        echo json_encode(['message' => 'Database connection failed']);
        exit();
    }

    $userModel = new User($db);
    $user = $userModel->login($username);

    // Debugging: Check if the user is found
    if (!$user) {
        error_log("User not found for username: $username");
    }

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
} else {
    // Debugging: Log invalid request methods
    error_log("Invalid request method: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405); // Method Not Allowed
    echo json_encode(['message' => 'Method not allowed']);
}
