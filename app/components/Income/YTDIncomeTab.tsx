import { Income } from "@/types/types";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface YTDIncomeTabProps {
  incomes: Income[];
}

const YTDIncomeTab = ({ incomes }: YTDIncomeTabProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const currentYear = new Date().getFullYear();
  const ytdIncomes = incomes.filter(
    (income) => new Date(income.date).getFullYear() === currentYear
  );

  const totalIncomeYTD = ytdIncomes.reduce(
    (total, income) => total + income.amount,
    0
  );
  const avgMonthlyIncomeYTD = totalIncomeYTD / (new Date().getMonth() + 1);

  const incomeBySource = ytdIncomes.reduce((acc, income) => {
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
      <Typography variant="h5" align="center" gutterBottom>
        Year-to-Date (YTD) Income Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Income YTD
            </Typography>
            <Typography variant="h4" color="primary">
              $
              {totalIncomeYTD.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Average Monthly Income YTD
            </Typography>
            <Typography variant="h4" color="primary">
              $
              {avgMonthlyIncomeYTD.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Income Distribution YTD
            </Typography>
            <Box
              sx={{
                maxWidth: "200px",
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
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Income Summary by Source YTD
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(incomeBySource).map(([source, amount]) => (
            <Grid item xs={12} sm={6} md={4} key={source}>
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {source}
                </Typography>
                <Typography variant="h5" color="primary">
                  $
                  {amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default YTDIncomeTab;
