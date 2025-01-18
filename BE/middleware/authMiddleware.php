<?php
require '../../vendor/autoload.php';



define('JWT_SECRET', getenv('JWT_SECRET'));

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function authenticate()
{
    $headers = getallheaders();

    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['message' => 'Token non fornito']);
        exit;
    }

    $token = str_replace('Bearer ', '', $headers['Authorization']);

    try {
        $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['message' => 'Token non valido']);
        exit;
    }
}
