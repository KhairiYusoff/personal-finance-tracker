import { Expense } from "@/types/types";
import Expenses from "./components/Dashboard/Expenses";

async function fetchExpenses(): Promise<Expense[]> {
  const response = await fetch("http://localhost:3000/api/expenses");
  const data = await response.json();
  return data;
}

const HomePage = async () => {
  const expenses = await fetchExpenses();
  console.log(expenses);
  return (
    <div className="container mx-auto p-4">
      <Expenses expenses={expenses} />
    </div>
  );
};

export default HomePage;
