import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Expense } from "@/types/types";

interface ExpenseListProps {
  expenses: Expense[];
  onExpenseUpdated: (expense: Expense) => void;
  onExpenseDeleted: (expenseId: string) => void;
}

const ExpenseList = ({
  expenses,
  onExpenseUpdated,
  onExpenseDeleted,
}: ExpenseListProps) => {
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleEditClick = (expense: Expense) => {
    setEditingExpenseId(expense.id);
    setEditFormData({
      date: expense.date,
      category: expense.category,
      amount: expense.amount.toString(),
      description: expense.description || "",
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/expenses?id=${editingExpenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        const updatedExpense = await response.json();
        onExpenseUpdated(updatedExpense);
        setEditingExpenseId(null);
        setEditFormData({
          date: "",
          category: "",
          amount: "",
          description: "",
        });
      } else {
        console.error("Error updating expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
    setLoading(false);
  };

  const handleDeleteClick = async (expenseId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/expenses?id=${expenseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onExpenseDeleted(expenseId);
      } else {
        console.error("Error deleting expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
    setLoading(false);
  };

  return (
    <List>
      {expenses.map((expense) => (
        <ListItem key={expense.id}>
          {editingExpenseId === expense.id ? (
            <form onSubmit={handleEditSubmit} className="flex space-x-2">
              <TextField
                type="date"
                name="date"
                value={editFormData.date}
                onChange={handleEditChange}
                required
              />
              <TextField
                name="category"
                value={editFormData.category}
                onChange={handleEditChange}
                required
              />
              <TextField
                type="number"
                name="amount"
                value={editFormData.amount}
                onChange={handleEditChange}
                required
              />
              <TextField
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
              />
              <Button type="submit" variant="contained" color="primary">
                {loading ? <CircularProgress size={24} /> : "Save"}
              </Button>
            </form>
          ) : (
            <>
              <ListItemText
                primary={`${expense.category} - $${expense.amount}`}
                secondary={expense.description}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditClick(expense)}
                  disabled={loading}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(expense.id)}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : <Delete />}
                </IconButton>
              </ListItemSecondaryAction>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default ExpenseList;
