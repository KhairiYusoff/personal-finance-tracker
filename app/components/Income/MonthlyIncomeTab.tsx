import { Income } from "@/types/types";
import { Box, Typography, Grid } from "@mui/material";
import { calculatePreviousMonthIncome, getMonthName } from "@/lib/utils";

interface MonthlyIncomeTabProps {
  month: number;
  incomes: Income[];
}

const MonthlyIncomeTab = ({ month, incomes }: MonthlyIncomeTabProps) => {
  const filteredIncomes = incomes.filter(
    (income) => new Date(income.date).getMonth() + 1 === month
  );

  const totalIncome = filteredIncomes.reduce(
    (total, income) => total + income.amount,
    0
  );
  const previousMonthIncome = calculatePreviousMonthIncome(month, incomes);
  const incomeDifference = totalIncome - previousMonthIncome;

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Total Income for {getMonthName(month)}: ${totalIncome.toFixed(2)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Compared to {getMonthName(month - 1)}:{" "}
            {incomeDifference >= 0 ? "+" : "-"}$
            {Math.abs(incomeDifference).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyIncomeTab;
