// References: next-auth official docs(authjs.dev)
"use client";
import {SessionProvider} from "next-auth/react";

export function Providers({children}) {
  return <SessionProvider>{children}</SessionProvider>;
}