<?php

class Prodotto
{
    //DB stuff
    private $conn;
    private $table = 'prodotti';

    //properties
    public $id;
    public $nome;
    public $descrizione;
    public $prezzoOriginale;
    public $prezzoOutlet;
    public $scontoProdotto;
    public $barcode;
    public $giacenza;
    public $categoria;
    public $colore;
    public $taglia;

    //Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    //Check if product exists
    public function exists()
    {
        $query = 'SELECT id FROM ' . $this->table . ' WHERE nome = :nome OR barcode = :barcode LIMIT 1';

        // Prepara lo statement
        $stmt = $this->conn->prepare($query);

        // Bind dei parametri
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':barcode', $this->barcode);

        // Esegui la query
        $stmt->execute();

        // Se c'è un risultato, significa che esiste già un prodotto con lo stesso nome o barcode
        if ($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    // Get prodotti
    public function read($offset)
    {
        // Crea la query base
        $query = 'SELECT 
              id, nome, descrizione, prezzoOriginale, prezzoOutlet, scontoProdotto, barcode, giacenza, categoria, colore, taglia
              FROM ' . $this->table . ' LIMIT 30';

        if (!empty($offset)) {

            $query .= ' OFFSET ' . $offset;
        }

        // Prepara lo statement
        $stmt = $this->conn->prepare($query);

        // Esegui la query
        $stmt->execute();

        return $stmt;
    }

    //Get categories
    public function getCategories()
    {
        // Query per ottenere categorie uniche
        $query = 'SELECT DISTINCT categoria FROM ' . $this->table . ' ORDER BY categoria ASC';

        // Prepara ed esegui lo statement
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    //filter by barcode (get all products with same name) & by categoria & by nome
    public function filter($params = [])
    {
        // Crea la query base
        $query = 'SELECT 
                  id, nome, descrizione, prezzoOriginale, prezzoOutlet, scontoProdotto, barcode, giacenza, categoria, colore, taglia
                  FROM ' . $this->table;

        // Costruisci la condizione dinamicamente
        $conditions = [];
        if (!empty($params['id'])) {
            $conditions[] = 'id = :id';
        }
        if (!empty($params['barcode'])) {
            $subQuery = '(SELECT nome FROM ' . $this->table . ' WHERE barcode = :barcode)';
            $conditions[] = 'nome = ' . $subQuery;
        }
        if (!empty($params['nome'])) {
            $conditions[] = 'nome LIKE :nome';
        }
        if (!empty($params['categoria'])) {
            $conditions[] = 'categoria LIKE :categoria';
        }

        // Aggiungi condizioni alla query se esistono
        if (count($conditions) > 0) {
            $query .= ' WHERE ' . implode(' AND ', $conditions);
        }



        // Prepara lo statement
        $stmt = $this->conn->prepare($query);

        // Bind dei parametri se esistono
        if (!empty($params['id'])) {
            $stmt->bindParam(':id', $params['id'], PDO::PARAM_INT);
        }
        if (!empty($params['barcode'])) {
            $stmt->bindParam(':barcode', $params['barcode'], PDO::PARAM_STR);
        }
        if (!empty($params['nome'])) {
            $nome = '%' . $params['nome'] . '%';
            $stmt->bindParam(':nome', $nome, PDO::PARAM_STR);
        }
        if (!empty($params['categoria'])) {
            $categoria = '%' . $params['categoria'] . '%';
            $stmt->bindParam(':categoria', $categoria, PDO::PARAM_STR);
        }

        // Esegui la query
        $stmt->execute();

        return $stmt;
    }

    //Create Prodotto
    public function create()
    {
        // create prodotto
        $query = 'INSERT INTO ' . $this->table . ' 
             (nome, prezzoOriginale, prezzoOutlet, scontoProdotto, barcode, giacenza, categoria, colore, taglia)
              VALUES (:nome, :prezzoOriginale, :prezzoOutlet, :scontoProdotto, :barcode, :giacenza, :categoria, :colore, :taglia)';


        //Prepare statement
        $stmt = $this->conn->prepare($query);

        // clean data
        $this->nome = strtoupper(htmlspecialchars(strip_tags($this->nome)));
        $this->prezzoOriginale = htmlspecialchars(strip_tags($this->prezzoOriginale));
        $this->prezzoOutlet = $this->prezzoOriginale * 0.7;
        $this->scontoProdotto = htmlspecialchars(strip_tags($this->scontoProdotto));
        $this->barcode = htmlspecialchars(strip_tags($this->barcode));
        $this->giacenza = htmlspecialchars(strip_tags($this->giacenza));
        $this->categoria = strtoupper(htmlspecialchars(strip_tags($this->categoria)));
        $this->colore = strtoupper(htmlspecialchars(strip_tags($this->colore)));
        $this->taglia = strtoupper(htmlspecialchars(strip_tags($this->taglia)));


        //Bind data -> 
        $stmt->bindParam(':nome', $this->nome);
        $stmt->bindParam(':prezzoOriginale', $this->prezzoOriginale);
        $stmt->bindParam(':prezzoOutlet', $this->prezzoOutlet);
        $stmt->bindParam(':scontoProdotto', $this->scontoProdotto);
        $stmt->bindParam(':barcode', $this->barcode);
        $stmt->bindParam(':giacenza', $this->giacenza);
        $stmt->bindParam(':categoria', $this->categoria);
        $stmt->bindParam(':colore', $this->colore);
        $stmt->bindParam(':taglia', $this->taglia);



        //Execute query
        if ($stmt->execute()) {
            return true;
        }

        //Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    //Update sconto, giacenza, prezzoOriginale
    public function update()
    {
        // create query
        $query = 'UPDATE '
            . $this->table . '
              SET
              scontoProdotto = :scontoProdotto,
              giacenza = :giacenza,
              prezzoOriginale = :prezzoOriginale,
              prezzoOutlet = :prezzoOutlet
              WHERE 
              id = :id';

        //Prepare statement
        $stmt = $this->conn->prepare($query);

        //Clean data
        $this->scontoProdotto = htmlspecialchars(strip_tags($this->scontoProdotto));
        $this->giacenza = htmlspecialchars(strip_tags($this->giacenza));
        $this->prezzoOriginale = htmlspecialchars(strip_tags($this->prezzoOriginale));
        $this->prezzoOutlet = $this->prezzoOriginale * 0.7;
        $this->id = htmlspecialchars(strip_tags($this->id));


        // //Bind data
        $stmt->bindParam(':scontoProdotto', $this->scontoProdotto);
        $stmt->bindParam(':giacenza', $this->giacenza);
        $stmt->bindParam(':prezzoOriginale', $this->prezzoOriginale);
        $stmt->bindParam(':prezzoOutlet', $this->prezzoOutlet);
        $stmt->bindParam(':id', $this->id);


        //Execute query
        if ($stmt->execute()) {
            return true;
        }

        //Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    //Update stock
    public function updateQuantita($id, $quantita)
    {
        $query = 'UPDATE ' . $this->table . ' SET giacenza = giacenza - :quantity WHERE id = :id AND giacenza >= :quantity';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':quantity', $quantita);
        return $stmt->execute();
    }

    //Delete Prodotto
    public function delete()
    {
        //Create query
        $query = 'DELETE FROM ' . $this->table . ' WHERE id=:id';

        //Prepare statement
        $stmt = $this->conn->prepare($query);

        //Clean data
        $this->id = htmlspecialchars(strip_tags($this->id));

        //Bind data
        $stmt->bindParam(':id', $this->id);

        //Execute query
        if ($stmt->execute()) {
            return true;
        }

        //Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    // Get prodotto by barcode
    public function getByBarcode($barcode)
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE barcode = :barcode';

        // Prepara lo statement
        $stmt = $this->conn->prepare($query);
        // $this->barcode = htmlspecialchars(strip_tags($this->barcode));
        $stmt->bindParam(':barcode', $barcode);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
