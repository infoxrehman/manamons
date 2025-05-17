"use client";

import { useEffect, useState } from "react";
import type { Attack } from "@/lib/types";

interface AttackAnimationProps {
  attack: Attack;
  isPlayerAttacking: boolean;
  onAnimationComplete: () => void;
}

export default function AttackAnimation({
  attack,
  isPlayerAttacking,
  onAnimationComplete,
}: AttackAnimationProps) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationStep(1);

      const timer2 = setTimeout(() => {
        setAnimationStep(2);

        const timer3 = setTimeout(() => {
          onAnimationComplete();
          setAnimationStep(0);
        }, 800);

        return () => clearTimeout(timer3);
      }, 600);

      return () => clearTimeout(timer2);
    }, 200);

    return () => clearTimeout(timer1);
  }, [onAnimationComplete]);

  const getAnimationClass = () => {
    switch (attack.type) {
      case "fire":
        return "fire-attack";
      case "water":
        return "water-attack";
      case "grass":
        return "grass-attack";
      default:
        return "normal-attack";
    }
  };

  const getParticles = () => {
    switch (attack.type) {
      case "fire":
        return Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="fire-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 0.5 + 0.5}s`,
              animationDelay: `${Math.random() * 0.2}s`,
            }}
          />
        ));
      case "water":
        return Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="water-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 0.5 + 0.5}s`,
              animationDelay: `${Math.random() * 0.2}s`,
            }}
          />
        ));
      case "grass":
        return Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="grass-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 0.5 + 0.5}s`,
              animationDelay: `${Math.random() * 0.2}s`,
            }}
          />
        ));
      default:
        return Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="normal-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 0.5 + 0.5}s`,
              animationDelay: `${Math.random() * 0.2}s`,
            }}
          />
        ));
    }
  };

  if (animationStep === 0) return null;

  return (
    <div
      className={`attack-animation-container ${
        isPlayerAttacking ? "player-attack" : "enemy-attack"
      }`}
    >
      <div
        className={`attack-animation ${getAnimationClass()} ${
          animationStep === 2 ? "impact" : ""
        }`}
      >
        {animationStep === 2 && (
          <div className="particles-container">{getParticles()}</div>
        )}

        {animationStep === 1 && (
          <div className="attack-name pixel-font">{attack.name}!</div>
        )}
      </div>
    </div>
  );
}
