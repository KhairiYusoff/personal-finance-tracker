import Expenses from "./components/Dashboard/Expenses";

const HomePage = async () => {
  return (
    <div className="container mx-auto p-4">
      <Expenses />
    </div>
  );
};

export default HomePage;
