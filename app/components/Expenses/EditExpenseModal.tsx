import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { Expense } from "@/types/types";

interface EditExpenseModalProps {
  expense: Expense | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedExpense: Expense) => void;
}

const EditExpenseModal = ({
  expense,
  open,
  onClose,
  onSubmit,
}: EditExpenseModalProps) => {
  const [formData, setFormData] = useState({
    date: expense?.date || "",
    category: expense?.category || "",
    amount: expense?.amount?.toString() || "",
    description: expense?.description || "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (expense) {
      setFormData({
        date: new Date(expense.date).toISOString().split("T")[0],
        category: expense.category,
        amount: expense.amount.toString(),
        description: expense.description || "",
      });
    }
  }, [expense]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/expenses?id=${expense?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedExpense = await response.json();
        onSubmit(updatedExpense);
        onClose();
      } else {
        console.error("Error updating expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent>
        {expense && (
          <form onSubmit={handleSubmit}>
            <TextField
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
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
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
                <MenuItem value="Loan">Loan</MenuItem>
                <MenuItem value="Transportation">Transportation</MenuItem>
                <MenuItem value="Utilities">Utilities</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
                <MenuItem value="Groceries">Groceries</MenuItem>
                <MenuItem value="Subscription">Subscription</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseModal;
