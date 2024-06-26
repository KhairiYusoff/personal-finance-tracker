import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";

interface IncomeFormProps {
  onIncomeAdded: (income: any) => void;
}

const IncomeForm = ({ onIncomeAdded }: IncomeFormProps) => {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    source: "",
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
      const response = await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const income = await response.json();
        onIncomeAdded(income);
        setFormData({ date: "", amount: "", source: "", description: "" });
      } else {
        console.error("Error adding income");
      }
    } catch (error) {
      console.error("Error adding income:", error);
    }
    setLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <TextField
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        label="Amount"
        required
      />
      <FormControl fullWidth required>
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
        name="description"
        value={formData.description}
        onChange={handleChange}
        label="Description"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="mt-6 w-full h-12"
      >
        {loading ? <CircularProgress size={24} /> : " Add Income"}
      </Button>
    </Box>
  );
};

export default IncomeForm;
