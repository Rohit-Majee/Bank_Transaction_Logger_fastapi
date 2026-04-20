import { useState } from "react";
import { getTransaction } from "../api";

export default function Search() {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await getTransaction(searchId);
      setResult(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Transaction not found.");
      } else {
        setError("An error occurred while searching.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Search Transaction</h2>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          className="input"
          type="number"
          placeholder="Enter Transaction ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          required
        />
        <button className="button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{result.id}</td>
              <td className={result.type === "credit" ? "credit" : "debit"}>
                {result.type}
              </td>
              <td>₹ {result.amount}</td>
              <td>
                {result.date ? new Date(result.date).toLocaleString() : "—"}
              </td>
              <td>{result.description || "—"}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
