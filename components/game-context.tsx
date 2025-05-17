"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import type { CardType, PlayerType } from "@/lib/types"
import { generatePlayerDeck, generateEnemyDeck } from "@/lib/card-data"

interface GameContextType {
  playerDeck: CardType[]
  enemyDeck: CardType[]
  playerHand: CardType[]
  enemyHand: CardType[]
  playerHealth: number
  enemyHealth: number
  playerEnergy: number
  enemyEnergy: number
  playerWins: number
  enemyWins: number
  currentRound: number
  isPlayerTurn: boolean
  gamePhase: "draw" | "play" | "battle" | "end"
  selectedCard: CardType | null
  enemySelectedCard: CardType | null
  battleLog: string[]

  // Actions
  drawCard: (player: PlayerType) => void
  selectCard: (card: CardType) => void
  playCard: (card: CardType) => void
  endTurn: () => void
  startNewRound: () => void
  addBattleLog: (message: string) => void
  resetGame: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  // Decks
  const [playerDeck, setPlayerDeck] = useState<CardType[]>([])
  const [enemyDeck, setEnemyDeck] = useState<CardType[]>([])

  // Hands
  const [playerHand, setPlayerHand] = useState<CardType[]>([])
  const [enemyHand, setEnemyHand] = useState<CardType[]>([])

