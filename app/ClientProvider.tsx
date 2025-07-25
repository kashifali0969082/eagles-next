// components/ClientProviders.tsx
"use client";

import { WagmiProvider } from "wagmi";
import '../store/watchAddress';
import { config } from "@/config/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme, Theme } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";
export default function ClientProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const eaglesTheme: Theme = {
    blurs: {
      modalOverlay: "blur(8px)",
    },
    colors: {
      // Primary accent - matching your yellow/amber gradient
      accentColor: "linear-gradient(90deg, #f59e0b, #d97706)",
      accentColorForeground: "#000000",

      // Action buttons - matching your button styles
      actionButtonBorder: "rgba(245, 158, 11, 0.3)",
      actionButtonBorderMobile: "rgba(245, 158, 11, 0.3)",
      actionButtonSecondaryBackground:
        "linear-gradient(90deg, rgba(31, 41, 55, 0.8), rgba(0, 0, 0, 0.8))",

      // Close button
      closeButton: "#9ca3af",
      closeButtonBackground: "rgba(31, 41, 55, 0.8)",

      // Connect button - matching your CTA buttons
      connectButtonBackground: "linear-gradient(90deg, #f59e0b, #d97706)",
      connectButtonBackgroundError: "#ef4444",
      connectButtonInnerBackground: "linear-gradient(90deg, #fbbf24, #f59e0b)",
      connectButtonText: "#000000",
      connectButtonTextError: "#ffffff",

      // Connection indicator
      connectionIndicator: "#10b981",

      // Download cards
      downloadBottomCardBackground:
        "linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(0, 0, 0, 0.95))",
      downloadTopCardBackground:
        "linear-gradient(135deg, rgba(31, 41, 55, 0.8), rgba(0, 0, 0, 0.8))",

      // Error states
      error: "#ef4444",

      // Borders - matching your component borders
      generalBorder: "rgba(245, 158, 11, 0.3)",
      generalBorderDim: "rgba(245, 158, 11, 0.1)",

      // Menu items
      menuItemBackground: "rgba(31, 41, 55, 0.8)",

      // Modal styling - matching your card backgrounds
      modalBackdrop: "rgba(0, 0, 0, 0.8)",
      modalBackground: "#000000",
      modalBorder: "rgba(245, 158, 11, 0.3)",
      modalText: "#facc15",
      modalTextDim: "#d1d5db",
      modalTextSecondary: "#9ca3af",

      // Profile actions
      profileAction: "rgba(31, 41, 55, 0.8)",
      profileActionHover: "rgba(245, 158, 11, 0.1)",
      profileForeground:
        "linear-gradient(135deg, rgba(31, 41, 55, 0.9), rgba(0, 0, 0, 0.9))",

      // Selection states
      selectedOptionBorder: "rgba(245, 158, 11, 0.6)",
      standby: "#fbbf24",
    },
    fonts: {
      body: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    },
    radii: {
      actionButton: "8px",
      connectButton: "8px",
      menuButton: "12px",
      modal: "16px",
      modalMobile: "16px",
    },
    shadows: {
      connectButton:
        "0 10px 15px -3px rgba(245, 158, 11, 0.25), 0 4px 6px -2px rgba(245, 158, 11, 0.1)",
      dialog:
        "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(245, 158, 11, 0.1)",
      profileDetailsAction: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
      selectedOption: "0 0 0 2px rgba(245, 158, 11, 0.6)",
      selectedWallet: "0 0 0 2px rgba(245, 158, 11, 0.4)",
      walletLogo: "0 4px 6px -1px rgba(0, 0, 0, 0.2)",
    },
  };
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={eaglesTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
