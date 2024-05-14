import { Expense } from "@/types/types";
import { Box, Typography, Grid } from "@mui/material";
import { calculatePreviousMonthExpense, getMonthName } from "@/lib/utils";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MonthlyExpenseTabProps {
  month: number;
  expenses: Expense[];
}

const MonthlyExpenseTab = ({ month, expenses }: MonthlyExpenseTabProps) => {
  const filteredExpenses = expenses.filter(
    (expense) => new Date(expense.date).getMonth() + 1 === month
  );

  const totalExpense = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const previousMonthExpense = calculatePreviousMonthExpense(month, expenses);
  const expenseDifference = totalExpense - previousMonthExpense;

  const expenseByCategory = filteredExpenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        data: Object.values(expenseByCategory),
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
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Expense for {getMonthName(month)}
            </Typography>
            <Typography variant="h4" color="error">
              $
              {totalExpense.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Compared to {getMonthName(month - 1)}:{" "}
              {expenseDifference >= 0 ? "+" : "-"}$
              {Math.abs(expenseDifference).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Expense Distribution
            </Typography>
            <Box sx={{ maxWidth: "300px", margin: "0 auto" }}>
              <Pie data={chartData} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyExpenseTab;
