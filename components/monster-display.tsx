"use client";
import Image from "next/image";
import type { Monster } from "@/lib/types";

interface MonsterDisplayProps {
  monster: Monster;
  currentHealth: number;
  isEnemy: boolean;
  isAttacking: boolean;
  isReceivingAttack: boolean;
}

export default function MonsterDisplay({
  monster,
  currentHealth,
  isEnemy,
  isAttacking,
  isReceivingAttack,
}: MonsterDisplayProps) {
  const healthPercentage = Math.max(
    0,
    Math.min(100, (currentHealth / monster.maxHealth) * 100)
  );

  const getHealthColor = () => {
    if (healthPercentage > 50) return "bg-green-500";
    if (healthPercentage > 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTypeIcon = () => {
    switch (monster.type) {
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

  const getTypeColor = () => {
    switch (monster.type) {
      case "fire":
        return "bg-orange-500";
      case "water":
        return "bg-blue-500";
      case "grass":
        return "bg-green-800";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeBorderColor = () => {
    switch (monster.type) {
      case "fire":
        return "border-orange-300";
      case "water":
        return "border-blue-300";
      case "grass":
        return "border-green-500";
      default:
        return "border-gray-300";
    }
  };

  return (
    <div
      className={`w-full h-full flex ${
        isEnemy ? "items-start pt-8" : "items-end pb-4"
      } justify-center relative`}
    >
      <div
        className={`absolute ${
          isEnemy
            ? "top-20 left-4 md:top-20 md:left-8 "
            : "bottom-12 right-4 md:bottom-12 md:right-8"
        } w-64 h-16`}
      >
        <div
          className={`${getTypeColor()} rounded-lg p-2 shadow-lg border-2  ${getTypeBorderColor()} transform ${
            isEnemy ? "rotate-0" : "rotate-0"
          }`}
        >
          <div className="flex justify-between items-center mb-1 px-1">
            <span className="font-bold text-white uppercase tracking-wider">
              {monster.name}
            </span>
            <span className="font-bold text-white">
              Lv{monster.level} {getTypeIcon()}
            </span>
          </div>
          <div className="bg-gray-800 h-5 rounded-full overflow-hidden border border-gray-700">
            <div
              className={`h-full ${getHealthColor()} transition-all duration-300`}
              style={{ width: `${healthPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-white text-xs font-bold">
              {currentHealth}/{monster.maxHealth} HP
            </span>
          </div>
        </div>
      </div>

      <div
        className={`relative ${
          isAttacking
            ? "animate-attack-forward"
            : isReceivingAttack
            ? "animate-receiving-attack"
            : ""
        }`}
      >
        <div
          className={`
          w-56 h-56 md:w-56 md:h-56 relative
          ${isEnemy ? "mt-48 lg:mt-0" : ""}
        `}
        >
          <Image
            src={monster.image || "/placeholder.svg"}
            alt={monster.name}
            fill
            className={`object-contain ${
              monster.type === "water"
                ? isEnemy
                  ? "transform -scale-x-100 left-1/2 translate-x-1/2 z-20 lg:translate-x-1/2"
                  : "transform scale-x-100 left-1/2 -translate-x-1/2 z-20"
                : monster.type === "fire"
                ? isEnemy
                  ? "transform scale-x-100 left-1/2 translate-x-1/2 z-20"
                  : "transform -scale-x-100 left-1/2 -translate-x-1/2 z-20 lg:-translate-y-1"
                : monster.type === "grass"
                ? isEnemy
                  ? "transform scale-x-100 left-1/2 translate-x-1/2 z-20 lg:translate-y-1"
                  : "transform -scale-x-100 left-1/2 -translate-x-1/2 z-20"
                : isEnemy
                ? "transform scale-x-100 left-1/2 translate-x-1/2 z-20"
                : "transform scale-x-100 left-1/2 -translate-x-1/2 z-20"
            } `}
          />

          <div
            className={`absolute inset-0 rounded-full opacity-30 animate-pulse object-contain ${
              monster.type === "water"
                ? isEnemy
                  ? "transform -scale-x-100 left-1/2 translate-x-1/2 z-20"
                  : "transform scale-x-100 left-1/1 -translate-x-1/2 z-20"
                : monster.type === "fire"
                ? isEnemy
                  ? "transform scale-x-100 left-1/2 translate-x-1/2 z-20"
                  : "transform -scale-x-100 left-1/1 -translate-x-1/2 z-20"
                : monster.type === "grass"
                ? isEnemy
                  ? "transform -scale-x-100 left-1/2 translate-x-1/2 z-20"
                  : "transform scale-x-100 left-1/1 -translate-x-1/2 z-20"
                : isEnemy
                ? "transform scale-x-100 left-1/2 translate-x-1/2 z-20"
                : "transform scale-x-100 left-1/2 -translate-x-1/2 z-20"
            } ${
              monster.type === "fire"
                ? "bg-red-500"
                : monster.type === "water"
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
            style={{ filter: "blur(20px)" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
