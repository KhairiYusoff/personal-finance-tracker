import { Income } from "@/types/types";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditIncomeModal from "./EditIncomeModal";
import DeleteIncomeModal from "./DeleteIncomeModal";

interface IncomeTableProps {
  incomes: Income[];
  onIncomeUpdated: (updatedIncome: Income) => void;
  onIncomeDeleted: (incomeId: string) => void;
}

const IncomeTable = ({
  incomes,
  onIncomeUpdated,
  onIncomeDeleted,
}: IncomeTableProps) => {
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  console.log(selectedIncome);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = (income: Income) => {
    setSelectedIncome(income);
    setEditModalOpen(true);
  };

  const handleDelete = (incomeId: string) => {
    const selectedIncome = incomes.find((income) => income.id === incomeId);
    setSelectedIncome(selectedIncome || null);
    setDeleteModalOpen(true);
  };

  const handleEditSubmit = (updatedIncome: Income) => {
    onIncomeUpdated(updatedIncome);
    setSelectedIncome(null);
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = (incomeId: string) => {
    onIncomeDeleted(incomeId);
    setSelectedIncome(null);
    setDeleteModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "source", headerName: "Source", flex: 1 },
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
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={incomes}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
      <EditIncomeModal
        income={selectedIncome}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
      />
      <DeleteIncomeModal
        incomeId={selectedIncome?.id || null}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default IncomeTable;
