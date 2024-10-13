import React, { useState, useEffect } from "react";
import "./BudgetPage.scss";
import Header from "../../components/Header/Header";
import Modal from "../../components/Form/Modal";
import axios from "axios";
import BudgetForm from "../../components/Form/budgetForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BudgetPage = () => {
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [budgetData, setBudgetData] = useState(null);
  const [budgetHistory, setBudgetHistory] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([
    new Date(),
    new Date(),
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
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5555/api/getbudget",
          {
            userId: localStorage.getItem("userId"),
          }
        );

        if (response.data === "No Budget Yet" || response.data.length === 0) {
          setError(response.data);
        } else if (response.data === "Did not receive userId!") {
          setError("Something went wrong. Please refresh!");
        } else {
          setBudgetData(response.data);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching budget:", error);
        setError("Failed to fetch budget data. Check your network connection");
      }
    };

    fetchBudget();
  });

  useEffect(() => {
    const fetchBudgetByDate = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5555/api/getbudgetbyrange",
          { dateRange: selectedDateRange }
        );

        if (response.data === "No Budget Yet" || response.data.length === 0) {
          setError(response.data);
        } else if (response.data === "Did not recieve date range!") {
          setError("Something went wrong. Please refresh!");
        } else {
          setBudgetHistory(response.data);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching budget:", error);
        setError("Failed to fetch budget data. Check your network connection");
      }
    };

    fetchBudgetByDate();
  }, [selectedDateRange]);

  return (
    <div className="budgetPage">
      <Header />
      {error ? (
        <div className="error">
          <p className="errors">{error}</p>
          <div>
            <button onClick={openModal} className="new">
              Set Next Month's Budget
            </button>
            <Modal open={isOpen} onClose={closeModal}>
              <BudgetForm onSave={handleSubmit} />
            </Modal>
          </div>
        </div>
      ) : (
        <div className="budgetComponent">
          <div className="progress">
            <h1>Budget for The Current Month</h1>
            {budgetData &&
            budgetData.categories &&
            budgetData.categories.length > 0 ? (
              budgetData.categories.map((category) => (
                <div key={category.name} className="categoryProgress">
                  <h2>{category.name}</h2>
                  <p>Budget: {category.amount}</p>
                </div>
              ))
            ) : (
              <p>No budget set for the current month or still loading...</p>
            )}
          </div>

          <div className="history">
            <h1>Budget History</h1>
            <div className="dateRangeSelector">
              <DatePicker
                selected={selectedDateRange[0]}
                onChange={(dates) => setSelectedDateRange(dates)}
                startDate={selectedDateRange[0]}
                endDate={selectedDateRange[1]}
                selectsRange
                inline
              />
            </div>
            {/* History budget display could go here */}
            <div className="month">
              <div className="main"></div>
              {budgetHistory &&
              budgetHistory.categories &&
              budgetHistory.categories.length > 0
                ? budgetHistory.categories.map((category) => (
                    <div key={category.name} className="categoryProgress">
                      <h2>{category.name}</h2>
                      <p>Budget: {category.amount}</p>
                    </div>
                  ))
                : {
                    // selectedDateRange.length > 0 ? (<p>No budget set for the selected month or still loading...</p>) : ( <p> Please select a range you want to view budget history of!</p>)
                  }}
            </div>
          </div>

          <div className="new">
            <button onClick={openModal}>Set Next Month's Budget</button>
            <Modal open={isOpen} onClose={closeModal}>
              <BudgetForm onSave={handleSubmit} />
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
