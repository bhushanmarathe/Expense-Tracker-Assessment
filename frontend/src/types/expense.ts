export interface Expense {
  id?: number;
  amount: number;
  category: string;
  expense_date: string;
  note?: string;
}

export interface Summary {
  category: string;
  total: number;
}
