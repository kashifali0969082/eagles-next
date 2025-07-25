// Platform Statistics Component
export const PlatformStatistics: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Platform Statistics</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Members</span>
          <span className="text-yellow-400 font-bold text-lg">5,410</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Users</span>
          <span className="text-yellow-400 font-bold text-lg">5,410</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Active Transactions</span>
          <span className="text-cyan-400 font-bold text-lg">Processing</span>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">USDT Statistics</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Members Received</span>
          <span className="text-green-400 font-bold text-lg">$7,332.50</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Turnover</span>
          <span className="text-cyan-400 font-bold text-lg">$0.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Growth Rate</span>
          <span className="text-green-400 font-bold text-lg">+100%</span>
        </div>
      </div>
    </div>
  </div>
);