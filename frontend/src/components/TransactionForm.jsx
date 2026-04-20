import { useState } from "react";
import { createTransaction } from "../api";

export default function TransactionForm({ refresh }) {
  const [type, setType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount) return;

    try {
      setLoading(true);

      await createTransaction({
        type,
        amount: Number(amount),
        description,
      });

      setAmount("");
      setDescription("");

      refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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

      <button className="button" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
