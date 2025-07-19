
import { ConnectButton } from "@rainbow-me/rainbowkit";
export const YourApp = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    
                  >
                  
                    <span className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black px-3 py-2 sm:px-6 sm:py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 text-xs sm:text-sm">CONNECT</span>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="flex border border-yellow-500 justify-center gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-sm"
                  >
                    <div className="bg-black text-yellow-500">
                      Wrong network
                    </div>
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openAccountModal}
                    className="flex border border-yellow-500 justify-center gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-sm"
                    type="button"
                  >
                    <div className="bg-black text-yellow-500">
                      {account.displayName}
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  
  );
};