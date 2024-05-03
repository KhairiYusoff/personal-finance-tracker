import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Expense } from "@/types/types";
import EditExpenseModal from "./EditExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";
import { format } from "date-fns";

interface ExpenseTableProps {
  expenses: Expense[];
  onExpenseUpdated: (expense: Expense) => void;
  onExpenseDeleted: (expenseId: string) => void;
}

const ExpenseTable = ({
  expenses,
  onExpenseUpdated,
  onExpenseDeleted,
}: ExpenseTableProps) => {
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
    setEditingExpense(null);
  };

  const handleDeleteClick = (expenseId: string) => {
    setDeleteExpenseId(expenseId);
  };

  const handleDeleteClose = () => {
    setDeleteExpenseId(null);
  };

  const handleDeleteConfirm = (expenseId: string) => {
    onExpenseDeleted(expenseId);
    setDeleteExpenseId(null);
  };

  const calculateTotal = (expenses: Expense[]) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell align="center">
                {format(new Date(expense.date), "dd-MM-yyyy")}
              </TableCell>
              <TableCell align="center">{expense.category}</TableCell>
              <TableCell align="center">{expense.description}</TableCell>
              <TableCell align="center">{expense.amount.toFixed(2)}</TableCell>
              <TableCell align="center">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography variant="subtitle1">Total:</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">
                {calculateTotal(expenses).toFixed(2)}
              </Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
      </Table>

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
    </TableContainer>
  );
};

export default ExpenseTable;
