"use client";
import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
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

const Savings = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [savingsGoal, setSavingsGoal] = useState<SavingsGoal | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeResponse, savingsResponse, expenseResponse] =
          await Promise.all([
            fetch("/api/income"),
            fetch("/api/savings"),
            fetch("/api/expenses"),
          ]);

        const incomeData = await incomeResponse.json();
        setIncomes(incomeData);

        const savingsData = await savingsResponse.json();
        setSavingsGoal(savingsData[0] || null);

        const expenseData = await expenseResponse.json();
        setExpenses(expenseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleIncomeAdded = (income: Income) => {
    setIncomes([...incomes, income]);
  };

  const handleSavingsGoalAdded = (savingsGoal: SavingsGoal) => {
    setSavingsGoal(savingsGoal);
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const netIncome = totalIncome - totalExpenses;
  const savingsProgress = savingsGoal
    ? (savingsGoal.currentAmount / savingsGoal.targetAmount) * 100
    : 0;

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
    <Box className="m-4">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>{renderExpenseChart()}</Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <IncomeForm onIncomeAdded={handleIncomeAdded} />
          <SavingsGoalForm onSavingsGoalAdded={handleSavingsGoalAdded} />
          <Box mt={4}>
            <Typography variant="h6">Financial Summary</Typography>
            <Typography>Total Income: ${totalIncome.toFixed(2)}</Typography>
            <Typography>Total Expenses: ${totalExpenses.toFixed(2)}</Typography>
            <Typography>Net Income: ${netIncome.toFixed(2)}</Typography>
            {savingsGoal && (
              <Box>
                <Typography>
                  Savings Goal: ${savingsGoal.targetAmount.toFixed(2)}
                </Typography>
                <Typography>
                  Savings Progress: {savingsProgress.toFixed(2)}%
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Savings;
