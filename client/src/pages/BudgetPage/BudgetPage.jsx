import React, { useState, useEffect } from "react";
import "./BudgetPage.scss";
import Header from "../../components/Header/Header";
import Modal from "../../components/Form/Modal";
import axios from "axios";
import BudgetForm from "../../components/Form/budgetForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BarChart from "../../components/Charts/BarChart";
import PieChart from "../../components/Charts/PieChart";
import LineChart from "../../components/Charts/LineChart";

const BudgetPage = () => {
  const userId = localStorage.getItem("userId");
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [budgetData, setBudgetData] = useState(null);
  const [budgetHistory, setBudgetHistory] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  ]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/api/setbudget",
        data
      );

      if (response.status === 201) {
        alert("Budget saved successfully!");
        closeModal();
        fetchBudget();
      }
    } catch (error) {
      console.error("Error saving budget:", error);
      setError("Failed to save budget. Please try again.");
    }
  };

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
    const fetchBudget = async () => {
      if (userId) {
        try {
          const response = await axios.post(
            "http://localhost:5555/api/getbudget",
            {
              userId,
            }
          );

          console.log(response.data);
          if (response.data === "No Budget Yet" || response.data.length === 0) {
            setError(response.data);
            setBudgetHistory(null);
          } else if (response.data === "Did not receive date range!") {
            setError("Something went wrong. Please refresh!");
            setBudgetHistory(null);
          } else {
            setBudgetHistory(response.data);
            setError(null);
          }
        } catch (error) {
          console.error("Error fetching budget:", error);
          setError(
            "Failed to fetch budget data. Check your network connection"
          );
          setBudgetHistory(null);
        }
      }
    };

    fetchBudget();
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
    <div className="budgetPage">
      <div className="headerContainer">
        <Header />
        <div className="dateSelector">
          <h3>Select a month you want to view budget history of</h3>
          <div className="dateRangeSelector">
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
      <div className="budgetComponent">
        {error ? (
          <div className="error">
            <p className="errors">{error}</p>
          </div>
        ) : (
          <div>
            <div className="btnContainer">
              <div>
                <button onClick={openModal} className="new">
                  Set Next Month's Budget
                </button>
                <Modal open={isOpen} onClose={closeModal}>
                  <BudgetForm onSave={handleSubmit} />
                </Modal>
              </div>
            </div>
            <div className="progress">
              <h1>
                Budget for{" "}
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
              </h1>
              {budgetData &&
              budgetData.length > 0 &&
              budgetData[0].categories &&
              budgetData[0].categories.length > 0 ? (
                <div className="charts">
                  <div className="bar">
                    <BarChart
                      budgetData={budgetData[0]}
                      date={selectedDateRange}
                    />
                  </div>
                  <div className="pie">
                    <PieChart
                      budgetData={budgetData[0]}
                      date={selectedDateRange}
                    />
                  </div>
                </div>
              ) : (
                <p>No budget set for the current month</p>
              )}
            </div>
            <div className="budgetHistory">
              <h1>Monthly Budget Comparison Over Time</h1>
              <span>
                Track how your budget has changed across different months and
                visualize trends in your financial planning.
              </span>
              {budgetHistory && budgetHistory.length > 0 ? (
                <div className="lineChart">
                  <LineChart budgetHistory={budgetHistory} />
                </div>
              ) : (
                <p>No budget set for the current month</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetPage;
