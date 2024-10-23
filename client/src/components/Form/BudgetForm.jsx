import React, { useState } from "react";
import "./BudgetForm.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BudgetForm = ({ initialData, onSave }) => {
  const [error, setError] = useState(null);
  const [foodAmount, setFoodAmount] = useState(0);
  const [transportationAmount, setTransportationAmount] = useState(0);
  const [entertainmentAmount, setEntertainmentAmount] = useState(0);
  const [necessitiesAmount, setNecessitiesAmount] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

  const formatDate = (date) => {
    date.setHours(0, 0, 0, 0);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    if (
      selectedDateRange.length < 0 ||
      foodAmount < 0 ||
      transportationAmount < 0 ||
      entertainmentAmount < 0 ||
      necessitiesAmount < 0
    ) {
      setError(
        "Please fill in all required fields and ensure amounts are valid."
      );
      return;
    }

    const input = {
      user: sessionStorage.getItem("userId"),
      category: [
        { name: "food", amount: Number(foodAmount) },
        { name: "transportation", amount: Number(transportationAmount) },
        { name: "entertainment", amount: Number(entertainmentAmount) },
        { name: "necessities", amount: Number(necessitiesAmount) },
      ],
      startDate: formatDate(selectedDateRange[0]),
      endDate: formatDate(selectedDateRange[1]),
    };

    onSave(input);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="formItem" id="#formItem1">
          <label htmlFor="necessities">Necessities</label>
          <input
            type="number"
            name="necessities"
            id="necessities"
            value={necessitiesAmount}
            onChange={(e) => setNecessitiesAmount(e.target.value)}
            min="0"
          />
        </div>
        <div className="formItem" id="#formItem2">
          <label htmlFor="food">Food</label>
          <input
            type="number"
            name="food"
            id="food"
            value={foodAmount}
            onChange={(e) => setFoodAmount(e.target.value)}
            min="0"
          />
        </div>
        <div className="formItem" id="#formItem3">
          <label htmlFor="transportation">Transportation</label>
          <input
            type="number"
            name="transportation"
            id="transportation"
            value={transportationAmount}
            onChange={(e) => setTransportationAmount(e.target.value)}
            min="0"
          />
        </div>
        <div className="formItem" id="#formItem4">
          <label htmlFor="entertainment">Entertainment</label>
          <input
            type="number"
            name="entertainment"
            id="entertainment"
            value={entertainmentAmount}
            onChange={(e) => setEntertainmentAmount(e.target.value)}
            min="0"
          />
        </div>
        <div className="formItem" id="#formItem5">
          <label htmlFor="date">Month: </label>
          <div className="monthdisplay">
            <DatePicker
              className="date"
              onChange={handleDateChange}
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
        <div className="error">{error}</div>
        <div className="submit" id="#formItem6">
          <button type="submit" className="submitBtn">
            Set Budget
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;
