import type { Expense } from "../types/expense.ts";

//const API_URL = "http://localhost:5000/api";

const API_URL = "https://expense-tracker-assessment-3.onrender.com/api";

export const getExpenses = async (
  category?: string,
  from?: string,
  to?: string,
) => {
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (from) params.append("from", from);
  if (to) params.append("to", to);

  const response = await fetch(`${API_URL}/expenses?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }

  return response.json();
};

export const createExpense = async (expense: Expense) => {
  const response = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
    throw new Error("Failed to create expense");
  }

  return response.json();
};

export const deleteExpense = async (id: number) => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }

  return response.json();
};

export const getSummary = async () => {
  const response = await fetch(`${API_URL}/summary`);

  if (!response.ok) {
    throw new Error("Failed to fetch summary");
  }

  return response.json();
};
