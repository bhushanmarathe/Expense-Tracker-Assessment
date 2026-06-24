import type { Expense } from "../types/expense";

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

export default function ExpenseList({ expenses, onDelete }: Props) {
  if (!expenses.length) {
    return <p>No expenses found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>₹{expense.amount}</td>

            <td>{expense.category}</td>

            <td>{expense.expense_date.split("T")[0]}</td>

            <td>{expense.note}</td>

            <td>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm("Delete this expense?")) {
                    onDelete(expense.id!);
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
