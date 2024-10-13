import React, { useState } from "react";
import "./Form.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const BudgetForm = ({ initialData, onSave }) => {
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  const [foodAmount, setFoodAmount] = useState(0);
  const [transportationAmount, setTransportationAmount] = useState(0);
  const [entertainmentAmount, setEntertainmentAmount] = useState(0);
  const [necessitiesAmount, setNecessitiesAmount] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    if (!startDate || !endDate || amount <= 0) {
      setError(
        "Please fill in all required fields and ensure amounts are valid."
      );
      return;
    }

    const input = {
      user: localStorage.getItem("userId"),
      category: [
        { name: "food", amount: foodAmount },
        { name: "transportation", amount: transportationAmount },
        { name: "entertainment", amount: entertainmentAmount },
        { name: "necessities", amount: necessitiesAmount },
      ],
      startDate,
      endDate,
    };

    onSave(input);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="formItems">
          <label htmlFor="startDate">Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) =>
              setStartDate(format(new Date(date), "MM/dd/yyyy"))
            }
          />
        </div>
        <div className="formItems">
          <label htmlFor="endDate">End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) =>
              setEndDate(format(new Date(date), "MM/dd/yyyy"))
            }
          />
        </div>
        <div className="formItems">
          <label htmlFor="total">Total Budget</label>
          <input
            type="number"
            name="total"
            id="total"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="formItems">
          <label htmlFor="food">Food</label>
          <input
            type="number"
            name="food"
            id="food"
            value={foodAmount}
            onChange={(e) => setFoodAmount(e.target.value)}
          />
        </div>
        <div className="formItems">
          <label htmlFor="transportation">Transportation</label>
          <input
            type="number"
            name="transportation"
            id="transportation"
            value={transportationAmount}
            onChange={(e) => setTransportationAmount(e.target.value)}
          />
        </div>
        <div className="formItems">
          <label htmlFor="entertainment">Entertainment</label>
          <input
            type="number"
            name="entertainment"
            id="entertainment"
            value={entertainmentAmount}
            onChange={(e) => setEntertainmentAmount(e.target.value)}
          />
        </div>
        <div className="formItems">
          <label htmlFor="necessities">Necessities</label>
          <input
            type="number"
            name="necessities"
            id="necessities"
            value={necessitiesAmount}
            onChange={(e) => setNecessitiesAmount(e.target.value)}
          />
        </div>
        <div className="error">{error}</div>
        <div className="formItems">
          <button type="submit" className="submitBtn">
            Set Budget
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;
