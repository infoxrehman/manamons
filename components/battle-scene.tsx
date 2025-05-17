"use client";

import { useState, useEffect } from "react";
import MonsterDisplay from "./monster-display";
import AttackSelection from "./attack-selection";
import { calculateDamage } from "@/lib/battle-utils";
import Image from "next/image";
import type { Monster, Attack } from "@/lib/types";
import battleGround from "../assets/battle-ground.png";
import AttackAnimation from "./attack-animation";

interface BattleSceneProps {
  playerMonster: Monster;
  enemyMonster: Monster;
  onBattleEnd: (winner: "player" | "enemy") => void;
}

export default function BattleScene({
  playerMonster,
  enemyMonster,
  onBattleEnd,
}: BattleSceneProps) {
  const [playerHealth, setPlayerHealth] = useState(playerMonster.maxHealth);
  const [enemyHealth, setEnemyHealth] = useState(enemyMonster.maxHealth);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [, setBattleLog] = useState<string[]>(["Battle started!"]);
  const [attackAnimation, setAttackAnimation] = useState<
    "player" | "enemy" | null
  >(null);
  const [selectedAttack, setSelectedAttack] = useState<Attack | null>(null);
  const [showBattleStart, setShowBattleStart] = useState(true);

  const [currentAttack, setCurrentAttack] = useState<Attack | null>(null);
  const [showAttackAnimation, setShowAttackAnimation] = useState(false);
  const [attackingPlayer, setAttackingPlayer] = useState<"player" | "enemy">(
    "player"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBattleStart(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (playerHealth <= 0) {
      onBattleEnd("enemy");
    } else if (enemyHealth <= 0) {
      onBattleEnd("player");
    }
  }, [playerHealth, enemyHealth, onBattleEnd]);

  const handleAttack = (attack: Attack) => {
    if (!isPlayerTurn) return;

    setSelectedAttack(attack);
    setCurrentAttack(attack);
    setAttackingPlayer("player");
    setShowAttackAnimation(true);
  };

  const handleAttackAnimationComplete = () => {
    setShowAttackAnimation(false);

    if (attackingPlayer === "player") {
      const damage = calculateDamage(
        playerMonster,
        enemyMonster,
        selectedAttack!
      );
      const isCritical = Math.random() < 0.1;

      setAttackAnimation("player");

      setBattleLog((prev) =>
        [
          ...prev,
          `${playerMonster.name} used ${selectedAttack!.name}!`,
          isCritical ? "A critical hit!" : "",
        ].filter(Boolean)
      );

      setTimeout(() => {
        setEnemyHealth((prev) => Math.max(0, prev - damage));

        setBattleLog((prev) => [
          ...prev,
          `${enemyMonster.name} took ${damage} damage!`,
        ]);

        setAttackAnimation(null);

        setIsPlayerTurn(false);
      }, 1000);
    } else {
      const damage = calculateDamage(
        enemyMonster,
        playerMonster,
        currentAttack!
      );
      const isCritical = Math.random() < 0.1;

      setAttackAnimation("enemy");

      setBattleLog((prev) =>
        [
          ...prev,
          `${enemyMonster.name} used ${currentAttack!.name}!`,
          isCritical ? "A critical hit!" : "",
        ].filter(Boolean)
      );

      setTimeout(() => {
        setPlayerHealth((prev) => Math.max(0, prev - damage));

        setBattleLog((prev) => [
          ...prev,
          `${playerMonster.name} took ${damage} damage!`,
        ]);

        setAttackAnimation(null);

        setIsPlayerTurn(true);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && enemyHealth > 0) {
      const enemyAttackTimeout = setTimeout(() => {
        const randomAttackIndex = Math.floor(
          Math.random() * enemyMonster.attacks.length
        );
        const enemyAttack = enemyMonster.attacks[randomAttackIndex];

        setCurrentAttack(enemyAttack);
        setAttackingPlayer("enemy");
        setShowAttackAnimation(true);
      }, 1500);

      return () => clearTimeout(enemyAttackTimeout);
    }
  }, [isPlayerTurn, enemyMonster, enemyHealth]);

  return (
    <div className="w-full h-full lg:h-[400] lg:w-[300] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black z-0">
        <Image
          src={battleGround}
          alt="Battle Background"
          fill
          className="object-cover w-full h-full z-0"
          priority
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col">
        <div className="flex-1 relative">
          <MonsterDisplay
            monster={enemyMonster}
            currentHealth={enemyHealth}
            isEnemy={true}
            isAttacking={attackAnimation === "enemy"}
            isReceivingAttack={attackAnimation === "player"}
          />
        </div>

        <div className="flex-1 relative">
          <MonsterDisplay
            monster={playerMonster}
            currentHealth={playerHealth}
            isEnemy={false}
            isAttacking={attackAnimation === "player"}
            isReceivingAttack={attackAnimation === "enemy"}
          />
        </div>

        <div className="bg-white/40 backdrop-blur-lg border-2 border-dashed border-white/20 lg:mb-2 rounded-xl">
          {isPlayerTurn ? (
            <AttackSelection
              attacks={playerMonster.attacks}
              onSelectAttack={handleAttack}
              disabled={
                !isPlayerTurn || attackAnimation !== null || showAttackAnimation
              }
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-black text-xl font-bold animate-pulse">
                Enemy is thinking...
              </p>
            </div>
          )}
        </div>
      </div>

      {showBattleStart && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="text-white text-4xl font-bold animate-pulse">
            {playerMonster.name} VS {enemyMonster.name}
          </div>
        </div>
      )}

      {showAttackAnimation && currentAttack && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <AttackAnimation
            attack={currentAttack}
            isPlayerAttacking={attackingPlayer === "player"}
            onAnimationComplete={handleAttackAnimationComplete}
          />
        </div>
      )}
    </div>
  );
}
