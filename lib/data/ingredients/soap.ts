import { Ingredient } from 'haircare-ingredients-analyzer';

export const soap: Record<string, Ingredient> = {
  "sodium palm kernelate": {
    name: "Sodium Palm Kernelate",
    description: "A soap made from palm kernel oil. Can be harsh and drying.",
    category: ["soap", "harsh cleanser"],
    notes: "May disrupt hair's natural pH balance",
    synonyms: [
      "saponified palm kernel oil",
      "palm kernel soap"
    ]
  },

  "sodium palmate": {
    name: "Sodium Palmate",
    description: "A soap made from palm oil. Can be stripping and raise hair's pH.",
    category: ["soap", "harsh cleanser"],
    notes: "Not recommended for regular hair washing",
    synonyms: [
      "saponified palm oil",
      "palm soap"
    ]
  },

  "sodium cocoate": {
    name: "Sodium Cocoate",
    description: "A soap made from coconut oil. Can be drying despite natural origin.",
    category: ["soap", "harsh cleanser"],
    notes: "May be too alkaline for hair care",
    synonyms: [
      "saponified coconut oil",
      "coconut soap"
    ]
  },

  "potassium hydroxide": {
    name: "Potassium Hydroxide",
    description: "A strong alkali used in making liquid soaps.",
    category: ["soap", "harsh cleanser"],
    notes: "Present in liquid castile soaps",
    synonyms: [
      "KOH",
      "caustic potash",
      "potassium hydrate"
    ]
  }
};
