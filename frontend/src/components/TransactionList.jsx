export default function TransactionList({ transactions }) {
  return (
    <table border="1" cellPadding="10">
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
        {transactions.map((txn) => (
          <tr key={txn.id}>
            <td>{txn.id}</td>
            <td>{txn.type}</td>
            <td>{txn.amount}</td>
            <td>{new Date(txn.date).toLocaleString()}</td>
            <td>{txn.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
