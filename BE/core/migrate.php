<?php

require 'db.php';

$retries = 5; // Number of retries to connect to the database
while ($retries > 0) {
    try {
        // Instantiate database connection
        $database = new Database();
        $db = $database->connect();
        if ($db) {
            echo "Database connection successful.\n";
            break; // Exit the loop if connection is successful
        }
    } catch (PDOException $e) {
        echo "Retrying database connection: " . $e->getMessage() . "\n";
    }
    $retries--;
    sleep(5); // Wait 5 seconds before retrying
}

if (!$db) {
    die("Failed to connect to the database after multiple retries.\n");
}

try {
    // Path to the SQL file
    $sqlFile = __DIR__ . '/datapeak_gestionale_vendite.sql';

    // Read the SQL file
    if (!file_exists($sqlFile)) {
        throw new Exception("SQL file not found: $sqlFile");
    }
    $sql = file_get_contents($sqlFile);

    // Split queries by semicolon and execute each query
    $queries = explode(';', $sql);
    foreach ($queries as $query) {
        $query = trim($query);
        if (!empty($query)) {
            echo "Executing query: $query\n";
            try {
                $db->exec($query);
            } catch (PDOException $e) {
                echo "Error in query: $query\n";
                echo "Error message: " . $e->getMessage() . "\n";
                exit(1);
            }
        }
    }

    echo "Database migration completed successfully.\n";
} catch (Exception $e) {
    echo "Error during migration: " . $e->getMessage() . "\n";
    exit(1);
}
