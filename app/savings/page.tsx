"use client";
import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Expense, Income } from "@/types/types";
import SavingsTable from "../components/Savings/SavingsTable";
import SavingsChart from "../components/Savings/SavingsChart";
import { useUser } from "@clerk/nextjs";

interface SavingsData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

interface transformedData {
  description: string;
  values: { month: string; value: number }[];
}

const SavingsPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [savingsData, setSavingsData] = useState<SavingsData[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    const fetchSavingsData = async () => {
      try {
        const [incomeResponse, expenseResponse] = await Promise.all([
          fetch("/api/income"),
          fetch("/api/expenses"),
        ]);

        const incomeData: Income[] = await incomeResponse.json();
        const expenseData: Expense[] = await expenseResponse.json();

        const currentYear = new Date().getFullYear();
        const months = [
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

        const savingsData = months.map((month, index) => {
          const monthIncome = incomeData
            .filter(
              (income) =>
                new Date(income.date).getMonth() === index &&
                new Date(income.date).getFullYear() === currentYear
            )
            .reduce((total, income) => total + income.amount, 0);

          const monthExpense = expenseData
            .filter(
              (expense) =>
                new Date(expense.date).getMonth() === index &&
                new Date(expense.date).getFullYear() === currentYear
            )
            .reduce((total, expense) => total + expense.amount, 0);

          const savings = monthIncome - monthExpense;

          return {
            month,
            income: monthIncome,
            expense: monthExpense,
            savings,
          };
        });

        setSavingsData(savingsData);
        const totalSavings = savingsData.reduce(
          (total, item) => total + item.savings,
          0
        );
        setTotalSavings(totalSavings);
      } catch (error) {
        console.error("Error fetching savings data:", error);
      }
    };

    fetchSavingsData();
  }, []);

  const transformedData: transformedData[] = [
    {
      description: "Income",
      values: savingsData.map((item) => ({
        month: item.month,
        value: item.income,
      })),
    },
    {
      description: "Expense",
      values: savingsData.map((item) => ({
        month: item.month,
        value: item.expense,
      })),
    },
    {
      description: "Savings",
      values: savingsData.map((item) => ({
        month: item.month,
        value: item.savings,
      })),
    },
  ];

  if (!isLoaded) {
    return (
      <div className="flex flex-col h-[80vh] justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box m={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Savings Overview
      </Typography>
      <SavingsTable data={transformedData} />
      <SavingsChart data={savingsData} />
      <Typography variant="h6" align="center">
        Total Savings: ${totalSavings.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default SavingsPage;
