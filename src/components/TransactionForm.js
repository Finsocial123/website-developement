import React, { useState } from "react";

// Utility function to format timestamp into a readable date-time
const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    limit: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startTime, endTime, limit } = formData;

    // Input validation
    if (!startTime || !endTime || !limit) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.binance.com/sapi/v1/pay/transactions?startTime=${startTime}&endTime=${endTime}&limit=${limit}&recvWindow=5000&timestamp=45&signature=sunil`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setTransactions(data?.data || []);
    } catch (err) {
      setError("Failed to fetch transactions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-[500px] w-[500px] border border-teal-500 hover:scale-105 transition-all duration-300 ease-in-out rounded-3xl  mt-5">
      {/* Form Section */}
      <div className="max-w-3xl mx-auto shadow-md rounded-lg ">
        <h2 className="text-2xl font-bold  mb-2">
          Fetch Transactions
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block  font-medium mb-2">
              Start Time (Timestamp)
            </label>
            <input
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2"
              placeholder="Enter start time in milliseconds"
              required
            />
          </div>

          <div>
            <label className="block  font-medium mb-2">
              End Time (Timestamp)
            </label>
            <input
              type="text"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2"
              placeholder="Enter end time in milliseconds"
              required
            />
          </div>

          <div>
            <label className="block  font-medium mb-2">
              Limit
            </label>
            <input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 p-2"
              placeholder="Enter the number of results (e.g., 100)"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600  font-medium py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Fetch Transactions
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="max-w-3xl mx-auto h-[200px] shadow-md rounded-lg p-6 mt-6 ">
        <h2 className="text-2xl font-bold mb-4">
          Transaction Results
        </h2>

        {loading && <p className="text-blue-600">Loading transactions...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && transactions.length > 0 && (
          <div className="space-y-4">
            {transactions.map((trade, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 bg-gray-50"
              >
                <p>
                  <strong>Transaction ID:</strong> {trade.transactionId}
                </p>
                <p>
                  <strong>Order Type:</strong> {trade.orderType}
                </p>
                <p>
                  <strong>Amount:</strong> {trade.amount} {trade.currency}
                </p>
                <p>
                  <strong>Payer:</strong> {trade.payerInfo.name} (
                  {trade.payerInfo.type})
                </p>
                <p>
                  <strong>Receiver:</strong> {trade.receiverInfo.name} (
                  {trade.receiverInfo.type})
                </p>
                <p>
                  <strong>Transaction Time:</strong>{" "}
                  {formatDateTime(trade.transactionTime)}
                </p>
              </div>
            ))}
          </div>
        )}

        {!loading && transactions.length === 0 && (
          <p className="text-gray-500">No transactions available.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionForm;
