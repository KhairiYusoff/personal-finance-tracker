import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import { Expense } from "@/types/types";

interface ExpenseFormProps {
  onExpenseAdded: (expense: Expense) => void;
}

const ExpenseForm = ({ onExpenseAdded }: ExpenseFormProps) => {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newExpense = await response.json();
        onExpenseAdded(newExpense);
        setFormData({
          date: "",
          category: "",
          amount: "",
          description: "",
        });
      } else {
        console.error("Error creating expense");
      }
    } catch (error) {
      console.error("Error creating expense:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 ">
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
          {loading ? <CircularProgress size={24} /> : "Add Expense"}
        </Button>
      </form>
    </div>
  );
};

export default ExpenseForm;
