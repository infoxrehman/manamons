"use client";

import { useState } from "react";
import Image from "next/image";
import BattleGame from "./battle-game";
import logo from "../assets/logo.png";
import manaFire from "../assets/mana-fire.png";
type GameScreen = "home" | "play" | "settings";

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("home");

  const navigateTo = (screen: GameScreen) => {
    setCurrentScreen(screen);
  };

  if (currentScreen === "play") {
    return <BattleGame onBack={() => navigateTo("home")} />;
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="bubble-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="bubble"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                width: `${Math.random() * 50 + 20}px`,
                height: `${Math.random() * 50 + 20}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="mb-24 text-center relative z-10 lg:mt-20">
        <div className="w-72 h-72 md:w-[28rem] md:h-[28rem] flex items-center pl-18 pr-18 justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform scale-125">
          <Image
            src={logo}
            alt="Logo"
            width={384}
            height={384}
            className="object-contain"
          />
        </div>
      </div>
      \{" "}
      <div className="flex justify-center items-end mb-12 relative z-10 mt-24">
        <div className="w-52 h-52 md:w-48 md:h-48 absolute bottom-0 left-1/2 -translate-x-1/2 z-20 transform scale-125">
          <div className="absolute inset-0 bg-red-500 rounded-full opacity-30 blur-2xl animate-pulse"></div>
          <Image
            src={manaFire}
            alt="Fire monster"
            width={200}
            height={200}
            className="object-contain relative z-10"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 relative z-10 mt-20 sm:mt-20 lg:mt-20">
        <button
          onClick={() => navigateTo("play")}
          className="menu-button bg-white/10 backdrop-blur-lg border-2 border-dashed rounded-xl "
        >
          Battle Now ⚔️
        </button>
      </div>
    </div>
  );
}
