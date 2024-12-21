<?php
header('Content-Type: application/json'); // Send JSON response
include 'DBconnection.php'; // Database connection file

$response = ['success' => false, 'expenses' => [], 'incomes' => []];

// Fetch expenses grouped by category
$expenseQuery = "SELECT category, SUM(amount) AS total_amount FROM expenses GROUP BY category";
$expenseResult = mysqli_query($conn, $expenseQuery);

if ($expenseResult) {
    while ($row = mysqli_fetch_assoc($expenseResult)) {
        $response['expenses'][] = [
            'category' => $row['category'],
            'amount' => (float) $row['total_amount']
        ];
    }
}

// Fetch incomes grouped by category
$incomeQuery = "SELECT category, SUM(amount) AS total_amount FROM incomes GROUP BY category";
$incomeResult = mysqli_query($conn, $incomeQuery);

if ($incomeResult) {
    while ($row = mysqli_fetch_assoc($incomeResult)) {
        $response['incomes'][] = [
            'category' => $row['category'],
            'amount' => (float) $row['total_amount']
        ];
    }
}

// If both queries were successful
if ($expenseResult && $incomeResult) {
    $response['success'] = true;
}

echo json_encode($response); // Output the response as JSON
mysqli_close($conn); // Close the database connection
?>
