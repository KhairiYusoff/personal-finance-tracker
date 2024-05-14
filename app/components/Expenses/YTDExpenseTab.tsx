import { Expense } from "@/types/types";
import { Box, Typography, Grid } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface YTDExpenseTabProps {
  expenses: Expense[];
}

const YTDExpenseTab = ({ expenses }: YTDExpenseTabProps) => {
  const currentYear = new Date().getFullYear();
  const ytdExpenses = expenses.filter(
    (expense) => new Date(expense.date).getFullYear() === currentYear
  );

  const totalExpenseYTD = ytdExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const avgMonthlyExpenseYTD = totalExpenseYTD / (new Date().getMonth() + 1);

  const expenseByCategory = ytdExpenses.reduce((acc, expense) => {
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
      <Typography variant="h5" align="center" gutterBottom>
        Year-to-Date (YTD) Expense Summary
      </Typography>
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
              Total Expense YTD
            </Typography>
            <Typography variant="h4" color="error">
              $
              {totalExpenseYTD.toLocaleString(undefined, {
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
              Average Monthly Expense YTD
            </Typography>
            <Typography variant="h4" color="error">
              $
              {avgMonthlyExpenseYTD.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Expense Distribution YTD
            </Typography>
            <Box sx={{ maxWidth: "400px", margin: "0 auto" }}>
              <Pie data={chartData} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default YTDExpenseTab;
