import { getMonthName } from "@/lib/utils";
import { Income } from "@/types/types";
import { Box, Typography } from "@mui/material";

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

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Total Income for {getMonthName(month)}: ${totalIncome.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default MonthlyIncomeTab;
