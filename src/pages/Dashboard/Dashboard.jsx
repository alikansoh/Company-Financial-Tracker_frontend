import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import Graph from "../../components/GraphDashBoard/GraphDashBoard.jsx";
import FinanceState from "../../components/FinanceState/FinanceState.jsx";
import UserRecent from "../../components/UserRecent/UserRecent.jsx";
import Goals from "../../components/GoalsComponent/GoalsComponent.jsx";

const Dashboard = () => {
  const [company, setCompany] = useState([]);
  const [allTransaction, setAllTransaction] = useState([]);

  const [allRecentUsers, setAllRecentUsers] = useState([]);
  const [allGoals, setAllGoals] = useState([]);

  const [capitalAmount, setcapitalAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [incomesAmount, setIncomesAmount] = useState(0);
  const [expensesAmount, setExpensesAmount] = useState(0);
  const [percentBalanceAmount, setPercentBalanceAmount] = useState(0);
  const [percentIncomesAmount, setPercentIncomesAmount] = useState(0);
  const [percentExpensesAmount, setPercentExpensesAmount] = useState(0);
  const [Last7Days, setLast7Days] = useState({ incomes: [], expenses: [] });

  useEffect(() => {
    const fetchCompaniesBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/companies/company",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCompany(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompaniesBalance();
  }, []);

  useEffect(() => {
    const fetchUserRecent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/users/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAllRecentUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching recent user data:", error);
      }
    };

    fetchUserRecent();
  }, []);

  useEffect(() => {
    const fetchAllGoals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/goals/goal",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAllGoals(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching balance data:", error);
      }
    };

    fetchAllGoals();
  }, []);

  useEffect(() => {
    const fetchTransactionsAmount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/transactions/transaction",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAllTransaction(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionsAmount();
  }, []);

  useEffect(() => {
    setingBalanceAndCaptialAndPercentage();
  }, [company, incomesAmount, expensesAmount]);

  useEffect(() => {
    sumOfAllTransaction();
    getLast7DaysTransactions();
  }, [allTransaction]);

  useEffect(() => {
    setPercentageOfallTransaction();
  }, [transactionAmount]);

  const setingBalanceAndCaptialAndPercentage = () => {
    let capitalValue = company?.[0] ? company[0].capital : 0;
    let balanceValue = capitalValue + incomesAmount - expensesAmount;
    let percentageBalanceValue = (expensesAmount / balanceValue) * 100;

    setcapitalAmount(capitalValue);
    console.log(capitalValue);
    setBalanceAmount(balanceValue);
    console.log(balanceValue);
    setPercentBalanceAmount(percentageBalanceValue);
    console.log(percentageBalanceValue);
  };

  const sumOfAllTransaction = () => {
    let sumOfAllTransaction = 0;
    let sumOfIncomes = 0;
    let sumOfExpense = 0;

    for (let i = 0; i < allTransaction.length; i++) {
      sumOfAllTransaction += allTransaction[i].amount;
      if (allTransaction[i].transaction_type) {
        sumOfIncomes += allTransaction[i].amount;
      } else {
        sumOfExpense += allTransaction[i].amount;
      }
    }

    setTransactionAmount(sumOfAllTransaction);
    setIncomesAmount(sumOfIncomes);
    setExpensesAmount(sumOfExpense);
  };

  const setPercentageOfallTransaction = () => {
    let percentageOfIncomes = 0;
    let percentageOfExpenses = 0;
    percentageOfIncomes = transactionAmount
      ? (incomesAmount / transactionAmount) * 100
      : 0;
    percentageOfExpenses = transactionAmount
      ? (expensesAmount / transactionAmount) * 100
      : 0;
    setPercentIncomesAmount(percentageOfIncomes);
    setPercentExpensesAmount(percentageOfExpenses);
  };

  const getLast7DaysTransactions = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();

    const todayIndex = currentDate.getDay(); // Get the index of today (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

    // Rearrange the daysOfWeek array to start from today
    const last7DaysOfWeek = [
      ...daysOfWeek.slice(todayIndex + 1),
      ...daysOfWeek.slice(0, todayIndex + 1),
    ];

    const last7DaysIncomes = Array(7).fill(0);
    const last7DaysExpenses = Array(7).fill(0);

    for (let i = 0; i < allTransaction.length; i++) {
      const transactionDate = new Date(allTransaction[i].data);
      console.log(allTransaction[i].amount, transactionDate.getDay());
      const dayIndex = last7DaysOfWeek.indexOf(
        daysOfWeek[transactionDate.getDay()]
      );

      // Calculate the difference in milliseconds
      const timeDifference = currentDate - transactionDate;

      // Calculate the difference in days
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // Only process transactions that are within the last 7 days
      if (daysDifference < 7) {
        if (dayIndex !== -1) {
          if (allTransaction[i].transaction_type) {
            last7DaysIncomes[dayIndex] += allTransaction[i].amount;
          } else {
            last7DaysExpenses[dayIndex] += allTransaction[i].amount;
          }
        }
      }
    }

    setLast7Days({ incomes: last7DaysIncomes, expenses: last7DaysExpenses });
  };

  const amountObject = {
    data: [
      {
        title: "My Balance",
        amount: balanceAmount,
        percent: percentBalanceAmount.toFixed(1),
        className: "myBalanceFunction",
      },
      {
        title: "Incomes",
        amount: incomesAmount,
        percent: percentIncomesAmount.toFixed(1),
        className: "incomeFunction",
      },
      {
        title: "Expenses",
        amount: expensesAmount,
        percent: percentExpensesAmount.toFixed(1),
        className: "expenseFunction",
      },
    ],
  };

  return (
    <div className="mainDashboard">
      <div className="mainFeatures">
        <div className="functionsMain">
          {amountObject.data.map((item, index) => (
            <div className={item.className} key={index}>
              <FinanceState
                title={item.title}
                amount={item.amount}
                percent={item.percent}
              />
            </div>
          ))}
        </div>
        <div className="graphsMain">
          <Graph
            incomesValues={Last7Days.incomes}
            expensesValues={Last7Days.expenses}
          />
        </div>
        <div className="recentUsersMain">
          <div className="recentUsersTitle">
            <h1>Recent Users</h1>
          </div>
          {/* <div className="recentUsersInfo"> */}
          <table className="recentUsersInfo">
            {allRecentUsers
              .slice(-2)
              .reverse()
              .map((item, index) => (
                <UserRecent
                  key={index}
                  userRecent={item.username}
                  userRole={item.role.name}
                />
              ))}
          </table>
          {/* </div> */}
        </div>
      </div>
      <div className="mainGoals">
        <h1 className="mainGoalText">Goals:</h1>
        {allGoals.slice(0, 5).map((item, index) => (
          <Goals
            key={index}
            balanceAmount={balanceAmount}
            goalName={item.name}
            goalDate={new Date(item.endDate)}
            goalTarget={item.target}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
