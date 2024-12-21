<?php
header('Content-Type: application/json');
include 'DBconnection.php';

$response = [
    'success' => false,
    'data' => [],
];

try {
    // Fetch category-wise total expenses
    $expensesQuery = "SELECT category, SUM(amount) as total_expenses FROM expenses GROUP BY category";
    $expensesResult = $conn->query($expensesQuery);
    $expensesData = [];

    while ($row = $expensesResult->fetch_assoc()) {
        $expensesData[$row['category']] = $row['total_expenses'];
    }

    // Fetch category-wise total incomes
    $incomesQuery = "SELECT category, SUM(amount) as total_incomes FROM incomes GROUP BY category";
    $incomesResult = $conn->query($incomesQuery);
    $incomesData = [];

    while ($row = $incomesResult->fetch_assoc()) {
        $incomesData[$row['category']] = $row['total_incomes'];
    }

    // Combine expenses and incomes data
    $categories = array_unique(array_merge(array_keys($expensesData), array_keys($incomesData)));
    $reportData = [];

    foreach ($categories as $category) {
        $reportData[] = [
            'category' => $category,
            'expenses' => isset($expensesData[$category]) ? floatval($expensesData[$category]) : 0,
            'incomes' => isset($incomesData[$category]) ? floatval($incomesData[$category]) : 0,
        ];
    }

    $response['success'] = true;
    $response['data'] = $reportData;
} catch (Exception $e) {
    $response['error'] = $e->getMessage();
}

$conn->close();
echo json_encode($response);
?>
