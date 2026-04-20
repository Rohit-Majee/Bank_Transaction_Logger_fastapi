import { useEffect, useState } from "react";
import { getTransactions } from "../api";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Dashboard() {
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
    <>
      <div className="card">
        <TransactionForm refresh={loadData} />
      </div>

      <div className="card">
        <h2>Recent Transactions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TransactionList transactions={transactions} refresh={loadData} />
        )}
      </div>
    </>
  );
}
