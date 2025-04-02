"use client";

import { RecoilRoot } from "recoil";

interface RecoilProviderProps {
  children: React.ReactNode;
}

export function RecoilProvider({ children }: RecoilProviderProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
