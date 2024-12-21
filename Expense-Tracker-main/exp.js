const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addExpenseButton = document.getElementById('add-expense');
const transactionList = document.getElementById('transaction-list');
const clearAllButton = document.getElementById('clear-all');
const totalAmountDiv = document.getElementById('total-amount');

// Fetch expenses from the database
window.addEventListener('load', fetchExpenses);

function fetchExpenses() {
  fetch('fetch_expenses.php')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        transactionList.innerHTML = ''; // Clear current list
        let totalAmount = 0;
        data.expenses.forEach(expense => {
          addTransactionToList(
            expense.id,
            expense.category,
            expense.date,
            expense.description,
            parseFloat(expense.amount)
          );
          totalAmount += parseFloat(expense.amount);
        });
        updateTotalAmount(totalAmount);
      } else {
        alert('Failed to fetch expenses');
      }
    })
    .catch(error => console.error('Error:', error));
}

// Add a new expense
addExpenseButton.addEventListener('click', () => {
  const category = categorySelect.value.trim();
  const date = dateInput.value.trim();
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!category || !date || !description || isNaN(amount) || amount <= 0) {
    alert('Please fill in all fields with valid data.');
    return;
  }

  const expenseData = { category, date, description, amount };

  fetch('add_expense.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expenseData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        fetchExpenses(); // Refresh the list
        categorySelect.value = '';
        dateInput.value = '';
        descriptionInput.value = '';
        amountInput.value = '';
        alert('Expense added successfully');
      } else {
        alert('Failed to add expense');
      }
    })
    .catch(error => console.error('Error:', error));
});

// Clear all expenses
clearAllButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all expenses?')) {
    fetch('clear_expenses.php', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fetchExpenses(); // Refresh the list
          alert('All expenses cleared');
        } else {
          alert('Failed to clear expenses');
        }
      })
      .catch(error => console.error('Error:', error));
  }
});

// Add a transaction to the list
function addTransactionToList(id, category, date, description, amount) {
  const listItem = document.createElement('li');
  listItem.textContent = `₹${amount.toFixed(2)} spent on ${description} (${category}) on ${date}`;

  transactionList.appendChild(listItem);
}

// Update total amount displayed
function updateTotalAmount(totalAmount) {
  totalAmountDiv.textContent = `Total Amount Spent: ₹${totalAmount.toFixed(2)}`;
}
