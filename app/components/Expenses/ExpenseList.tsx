import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Expense } from "@/types/types";
import EditExpenseModal from "./EditExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";

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
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deleteExpenseId, setDeleteExpenseId] = useState<string | null>(null);

  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleEditClose = () => {
    setEditingExpense(null);
  };

  const handleEditSubmit = (updatedExpense: Expense) => {
    onExpenseUpdated(updatedExpense);
  };

  const handleDeleteClick = (expenseId: string) => {
    setDeleteExpenseId(expenseId);
  };

  const handleDeleteClose = () => {
    setDeleteExpenseId(null);
  };

  const handleDeleteConfirm = (expenseId: string) => {
    onExpenseDeleted(expenseId);
  };

  return (
    <>
      <List>
        {expenses.map((expense) => (
          <ListItem key={expense.id}>
            <ListItemText
              primary={`${expense.category} - $${expense.amount}`}
              secondary={expense.description}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditClick(expense)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteClick(expense.id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <EditExpenseModal
        expense={editingExpense}
        open={!!editingExpense}
        onClose={handleEditClose}
        onSubmit={handleEditSubmit}
      />

      <DeleteExpenseModal
        expenseId={deleteExpenseId}
        open={!!deleteExpenseId}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default ExpenseList;
