"use client";

import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import FluidGradientBackground from "./FluidGradientBackground";
import { LiquidOverlay } from "./LiquidOverlay";

export default function AppShellEffects() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <FluidGradientBackground />
      <LiquidOverlay />
    </>
  );
}