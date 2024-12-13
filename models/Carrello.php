<?php


class Carrello
{
    private $conn;
    private $table = 'carrelli';

    // Proprietà della classe Carrello
    public $id;
    public $operatore_id;
    public $totaleComplessivo;
    public $ivaTotale;
    public $created_at;
    public $updated_at;
    public $status;



    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function createCarrello($operatore_id)
    {
        $query = 'INSERT INTO '
            . $this->table . ' (operatore_id, created_at, updated_at, status) VALUES (:operatore_id, NOW(), NOW(), "attivo")';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':operatore_id', $operatore_id);
        $stmt->execute();
        return [
            'id' => $this->conn->lastInsertId(),
            'status' => $this->status
        ];
    }

    public function getCarrelloAttivo($operatore_id)
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE operatore_id = :operatore_id AND status = "attivo" ORDER BY created_at DESC LIMIT 1';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':operatore_id', $operatore_id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateStatus($id)
    {
        $query = 'UPDATE ' . $this->table . ' SET status = "chiuso" WHERE id = :id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
    }
}
