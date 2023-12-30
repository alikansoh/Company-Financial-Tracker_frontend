import React from "react";
import "./FinanceState.css";
// import LoadingRing from './CircleLoader/CircleLoader.jsx'
import RingChart from "./RingChart/RingChart.jsx";
// FinanceState.jsx

const FinanceState = ({ title, amount, percent }) => {
  const Title = title;
  const Amount = amount;
  const Percent = percent;
  const textAmountColor = `text${title}Color`;
  console.log(textAmountColor);
  const textAmountColorSpliting = textAmountColor.split(" ");
  const textColorAmount = textAmountColorSpliting[0];
  return (
    <div className="financeStateComponent">
      <div className="textAndMoney">
        <h1 className="financeTitleText">{Title}</h1>
        <h1 className={textColorAmount}>${Amount}</h1>
      </div>
      <div className="financeRing">
        <RingChart percentage={Percent} ringColor={Title}></RingChart>
      </div>
    </div>
  );
};

export default FinanceState;
