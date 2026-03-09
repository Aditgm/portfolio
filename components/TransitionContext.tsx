"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
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
        if (pathname === href) return; // Don't transition if already on the page

        setIsTransitioning(true);

        // 400ms is the duration requested by the user for a snappy transition
        setTimeout(() => {
            router.push(href);
        }, 400); // 400ms waiting for the wipe to cover the screen
    }, [pathname, router]);

    // When the pathname changes (page fully loaded), remove the transition after a short delay
    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 100); // Small buffer to ensure the new page is rendered before pulling back the curtain
            return () => clearTimeout(timer);
        }
    }, [pathname, isTransitioning]);

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
