import type { Monster } from "./types"
import manaFire from "../assets/mana-fire.png"
import manaWater from "../assets/mana-water.png"
import manaGrass from "../assets/mana-grass.png"
import profileFire from "../assets/profile-fire.png"
import profileWater from "../assets/profile-water.png"
import profileGrass from "../assets/profile-grass.png"

export const monsters: Monster[] = [
  {
    id: 1,
    name: "FLAMEPAW",
    type: "fire",
    level: 15,
    maxHealth: 120,
    profileImage: profileFire.src,
    image: manaFire.src,
    description:
      "A fiery like mana with a blazing tail and fierce temperament. Its body radiates heat and can ignite when it becomes angry.",
    attacks: [
      {
        id: 101,
        name: "Ember Blast",
        type: "fire",
        power: 25,
        description: "Shoots a blast of hot embers at the opponent",
      },
      {
        id: 102,
        name: "Flame Charge",
        type: "fire",
        power: 30,
        description: "Charges at the opponent while engulfed in flames",
      },
      {
        id: 103,
        name: "Fire Fang",
        type: "fire",
        power: 35,
        description: "Bites with flaming fangs",
      },
      {
        id: 104,
        name: "Punch",
        type: "normal",
        power: 20,
        description: "A basic physical attack",
      },
    ],
  },
  {
    id: 2,
    name: "AQUATAIL",
    type: "water",
    level: 15,
    maxHealth: 130,
    image: manaWater.src,
    profileImage: profileWater.src,
    description:
      "A blue aquatic mana with a flowing tail and calm demeanor. He can breathe underwater and create powerful water currents with its tail.",
    attacks: [
      {
        id: 201,
        name: "Water Gun",
        type: "water",
        power: 25,
        description: "Shoots a jet of water at high pressure",
      },
      {
        id: 202,
        name: "Bubble Beam",
        type: "water",
        power: 30,
        description: "Fires a stream of bubbles that may lower speed",
      },
      {
        id: 203,
        name: "Aqua Tail",
        type: "water",
        power: 35,
        description: "Strikes with a tail covered in water",
      },
      {
        id: 204,
        name: "Punch",
        type: "normal",
        power: 20,
        description: "A basic physical attack",
      },
    ],
  },
  {
    id: 3,
    name: "LEAFLING",
    type: "grass",
    level: 15,
    maxHealth: 125,
    image: manaGrass.src,
    profileImage: profileGrass.src,
    description:
      "A grass-like mana with leaves and rocks around arms. He can can absorb sunlight to heal itself and release soothing aromas.",
    attacks: [
      {
        id: 301,
        name: "Vine Whip",
        type: "grass",
        power: 25,
        description: "Strikes with vine-like whips",
      },
      {
        id: 302,
        name: "Razor Leaf",
        type: "grass",
        power: 30,
        description: "Fires sharp-edged leaves at the opponent",
      },
      {
        id: 303,
        name: "Seed Bomb",
        type: "grass",
        power: 35,
        description: "Hurls an explosive seed at the opponent",
      },
      {
        id: 304,
        name: "Punch",
        type: "normal",
        power: 20,
        description: "A basic physical attack",
      },
    ],
  },
]
