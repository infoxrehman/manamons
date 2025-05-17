"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { monsters } from "@/lib/monster-data";
import type { Monster } from "@/lib/types";

interface EnemySelectionScreenProps {
  playerMonster: Monster;
}

export default function EnemySelectionScreen({
  playerMonster,
}: EnemySelectionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVs, setShowVs] = useState(false);
  const [selectedEnemy, setSelectedEnemy] = useState<Monster | null>(null);

  const availableEnemies = monsters.filter((m) => m.id !== playerMonster.id);

  useEffect(() => {
    if (!selectedEnemy) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % availableEnemies.length);
      }, 300);

      const selectionTimer = setTimeout(() => {
        clearInterval(interval);
        const randomEnemy =
          availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
        setSelectedEnemy(randomEnemy);

        setTimeout(() => {
          setShowVs(true);
        }, 500);
      }, 2000);

      return () => {
        clearInterval(interval);
        clearTimeout(selectionTimer);
      };
    }
  }, [availableEnemies, selectedEnemy]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "fire":
        return "bg-orange-500";
      case "water":
        return "bg-blue-500";
      case "grass":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      {!showVs ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Finding Opponent ⚔️
          </h1>

          <div className="relative w-64 h-64 mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              {availableEnemies.map((monster, index) => (
                <div
                  key={monster.id}
                  className={`absolute transition-all duration-300 transform ${
                    index === currentIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                >
                  <div
                    className={`${getTypeColor(monster.type)} rounded-full p-4`}
                  >
                    <div className="w-48 h-48 relative">
                      <Image
                        src={monster.image || "/placeholder.svg"}
                        alt={monster.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedEnemy && (
            <div className="text-2xl text-white font-bold animate-pulse pixel-font">
              {selectedEnemy.name} wants to battle!
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center animate-pulse">
          <div className="flex items-center justify-center mb-12">
            <div className="w-40 h-40 relative mr-12">
              <div
                className={`absolute inset-0 rounded-full opacity-30 animate-pulse ${getTypeColor(
                  playerMonster.type
                )}`}
                style={{ filter: "blur(20px)" }}
              ></div>
              <Image
                src={playerMonster.image || "/placeholder.svg"}
                alt={playerMonster.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="text-6xl font-bold text-yellow-400 mx-8 pixel-font">
              VS
            </div>

            {selectedEnemy && (
              <div className="w-40 h-40 relative ml-12">
                <div
                  className={`absolute inset-0 rounded-full opacity-30 animate-pulse ${getTypeColor(
                    selectedEnemy.type
                  )}`}
                  style={{ filter: "blur(20px)" }}
                ></div>
                <Image
                  src={selectedEnemy.image || "/placeholder.svg"}
                  alt={selectedEnemy.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <h2 className="text-3xl text-white font-bold pixel-font">
            BATTLE BEGINS!
          </h2>
        </div>
      )}
    </div>
  );
}
