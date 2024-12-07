import { Ingredient } from 'haircare-ingredients-analyzer';

export const alcohols: Record<string, Ingredient> = {
  // Drying Alcohols
  "alcohol denat": {
    name: "Alcohol Denat.",
    description: "A type of denatured alcohol commonly used as a solvent. Can be drying and potentially damaging to hair.",
    category: ["drying alcohol"],
    notes: "Avoid in leave-in products and frequent-use products",
    synonyms: [
      "alcohol 40-b",
      "alcohol 40b",
      "alcohol-40b",
      "denatured alcohol",
      "sd alcohol",
      "sd alcohol 40",
      "ethyl alcohol",
      "ethanol"
    ]
  },

  // Fatty Alcohols
  "cetyl alcohol": {
    name: "Cetyl Alcohol",
    description: "A fatty alcohol that acts as an emollient and emulsifier. It's considered safe for curly hair routines.",
    category: ["fatty alcohol", "emollient"],
    notes: "Common in conditioners and styling products",
    synonyms: ["hexadecan-1-ol", "1-hexadecanol", "palmityl alcohol"]
  },
  "isopropyl alcohol": {
    name: "Isopropyl Alcohol",
    description: "A drying alcohol that can be harsh on hair. Often used as a solvent.",
    category: ["drying alcohol"],
    notes: "May be drying to hair and should be avoided in leave-in products",
    synonyms: [
      "isopropanol",
      "propyl alcohol",
      "propanol"
    ]
  },

  "cetearyl alcohol": {
    name: "Cetearyl Alcohol",
    description: "A blend of cetyl and stearyl alcohols. It's a fatty alcohol that helps stabilize formulations and provides conditioning.",
    category: ["fatty alcohol", "emollient"],
    notes: "Commonly used in hair conditioners",
    synonyms: ["cetostearyl alcohol", "ceteryl alcohol", "cetyl stearyl alcohol"]
  },

  "stearyl alcohol": {
    name: "Stearyl Alcohol",
    description: "A fatty alcohol that provides conditioning and emollient properties.",
    category: ["fatty alcohol", "emollient"],
    notes: "Common in hair conditioners and moisturizing products"
  },

  "behenyl alcohol": {
    name: "Behenyl Alcohol",
    description: "A long-chain fatty alcohol that acts as an emollient and thickener.",
    category: ["fatty alcohol", "emollient"],
    notes: "Provides conditioning benefits to hair"
  },

  "myristyl alcohol": {
    name: "Myristyl Alcohol",
    description: "A fatty alcohol derived from natural fats and oils, used as an emollient.",
    category: ["fatty alcohol", "emollient"]
  },

  "c30-50 alcohols": {
    name: "C30-50 Alcohols",
    description: "A group of long-chain fatty alcohols used as emollients and thickeners.",
    category: ["fatty alcohol", "emollient"]
  },

  "lanolin alcohol": {
    name: "Lanolin Alcohol",
    description: "A waxy alcohol derived from lanolin, provides moisturizing properties.",
    category: ["fatty alcohol", "emollient", "moisturizer"],
    synonyms: ["wool alcohol", "wool wax alcohol"]
  },

  "benzyl alcohol": {
    name: "Benzyl Alcohol",
    description: "An aromatic alcohol used as a preservative and fragrance ingredient.",
    category: ["preservative alcohol"],
    notes: "Generally considered safe in hair care products"
  },
};
