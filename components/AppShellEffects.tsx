"use client";

import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import { LiquidOverlay } from "./LiquidOverlay";

export default function AppShellEffects() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <LiquidOverlay />
    </>
  );
}
