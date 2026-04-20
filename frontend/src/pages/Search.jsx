import { useState } from "react";
import { searchTransactionsByDate } from "../api";

export default function Search() {
  const [searchDate, setSearchDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchDate) return;

    setLoading(true);
    setError(null);
    setResults([]); // Clear previous results

    try {
      const res = await searchTransactionsByDate(searchDate);
      setResults(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No transactions found for this date.");
      } else {
        setError("An error occurred while searching.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Search by Date</h2>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          className="input"
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          required
        />
        <button className="button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p style={{ color: "#ef4444" }}>{error}</p>}

      {results.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {results.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td className={txn.type === "credit" ? "credit" : "debit"}>
                  {txn.type}
                </td>
                <td>₹ {txn.amount}</td>
                <td>
                  {txn.date ? new Date(txn.date).toLocaleTimeString() : "—"}
                </td>
                <td>{txn.description || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
