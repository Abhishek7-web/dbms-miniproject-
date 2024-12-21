<?php
header('Content-Type: application/json');
include 'DBconnection.php';

$sql = "DELETE FROM incomes";
$response = [];

if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
    $response['message'] = 'All income records have been cleared.';
} else {
    $response['success'] = false;
    $response['error'] = $conn->error;
}

$conn->close();
echo json_encode($response);
?>
