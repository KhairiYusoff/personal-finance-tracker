import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

interface SavingsGoalFormProps {
  onSavingsGoalAdded: (savingsGoal: any) => void;
}

const SavingsGoalForm = ({ onSavingsGoalAdded }: SavingsGoalFormProps) => {
  const [formData, setFormData] = useState({
    targetAmount: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/savings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savingsGoal = await response.json();
        onSavingsGoalAdded(savingsGoal);
        setFormData({ targetAmount: "", description: "" });
      } else {
        console.error("Error adding savings goal");
      }
    } catch (error) {
      console.error("Error adding savings goal:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">Set Savings Goal</Typography>
      <TextField
        type="number"
        name="targetAmount"
        value={formData.targetAmount}
        onChange={handleChange}
        label="Target Amount"
        required
      />
      <TextField
        name="description"
        value={formData.description}
        onChange={handleChange}
        label="Description"
      />
      <Button type="submit" variant="contained">
        Set Goal
      </Button>
    </Box>
  );
};

export default SavingsGoalForm;
