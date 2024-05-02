import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

interface DeleteExpenseModalProps {
  expenseId: string | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (expenseId: string) => void;
}

const DeleteExpenseModal = ({
  expenseId,
  open,
  onClose,
  onConfirm,
}: DeleteExpenseModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (expenseId) {
      setLoading(true);
      try {
        const response = await fetch(`/api/expenses?id=${expenseId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          onConfirm(expenseId);
          onClose();
        } else {
          console.error("Error deleting expense");
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Expense</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this expense?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          disabled={loading}
          onClick={handleConfirm}
        >
          {loading ? <CircularProgress size={24} /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteExpenseModal;
