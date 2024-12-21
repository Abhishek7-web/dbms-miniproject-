const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addIncomeButton = document.getElementById('add-income');
const transactionList = document.getElementById('transaction-list');
const clearAllButton = document.getElementById('clear-all');
const totalAmountDiv = document.getElementById('total-amount');

// Fetch incomes from the database
window.addEventListener('load', fetchIncomes);

function fetchIncomes() {
  fetch('fetch_income.php')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        transactionList.innerHTML = ''; // Clear current list
        let totalAmount = 0;
        data.incomes.forEach(income => {
          addTransactionToList(
            income.id,
            income.category,
            income.date,
            income.description,
            parseFloat(income.amount)
          );
          totalAmount += parseFloat(income.amount);
        });
        updateTotalAmount(totalAmount);
      } else {
        alert('Failed to fetch incomes');
      }
    })
    .catch(error => console.error('Error:', error));
}

// Add a new income
addIncomeButton.addEventListener('click', () => {
  const category = categorySelect.value.trim();
  const date = dateInput.value.trim();
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!category || !date || !description || isNaN(amount) || amount <= 0) {
    alert('Please fill in all fields with valid data.');
    return;
  }

  const incomeData = { category, date, description, amount };

  fetch('add_income.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incomeData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        fetchIncomes(); // Refresh the list
        categorySelect.value = '';
        dateInput.value = '';
        descriptionInput.value = '';
        amountInput.value = '';
        alert('Income added successfully');
      } else {
        alert('Failed to add income');
      }
    })
    .catch(error => console.error('Error:', error));
});

// Clear all incomes
clearAllButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all incomes?')) {
    fetch('clear_income.php', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fetchIncomes(); // Refresh the list
          alert('All incomes cleared');
        } else {
          alert('Failed to clear incomes');
        }
      })
      .catch(error => console.error('Error:', error));
  }
});

// Add a transaction to the list
function addTransactionToList(id, category, date, description, amount) {
  const listItem = document.createElement('li');
  listItem.textContent = `₹${amount.toFixed(2)} received from ${description} (${category}) on ${date}`;

  transactionList.appendChild(listItem);
}

// Update total amount displayed
function updateTotalAmount(totalAmount) {
  totalAmountDiv.textContent = `Total Amount Received: ₹${totalAmount.toFixed(2)}`;
}
