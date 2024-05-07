"use client";
import { useState, useEffect } from "react";
import { Typography, Paper, CircularProgress } from "@mui/material";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import ExpenseList from "../components/Expenses/ExpenseList";
import ExpenseTable from "../components/Expenses/ExpenseTable";
import { Expense } from "@/types/types";
import { useUser } from "@clerk/nextjs";

const ExpensePage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(isSignedIn);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses");
      const data = await response.json();
      console.log(data);
      setExpenses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to access this page.</div>;
  }

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
            <ExpenseTable
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
