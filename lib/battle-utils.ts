import type { Monster, Attack } from "./types"

const typeEffectiveness: Record<string, Record<string, number>> = {
  fire: {
    fire: 1,
    water: 0.5,
    grass: 2,
  },
  water: {
    fire: 2,
    water: 1,
    grass: 0.5,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 1,
  },
}

export function calculateDamage(attacker: Monster, defender: Monster, attack: Attack): number {
  const effectiveness = attack.type !== "normal" ? typeEffectiveness[attack.type][defender.type] : 1

  let damage = attack.power * (1 + attacker.level / 100)

  damage = damage * effectiveness

  const randomFactor = 0.9 + Math.random() * 0.2
  damage = damage * randomFactor

  const isCritical = Math.random() < 0.1
  if (isCritical) {
    damage = damage * 1.5
  }

  return Math.round(damage)
}

export function getEffectivenessMessage(attackType: string, defenderType: string): string | null {
  if (attackType === "normal") return null

  const effectiveness = typeEffectiveness[attackType][defenderType]

  if (effectiveness > 1) {
    return "It's super effective!"
  } else if (effectiveness < 1) {
    return "It's not very effective..."
  }

  return null
}
