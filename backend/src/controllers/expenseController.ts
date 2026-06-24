import { Request, Response } from "express";
import { pool } from "../db/connection";
import { expenseSchema } from "../validations/expenseSchema";

export const createExpense = async (req: Request, res: Response) => {
  try {
    const validatedData = expenseSchema.parse(req.body);

    const { amount, category, expense_date, note } = validatedData;

    const [result]: any = await pool.query(
      `
      INSERT INTO expenses
      (amount, category, expense_date, note)
      VALUES (?, ?, ?, ?)
      `,
      [amount, category, expense_date, note],
    );

    res.status(201).json({
      message: "Expense created",
      id: result.insertId,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const { category, from, to } = req.query;

    let query = `
      SELECT *
      FROM expenses
      WHERE 1=1
    `;

    const params: any[] = [];

    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }

    if (from) {
      query += ` AND expense_date >= ?`;
      params.push(from);
    }

    if (to) {
      query += ` AND expense_date <= ?`;
      params.push(to);
    }

    query += ` ORDER BY expense_date DESC`;

    const [rows] = await pool.query(query, params);

    res.json(rows);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result]: any = await pool.query(
      `
      DELETE FROM expenses
      WHERE id = ?
      `,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({
      message: "Expense deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSummary = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        category,
        SUM(amount) AS total
      FROM expenses
      GROUP BY category
      ORDER BY total DESC
    `);

    res.json(rows);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
