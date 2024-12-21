<?php
$host = 'localhost';
$user = 'root'; // Use your MySQL username
$pass = '';     // Use your MySQL password (default is empty for XAMPP)
$dbname = 'exptrackdb';

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die(json_encode(['success' => false, 'error' => 'Database connection failed']));
}
?>
