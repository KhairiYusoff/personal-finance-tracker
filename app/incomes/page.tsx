"use client";
import { useState, useEffect } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Add Income
          </Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <IncomeForm onIncomeAdded={handleIncomeAdded} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <IncomeTable incomes={incomes} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IncomesPage;
