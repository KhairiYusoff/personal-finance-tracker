"use client";
import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form data
        setFormData({
          date: "",
          category: "",
          amount: "",
          description: "",
        });
      } else {
        // Handle error response
        console.error("Error creating expense");
      }
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-8">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add Daily Expense
        </Typography>

        <FormControl
          sx={{ m: 1, width: 500 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <TextField
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            fullWidth
            className="mt-4"
          />
          <Select
            name="category"
            label="category"
            value={formData.category}
            onChange={handleChange}
            required
            fullWidth
            input={<OutlinedInput label="Name" />}
            className="mt-4"
          >
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="rent">Rent</MenuItem>
            <MenuItem value="loan">Loan</MenuItem>
          </Select>

          <TextField
            label="Amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            fullWidth
            className="mt-4"
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            className="mt-4"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-6"
          >
            Submit
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default ExpenseForm;
