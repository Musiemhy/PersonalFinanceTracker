import React, { useState } from "react";
import "./Form.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RadioButton from "../RadioButton/RadioButton";

const Form = ({ initialData, onSave }) => {
  const userId = sessionStorage.getItem("userId");
  const [error, setError] = useState(null);

  const [input, setInput] = useState({
    User: userId,
    type: initialData ? initialData.type : "",
    category: initialData ? initialData.category : "",
    amount: initialData ? initialData.amount : "",
    reason: initialData ? initialData.reason : "",
    date: initialData ? initialData.transactionDate : null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setInput({
      ...input,
      date: date,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      if (initialData) {
        if (
          !input.type ||
          !input.category ||
          !input.amount ||
          !input.reason ||
          !input.date
        ) {
          setError("Please fill all required fields!");
        } else {
          onSave({
            ...input,
            id: initialData?.id,
          });
        }
      } else {
        if (
          !input.type ||
          !input.category ||
          !input.amount ||
          !input.reason ||
          !input.date
        ) {
          setError("Please fill all required fields!");
        } else {
          onSave({
            ...input,
            id: initialData?.id,
          });
        }
      }
    } catch (error) {
      console.error("The error is: ", error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="formItem" id="formItem1">
          <label htmlFor="type"> TYPE: </label>
          <div className="radioGroup">
            <RadioButton
              name={"type"}
              className={"type"}
              id={"income"}
              value={"income"}
              checked={input.type === "income"}
              onChange={handleChange}
              text={"Income"}
            />
            <RadioButton
              name={"type"}
              className={"type"}
              id={"expense"}
              value={"expense"}
              checked={input.type === "expense"}
              onChange={handleChange}
              text={"Expense"}
            />
          </div>
        </div>
        <div className="formItem" id="formItem2">
          <label htmlFor="date"> DATE: </label>
          <DatePicker
            id="date"
            selected={input.date}
            onChange={handleDateChange}
            maxDate={new Date()}
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <div className="formItem" id="formItem3">
          <label htmlFor="amount"> AMOUNT: </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={input.amount}
            onChange={handleChange}
          />
        </div>
        <div className="formItem" id="formItem4">
          <label htmlFor="category"> CATEGORY: </label>
          {input.type === "expense" && (
            <div className="radioGroup1">
              <RadioButton
                name={"category"}
                className={"category"}
                id={"payment"}
                value={"payment"}
                checked={input.category === "payment"}
                onChange={handleChange}
                text={"Payment"}
              />
              <RadioButton
                name={"category"}
                className={"category"}
                id={"transfer"}
                value={"transfer"}
                checked={input.category === "transfer"}
                onChange={handleChange}
                text={"Transfer"}
              />
              <RadioButton
                name={"category"}
                className={"category"}
                id={"withdrawal"}
                value={"withdrawal"}
                checked={input.category === "withdrawal"}
                onChange={handleChange}
                text={"Withdrawal"}
              />
            </div>
          )}
          {input.type === "income" && (
            <div className="radioGroup">
              <RadioButton
                name={"category"}
                className={"category"}
                id={"salary"}
                value={"salary"}
                checked={input.category === "salary"}
                onChange={handleChange}
                text={"Salary"}
              />
              <RadioButton
                name={"category"}
                className={"category"}
                id={"refund"}
                value={"refund"}
                checked={input.category === "refund"}
                onChange={handleChange}
                text={"Refund"}
              />
            </div>
          )}
        </div>
        <div className="formItem" id="formItem5">
          <label htmlFor="reason"> REASON: </label>
          <textarea
            name="reason"
            id="reason"
            value={input.reason}
            onChange={handleChange}
          />
        </div>
        <div className="error">{error}</div>
        <div className="submit" id="formItem6">
          <button type="submit" className="submitBtn">
            {initialData ? "Update Transaction" : "Add Transaction"}
          </button>
          <button
            type="reset"
            onClick={(e) =>
              setInput({
                User: userId,
                type: "",
                category: "",
                amount: "",
                reason: "",
                date: "",
              })
            }
            className="submitBtn"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
