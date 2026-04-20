import { useEffect, useState } from "react";
import { getTransactions } from "./api";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([]);


  const loadData = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bank Transaction Logger</h1>

      <TransactionForm refresh={loadData} />

      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;
