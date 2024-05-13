import { Income } from "@/types/types";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { calculatePreviousMonthIncome, getMonthName } from "@/lib/utils";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MonthlyIncomeTabProps {
  month: number;
  incomes: Income[];
}

const MonthlyIncomeTab = ({ month, incomes }: MonthlyIncomeTabProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredIncomes = incomes.filter(
    (income) => new Date(income.date).getMonth() + 1 === month
  );

  const totalIncome = filteredIncomes.reduce(
    (total, income) => total + income.amount,
    0
  );
  const previousMonthIncome = calculatePreviousMonthIncome(month, incomes);
  const incomeDifference = totalIncome - previousMonthIncome;

  const incomeBySource = filteredIncomes.reduce((acc, income) => {
    if (acc[income.source]) {
      acc[income.source] += income.amount;
    } else {
      acc[income.source] = income.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(incomeBySource),
    datasets: [
      {
        data: Object.values(incomeBySource),
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
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Income for {getMonthName(month)}
            </Typography>
            <Typography variant="h4" color="primary">
              $
              {totalIncome.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Compared to {getMonthName(month - 1)}:{" "}
              {incomeDifference >= 0 ? "+" : "-"}$
              {Math.abs(incomeDifference).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Income Distribution
            </Typography>
            <Box
              sx={{
                maxWidth: "300px",
                margin: "0 auto",
                position: "relative",
                aspectRatio: "1",
              }}
            >
              <Pie
                data={data}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: isMobile ? "bottom" : "right",
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyIncomeTab;
