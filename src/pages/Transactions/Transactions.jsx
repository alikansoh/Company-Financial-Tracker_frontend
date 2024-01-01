import React, { useEffect, useState } from "react";
import "./Transactions.css";
import addIcon from "../../images/add-icon.png";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import chroma from "chroma-js";
import editImage from "../Users/edit.png";
import deleteImage from "../Users/delete.png";

import TransactionsPagination from "./Paginagion";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function Transactions() {
  const [selectedButton, setSelectedButton] = useState(3);
  const [balance, setBalance] = useState(0);
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const[updateTransaction,setUpdateTransaction]=useState("");

  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedchart, setSelectedChart] = useState("expenses");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [categoriesIncome, setCategoriesIncome] = useState(1);
  const [amountIncome, setAmountIncome] = useState("");
  const [descriptionIncome, setDescriptionIncome] = useState("");

  const [categoriesExpense, setCategoriesExpense] = useState("1");
  const [amountExpense, setAmountExpense] = useState("");
  const [descriptionExpense, setDescriptionExpense] = useState("");


  const [categoriesExpenseUpdate, setCategoriesExpenseUpdate] = useState("");
  const [amountExpenseUpdate, setAmountExpenseUpdate] = useState("");
  const [descriptionExpenseUpdate, setDescriptionExpenseUpdate] = useState("");

  const [userID, setUserID] = useState("");
  const [AllCategoriesIncomes, setAllCategoriesIncomes] = useState([]);
  const [AllCategoriesExpenses, setAllCategoriesExpenses] = useState([]);

  const totalTransactions = transactions.length;
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchTransactions = async () => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    const monthDaysAgo = new Date(currentDate);
    const yearDaysAgo = new Date(currentDate);

    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    monthDaysAgo.setDate(currentDate.getDate() - 30);
    yearDaysAgo.setDate(currentDate.getDate() - 365);

    const response = await axios.get(
      "http://localhost:4000/api/transactions/transaction",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    let filteredTransactions = [];

    if (selectedButton === 1) {
      filteredTransactions = response.data.filter((transaction) => {
        const transactionDate = new Date(transaction.data);
        return (
          transactionDate >= sevenDaysAgo && transactionDate <= currentDate
        );
      });
    } else if (selectedButton === 2) {
      filteredTransactions = response.data.filter((transaction) => {
        const transactionDate = new Date(transaction.data);
        return (
          transactionDate >= monthDaysAgo && transactionDate <= currentDate
        );
      });
    } else {
      filteredTransactions = response.data.filter((transaction) => {
        const transactionDate = new Date(transaction.data);
        return transactionDate >= yearDaysAgo && transactionDate <= currentDate;
      });
    }

    setTransactions(filteredTransactions);
  };

  const getAllCategoriesIncomes = () => {
    const uniqueCategories = [
      ...new Set(
        transactions.map((transaction) => {
          if (transaction.transaction_type) transaction.category.name;
        })
      ),
    ];
    setAllCategoriesIncomes(uniqueCategories);
  };

  const getAllCategoriesExpense = () => {
    const uniqueCategories = [
      ...new Set(
        transactions.map((transaction) => {
          if (!transaction.transaction_type) transaction.category.name;
        })
      ),
    ];
    setAllCategoriesExpenses(uniqueCategories);
  };

  const DeleteIncome = async (transactionId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!userConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/transactions/transaction/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Transaction has been deleted");

      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => transaction.id !== transactionId
        )
      );

      return response;
    } catch (error) {
      console.error("Error deleting income:", error);
      return null;
    }
  };

  const generateColorScale = (numCategories) => {
    return chroma.scale(["#421C5F", "#ffff"]).colors(numCategories);
  };

  const fetchCategories = async () => {
    const response = await axios.get(
      "http://localhost:4000/api/categories/category",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setCategories(response.data);
  };

  const fetchCompanies = async () => {
    const response = await axios.get(
      "http://localhost:4000/api/companies/balance",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setBalance(response.data.balance);
  };

  const showFormHandler = () => {
    setShowForm(true);
  };

  const hideFormHandler = () => {
    setShowForm(false);
  };

  const showFormHandler2 = () => {
    setShowForm2(true);
  };

  const hideFormHandler2 = () => {
    setShowForm2(false);
  };

  const showFormHandler3 =async (transactionId) => {
    setShowForm3(true);
    setUpdateTransaction(transactionId)
    const response = await axios.get(
      `http://localhost:4000/api/transactions/transaction/${transactionId}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setAmountExpenseUpdate(response.data.amount)
    setCategoriesExpenseUpdate(response.data.category_id)
    setDescriptionExpenseUpdate(response.data.description)

  };

  const hideFormHandler3 = () => {
    setShowForm3(false);
    setUpdateTransaction("")
    setAmountExpenseUpdate("")
    setDescriptionExpenseUpdate("")
    setCategoriesExpenseUpdate("")
  };

  const addIncomesHandler = async () => {
    try {
      let date = new Date();
      let type = 1;

      if (
        !amountIncome ||
        !date ||
        !descriptionIncome ||
        !userID ||
        !categoriesIncome ||
        !type
      ) {
        console.error("Some required fields are missing.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/transactions/transaction",
        {
          amount: amountIncome,
          data: date,
          description: descriptionIncome,
          user_id: userID,
          category_id: categoriesIncome,
          transaction_type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDescriptionIncome("");
      setAmountIncome("");
      alert("Transactions added successfully");
      console.log(response.data);
      fetchTransactions();
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const addExpensesHandler = async () => {
    try {
      let date = new Date();
      let type = 0;

      if (
        !amountExpense ||
        !date ||
        !descriptionExpense ||
        !userID ||
        !categoriesExpense
      ) {
        console.error("Some required fields are missing.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/transactions/transaction",
        {
          amount: amountExpense,
          data: date,
          description: descriptionExpense,
          user_id: userID,
          category_id: categoriesExpense,
          transaction_type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDescriptionExpense(" ");
      setAmountExpense(" ");
      alert("Transactions added successfully");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
    fetchTransactions();
  };

  const calculateIncomes = async () => {
    let sum = 0;
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    const monthDaysAgo = new Date();
    const yearDaysAgo = new Date();

    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    monthDaysAgo.setDate(currentDate.getDate() - 30);
    yearDaysAgo.setDate(currentDate.getDate() - 365);

    if (selectedButton === 1) {
      for (let i = 0; i < transactions.length; i++) {
        let transactionDate = new Date(transactions[i].data);

        if (
          transactions[i].transaction_type &&
          transactionDate >= sevenDaysAgo &&
          transactionDate <= currentDate
        ) {
          sum += transactions[i].amount;
        }
      }
    }

    if (selectedButton === 2) {
      for (let i = 0; i < transactions.length; i++) {
        let transactionDate = new Date(transactions[i].data);

        if (
          transactions[i].transaction_type &&
          transactionDate >= monthDaysAgo &&
          transactionDate <= currentDate
        ) {
          sum += transactions[i].amount;
        }
      }
    }

    if (selectedButton === 3) {
      for (let i = 0; i < transactions.length; i++) {
        let transactionDate = new Date(transactions[i].data);

        if (
          transactions[i].transaction_type &&
          transactionDate >= yearDaysAgo &&
          transactionDate <= currentDate
        ) {
          sum += transactions[i].amount;
        }
      }
    }

    setIncomes(sum);
  };

  const calculateExpenses = async () => {
    let sum = 0;
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    const monthDaysAgo = new Date();
    const yearDaysAgo = new Date();

    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    monthDaysAgo.setDate(currentDate.getDate() - 30);
    yearDaysAgo.setDate(currentDate.getDate() - 365);

    if (selectedButton === 1) {
      for (let i = 0; i < transactions.length; i++) {
        let transactionDate = new Date(transactions[i].data);

        if (
          !transactions[i].transaction_type &&
          transactionDate >= sevenDaysAgo &&
          transactionDate <= currentDate
        ) {
          sum += transactions[i].amount;
        }
      }
    }

    if (selectedButton === 2) {
      for (let i = 0; i < transactions.length; i++) {
        let transactionDate = new Date(transactions[i].data);

        if (
          !transactions[i].transaction_type &&
          transactionDate >= monthDaysAgo &&
          transactionDate <= currentDate
        ) {
          sum += transactions[i].amount;
        }
      }
    }

    if (selectedButton === 3) {
      for (let i = 0; i < transactions.length; i++) {
        let transactionDate = new Date(transactions[i].data);

        if (
          !transactions[i].transaction_type &&
          transactionDate >= yearDaysAgo &&
          transactionDate <= currentDate
        ) {
          sum += transactions[i].amount;
        }
      }
    }

    setExpenses(sum);
  };

  const editExpensesHandler = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to update this transaction?"
    );
  
    if (!userConfirmed) {
      return;
    }
  
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/transactions/transaction/${updateTransaction}`,
        {
          amount: amountExpenseUpdate,
          description: descriptionExpenseUpdate,
          category_id: categoriesExpenseUpdate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      alert("Transaction has been updated successfully");
  
      fetchTransactions()
      setShowForm3(false)
  
      return response;
    } catch (error) {
      console.error("Error updating expense:", error);
      return null;
    }
  };
  





   
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      setUserID(decoded.id);
    } catch (error) {
      console.log(error);
    }
    fetchCompanies();
    calculateIncomes();
    fetchCategories();
    fetchTransactions();
  }, []);
  useEffect(() => {
    fetchTransactions();
  }, [selectedButton]);

  useEffect(() => {
    calculateIncomes();
    calculateExpenses();
    fetchCompanies();
    getAllCategoriesIncomes();
    getAllCategoriesExpense();
  }, [transactions, selectedButton]);

  useEffect(() => {
    const numCategoriesIncomes = setTimeout(() => {}, "1ms");
    AllCategoriesIncomes.length;

    const colors = generateColorScale(numCategoriesIncomes);
    let filterTransactions = [];
    transactions.forEach((transaction) => {
      if (transaction.transaction_type) {
        filterTransactions.push(transaction);
      }
    });

    const categoryCounts = filterTransactions.reduce((counts, transaction) => {
      const category = transaction.category.name;

      counts[category] = (counts[category] || 0) + 1;

      return counts;
    }, {});
    const newData = {
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          label: "categories",
          data: Object.values(categoryCounts),
          backgroundColor: colors,
          borderColor: "white",
        },
      ],
    };
    console.log(categoryCounts);

    setChartData(newData);
  }, [AllCategoriesIncomes]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "categories",
        data: [],
        backgroundColor: [],
        borderColor: "white",
      },
    ],
  });

  useEffect(() => {
    const numCategories = setTimeout(() => {}, "1ms");
    AllCategoriesExpenses.length;

    const colors = generateColorScale(numCategories);
    let filterTransactions = [];
    transactions.forEach((transaction) => {
      if (transaction.transaction_type == 0) {
        filterTransactions.push(transaction);
      }
    });

    const categoryCounts = filterTransactions.reduce((counts, transaction) => {
      const category = transaction.category.name;

      counts[category] = (counts[category] || 0) + 1;

      return counts;
    }, {});
    const newDataExpense = {
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          label: "categories",
          data: Object.values(categoryCounts),
          backgroundColor: colors,
          borderColor: "white",
        },
      ],
    };
    console.log(categoryCounts);

    setChartDataExpense(newDataExpense);
  }, [AllCategoriesExpenses]);

  const [chartDataExpense, setChartDataExpense] = useState({
    labels: [],
    datasets: [
      {
        label: "categories",
        data: [],
        backgroundColor: [],
        borderColor: "white",
      },
    ],
  });

  return (
    <>
      <div className="button-container-transaction">
        <button
          className={
            selectedButton === 1 ? "selected-transaction" : "button-transaction"
          }
          onClick={() => setSelectedButton(1)}
        >
          Week
        </button>
        <button
          className={
            selectedButton === 2 ? "selected-transaction" : "button-transaction"
          }
          onClick={() => setSelectedButton(2)}
        >
          Month
        </button>
        <button
          className={
            selectedButton === 3 ? "selected-transaction" : "button-transaction"
          }
          onClick={() => setSelectedButton(3)}
        >
          Year
        </button>
        {/* <Button className="add-categories">Add new Transaction Categories </Button> */}
      </div>
      <div className="first-line-transaction">
        <div className="myBalecence-transaction">
          <p className="myBalence-txt-transaction">My Balance</p>
          <p className="myBalence-txt-value-transaction">${balance}</p>
        </div>
        <div className="incomes-transaction">
          <p className="incomes-txt-transaction">Incomes</p>
          <p className="incomes-txt-value-transaction">${incomes}</p>
          <a
            href="#"
            className="add-incomes-transaction"
            onClick={showFormHandler}
          >
            <img
              src={addIcon}
              className="add-icon-transction"
              alt="Add Income"
            />
            <p>
              Add new income
              <br />
              <p> Create a new income</p>
            </p>
          </a>
        </div>
        <div className="expenses-transaction">
          <p className="expenses-txt-transaction">Expenses</p>
          <p className="expenses-txt-value-transaction">${expenses}</p>
          <a
            href="#"
            className="add-expenses-transaction"
            onClick={showFormHandler2}
          >
            <img
              src={addIcon}
              className="add-icon-transction"
              alt="Add Expense"
            />
            <p>
              Add new expense
              <br />
              <p> Create a new expense</p>
            </p>
          </a>
        </div>
      </div>

      <div className="second-line-transaction">
        <div className="chart-container">
          <div className="first-line-chart-container">
            <p className="chart-description">
              Incomes and expenses by categories
            </p>
            <select onChange={(event) => setSelectedChart(event.target.value)}>
              <option value="expenses">Expenses</option>
              <option value="incomes">Incomes</option>
            </select>
          </div>

          {selectedchart === "incomes" ? (
            <Pie
              data={chartData}
              options={{
                responsive: true,
              }}
            />
          ) : (
            <Pie
              data={chartDataExpense}
              options={{
                responsive: true,
              }}
            />
          )}
        </div>
        <div className="Report-Recent-Transactions transaction-table">
          <p className="Report-Recent-Transactions-Header">
            Recent transactions
          </p>
          <p className="Report-Recent-Transactions-SubHeader">
            Check the last transactions in your account
          </p>
          <table className="Report-Recent-Transactions-Table transaction-table-table">
            <thead>
              <tr className="Report-Recent-Transactions-Table-Header">
                <th>Category</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="Report-Recent-Transactions-Table-Row"
                >
                  <td width={"auto"}>{transaction.category.name}</td>
                  <td>{transaction.transaction_type ? "Income" : "Expense"}</td>

                  <td width={"200px"}>{transaction.data}</td>
                  <td>${transaction.amount}</td>
                  <td>
                    <img
                      src={deleteImage}
                      onClick={() => DeleteIncome(transaction.id)}
                    />
                    <img
                      src={editImage}
                      onClick={() => showFormHandler3(transaction.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TransactionsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="pagination-transactions"
          />
        </div>
      </div>
      {showForm && (
        <div className="expense-income-form">
          <p className="title">
            <strong>Add new Income</strong>
          </p>
          <select onChange={(event) => setCategoriesIncome(event.target.value)}>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            onChange={(event) => setAmountIncome(event.target.value)}
            value={amountIncome}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(event) => setDescriptionIncome(event.target.value)}
            value={descriptionIncome}
          />

          <button onClick={hideFormHandler}>Cancel</button>
          <button onClick={addIncomesHandler}>Add</button>
        </div>
      )}

      {showForm2 && (
        <div className="expense-income-form">
          <p className="title">
            <strong>Add new Expense</strong>
          </p>
          <select
            onChange={(event) => setCategoriesExpense(event.target.value)}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            onChange={(event) => setAmountExpense(event.target.value)}
            value={amountExpense}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(event) => setDescriptionExpense(event.target.value)}
            value={descriptionExpense}
          />

          <button onClick={hideFormHandler2}>Cancel</button>
          <button onClick={addExpensesHandler}>Add</button>
        </div>
      )}

{showForm3 && (
        <div className="expense-income-form">
          <p className="title">
            <strong>Edit this transaction</strong>
          </p>
          <select
            onChange={(event) => setCategoriesExpenseUpdate(event.target.value)}
            value={categoriesExpenseUpdate}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            onChange={(event) => setAmountExpenseUpdate(event.target.value)}
            value={amountExpenseUpdate}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(event) => setDescriptionExpenseUpdate(event.target.value)}
            value={descriptionExpenseUpdate}
          />

          <button onClick={hideFormHandler3}>Cancel</button>
          <button onClick={editExpensesHandler}>Update</button>
        </div>
      )}
    </>
  );
}