  // Game state
  const [playerHealth, setPlayerHealth] = useState(20)
  const [enemyHealth, setEnemyHealth] = useState(20)
  const [playerEnergy, setPlayerEnergy] = useState(3)
  const [enemyEnergy, setEnemyEnergy] = useState(3)
  const [playerWins, setPlayerWins] = useState(0)
  const [enemyWins, setEnemyWins] = useState(0)
  const [currentRound, setCurrentRound] = useState(1)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gamePhase, setGamePhase] = useState<"draw" | "play" | "battle" | "end">("draw")
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null)
  const [enemySelectedCard, setEnemySelectedCard] = useState<CardType | null>(null)
  const [battleLog, setBattleLog] = useState<string[]>([])

  // Initialize game
  useEffect(() => {
    resetGame()
  }, [])

  // Reset game state
  const resetGame = () => {
    const newPlayerDeck = generatePlayerDeck()
    const newEnemyDeck = generateEnemyDeck()

    setPlayerDeck(newPlayerDeck)
    setEnemyDeck(newEnemyDeck)
    setPlayerHand([])
    setEnemyHand([])
    setPlayerHealth(20)
    setEnemyHealth(20)
    setPlayerEnergy(3)
    setEnemyEnergy(3)
    setPlayerWins(0)
    setEnemyWins(0)
    setCurrentRound(1)
    setIsPlayerTurn(true)
    setGamePhase("draw")
    setSelectedCard(null)
    setEnemySelectedCard(null)
    setBattleLog(["Game started! Draw your cards."])

    // Initial draw
    for (let i = 0; i < 4; i++) {
      drawCard("player")
      drawCard("enemy")
    }
  }

  // Start a new round
  const startNewRound = () => {
    const newPlayerDeck = generatePlayerDeck()
    const newEnemyDeck = generateEnemyDeck()

    setPlayerDeck(newPlayerDeck)
    setEnemyDeck(newEnemyDeck)
    setPlayerHand([])
    setEnemyHand([])
    setPlayerHealth(20)
    setEnemyHealth(20)
    setPlayerEnergy(3)
    setEnemyEnergy(3)
    setCurrentRound((prev) => prev + 1)
    setIsPlayerTurn(true)
    setGamePhase("draw")
    setSelectedCard(null)
    setEnemySelectedCard(null)
    setBattleLog([`Round ${currentRound + 1} started! Draw your cards.`])

    // Initial draw
    for (let i = 0; i < 4; i++) {
      drawCard("player")
      drawCard("enemy")
    }
  }

  // Draw a card
  const drawCard = (player: PlayerType) => {
    if (player === "player") {
      if (playerDeck.length > 0) {
        const card = playerDeck[0]
        setPlayerDeck((prev) => prev.slice(1))
        setPlayerHand((prev) => [...prev, card])
        addBattleLog("Player drew a card.")
      } else {
        addBattleLog("Player's deck is empty!")
      }
    } else {
      if (enemyDeck.length > 0) {
        const card = enemyDeck[0]
        setEnemyDeck((prev) => prev.slice(1))
        setEnemyHand((prev) => [...prev, card])
        addBattleLog("Enemy drew a card.")
      } else {
        addBattleLog("Enemy's deck is empty!")
      }
    }
  }

  // Select a card
  const selectCard = (card: CardType) => {
    if (isPlayerTurn && gamePhase === "play") {
      setSelectedCard(card)
      addBattleLog(`Player selected ${card.name}.`)
    }
  }

  // Play a card
  const playCard = (card: CardType) => {
    if (isPlayerTurn && gamePhase === "play" && selectedCard) {
      // Check if player has enough energy
      if (playerEnergy >= selectedCard.energyCost) {
        // Remove card from hand
        setPlayerHand((prev) => prev.filter((c) => c.id !== selectedCard.id))

        // Deduct energy
        setPlayerEnergy((prev) => prev - selectedCard.energyCost)

        // Process card effects
        processCardEffect(selectedCard, "player")

        // Move to battle phase
        setGamePhase("battle")

        // Enemy selects and plays a card
        setTimeout(() => {
          enemyPlayCard()
        }, 1000)
      } else {
        addBattleLog("Not enough energy to play this card!")
      }
    }
  }

  // Process card effect
  const processCardEffect = (card: CardType, player: PlayerType) => {
    if (player === "player") {
      switch (card.type) {
        case "attack":
          // Calculate damage
          const isCritical = Math.random() < 0.2
          let damage = card.value

          if (isCritical) {
            damage = Math.floor(damage * 1.5)
            addBattleLog(`CRITICAL HIT! Player's ${card.name} deals ${damage} damage!`)
          } else {
            addBattleLog(`Player's ${card.name} deals ${damage} damage!`)
          }

          setEnemyHealth((prev) => Math.max(0, prev - damage))
          break

        case "defense":
          addBattleLog(`Player's ${card.name} adds ${card.value} shield!`)
          // Shield logic would go here
          break

        case "special":
          addBattleLog(`Player's ${card.name} special effect activated!`)
          // Special effect logic
          break

        case "item":
          if (card.effect === "heal") {
            setPlayerHealth((prev) => Math.min(20, prev + card.value))
            addBattleLog(`Player's ${card.name} heals for ${card.value} health!`)
          }
          break
      }
    } else {
      // Enemy card effects
      switch (card.type) {
        case "attack":
          // Calculate damage
          const isCritical = Math.random() < 0.2
          let damage = card.value

          if (isCritical) {
            damage = Math.floor(damage * 1.5)
            addBattleLog(`CRITICAL HIT! Enemy's ${card.name} deals ${damage} damage!`)
          } else {
            addBattleLog(`Enemy's ${card.name} deals ${damage} damage!`)
          }

          setPlayerHealth((prev) => Math.max(0, prev - damage))
          break

        case "defense":
          addBattleLog(`Enemy's ${card.name} adds ${card.value} shield!`)
          // Shield logic would go here
          break

        case "special":
          addBattleLog(`Enemy's ${card.name} special effect activated!`)
          // Special effect logic
          break

        case "item":
          if (card.effect === "heal") {
            setEnemyHealth((prev) => Math.min(20, prev + card.value))
            addBattleLog(`Enemy's ${card.name} heals for ${card.value} health!`)
          }
          break
      }
    }
  }

  // Enemy AI selects and plays a card
  const enemyPlayCard = () => {
    // Simple AI: prioritize attack cards if has energy, otherwise use items
    const playableCards = enemyHand.filter((card) => card.energyCost <= enemyEnergy)

    if (playableCards.length > 0) {
      // Prioritize attack cards
      const attackCards = playableCards.filter((card) => card.type === "attack")
      const healCards = playableCards.filter((card) => card.type === "item" && card.effect === "heal")

      let selectedCard: CardType

      if (enemyHealth < 10 && healCards.length > 0) {
        // If low health and has heal card, use it
        selectedCard = healCards[0]
      } else if (attackCards.length > 0) {
        // Use attack card if available
        selectedCard = attackCards[0]
      } else {
        // Otherwise use any playable card
        selectedCard = playableCards[0]
      }

      setEnemySelectedCard(selectedCard)
      addBattleLog(`Enemy selected ${selectedCard.name}.`)

      // Remove card from hand
      setEnemyHand((prev) => prev.filter((c) => c.id !== selectedCard.id))

      // Deduct energy
      setEnemyEnergy((prev) => prev - selectedCard.energyCost)

      // Process card effects
      processCardEffect(selectedCard, "enemy")

      // Check for round end
      setTimeout(() => {
        if (playerHealth <= 0 || enemyHealth <= 0) {
          if (playerHealth <= 0) {
            setEnemyWins((prev) => prev + 1)
            addBattleLog("Enemy wins this round!")
          } else {
            setPlayerWins((prev) => prev + 1)
            addBattleLog("Player wins this round!")
          }

          // Check if match is over (best of 3)
          if (playerWins >= 2 || enemyWins >= 2) {
            addBattleLog(playerWins >= 2 ? "Player wins the match!" : "Enemy wins the match!")
          } else {
            // Start new round
            setTimeout(() => {
              startNewRound()
            }, 2000)
          }
        } else {
          // Continue to next turn
          endTurn()
        }
      }, 1000)
    } else {
      addBattleLog("Enemy has no playable cards!")
      endTurn()
    }
  }

  // End turn
  const endTurn = () => {
    setSelectedCard(null)
    setEnemySelectedCard(null)

    // Toggle turn
    setIsPlayerTurn((prev) => !prev)

    // Reset to draw phase
    setGamePhase("draw")

    // Replenish some energy
    if (isPlayerTurn) {
      setEnemyEnergy((prev) => Math.min(10, prev + 2))
      addBattleLog("Enemy's turn. Enemy draws a card.")
      drawCard("enemy")

      // Enemy AI turn
      setTimeout(() => {
        setGamePhase("play")
        setTimeout(() => {
          enemyPlayCard()
        }, 1000)
      }, 1000)
    } else {
      setPlayerEnergy((prev) => Math.min(10, prev + 2))
      addBattleLog("Player's turn. Player draws a card.")
      drawCard("player")
      setGamePhase("play")
    }
  }

  // Add message to battle log
  const addBattleLog = (message: string) => {
    setBattleLog((prev) => [...prev, message])
  }

  const value = {
    playerDeck,
    enemyDeck,
    playerHand,
    enemyHand,
    playerHealth,
    enemyHealth,
    playerEnergy,
    enemyEnergy,
    playerWins,
    enemyWins,
    currentRound,
    isPlayerTurn,
    gamePhase,
    selectedCard,
    enemySelectedCard,
    battleLog,

    drawCard,
    selectCard,
    playCard,
    endTurn,
    startNewRound,
    addBattleLog,
    resetGame,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
