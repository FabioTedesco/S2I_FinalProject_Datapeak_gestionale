<?php


class Ordine
{
    private $conn;
    private $table = 'ordini';

    // Proprietà della classe Carrello = campi della tabella
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

    public function getOrdini($offset)
    {
        $query = "SELECT * FROM " . $this->table . " ORDER BY created_at DESC LIMIT 30";

        if (!empty($offset)) {

            $query .= ' OFFSET ' . $offset;
        }

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function deleteOrdine($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    public function getOrdiniByDate($startDate, $endDate = null)
    {
        // Imposta la data di fine a oggi se non è fornita
        if ($endDate === null) {
            $endDate = date('Y-m-d 23:59:59');
        }

        $query = "SELECT * FROM " . $this->table . " WHERE created_at BETWEEN :startDate AND :endDate ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':startDate', $startDate);
        $stmt->bindParam(':endDate', $endDate);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function totaleGiornaliero()
    {

        $startDate = date('Y-m-d 00:00:00');
        $endDate = date('Y-m-d 23:59:59');

        $query = "SELECT SUM(totale) AS totaleGiornaliero FROM " . $this->table . " WHERE created_at BETWEEN :startDate AND :endDate";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':startDate', $startDate);
        $stmt->bindParam(':endDate', $endDate);

        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['totaleGiornaliero'];
    }
}
