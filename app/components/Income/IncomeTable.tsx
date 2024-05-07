import { Income } from "@/types/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IncomeTableProps {
  incomes: Income[];
}

const IncomeTable = ({ incomes }: IncomeTableProps) => {
  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "source", headerName: "Source", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
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
    </div>
  );
};

export default IncomeTable;
