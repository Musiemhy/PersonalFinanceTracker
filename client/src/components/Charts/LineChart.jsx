import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

const LineChart = ({ budgetHistory }) => {
  const labels = budgetHistory.map((entry) =>
    new Date(entry.startDate).toLocaleString("default", {
      month: "long",
      year: "numeric",
    })
  );

  const categoryData = {};
  const totalBudgetData = [];

  budgetHistory.forEach((entry) => {
    let totalBudget = 0;

    entry.categories.forEach((category) => {
      totalBudget += category.amount;
      if (!categoryData[category.name]) {
        categoryData[category.name] = [];
      }
      categoryData[category.name].push(category.amount);
    });

    totalBudgetData.push(totalBudget);
  });

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${1})`;
  };

  const datasets = Object.keys(categoryData).map((categoryName) => ({
    label: categoryName,
    data: categoryData[categoryName],
    fill: false,
    backgroundColor: getRandomColor(),
    borderColor: getRandomColor(),
    borderWidth: 1,
  }));

  datasets.push({
    label: "Total Budget",
    data: totalBudgetData,
    fill: false,
    backgroundColor: getRandomColor(),
    borderColor: getRandomColor(),
    borderWidth: 1,
  });

  const data = {
    labels,
    datasets,
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
        text: "Budget Progress Over Time (ETB)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
