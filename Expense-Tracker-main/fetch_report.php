<?php
header('Content-Type: application/json');
include 'DBconnection.php';

$response = ['success' => false, 'data' => []];

$reportData = [];
$categories = [];

// Fetch total expenses by category
$expenseQuery = "SELECT category, SUM(amount) AS total_expense FROM expenses GROUP BY category";
$expenseResult = $conn->query($expenseQuery);

while ($row = $expenseResult->fetch_assoc()) {
    $categories[$row['category']]['expenses'] = floatval($row['total_expense']);
}

// Fetch total incomes by category
$incomeQuery = "SELECT category, SUM(amount) AS total_income FROM incomes GROUP BY category";
$incomeResult = $conn->query($incomeQuery);

while ($row = $incomeResult->fetch_assoc()) {
    $categories[$row['category']]['incomes'] = floatval($row['total_income']);
}

// Combine data for all categories
foreach ($categories as $category => $data) {
    $reportData[] = [
        'category' => $category,
        'expenses' => isset($data['expenses']) ? $data['expenses'] : 0,
        'incomes' => isset($data['incomes']) ? $data['incomes'] : 0
    ];
}

$response['success'] = true;
$response['data'] = $reportData;

$conn->close();
echo json_encode($response);
?>
