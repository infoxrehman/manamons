"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { Monster } from "@/lib/types";
import confetti from "canvas-confetti";

interface GameOverProps {
  winner: "player" | "enemy" | null;
  playerMonster: Monster | null;
  enemyMonster: Monster | null;
  rewards: { exp: number; coins: number };
  onPlayAgain: () => void;
}

export default function GameOver({
  winner,
  playerMonster,
  enemyMonster,
  rewards,
  onPlayAgain,
}: GameOverProps) {
  const [, setShowConfetti] = useState(false);

  useEffect(() => {
    if (winner === "player") {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4 overflow-y-auto max-h-screen">
      <h1
        className={`text-5xl md:text-6xl font-bold mb-24 ${
          winner === "player" ? "text-yellow-400" : "text-red-500"
        }`}
      >
        {winner === "player" ? "VICTORY!" : "Defeat"}
      </h1>

      {playerMonster && enemyMonster && (
        <div className="flex items-center justify-center mb-12">
          <div className="w-56 h-56 md:w-56 md:h-56 relative">
            <div
              className={`absolute inset-0 rounded-full opacity-30 ${
                winner === "player" ? "animate-pulse bg-yellow-500" : ""
              }`}
              style={{ filter: "blur(20px)" }}
            ></div>
            <Image
              src={playerMonster.image || "/placeholder.svg"}
              alt={playerMonster.name}
              fill
              className={`${
                winner === "player" ? "" : "opacity-50"
              } object-contain ${
                playerMonster.type === "water"
                  ? "transform scale-x-100"
                  : playerMonster.type === "fire"
                  ? "transform -scale-x-100 "
                  : playerMonster.type === "grass"
                  ? "transform -scale-x-100"
                  : "transform scale-x-100 left-1/2 -translate-x-1/2 z-20"
              }`}
            />
          </div>

          <div className="text-4xl md:text-6xl font-bold text-white">VS</div>

          <div className="w-56 h-56 md:w-56 md:h-56 relative">
            <div
              className={`absolute inset-0 rounded-full opacity-0 ${
                winner === "enemy" ? "animate-pulse bg-red-500" : ""
              }`}
              style={{ filter: "blur(20px)" }}
            ></div>
            <Image
              src={enemyMonster.image || "/placeholder.svg"}
              alt={enemyMonster.name}
              fill
              className={`${
                winner === "enemy" ? "" : "opacity-50"
              } object-contain ${
                enemyMonster.type === "water"
                  ? "transform -scale-x-100"
                  : enemyMonster.type === "fire"
                  ? "transform scale-x-100"
                  : enemyMonster.type === "grass"
                  ? "transform scale-x-100"
                  : "transform scale-x-100 left-1/2 translate-x-1/2 z-20"
              }`}
            />
          </div>
        </div>
      )}

      {winner === "player" && (
        <div className="p-6 mb-8 w-full max-w-md bg-white/10 backdrop-blur-lg border-2 border-dashed border-white/20 rounded-xl p-6 items-center shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center pixel-font">
            REWARDS
          </h2>
          <div className="flex justify-between items-center mb-4 bg-white/10 p-3 rounded">
            <span className="text-white text-lg">Experience:</span>
            <span className="text-green-400 text-xl font-bold">
              +{rewards.exp} XP
            </span>
          </div>
          <div className="flex justify-between items-center bg-white/10 p-3 rounded">
            <span className="text-white text-lg">Coins:</span>
            <span className="text-yellow-400 text-xl font-bold">
              +{rewards.coins} 🪙
            </span>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={onPlayAgain}
          className=" bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
