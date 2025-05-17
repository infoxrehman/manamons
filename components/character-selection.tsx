"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { monsters } from "@/lib/monster-data";
import type { Monster } from "@/lib/types";

interface CharacterSelectionProps {
  onSelectMonster: (monster: Monster) => void;
}

export default function CharacterSelection({
  onSelectMonster,
}: CharacterSelectionProps) {
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!selectedMonster) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % monsters.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedMonster]);

  const handleSelect = (monster: Monster) => {
    setSelectedMonster(monster);
  };

  const handleConfirm = () => {
    if (selectedMonster) {
      onSelectMonster(selectedMonster);
    }
  };

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "fire":
        return "🔥";
      case "water":
        return "💧";
      case "grass":
        return "🌿";
      default:
        return "";
    }
  };

  const getTypeBorderColor = (type: string) => {
    switch (type) {
      case "fire":
        return "border-orange-300";
      case "water":
        return "border-blue-300";
      case "grass":
        return "border-green-300";
      default:
        return "border-gray-300";
    }
  };

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "fire":
        return "from-black to-black";
      case "water":
        return "from-black to-black";
      case "grass":
        return "from-black to-black";
      default:
        return "from-gray-600 to-gray-700";
    }
  };

  return (
    <div className="w-full min-h-screen lg:h-screen lg:overflow-y-scroll bg-gradient-to-b from-black to-black flex flex-col">
      <div className="p-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 mt-12">
          Choose Your Mana's
        </h1>
        <p className="text-white text-sm md:text-base">
          Select a mana to battle with!
        </p>
      </div>

      <div className="flex-1 flex flex-col mt-12 items-center justify-center p-4 relative">
        <div className="relative w-full max-w-3xl h-80 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            {monsters.map((monster, index) => (
              <div
                key={monster.id}
                className={`absolute transition-all duration-500 transform ${
                  selectedMonster
                    ? selectedMonster.id === monster.id
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                    : index === activeIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
                style={{
                  zIndex: selectedMonster
                    ? selectedMonster.id === monster.id
                      ? 10
                      : 0
                    : index === activeIndex
                    ? 10
                    : 0,
                }}
              >
                <div
                  className={`bg-white/10 backdrop-blur-lg border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center shadow-xl transition duration-300`}
                >
                  <div className="w-60 h-60 relative mb-4">
                    <div
                      className={`absolute inset-0 rounded-full opacity-30 animate-pulse ${
                        monster.type === "fire"
                          ? "bg-red-500"
                          : monster.type === "water"
                          ? "bg-blue-500"
                          : "bg-green-200"
                      }`}
                      style={{ filter: "blur(24px)" }}
                    ></div>
                    <Image
                      src={monster.image || "/placeholder.svg"}
                      alt={monster.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-2">
                    {monster.name}
                  </h2>

                  <div
                    className={`${getTypeColor(
                      monster.type
                    )} rounded-full px-3 py-1 text-sm text-white font-bold mb-3`}
                  >
                    {getTypeIcon(monster.type)} {monster.type.toUpperCase()}
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-black bg-opacity-30 rounded p-2 text-center">
                      <div className="text-white text-xs mb-1">HP</div>
                      <div className="text-white font-bold">
                        {monster.maxHealth}
                      </div>
                    </div>
                    <div className="bg-black bg-opacity-30 rounded p-2 text-center">
                      <div className="text-white text-xs mb-1">LEVEL</div>
                      <div className="text-white font-bold">
                        {monster.level}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-16 space-x-4 mb-8">
          {monsters.map((monster) => (
            <button
              key={monster.id}
              onClick={() => handleSelect(monster)}
              className={`w-16 h-16 rounded-full overflow-hidden transition-all ${
                selectedMonster?.id === monster.id ||
                (!selectedMonster && activeIndex === monsters.indexOf(monster))
                  ? `border-yellow-400 scale-110 ${getTypeBorderColor(
                      monster.type
                    )}`
                  : "border-gray-600 opacity-70"
              }`}
            >
              <div className="w-full h-full bg-white relative">
                <Image
                  src={monster.profileImage || "/placeholder.svg"}
                  alt={monster.name}
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>

        {(selectedMonster || monsters[activeIndex]) && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 max-w-2xl">
            <p className="text-white text-center">
              {selectedMonster
                ? selectedMonster.description
                : monsters[activeIndex].description}
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-900 bg-opacity-80">
        <button
          onClick={handleConfirm}
          disabled={!selectedMonster}
          className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-3 rounded-lg text-xl transition-colors ${
            !selectedMonster ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {selectedMonster
            ? `Select ${selectedMonster.name}`
            : "Select a Monster"}
        </button>
      </div>
    </div>
  );
}
