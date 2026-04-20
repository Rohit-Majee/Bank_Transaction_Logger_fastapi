import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions, refresh }) {
  if (!transactions.length) {
    return <p>No transactions found</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((txn) => (
          <TransactionItem key={txn.id} txn={txn} refresh={refresh} />
        ))}
      </tbody>
    </table>
  );
}
