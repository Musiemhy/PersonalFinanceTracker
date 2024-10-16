import React from "react";
import { Link } from "react-router-dom";
import CardItems from "../../components/CardItems/CardItems";
import "./LandingPage.scss";

const LandingPage = () => {
  const title1 = "Student Version";
  const title2 = "Professional Version";
  const icon1 = "/student.mp4";
  const icon2 = "/proffesional.mp4";
  const text1 = "Simple budgeting and financial tracking, ideal for students.";
  const text2 = "Advanced financial management, suitable for professionals.";
  const description1 =
    "Designed for students to help manage your daily expenses, savings, and budgets in a simple and intuitive way. Keep track of your financial health while focusing on your studies.";
  const description2 =
    "For professionals who need advanced financial tracking, investment management, and detailed reporting to stay on top of their finances. Ideal for managing multiple income streams, savings, and financial planning.";

  return (
    <div className="landing">
      <h1 className="headerLanding">Choose Your Plan</h1>
      <h4 className="headerLanding">
        Select the plan that best fits your needs.
      </h4>
      <div className="cardsLanding">
        <div className="card-items1Landing">
          <Link to="/signup">
            <CardItems
              title={title1}
              cardNumber={1}
              icon={icon1}
              text={text1}
              description={description1}
            />
          </Link>
        </div>
        <div className="card-items2Landing">
          <Link to="/comingsoon">
            <CardItems
              title={title2}
              cardNumber={2}
              icon={icon2}
              text={text2}
              description={description2}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
