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
    public $scontoAggiunto;
    public $prezzoScontato;
    public $barcode;
    public $ivaUnitaria;
    public $ivaTotale;
    public $totaleArticolo;



    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getQuantitaAttuale($carrello_id, $prodotto_id)
    {
        $query = 'SELECT quantita, ivaTotale, totaleArticolo FROM ' . $this->table . ' 
              WHERE carrello_id = :carrello_id AND prodotto_id = :prodotto_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':carrello_id', $carrello_id);
        $stmt->bindParam(':prodotto_id', $prodotto_id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getQuantitaArticoloInCarrello($carrello_id, $prodotto_id)
    {
        $query = 'SELECT SUM(quantita) as total FROM articoli WHERE carrello_id = :carrello_id AND prodotto_id = :prodotto_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':carrello_id', $carrello_id);
        $stmt->bindParam(':prodotto_id', $prodotto_id);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['total'] ?? 0;
    }



    public function aggiungiArticolo($carrello_id, $prodotto_id, $quantita,  $prezzoOriginale, $prezzoOutlet, $scontoProdotto, $barcode)
    {
        $articoloCorrente = $this->getQuantitaAttuale($carrello_id, $prodotto_id);

        // Calcola la quantità totale e gli importi
        $quantitaTotale = ($articoloCorrente['quantita'] ?? 0) + $quantita;
        if ($scontoProdotto == null) $scontoProdotto = 0;
        $this->prezzoScontato = $prezzoOutlet * (1 - $scontoProdotto);
        $this->ivaUnitaria = $this->prezzoScontato * 0.22;

        $this->ivaTotale = $quantitaTotale * $this->ivaUnitaria;
        $this->totaleArticolo = ($articoloCorrente['totaleArticolo'] ?? 0) + ($this->prezzoScontato * $quantita);


        $query = 'INSERT INTO '
            . $this->table . ' (carrello_id, prodotto_id, quantita, prezzoOriginale, prezzoOutlet, scontoProdotto, prezzoScontato, barcode, ivaUnitaria, ivaTotale, totaleArticolo) 
                  VALUES (:carrello_id, :prodotto_id, :quantitaTotale, :prezzoOriginale, :prezzoOutlet, :scontoProdotto, :prezzoScontato, :barcode, :ivaUnitaria, :ivaTotale, :totaleArticolo)
                  ON DUPLICATE KEY UPDATE 
                    quantita = :quantitaTotale,
                    ivaTotale = :ivaTotale,
                    totaleArticolo = :totaleArticolo';

        $stmt = $this->conn->prepare($query);



        $stmt->bindParam(':carrello_id', $carrello_id);
        $stmt->bindParam(':prodotto_id', $prodotto_id);
        $stmt->bindParam(':quantitaTotale', $quantitaTotale);
        $stmt->bindParam(':prezzoOriginale', $prezzoOriginale);
        $stmt->bindParam(':prezzoOutlet', $prezzoOutlet);
        $stmt->bindParam(':scontoProdotto', $scontoProdotto);
        $stmt->bindParam(':prezzoScontato', $this->prezzoScontato);
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
                        totaleArticolo = totaleArticolo - prezzoScontato 
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

    public function getArticoloAggiunto($carrello_id, $prodotto_id)
    {
        $query = "SELECT a.*, p.nome 
              FROM articoli a
              JOIN prodotti p ON a.prodotto_id = p.id
              WHERE a.carrello_id = :carrello_id AND a.prodotto_id = :prodotto_id
              LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':carrello_id', $carrello_id);
        $stmt->bindParam(':prodotto_id', $prodotto_id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function aggiungiSconto($scontoAggiunto, $id)
    {


        // Recupera il prezzoScontato, carrello_id e totaleArticolo dell'articolo dal database
        $utilityQuery = 'SELECT prezzoScontato, carrello_id, totaleArticolo, prodotto_id  FROM ' . $this->table . ' WHERE id = :id';
        $stmt = $this->conn->prepare($utilityQuery);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            // Se l'articolo non esiste, return false
            return false;
        }

        // Imposta $this->prezzoScontato
        $this->prezzoScontato = $result['prezzoScontato'];
        $this->carrello_id = $result['carrello_id'];
        $this->prodotto_id = $result['prodotto_id'];
        $this->totaleArticolo = $result['totaleArticolo'];

        // Calcola il prezzo finale con lo sconto
        $articoloCorrente = $this->getQuantitaAttuale($this->carrello_id, $this->prodotto_id);


        // Calcola la quantità totale e gli importi
        $quantitaTotale = ($articoloCorrente['quantita'] ?? 0);
        if ($scontoAggiunto == null) $scontoAggiunto = 0;
        $prezzoFinale = $this->prezzoScontato * (1 - $scontoAggiunto);
        $this->ivaUnitaria = $prezzoFinale * 0.22;
        $this->ivaTotale = $quantitaTotale * $this->ivaUnitaria;
        $this->totaleArticolo = ($prezzoFinale * $quantitaTotale);

        $query = 'UPDATE ' . $this->table . ' 
                  SET scontoAggiunto = :scontoAggiunto, prezzoFinale = :prezzoFinale, totaleArticolo = :totaleArticolo, ivaTotale = :ivaTotale
                  WHERE id = :id';


        $prezzoFinale = $this->prezzoScontato * (1 - $scontoAggiunto);

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':scontoAggiunto', $scontoAggiunto);
        $stmt->bindParam(':prezzoFinale', $prezzoFinale);
        $stmt->bindParam(':totaleArticolo', $this->totaleArticolo);
        $stmt->bindParam(':ivaTotale', $this->ivaTotale);
        $stmt->bindParam(':id', $id);

        // Se l'UPDATE ha successo, restituisce il valore calcolato di $prezzoFinale
        if ($stmt->execute()) {
            return [
                'prezzoFinale' => $prezzoFinale,
                'carrello_id' => $this->carrello_id
            ];
        }

        // Se l'UPDATE fallisce, restituisce false
        return false;
    }


    public function calcolaTotaleCarrello($carrello_id)
    {
        $query = 'SELECT SUM(totaleArticolo) as totaleCarrello, 
                  SUM(ivaTotale) as totaleIva  FROM ' . $this->table . ' WHERE carrello_id = :carrello_id';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':carrello_id', $carrello_id);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return [
            'totaleCarrello' => $result['totaleCarrello'] ?? 0,
            'totaleIva' => $result['totaleIva'] ?? 0,
        ];
    }
}
