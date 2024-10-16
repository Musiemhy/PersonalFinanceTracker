import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = ({ budgetData, expenseData, date }) => {
  let data;
  let options;

  const totalBudget = budgetData.categories.reduce(
    (acc, category) => acc + category.amount,
    0
  );

  let totalExpenses = 0;
  const startDate = new Date(date[0]);
  const endDate = new Date(date[1]);

  if (expenseData) {
    expenseData.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);

      if (
        transaction.type === "expense" &&
        transactionDate >= startDate &&
        transactionDate <= endDate
      ) {
        transaction.category.forEach((cat) => {
          totalExpenses += cat.amount;
        });
      }
    });

    data = {
      labels: ["Total Budget", "Total Expenses"],
      datasets: [
        {
          label: "Budget vs Expenses",
          data: [totalBudget, totalExpenses],
          backgroundColor: ["rgba(26, 249, 93, 0.6)", "rgba(249, 29, 29, 0.6)"],
          borderColor: ["rgba(26, 249, 93, 1)", "rgba(249, 29, 29, 1)"],
          borderWidth: 1,
        },
      ],
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Total Budget vs Total Expenses (ETB)",
        },
      },
    };
  } else {
    // Show budget breakdown by category when no expense data
    const categoryNames = budgetData.categories.map(
      (category) => category.name
    );
    const categoryAmounts = budgetData.categories.map(
      (category) => category.amount
    );

    data = {
      labels: categoryNames,
      datasets: [
        {
          label: "Budget by Category",
          data: categoryAmounts,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(175, 235, 54, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(175, 235, 54, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Budget Breakdown by Categories (ETB)",
        },
      },
    };
  }

  return <Pie data={data} options={options} />;
};

export default PieChart;
