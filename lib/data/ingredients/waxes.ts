import { Ingredient } from 'haircare-ingredients-analyzer';

export const waxes: Record<string, Ingredient> = {
  "beeswax": {
    name: "Beeswax",
    description: "A natural wax that can create buildup on hair.",
    category: ["non-soluble wax"],
    notes: "May require sulfates for removal",
    synonyms: [
      "cera alba",
      "apis mellifera wax",
      "bees wax",
      "cire dabeille"
    ]
  },

  "emulsifying wax": {
    name: "Emulsifying Wax",
    description: "A modified wax that helps combine oil and water in products.",
    category: ["emulsifying wax"],
    notes: "Generally considered safe for hair care",
    synonyms: [
      "emulsifying wax nf",
      "e-wax"
    ]
  },
   "candelilla wax": {
    name: "Candelilla Wax",
    description: "A plant-based wax that can create buildup on hair.",
    category: ["non-soluble wax"],
    notes: "May require clarifying shampoo for removal",
    synonyms: [
      "euphorbia cerifera wax",
      "candelilla cera",
      "candelia wax"
    ]
  },

  "microcrystalline wax": {
    name: "Microcrystalline Wax",
    description: "A petroleum-based wax that can create significant buildup.",
    category: ["non-soluble wax"],
    notes: "May be difficult to remove without sulfates",
    synonyms: [
      "cera microcristallina",
      "microcrystalline cera",
      "mineral wax"
    ]
  },

  "peg-75 lanolin": {
    name: "PEG-75 Lanolin",
    description: "A modified lanolin wax that is water-soluble.",
    category: ["emulsifying wax"],
    notes: "Less likely to cause buildup than regular lanolin",
    synonyms: [
      "polyethylene glycol lanolin",
      "lanolin peg-75"
    ]
  }

};
