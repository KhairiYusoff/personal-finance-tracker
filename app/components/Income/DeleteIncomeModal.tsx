import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

interface DeleteIncomeModalProps {
  incomeId: string | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (incomeId: string) => void;
}

const DeleteIncomeModal = ({
  incomeId,
  open,
  onClose,
  onConfirm,
}: DeleteIncomeModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (incomeId) {
      console.log(incomeId);
      setLoading(true);
      try {
        const response = await fetch(`/api/income?id=${incomeId}`, {
          method: "DELETE",
        });

        console.log(response);

        if (response.ok) {
          onConfirm(incomeId);
          onClose();
        } else {
          console.error("Error deleting income");
        }
      } catch (error) {
        console.error("Error deleting income:", error);
      }
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Income</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this income?</p>
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

export default DeleteIncomeModal;
