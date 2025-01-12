<?php
require '../../models/Articolo.php';
require '../../core/db.php';
require '../../core/headers.php';



//Instatiate DB & connect
$database = new Database();
$db = $database->connect();


//Instantiate Prodotto object
$articolo = new Articolo($db);

//Get data
$data = json_decode(file_get_contents("php://input"));


// Aggiornare l'articolo e recuperare il prezzo finale
$result = $articolo->aggiungiSconto($data->scontoAggiunto, $data->id,);


if ($result) {

    // Recupera prezzoFinale e carrello_id dall'array restituito
    $prezzoFinale = $result['prezzoFinale'];
    $carrello_id = $result['carrello_id'];

    $articoli = $articolo->getArticoli($carrello_id);



    // Filtra l'articolo specifico
    $articoloAggiornato = array_filter($articoli, function ($articolo) use ($data) {
        return $articolo['id'] == $data->id;
    });

    echo json_encode(
        array(
            'message' => 'Articolo updated',
            'prezzoFinale' => $prezzoFinale,
            'articolo' => array_values($articoloAggiornato)[0] // Ritorna il primo elemento del filtro
        )
    );
} else {

    echo json_encode(
        array(
            'message' => 'Articolo  NOT updated',

        )
    );
}
