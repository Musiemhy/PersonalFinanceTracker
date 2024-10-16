import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ budgetData, expenseData, date }) => {
  const budgetCategories = budgetData.categories.map(
    (category) => category.name
  );
  const budgetAmounts = budgetData.categories.map(
    (category) => category.amount
  );

  const expenseSummary = {};
  const startDate = new Date(date[0]);
  const endDate = new Date(date[1]);

  let titleText = "Budget vs Expenses Overview (ETB)";

  if (expenseData) {
    expenseData.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transaction.type === "expense" &&
        transactionDate >= startDate &&
        transactionDate <= endDate
      ) {
        transaction.category.forEach((cat) => {
          const categoryName = cat.name;
          if (!expenseSummary[categoryName]) {
            expenseSummary[categoryName] = 0;
          }
          expenseSummary[categoryName] += cat.amount;
        });
      }
    });
  } else {
    titleText = "Budget Overview by Categories (ETB)";
  }

  const expenseAmounts = budgetCategories.map(
    (category) => expenseSummary[category] || 0
  );

  const datasets = [
    {
      label: "Budget Amount",
      data: budgetAmounts,
      backgroundColor: "rgba(26, 249, 93, 0.6)",
      borderColor: "rgba(26, 249, 93, 1)",
      borderWidth: 1,
    },
  ];

  if (expenseData) {
    datasets.push({
      label: "Expenses",
      data: expenseAmounts,
      backgroundColor: "rgba(249, 29, 29, 0.6)",
      borderColor: "rgba(249, 29, 29, 1)",
      borderWidth: 1,
    });
  }

  const data = {
    labels: budgetCategories,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: titleText,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
