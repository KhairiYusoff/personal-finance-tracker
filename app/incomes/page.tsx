"use client";
import { useState, useEffect } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import IncomeForm from "../components/Income/IncomeForm";
import { Income } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import IncomeTable from "../components/Income/IncomeTable";

const IncomesPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await fetch("/api/income");
        const data = await response.json();
        setIncomes(data);
      } catch (error) {
        console.error("Error fetching incomes:", error);
      }
    };

    fetchIncomes();
  }, []);

  const handleIncomeAdded = (income: Income) => {
    setIncomes([...incomes, income]);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to access this page.</div>;
  }

  return (
    <Box m={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Income
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <IncomeForm onIncomeAdded={handleIncomeAdded} />
      </Paper>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <IncomeTable incomes={incomes} />
      </Paper>
    </Box>
  );
};

export default IncomesPage;
