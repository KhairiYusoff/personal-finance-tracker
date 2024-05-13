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
import { Income } from "@/types/types";

interface EditIncomeModalProps {
  income: Income | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedIncome: Income) => void;
}

const EditIncomeModal = ({
  income,
  open,
  onClose,
  onSubmit,
}: EditIncomeModalProps) => {
  const [formData, setFormData] = useState({
    date: income?.date || "",
    source: income?.source || "",
    amount: income?.amount?.toString() || "",
    description: income?.description || "",
  });
  const [loading, setLoading] = useState(false);
  console.log(income);
  useEffect(() => {
    if (income) {
      setFormData({
        date: new Date(income.date).toISOString().split("T")[0],
        source: income.source,
        amount: income.amount.toString(),
        description: income.description || "",
      });
    }
  }, [income]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/income?id=${income?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedIncome = await response.json();
        onSubmit(updatedIncome);
        onClose();
      } else {
        console.error("Error updating income");
      }
    } catch (error) {
      console.error("Error updating income:", error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Income</DialogTitle>
      <DialogContent>
        {income && (
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
              <InputLabel>Source</InputLabel>
              <Select
                name="source"
                value={formData.source}
                onChange={handleChange}
                input={<OutlinedInput label="Source" />}
                required
              >
                <MenuItem value="" disabled>
                  Select Source
                </MenuItem>
                <MenuItem value="Salary">Salary</MenuItem>
                <MenuItem value="Rental">Rental</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Investment">Investment</MenuItem>
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

export default EditIncomeModal;
