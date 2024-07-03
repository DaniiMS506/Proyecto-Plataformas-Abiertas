<?php
require_once(__DIR__ . '/../DB/conn.php');

class Prenda
{
    private $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function all()
    {
        $stmt = $this->db->query("SELECT * FROM prenda");
        return $stmt->fetchAll();
    }
}
?>