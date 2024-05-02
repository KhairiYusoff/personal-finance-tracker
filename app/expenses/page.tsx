"use client";
import { useState, useEffect } from "react";
import { Typography, Paper, CircularProgress } from "@mui/material";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { Expense } from "@/types/types";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses");
      const data = await response.json();
      setExpenses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setLoading(false);
    }
  };

  const handleExpenseAdded = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleExpenseUpdated = (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
  };

  const handleExpenseDeleted = (deletedExpenseId: string) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== deletedExpenseId
    );
    setExpenses(updatedExpenses);
  };

  return (
    <Paper elevation={3} className="m-4 p-4">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Daily Expenses
          </Typography>
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        </div>
        <div className="w-full">
          {loading ? (
            <div className="text-center mt-8">
              <CircularProgress />
            </div>
          ) : (
            <ExpenseList
              expenses={expenses}
              onExpenseUpdated={handleExpenseUpdated}
              onExpenseDeleted={handleExpenseDeleted}
            />
          )}
        </div>
      </div>
    </Paper>
  );
};

export default ExpensePage;
