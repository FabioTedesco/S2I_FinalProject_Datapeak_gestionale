<?php

class Carrello
{
    private $conn;

    // Proprietà della classe Carrello
    public $id;
    public $operatore_id;
    public $totaleComplessivo;
    public $ivaTotale;
    public $created_at;
    public $updated_at;
    public $metodoPagamento;
    public $emailCliente;
    public $status;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Funzione per scannerizzare il prodotto e cercarlo tramite il barcode
    public function getProdottoById($barcode)
    {
        $query = 'SELECT * FROM prodotti WHERE barcode = :barcode';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':barcode', $barcode);
        $stmt->execute();
        return $stmt;
    }

    // Funzione per creare un nuovo carrello
    public function creaCarrello($operatore_id)
    {
        $query = 'INSERT INTO carrelli (operatore, totaleComplessivo, ivaTotale, created_at, metodoPagamento, emailCliente) VALUES (:operatore, 0, 0, NOW(), NULL, NULL)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':operatore', $operatore_id);
        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId();
            $this->operatore_id = $operatore_id;
            $this->totaleComplessivo = 0;
            $this->ivaTotale = 0;
            $this->created_at = date('Y-m-d H:i:s');
            return $this->id;
        }
        return false;
    }

    // Funzione per ottenere un carrello aperto per un operatore specifico
    public function ottieniCarrelloAperto($operatore_id)
    {
        $query = 'SELECT * FROM carrelli WHERE operatore = :operatore AND status = "open"';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':operatore', $operatore_id);
        $stmt->execute();
        $carrello = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($carrello) {
            $this->id = $carrello['id'];
            $this->operatore_id = $carrello['operatore'];
            $this->totaleComplessivo = $carrello['totaleComplessivo'];
            $this->ivaTotale = $carrello['ivaTotale'];
            $this->created_at = $carrello['tsCreazione'];
            $this->updated_at = $carrello['tsModifica'];
            $this->metodoPagamento = $carrello['metodoPagamento'];
            $this->emailCliente = $carrello['emailCliente'];
            return $this->id;
        }
        return false;
    }

    // Funzione per aggiungere un prodotto al carrello
    public function aggiungiProdottoAlCarrello($carrelloId, $prodotto, $quantita)
    {
        $query = 'INSERT INTO articoli_carrello (carrello_id, prodotto_id, nome, prezzo, quantita) VALUES (:carrello_id, :prodotto_id, :nome, :prezzo, :quantita)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':carrello_id', $carrelloId);
        $stmt->bindParam(':prodotto_id', $prodotto['id']);
        $stmt->bindParam(':nome', $prodotto['nome']);
        $stmt->bindParam(':prezzo', $prodotto['prezzo']);
        $stmt->bindParam(':quantita', $quantita);
        if ($stmt->execute()) {
            // Aggiorna il totale del carrello
            $this->aggiornaTotaleCarrello($carrelloId, $prodotto, $quantita);
            return true;
        }
        return false;
    }

    // Funzione per aggiornare il totale del carrello
    private function aggiornaTotaleCarrello($carrelloId, $prodotto, $quantita)
    {
        $iva = $prodotto['iva'] * $quantita;
        $totale = $prodotto['prezzo'] * $quantita;

        $query = 'UPDATE carrelli SET totaleComplessivo = totaleComplessivo + :totale, ivaTotale = ivaTotale + :iva, tsModifica = NOW() WHERE id = :carrello_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':totale', $totale);
        $stmt->bindParam(':iva', $iva);
        $stmt->bindParam(':carrello_id', $carrelloId);
        $stmt->execute();
    }
}
