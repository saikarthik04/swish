// ClientSessionProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";

type ClientSessionProviderProps = {
  children: React.ReactNode;
};

const ClientSessionProvider = ({ children}: ClientSessionProviderProps) => {
  return <SessionProvider >{children}</SessionProvider>;
};

export default ClientSessionProvider;
