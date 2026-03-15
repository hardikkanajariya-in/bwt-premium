"use client";

import { type ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <CustomCursor />
      {children}
    </LazyMotion>
  );
}
