# Expense Tracker

A full-stack expense tracking application built with React, TypeScript, Node.js, Express, and MySQL.

## Features

- Add expenses with amount, category, date, and optional note
- View all expenses
- Filter expenses by category and date range
- Delete expenses
- View category-wise spending summary
- Loading, empty, and error states
- RESTful API architecture
- MySQL database integration

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Fetch API

### Backend

- Node.js
- Express
- TypeScript
- MySQL
- Zod Validation

### Database

- MySQL

---

## Database Schema

### expenses

| Column       | Type                           |
| ------------ | ------------------------------ |
| id           | INT AUTO_INCREMENT PRIMARY KEY |
| amount       | DECIMAL(10,2)                  |
| category     | VARCHAR(100)                   |
| expense_date | DATE                           |
| note         | TEXT                           |
| created_at   | TIMESTAMP                      |

### Design Decisions

- `id` is used as the primary key for unique identification.
- `DECIMAL(10,2)` is used for accurate currency storage.
- `DATE` is used for expense tracking and filtering.
- `created_at` helps track when records are added.
- Indexes were added on category and expense_date to improve filtering performance.

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd expense-tracker
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_tracker
```

Start server:

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## Database Setup

Create database:

```sql
CREATE DATABASE expense_tracker;
```

Use database:

```sql
USE expense_tracker;
```

Create table:

```sql
CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    expense_date DATE NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Create indexes:

```sql
CREATE INDEX idx_category ON expenses(category);
CREATE INDEX idx_expense_date ON expenses(expense_date);
```

---

## API Endpoints

### Create Expense

POST /api/expenses

### Get Expenses

GET /api/expenses

Optional query parameters:

- category
- from
- to

Example:

```http
GET /api/expenses?category=Food
```

### Delete Expense

DELETE /api/expenses/:id

### Category Summary

GET /api/summary

---

## Future Improvements

Given more time, I would add:

- Edit expense functionality
- Authentication and user accounts
- Pagination
- Unit and integration tests
- Docker support
- CI/CD pipeline
- Cloud deployment
- Advanced analytics and charts

---

## Assumptions

- Single-user application
- No authentication required
- Expenses can be deleted but not edited
- Summary is calculated across all recorded expenses
