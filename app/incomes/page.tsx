"use client";
import { useState, useEffect } from "react";
import { Box, Paper, Typography, Grid, CircularProgress } from "@mui/material";
import IncomeForm from "../components/Income/IncomeForm";
import { Income } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import IncomeTable from "../components/Income/IncomeTable";

const IncomesPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await fetch("/api/income");
        const data = await response.json();
        console.log(data);
        setIncomes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching incomes:", error);
        setLoading(false);
      }
    };

    fetchIncomes();
  }, []);

  const handleIncomeAdded = (income: Income) => {
    setIncomes([...incomes, income]);
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col h-[80vh] justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col h-[80vh] justify-center items-center">
        Please sign in to access this page.
      </div>
    );
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
          {loading ? (
            <div className="text-center mt-8">
              <CircularProgress />
            </div>
          ) : (
            <Paper elevation={3} sx={{ p: 3 }}>
              <IncomeTable incomes={incomes} />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default IncomesPage;
