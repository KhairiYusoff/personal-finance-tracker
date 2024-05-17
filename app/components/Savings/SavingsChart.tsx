// app/savings/SavingsChart.tsx
import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SavingsData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

interface SavingsChartProps {
  data: SavingsData[];
}

const SavingsChart = ({ data }: SavingsChartProps) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Savings",
        data: data.map((item) => item.savings),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Savings",
      },
    },
  };

  return (
    <Box sx={{ height: 400, mb: 4 }}>
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default SavingsChart;
