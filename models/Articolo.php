<?php
class Articolo
{
    private $conn;
    private $table = 'articoli';

    public $id;
    public $carrello_id;
    public $prodotto_id;
    public $quantita;
    public $prezzoOriginale;
    public $prezzoOutlet;
    public $scontoProdotto;
    public $scontoArticolo;
    public $prezzoFinale;
    public $barcode;
    public $ivaUnitaria;
    public $ivaTotale;
    public $totaleArticolo;



    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function aggiungiArticolo($carrello_id, $prodotto_id, $quantita,  $prezzoOriginale, $prezzoOutlet, $scontoProdotto, $barcode)
    {
        $query = 'INSERT INTO '
            . $this->table . ' (carrello_id, prodotto_id, quantita, prezzoOriginale, prezzoOutlet, scontoProdotto, prezzoFinale, barcode, ivaUnitaria, ivaTotale, totaleArticolo) 
                  VALUES (:carrello_id, :prodotto_id, :quantita, :prezzoOriginale, :prezzoOutlet, :scontoProdotto, :prezzoFinale, :barcode, :ivaUnitaria, :ivaTotale, :totaleArticolo)
                  ON DUPLICATE KEY UPDATE 
                   quantita = quantita + VALUES(quantita),
                   ivaTotale = ivaTotale + VALUES(ivaTotale),
                   totaleArticolo = totaleArticolo + VALUES(totaleArticolo)';

        $stmt = $this->conn->prepare($query);

        if ($scontoProdotto == null) $scontoProdotto = 0;
        $this->prezzoFinale = $prezzoOutlet * (1 - $scontoProdotto);
        $this->ivaUnitaria = $this->prezzoFinale * 0.22;
        $this->ivaTotale = $this->ivaUnitaria * $quantita;
        $this->totaleArticolo = $this->prezzoFinale * $quantita;

        $stmt->bindParam(':carrello_id', $carrello_id);
        $stmt->bindParam(':prodotto_id', $prodotto_id);
        $stmt->bindParam(':quantita', $quantita);
        $stmt->bindParam(':prezzoOriginale', $prezzoOriginale);
        $stmt->bindParam(':prezzoOutlet', $prezzoOutlet);
        $stmt->bindParam(':scontoProdotto', $scontoProdotto);
        $stmt->bindParam(':prezzoFinale', $this->prezzoFinale);
        $stmt->bindParam(':barcode', $barcode);
        $stmt->bindParam(':ivaUnitaria', $this->ivaUnitaria);
        $stmt->bindParam(':ivaTotale', $this->ivaTotale);
        $stmt->bindParam(':totaleArticolo', $this->totaleArticolo);

        return $stmt->execute();
    }

    //rimuove l'articolo completamente dal carrello
    public function removeAll($id)
    {
        $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    //Diminuisce di 1 la quantità di un articolo
    public function removeOne($id)
    {
        // Aggiorna il record
        $queryUpdate = 'UPDATE ' . $this->table . ' 
                    SET quantita = quantita - 1,
                        ivaTotale = ivaTotale - ivaUnitaria,
                        totaleArticolo = totaleArticolo - prezzoFinale 
                    WHERE id = :id';
        $stmtUpdate = $this->conn->prepare($queryUpdate);
        $stmtUpdate->bindParam(':id', $id);
        $stmtUpdate->execute();

        // Controlla se la quantità è diventata 0
        $queryCheck = 'SELECT quantita FROM ' . $this->table . ' WHERE id = :id';
        $stmtCheck = $this->conn->prepare($queryCheck);
        $stmtCheck->bindParam(':id', $id);
        $stmtCheck->execute();
        $result = $stmtCheck->fetch(PDO::FETCH_ASSOC);

        // Se la quantità è 0, elimina la riga
        if ($result && $result['quantita'] == 0) {
            $queryDelete = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
            $stmtDelete = $this->conn->prepare($queryDelete);
            $stmtDelete->bindParam(':id', $id);
            $stmtDelete->execute();
        }

        // Ritorna l'esito dell'aggiornamento
        return $stmtUpdate->rowCount() > 0;
    }

    public function getArticoli($carrello_id)
    {
        $query = "SELECT a.*, p.nome FROM articoli a
                  JOIN prodotti p ON a.prodotto_id = p.id
                  WHERE a.carrello_id = :carrello_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':carrello_id', $carrello_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function calcolaTotaleCarrello($carrello_id)
    {
        $query = 'SELECT SUM(totaleArticolo) as totaleCarrello FROM ' . $this->table . ' WHERE carrello_id = :carrello_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':carrello_id', $carrello_id);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['totaleCarrello'] ?? 0;
    }
}
