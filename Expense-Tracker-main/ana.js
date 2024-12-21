// Get the canvas elements for the charts
const expenseChartCanvas = document.getElementById('expense-chart-container');
const incomeChartCanvas = document.getElementById('income-chart-container');

// Fetch data for expenses and incomes
window.addEventListener('load', () => {
  fetch('fetch_analytics.php')
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Process and render expense chart
        const expenseCategoryData = processCategoryData(data.expenses);
        renderPieChart(expenseChartCanvas, 'Expenses by Category', expenseCategoryData);

        // Process and render income chart
        const incomeCategoryData = processCategoryData(data.incomes);
        renderPieChart(incomeChartCanvas, 'Incomes by Category', incomeCategoryData);
      } else {
        alert('Failed to fetch analytics data.');
      }
    })
    .catch((error) => console.error('Error fetching analytics data:', error));
});

// Function to process category data
function processCategoryData(data) {
  const result = {};
  data.forEach((item) => {
    result[item.category] = item.amount;
  });
  return result;
}

// Function to render a pie chart
function renderPieChart(canvas, title, categoryData) {
  const categories = Object.keys(categoryData);
  const values = Object.values(categoryData);

  const colors = generateColors(categories.length);

  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top' },
        title: { display: true, text: title },
      },
    },
  });
}

// Function to generate dynamic colors
function generateColors(count) {
  const baseColors = [
    'rgba(255, 99, 132, 0.6)', // Red
    'rgba(54, 162, 235, 0.6)', // Blue
    'rgba(255, 206, 86, 0.6)', // Yellow
    'rgba(75, 192, 192, 0.6)', // Teal
    'rgba(153, 102, 255, 0.6)', // Purple
    'rgba(255, 159, 64, 0.6)', // Orange
  ];

  const background = Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
  const border = background.map(color => color.replace('0.6', '1')); // Darker border colors

  return { background, border };
}
