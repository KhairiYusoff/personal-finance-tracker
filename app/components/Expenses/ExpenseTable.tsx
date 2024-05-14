import { useState } from "react";
import { Expense } from "@/types/types";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditExpenseModal from "./EditExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";

interface ExpenseTableProps {
  loading: boolean;
  expenses: Expense[];
  onExpenseUpdated: (updatedExpense: Expense) => void;
  onExpenseDeleted: (expenseId: string) => void;
}

const ExpenseTable = ({
  loading,
  expenses,
  onExpenseUpdated,
  onExpenseDeleted,
}: ExpenseTableProps) => {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setEditModalOpen(true);
  };

  const handleDelete = (expenseId: string) => {
    const selectedExpense = expenses.find(
      (expense) => expense.id === expenseId
    );
    setSelectedExpense(selectedExpense || null);
    setDeleteModalOpen(true);
  };

  const handleEditSubmit = (updatedExpense: Expense) => {
    onExpenseUpdated(updatedExpense);
    setSelectedExpense(null);
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = (expenseId: string) => {
    onExpenseDeleted(expenseId);
    setSelectedExpense(null);
    setDeleteModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={expenses}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        loading={loading}
      />
      <EditExpenseModal
        expense={selectedExpense}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
      />
      <DeleteExpenseModal
        expenseId={selectedExpense?.id || null}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ExpenseTable;
