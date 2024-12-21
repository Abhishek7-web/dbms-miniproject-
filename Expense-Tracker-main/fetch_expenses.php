<?php
header('Content-Type: application/json');
include 'DBconnection.php';

$sql = "SELECT * FROM expenses";
$result = $conn->query($sql);

$expenses = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $expenses[] = $row;
    }
}

echo json_encode(['success' => true, 'expenses' => $expenses]);
$conn->close();
?>
