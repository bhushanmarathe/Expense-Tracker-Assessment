import { useEffect, useState } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

import {
  getExpenses,
  deleteExpense,
  getSummary,
} from "./services/expenseService";

import type { Expense, Summary as SummaryType } from "./types/expense";

import "./App.css";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [summary, setSummary] = useState<SummaryType[]>([]);

  const [category, setCategory] = useState("");

  const [from, setFrom] = useState("");

  const [to, setTo] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const expensesData = await getExpenses(category, from, to);

      const summaryData = await getSummary();

      setExpenses(expensesData);
      setSummary(summaryData);
    } catch (err) {
      setError("Failed to load data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilter = async () => {
    try {
      setLoading(true);

      const data = await getExpenses(category, from, to);

      setExpenses(data);
    } catch (err) {
      setError("Failed to apply filters.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this expense?");

    if (!confirmed) return;

    try {
      await deleteExpense(id);
      loadData();
    } catch (err) {
      setError("Failed to delete expense.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <ExpenseForm onExpenseAdded={loadData} />
      </div>

      <div className="card">
        <h2>Filters</h2>

        <div className="filters">
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <button onClick={handleFilter}>Apply Filters</button>
        </div>
      </div>

      <div className="card">
        <h2>Expenses</h2>

        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      </div>

      <div className="card">
        <Summary summary={summary} />
      </div>

      <footer>Built with React, TypeScript, Express & MySQL</footer>
    </div>
  );
}

export default App;
