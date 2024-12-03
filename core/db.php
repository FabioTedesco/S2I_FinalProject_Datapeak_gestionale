<?php


// define('DB_HOST', $_ENV['DB_HOST']);
// define('DB_NAME', $_ENV['DB_NAME']);
// define('DB_USER', $_ENV['DB_USER']);
// define('DB_PASSWORD', $_ENV['DB_PASSWORD']);


class Database
{
    // DB params
    private $host = 'localhost';
    private $db_name = 'datapeak_gestionale_vendite';
    private $username = 'root';
    private $password = 'galfadase5';
    private $conn;

    //DB connect
    public function connect()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Connection Error:' . $e->getMessage();
        }

        return $this->conn;
    }
}
