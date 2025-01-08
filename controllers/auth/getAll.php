<?php
require '../../core/db.php';
require '../../models/User.php';
require '../../core/headers.php';

// Instatiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate User object
$user = new User($db);

// user read query
$result = $user->getAllUsers();
// Get row count
$num = $result->rowCount();

// Check if any products
if ($num > 0) {
    $user_arr = array();
    $user_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $user_item = array(
            'id' => $userID,
            'username' => $username,
            'role' => $role
        );

        // Push to "data"
        array_push($user_arr['data'], $user_item);
    }

    // Turn to JSON & output
    echo json_encode($user_arr);
} else {
    echo json_encode(
        array('message' => 'users non trovati')
    );
}
