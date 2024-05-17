// app/savings/SavingsTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface SavingsData {
  description: string;
  values: { month: string; value: number }[];
}

interface SavingsTableProps {
  data: SavingsData[];
}

const SavingsTable = ({ data }: SavingsTableProps) => {
  const months = Array.from(
    new Set(data.flatMap((item) => item.values.map((value) => value.month)))
  );

  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            {months.map((month) => (
              <TableCell key={month} align="right">
                {month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.description}>
              <TableCell component="th" scope="row">
                {item.description}
              </TableCell>
              {months.map((month) => {
                const value =
                  item.values.find((v) => v.month === month)?.value || 0;
                return (
                  <TableCell key={`${item.description}-${month}`} align="right">
                    ${value.toFixed(2)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SavingsTable;
