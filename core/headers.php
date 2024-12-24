<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Specifica l'origine del frontend
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Permetti metodi HTTP
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"); // Permetti headers personalizzati
header("Content-Type: application/json; charset=UTF-8"); // Risposta in JSON
header("Access-Control-Allow-Credentials: true"); // Permetti credenziali (se necessario)

// Gestione delle richieste OPTIONS (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
