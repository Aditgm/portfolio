"use client";

import Link, { LinkProps } from "next/link";
import React from "react";
import { useTransition } from "./TransitionContext";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}

export function TransitionLink({ children, href, className, ...props }: TransitionLinkProps) {
    const { triggerTransition } = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Stop default instant navigation
        triggerTransition(href);
    };

    return (
        <Link href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </Link>
    );
}
