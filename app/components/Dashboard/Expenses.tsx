// components/ExpenseDashboard.tsx
"use client";
import { useState, useEffect } from "react";
import { Typography, CircularProgress, Paper, Grid } from "@mui/material";
import { Expense } from "@/types/types";
import { format } from "date-fns";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseDashboardProps {
  expenses: Expense[];
}

const Expenses = ({ expenses }: ExpenseDashboardProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const getMonthlyExpenses = (year: number) => {
    const monthlyExpenses: Expense[][] = Array.from({ length: 12 }, () => []);

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate.getFullYear() === year) {
        const monthIndex = expenseDate.getMonth();
        monthlyExpenses[monthIndex].push(expense);
      }
    });

    return monthlyExpenses;
  };

  const getCategoryExpenses = (expenses: Expense[]) => {
    const categoryExpenses: { [key: string]: number } = {};
    expenses.forEach((expense) => {
      if (categoryExpenses[expense.category]) {
        categoryExpenses[expense.category] += expense.amount;
      } else {
        categoryExpenses[expense.category] = expense.amount;
      }
    });
    return categoryExpenses;
  };

  const calculateTotalAmount = (expenses: Expense[]) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const renderPieChart = (expenses: Expense[], month: string) => {
    const categoryExpenses = getCategoryExpenses(expenses);
    const totalAmount = calculateTotalAmount(expenses);

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

    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={month}>
        <Paper elevation={3} className="p-4">
          <Typography variant="subtitle1" align="center" gutterBottom>
            {month}
          </Typography>
          <div className="w-full h-64">
            <Pie data={data} />
          </div>
          <Typography variant="subtitle2" align="center">
            Total: ${totalAmount.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
    );
  };

  const renderPieCharts = () => {
    const monthlyExpenses = getMonthlyExpenses(selectedYear);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthlyExpenses.map((expenses, index) =>
      renderPieChart(expenses, monthNames[index])
    );
  };

  return (
    <Paper elevation={3} className="p-4">
      <Typography variant="h5" align="center" gutterBottom>
        Expense Summary for {selectedYear}
      </Typography>
      {loading ? (
        <div className="text-center">
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          {renderPieCharts()}
        </Grid>
      )}
    </Paper>
  );
};

export default Expenses;
