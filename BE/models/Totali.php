<?php
class Totali
{
    private $conn;
    private $table = 'totali';

    public $id;
    public $date;
    public $incassoTotale;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function chiusuraCassa($incassoTotale)
    {
        date_default_timezone_set('Europe/Rome');
        $date = date('Y-m-d H:i:s');

        $query = 'INSERT INTO '
            . $this->table . ' (date, incassoTotale) VALUES (:date, :incassoTotale)';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':incassoTotale', $incassoTotale);
        $stmt->execute();
    }
}
