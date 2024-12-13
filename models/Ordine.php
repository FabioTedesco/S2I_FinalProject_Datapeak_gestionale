<?php


class Ordine
{
    private $conn;
    private $table = 'ordini';

    // Proprietà della classe Carrello
    public $id;
    public $operatore_id;
    public $carrello_id;
    public $totale;
    public $created_at;
    public $metodoPagamento;
    public $emailCliente;



    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function createOrdine($operatore_id, $carrello_id, $totale, $metodoPagamento, $emailCliente)
    {
        $query = "INSERT INTO " . $this->table . " (operatore_id, carrello_id, totale, metodoPagamento, emailCliente) VALUES (:operatore_id, :carrello_id, :totale, :metodoPagamento, :emailCliente)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':operatore_id', $operatore_id);
        $stmt->bindParam(':carrello_id', $carrello_id);
        $stmt->bindParam(':totale', $totale);
        $stmt->bindParam(':metodoPagamento', $metodoPagamento);
        $stmt->bindParam(':emailCliente', $emailCliente);

        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            return true;
        } else {
            return false;
        }
    }
}
