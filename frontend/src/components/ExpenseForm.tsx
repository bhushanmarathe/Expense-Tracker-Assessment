import { useState } from "react";
import { createExpense } from "../services/expenseService";

interface Props {
  onExpenseAdded: () => void;
}

export default function ExpenseForm({ onExpenseAdded }: Props) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !expenseDate) {
      alert("Please fill all required fields");
      return;
    }

    await createExpense({
      amount: Number(amount),
      category,
      expense_date: expenseDate,
      note,
    });

    setAmount("");
    setCategory("");
    setExpenseDate("");
    setNote("");

    onExpenseAdded();
  };

  return (
    <>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button type="submit">Add Expense</button>
      </form>
    </>
  );
}
