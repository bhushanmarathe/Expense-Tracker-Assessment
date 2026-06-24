import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.number().positive(),
  category: z.string().min(1),
  expense_date: z.string(),
  note: z.string().optional(),
});
