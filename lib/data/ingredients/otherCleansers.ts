import { Ingredient } from 'haircare-ingredients-analyzer';

export const otherCleansers: Record<string, Ingredient> = {
  // Other Cleansers
  "cocamidopropyl betaine": {
    name: "Cocamidopropyl Betaine",
    description: "A gentle surfactant derived from coconut oil. Often used as a secondary surfactant to reduce the harshness of other cleansers.",
    category: ["gentle cleanser", "surfactant"],
    notes: "Generally considered safe for curly hair routines",
    source: ["https://pubchem.ncbi.nlm.nih.gov/compound/Cocamidopropyl-betaine"],
    synonyms: [
      "CAPB",
      "coco betaine",
      "cocoyl betaine"
    ]
  },

  "sodium cocoyl isethionate": {
    name: "Sodium Cocoyl Isethionate",
    description: "A gentle cleansing agent derived from coconut oil.",
    category: ["gentle cleanser", "surfactant"],
    notes: "Good for sensitive scalp and curly hair",
    synonyms: ["SCI"]
  },

  "decyl glucoside": {
    name: "Decyl Glucoside",
    description: "A very gentle surfactant derived from plant-based materials.",
    category: ["gentle cleanser", "surfactant"],
    notes: "Suitable for sensitive scalp and curly hair",
    synonyms: ["decyl polyglucose"]
  },

  "Sodium C14-16 Olefin Sulfonate": {
    name: "Sodium C14-16 Olefin Sulfonate",
    description: "A sulfonate surfactant derived from petroleum.",
    category: ["surfactant"],
    notes: "Commonly used in shampoos and conditioners"
  }
};
