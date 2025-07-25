// Contract Information Component
export const ContractInformation: React.FC = () => (
  <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6 mb-8">
    <h3 className="text-xl font-bold text-white mb-6">
      Smart Contract Details
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-2">Contract Level</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-teal-400 font-bold text-lg">X1</span>
          <span className="text-gray-400">/</span>
          <span className="text-emerald-400 font-bold text-lg">X2</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-2">Network</p>
        <p className="text-yellow-400 font-bold text-lg">Smart Chain</p>
      </div>
      <div className="text-center">
        <p className="text-gray-400 text-sm mb-2">Contract Address</p>
        <p className="text-yellow-400 font-bold text-lg font-mono">
          0x55...a32
        </p>
      </div>
    </div>
  </div>
);