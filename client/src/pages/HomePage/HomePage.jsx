import { useState, useEffect } from "react";
import "./HomePage.scss";
import axios from "axios";
import Header from "../../components/Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BarChart from "../../components/Charts/BarChart";
import PieChart from "../../components/Charts/PieChart";

const HomePage = () => {
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");
  const [selectedDateRange, setSelectedDateRange] = useState([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  ]);
  const [error, setError] = useState(null);
  const [budgetData, setBudgetData] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState(null);

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);

    const startOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );

    setSelectedDateRange([startOfMonth, endOfMonth]);
  };

  const formatDate = (date) => {
    date.setHours(0, 0, 0, 0);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5555/api/gettransaction",
          { userId }
        );

        if (
          response.data === "No Transactions Yet" ||
          response.data.length === 0
        ) {
          setError("No Transactions Yet");
          setTransactionHistory(null);
        } else if (response.data === "Did not receive userId!") {
          setError("Something went Wrong. Please refresh!");
          setTransactionHistory(null);
        } else {
          setTransactionHistory(response.data);
          setError(null);
        }
      } catch (error) {
        console.log("The error is: ", error);
        setTransactionHistory(null);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchBudgetByDate = async () => {
      if (selectedDateRange[0] && selectedDateRange[1]) {
        console.log({
          dateRange: [
            formatDate(selectedDateRange[0]),
            formatDate(selectedDateRange[1]),
          ],
        });
        try {
          const response = await axios.post(
            "http://localhost:5555/api/getbudgetbyrange",
            {
              dateRange: [
                formatDate(selectedDateRange[0]),
                formatDate(selectedDateRange[1]),
              ],
            }
          );

          if (response.data === "No Budget Yet" || response.data.length === 0) {
            setError(response.data);
            setBudgetData(null);
          } else if (response.data === "Did not receive date range!") {
            setError("Something went wrong. Please refresh!");
            setBudgetData(null);
          } else {
            setBudgetData(response.data);
            setError(null);
          }
        } catch (error) {
          console.error("Error fetching budget:", error);
          setError(
            "Failed to fetch budget data. Check your network connection"
          );
          setBudgetData(null);
        }
      }
    };

    fetchBudgetByDate();
  }, [selectedDateRange]);

  return (
    <div className="homePage">
      <div className="homeHeader">
        <Header />
        <div className="message">
          <h1>Welcome, {name}</h1>
          <p>This is your financial overview report.</p>

          <div className="datePickerWrapper">
            <DatePicker
              className="date"
              onChange={handleDateChange}
              maxDate={new Date()}
              showMonthYearPicker
            />

            {selectedDateRange[0] && selectedDateRange[1] && (
              <p className="dateRangeOverlay">
                {selectedDateRange[0].toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}{" "}
                -{" "}
                {selectedDateRange[1].toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="cardSection">
        <div className="cardItem">
          <div className="texts">
            <h3>Remaining</h3>
            <h3>{} ETB.</h3>
            <p>{}% from last period</p>
          </div>
          <img src="/piggy-bank.svg" alt="icon" />
        </div>
        <div className="cardItem">
          <div className="texts">
            <h3>Income</h3>
            <h3>{} ETB.</h3>
            <p>{}% from last period</p>
          </div>
          <img src="/growth.png" alt="icon" />
        </div>
        <div className="cardItem">
          <div className="texts">
            <h3>Expenses</h3>
            <h3>{} ETB.</h3>
            <p>{}% from last period</p>
          </div>
          <img src="/icons8-decrease-48.png" alt="icon" />
        </div>
      </div>

      <div className="progress">
        {budgetData &&
        budgetData.length > 0 &&
        budgetData[0].categories &&
        budgetData[0].categories.length > 0 &&
        transactionHistory &&
        transactionHistory.length > 0 ? (
          <div className="charts">
            <div className="bar">
              <BarChart
                budgetData={budgetData[0]}
                expenseData={transactionHistory}
                date={selectedDateRange}
              />
            </div>
            <div className="pie">
              <PieChart
                budgetData={budgetData[0]}
                expenseData={transactionHistory}
                date={selectedDateRange}
              />
            </div>
          </div>
        ) : (
          <p>No budget set for the current month</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
