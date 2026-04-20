import { Link } from "react-router-dom";
import { deleteTransaction } from "../api";

export default function TransactionItem({ txn, refresh }) {
  const handleDelete = async () => {
    try {
      await deleteTransaction(txn.id);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <tr>
      <td>{txn.id}</td>
      <td className={txn.type === "credit" ? "credit" : "debit"}>{txn.type}</td>
      <td>₹ {txn.amount}</td>
      <td>{txn.date ? new Date(txn.date).toLocaleString() : "—"}</td>
      <td>{txn.description || "—"}</td>
      <td style={{ display: "flex", gap: "10px" }}>
        <Link
          to={`/edit/${txn.id}`}
          className="button"
          style={{
            textDecoration: "none",
            backgroundColor: "#007bff",
            color: "white",
            padding: "5px 10px",
            borderRadius: "4px",
          }}
        >
          Edit
        </Link>
        <button
          className="button"
          onClick={handleDelete}
          style={{ backgroundColor: "#dc3545", color: "white" }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
