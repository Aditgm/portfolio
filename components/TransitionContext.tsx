"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionContextType {
    isTransitioning: boolean;
    triggerTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const triggerTransition = useCallback((href: string) => {
        if (pathname === href) return;

        setIsTransitioning(true);

        // Wait for the liquid wave to cover the screen
        setTimeout(() => {
            router.push(href);

            // Failsafe: if navigation is instant/fails, ensure we unclog the screen
            setTimeout(() => setIsTransitioning(false), 500);
        }, 400);
    }, [pathname, router]);

    return (
        <TransitionContext.Provider value={{ isTransitioning, triggerTransition }}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransition() {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error("useTransition must be used within a TransitionProvider");
    }
    return context;
}
