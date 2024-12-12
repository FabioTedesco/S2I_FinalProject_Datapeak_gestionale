<?php
class User
{
    private $conn;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function login($username)
    {
        $query = "SELECT * FROM users WHERE username = :username";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUserByID($userID)
    {
        $query = "SELECT userID, username, role FROM users WHERE userID = :userID";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userID', $userID);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC); // Restituisce l'utente o false
    }

    // Crea un nuovo utente
    public function createUser($username, $passwordHash, $role)
    {
        $query = "INSERT INTO users (username,  password_hash, role) VALUES (:username, :password_hash, :role)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password_hash', $passwordHash);
        $stmt->bindParam(':role', $role);

        return $stmt->execute(); // Restituisce true se l'inserimento è riuscito
    }

    // Elimina un utente
    public function deleteUser($userID)
    {
        $query = "DELETE FROM users WHERE userID = :userID";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':userID', $userID);

        return $stmt->execute();
    }
}
