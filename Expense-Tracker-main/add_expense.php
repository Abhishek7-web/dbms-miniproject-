<?php
header('Content-Type: application/json');
include 'DBconnection.php';

$input = json_decode(file_get_contents('php://input'), true);
$response = ['success' => false];

if (isset($input['category'], $input['date'], $input['description'], $input['amount'])) {
    $category = $input['category'];
    $date = $input['date'];
    $description = $input['description'];
    $amount = floatval($input['amount']);

    $query = "INSERT INTO expenses (category, date, description, amount) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("sssd", $category, $date, $description, $amount);

    if ($stmt->execute()) {
        $response['success'] = true;
    }
}

$conn->close();
echo json_encode($response);
?>
