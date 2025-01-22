<?php
require '../../core/db.php';
require '../../models/User.php';
require '../../core/headers.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate User object
$user = new User($db);

// Get all users
$result = $user->getAllUsers();

// Count the number of users
$num = count($result); // Count the array instead of using rowCount()

// Check if any users exist
if ($num > 0) {
    $user_arr = array();
    $user_arr['data'] = array();

    // Loop through the users
    foreach ($result as $row) {
        $user_item = array(
            'id' => $row['userID'], // Adjust column names based on your table schema
            'username' => $row['username'],
            'role' => $row['role'],
        );

        // Push to "data" array
        array_push($user_arr['data'], $user_item);
    }

    // Convert to JSON & output
    echo json_encode($user_arr);
} else {
    // No users found
    echo json_encode(
        array('message' => 'users non trovati')
    );
}
