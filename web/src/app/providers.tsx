"use client";

import { ConfigProvider } from "antd";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily:
            'var(--font-prompt), system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        },
      }}
    >
      
    </ConfigProvider>
  );
}

