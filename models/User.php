<?php

class User
{
    private $conn;
    private $table = 'users';

    // Proprietà dell'utente
    public $userID;
    public $username;
    public $password_hash;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Metodo per ottenere un utente tramite username
    public function getUserByUsername($username)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE username = :username LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Metodo per registrare un nuovo utente 
    public function registerUser($username, $password)
    {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $query = "INSERT INTO " . $this->table . " (username, password_hash) VALUES (:username, :password_hash)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password_hash', $hashedPassword);
        return $stmt->execute();
    }
}
