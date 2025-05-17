"use client";

import { useState } from "react";
import BattleScene from "./battle-scene";
import CharacterSelection from "./character-selection";
import GameOver from "./game-over";
import { monsters } from "@/lib/monster-data";
import type { Monster } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import EnemySelectionScreen from "./enemy-selection-screen";

type GameState = "selection" | "enemySelecting" | "battle" | "gameOver";

interface BattleGameProps {
  onBack: () => void;
}

export default function BattleGame({ onBack }: BattleGameProps) {
  const [gameState, setGameState] = useState<GameState>("selection");
  const [playerMonster, setPlayerMonster] = useState<Monster | null>(null);
  const [enemyMonster, setEnemyMonster] = useState<Monster | null>(null);
  const [winner, setWinner] = useState<"player" | "enemy" | null>(null);
  const [playerRewards, setPlayerRewards] = useState<{
    exp: number;
    coins: number;
  }>({ exp: 0, coins: 0 });

  const handleMonsterSelect = (monster: Monster) => {
    setPlayerMonster(monster);
    setGameState("enemySelecting");

    setTimeout(() => {
      const availableEnemies = monsters.filter((m) => m.id !== monster.id);
      const randomEnemy =
        availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
      setEnemyMonster(randomEnemy);

      setTimeout(() => {
        setGameState("battle");
      }, 2000);
    }, 1500);
  };

  const handleBattleEnd = (winner: "player" | "enemy") => {
    setWinner(winner);

    if (winner === "player" && playerMonster && enemyMonster) {
      const expGained = Math.floor(
        enemyMonster.level * 10 * (1 + Math.random() * 0.5)
      );
      const coinsGained = Math.floor(
        enemyMonster.level * 5 * (1 + Math.random() * 0.5)
      );

      setPlayerRewards({
        exp: expGained,
        coins: coinsGained,
      });
    }

    setGameState("gameOver");
  };

  const handlePlayAgain = () => {
    setPlayerMonster(null);
    setEnemyMonster(null);
    setWinner(null);
    setPlayerRewards({ exp: 0, coins: 0 });
    setGameState("selection");
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-50 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 transition-all"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      {gameState === "selection" && (
        <CharacterSelection onSelectMonster={handleMonsterSelect} />
      )}

      {gameState === "enemySelecting" && playerMonster && (
        <EnemySelectionScreen playerMonster={playerMonster} />
      )}

      {gameState === "battle" && playerMonster && enemyMonster && (
        <BattleScene
          playerMonster={playerMonster}
          enemyMonster={enemyMonster}
          onBattleEnd={handleBattleEnd}
        />
      )}

      {gameState === "gameOver" && (
        <GameOver
          winner={winner}
          playerMonster={playerMonster}
          enemyMonster={enemyMonster}
          rewards={playerRewards}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
