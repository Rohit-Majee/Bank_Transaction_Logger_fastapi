import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTransaction, updateTransaction } from "../api";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [type, setType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await getTransaction(id);
        setType(res.data.type);
        setAmount(res.data.amount);
        setDescription(res.data.description || "");
      } catch (err) {
        setError("Transaction not found.");
        console.error(err);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!amount) return;

    try {
      setLoading(true);
      await updateTransaction(id, {
        type,
        amount: Number(amount),
        description,
      });
      navigate("/"); // Go back to dashboard on success
    } catch (err) {
      console.error(err);
      setError("Failed to update transaction.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!amount && !error) return <p>Loading transaction details...</p>;

  return (
    <div className="card">
      <h2>Edit Transaction #{id}</h2>
      <form className="form" onSubmit={handleUpdate}>
        <select
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <input
          className="input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="button"
          disabled={loading}
          style={{ width: "100%", marginTop: "10px" }}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>

        <button
          type="button"
          className="button"
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            marginTop: "10px",
            backgroundColor: "#6c757d",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
