"use client";
import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  InputLabel,
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
    console.log(10101);
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            fullWidth
            className="mt-4"
          />
          <FormControl fullWidth required className="mt-4">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              required
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="rent">Rent</MenuItem>
              <MenuItem value="loan">Loan</MenuItem>
            </Select>
          </FormControl>

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
            required
            fullWidth
            className="mt-4"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-6 w-full h-12"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
