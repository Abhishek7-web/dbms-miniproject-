// Get references to DOM elements
const analysisTbody = document.getElementById('analysis-tbody');
const balance = document.getElementById('balance');
const totalExpenses = document.getElementById('total-expenses');
const totalIncomes = document.getElementById('total-incomes');

// Function to fetch and update the report
function generateReport() {
    fetch('fetch_report.php') // Fetch data from the server
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const reportData = data.data;
                analysisTbody.innerHTML = ''; // Clear existing rows

                let totalExpensesValue = 0;
                let totalIncomesValue = 0;

                // Populate the table with fetched data
                reportData.forEach(item => {
                    const { category, expenses, incomes } = item;
                    const net = incomes - expenses;

                    // Create a new row for the table
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${category}</td>
                        <td>₹${expenses.toFixed(2)}</td>
                        <td>₹${incomes.toFixed(2)}</td>
                        <td>₹${net.toFixed(2)}</td>
                    `;
                    analysisTbody.appendChild(row);

                    // Update totals
                    totalExpensesValue += expenses;
                    totalIncomesValue += incomes;
                });

                // Update the balance and totals
                balance.textContent = `₹${(totalIncomesValue - totalExpensesValue).toFixed(2)}`;
                totalExpenses.textContent = `₹${totalExpensesValue.toFixed(2)}`;
                totalIncomes.textContent = `₹${totalIncomesValue.toFixed(2)}`;
            } else {
                alert('Failed to fetch report data. Please try again.');
                console.error(data.error);
            }
        })
        .catch(error => console.error('Error fetching report data:', error));
}

// Initialize the report generation when the page loads
window.addEventListener('load', generateReport);
