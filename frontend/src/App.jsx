import { useEffect, useState } from "react";
import { getTransactions } from "./api";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">💳 Bank Transaction Logger</h1>

      <div className="card">
        <TransactionForm refresh={loadData} />
      </div>

      <div className="card">
        <h2>Transactions</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <TransactionList transactions={transactions} refresh={loadData} />
        )}
      </div>
    </div>
  );
}

export default App;
