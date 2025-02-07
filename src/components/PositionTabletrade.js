const PositionsTabletrade = () => {
    return (
      <div className="border border-gray-500 mt-2 p-4 rounded-lg">
        <div className="flex border-b border-gray-700 pb-2 text-sm font-medium">
          <span className="mr-6 text-white border-b-2 border-white">Positions (0)</span>
          <span className="mr-6 text-gray-400">Orders (0)</span>
          <span className="mr-6 text-gray-400">Order History</span>
          <span className="mr-6 text-gray-400">Trades</span>
          <span className="text-gray-400">Assets</span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="text-left py-2 px-2">Market</th>
                <th className="text-left py-2 px-2">Side</th>
                <th className="text-left py-2 px-2">Size</th>
                <th className="text-left py-2 px-2">Avg. Entry</th>
                <th className="text-left py-2 px-2">Market Price</th>
                <th className="text-left py-2 px-2">Liq Price</th>
                <th className="text-left py-2 px-2">uP&L</th>
                <th className="text-left py-2 px-2">Funding</th>
                <th className="text-left py-2 px-2">Realized P&L</th>
                <th className="text-left py-2 px-2">TP/SL</th>
                <th className="text-left py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="11" className="text-center py-6 text-gray-400">
                  You have no open positions
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default PositionsTabletrade;
  