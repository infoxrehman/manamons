"use client";

import type { Attack } from "@/lib/types";

interface AttackSelectionProps {
  attacks: Attack[];
  onSelectAttack: (attack: Attack) => void;
  disabled: boolean;
}

export default function AttackSelection({
  attacks,
  onSelectAttack,
  disabled,
}: AttackSelectionProps) {
  const getAttackTypeColor = (type: string) => {
    switch (type) {
      case "fire":
        return "from-red-600 to-orange-500";
      case "water":
        return "from-blue-600 to-cyan-500";
      case "grass":
        return "from-green-600 to-emerald-500";
      default:
        return "from-gray-600 to-gray-500";
    }
  };

  const getAttackTypeIcon = (type: string) => {
    switch (type) {
      case "fire":
        return "🔥";
      case "water":
        return "💧";
      case "grass":
        return "🌿";
      default:
        return "⚡";
    }
  };

  const getAttackTypeBorder = (type: string) => {
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

  return (
    <div className="w-full h-full p-4 lg:p-4 lg:pr-8 lg:pl-8">
      <div className="grid grid-cols-2 gap-4 h-full lg:grid-cols-4 lg:gap-6">
        {attacks.map((attack) => (
          <button
            key={attack.id}
            onClick={() => onSelectAttack(attack)}
            disabled={disabled}
            className={`
              relative bg-gradient-to-br border-dashed ${getAttackTypeColor(
                attack.type
              )}
              rounded-lg p-3 flex flex-col items-center justify-center
              border-2 ${getAttackTypeBorder(attack.type)} shadow-md
              transition-transform transform hover:scale-105 active:scale-95
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div className="absolute top-2 left-2 text-xl">
              {getAttackTypeIcon(attack.type)}
            </div>

            <div className="text-white font-bold text-lg mb-2">
              {attack.name}
            </div>

            <div className="text-white text-sm">Power: {attack.power}</div>

            <div className="absolute bottom-2 right-2 bg-black bg-opacity-30 px-2 py-1 rounded text-xs text-white">
              {attack.type.toUpperCase()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
