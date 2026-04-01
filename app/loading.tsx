"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p className="loading-text">Loading...</p>
      <div className="loading-bar">
        <div 
          className="loading-bar-fill" 
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}