"use client";

import CustomCursor from "./CustomCursor";
import FluidGradientBackground from "./FluidGradientBackground";
import Preloader from "./Preloader";
import { LiquidOverlay } from "./LiquidOverlay";

export default function AppShellEffects() {
  return (
    <>
      <FluidGradientBackground />
      <Preloader />
      <CustomCursor />
      <LiquidOverlay />
    </>
  );
}
