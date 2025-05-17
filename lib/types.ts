export type CardType = {
  id: number
  name: string
  type: string
  element: string
  value: number
  energyCost: number
  description: string
  image: string
  effect?: string
}

export type PlayerType = "player" | "enemy"

export type MonsterType = "fire" | "water" | "grass" | "normal"

export interface Attack {
  id: number
  name: string
  type: MonsterType
  power: number
  description: string
}

export interface Monster {
  id: number
  name: string
  type: MonsterType
  level: number
  maxHealth: number
  image: string
  profileImage: string
  description: string
  attacks: Attack[]
}
