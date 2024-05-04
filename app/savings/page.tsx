"use client";
import { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper, Button, Select, MenuItem } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import IncomeForm from "../components/Income/IncomeForm";
import SavingsGoalForm from "../components/Savings/SavingsGoalForm";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Income {
  id: string;
  date: string;
  amount: number;
  source: string;
  description: string;
}

interface SavingsGoal {
  id: string;
  targetAmount: number;
  currentAmount: number;
  description: string;
}

interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
}

const currentYear = new Date().getFullYear();

const Savings = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [savingsGoal, setSavingsGoal] = useState<SavingsGoal | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const [incomeResponse, savingsResponse, expenseResponse] = await Promise.all([
          fetch(`/api/income/${selectedYear}`),
          fetch("/api/savings/latest"),
          fetch(`/api/expenses/${selectedYear}`),
        ]);

        if (incomeResponse.ok && savingsResponse.ok && expenseResponse.ok) {
          const incomeData = await incomeResponse.json();
          setIncomes(incomeData);

          const savingsData = await savingsResponse.json();
          setSavingsGoal(savingsData);

          const expenseData = await expenseResponse.json();
          setExpenses(expenseData);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const handleIncomeAdded = (income: Income) => {
    setIncomes([...incomes, income]);
  };

  const handleSavingsGoalAdded = (savingsGoal: SavingsGoal) => {
    setSavingsGoal(savingsGoal);
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netIncome = totalIncome - totalExpenses;
  const savingsProgress = savingsGoal ? (savingsGoal.currentAmount / savingsGoal.targetAmount) * 100 : 0;

  const renderExpenseChart = () => {
    const categoryExpenses: { [key: string]: number } = {};
    expenses.forEach((expense) => {
      if (categoryExpenses[expense.category]) {
        categoryExpenses[expense.category] += expense.amount;
      } else {
        categoryExpenses[expense.category] = expense.amount;
      }
    });

    const data = {
      labels: Object.keys(categoryExpenses),
      datasets: [
        {
          data: Object.values(categoryExpenses),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    };

    return <Pie data={data} />;
  };

  return (
    <Box m={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Financial Summary for {selectedYear}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Income
            </Typography>
            <IncomeForm onIncomeAdded={handleIncomeAdded} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Savings Goal
            </Typography>
            <SavingsGoalForm onSavingsGoalAdded={handleSavingsGoalAdded} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Expense Breakdown
            </Typography>
            <Box sx={{ width: "100%", height: 300 }}>{renderExpenseChart()}</Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Financial Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle1">Total Income</Typography>
                <Typography variant="h5">${totalIncome.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle1">Total Expenses</Typography>
                <Typography variant="h5">${totalExpenses.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle1">Net Income</Typography>
                <Typography variant="h5">${netIncome.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle1">Savings Progress</Typography>
                <Typography variant="h5">{savingsProgress.toFixed(2)}%</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select Year
            </Typography>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Savings;