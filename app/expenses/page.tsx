"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  CircularProgress,
  Box,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import ExpenseList from "../components/Expenses/ExpenseList";
import ExpenseTable from "../components/Expenses/ExpenseTable";
import { Expense } from "@/types/types";
import { useUser } from "@clerk/nextjs";

const ExpensePage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState(0);
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

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue);
    setSelectedTab(newValue);
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col h-[80vh] justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col h-[80vh] justify-center items-center">
        Please sign in to access this page.
      </div>
    );
  }

  return (
    <Box m={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Expense
          </Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          {loading ? (
            <div className="text-center mt-8">
              <CircularProgress />
            </div>
          ) : (
            <Paper elevation={3} sx={{ p: 3 }}>
              <ExpenseTable
                expenses={expenses}
                onExpenseUpdated={handleExpenseUpdated}
                onExpenseDeleted={handleExpenseDeleted}
              />
            </Paper>
          )}
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Monthly Expenses
            </Typography>
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label="January" />
              <Tab label="February" />
              <Tab label="March" />
              <Tab label="April" />
              <Tab label="May" />
              <Tab label="June" />
              <Tab label="July" />
              <Tab label="August" />
              <Tab label="September" />
              <Tab label="October" />
              <Tab label="November" />
              <Tab label="December" />
              <Tab label="YTD" />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpensePage;
