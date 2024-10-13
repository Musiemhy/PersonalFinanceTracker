import { useState } from "react";
import "./HomePage.scss";
import Header from "../../components/Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HomePage = () => {
  const name = localStorage.getItem("name");
  const [selectedDateRange, setSelectedDateRange] = useState([
    new Date() - 30,
    new Date(),
  ]);

  return (
    <div className="homePage">
      <div className="homeHeader">
        <Header />
        <div className="message">
          <h1>Welcome, {name}</h1>
          <p>This is your financial overview report.</p>
          <DatePicker
            className="date"
            selected={selectedDateRange[0]}
            onChange={(dates) => setSelectedDateRange(dates)}
            maxDate={new Date()}
            startDate={selectedDateRange[0]}
            endDate={selectedDateRange[1]}
            showYearDropdown
            scrollableMonthYearDropdown
            selectsRange
          />
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
    </div>
  );
};

export default HomePage;
