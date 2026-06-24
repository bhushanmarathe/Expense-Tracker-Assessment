import { Router } from "express";

import {
  createExpense,
  getExpenses,
  deleteExpense,
  getSummary,
} from "../controllers/expenseController";

const router = Router();

router.post("/expenses", createExpense);
router.get("/expenses", getExpenses);
router.delete("/expenses/:id", deleteExpense);
router.get("/summary", getSummary);

export default router;
