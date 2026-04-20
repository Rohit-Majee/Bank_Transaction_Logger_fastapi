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

      <td>
        <button className="button" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}
