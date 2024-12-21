<?php
header('Content-Type: application/json');
include 'DBconnection.php';

$sql = "SELECT * FROM incomes";
$result = $conn->query($sql);

$incomes = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $incomes[] = $row;
    }
}

echo json_encode(['success' => true, 'incomes' => $incomes]);
$conn->close();
?>
