import { Ingredient } from 'haircare-ingredients-analyzer';

export const sulfates: Record<string, Ingredient> = {
  "sodium lauryl sulfate": {
    name: "Sodium Lauryl Sulfate",
    description: "A strong cleansing agent and primary surfactant. Can be harsh and drying on hair.",
    category: ["sulfate", "harsh cleanser"],
    notes: "Generally recommended to avoid in curly hair routines",
    synonyms: [
      "sodium lauryl sulphate",
      "SLS"
    ]
  },
   "sodium laureth sulfate": {
    name: "Sodium Laureth Sulfate",
    description: "A strong cleansing agent and surfactant commonly found in shampoos. Can be harsh and stripping on hair.",
    category: ["sulfate", "harsh cleanser"],
    notes: "Generally recommended to avoid in curly hair routines",
    source: ["https://pubchem.ncbi.nlm.nih.gov/compound/Sodium-dodecyl-sulfate"],
    synonyms: [
      "SLES",
      "sodium lauryl ether sulfate",
      "sodium lauryl ethoxy sulfate",
      "sodium laureth sulphate"
    ]
  },

  "ammonium lauryl sulfate": {
    name: "Ammonium Lauryl Sulfate",
    description: "A strong cleansing agent similar to sodium lauryl sulfate.",
    category: ["sulfate", "harsh cleanser"],
    notes: "Can be harsh and drying on hair",
    synonyms: [
      "ammonium lauryl sulphate",
      "ALS"
    ]
  },

  "ammonium laureth sulfate": {
    name: "Ammonium Laureth Sulfate",
    description: "A modified form of ammonium lauryl sulfate, slightly gentler but still a strong cleanser.",
    category: ["sulfate", "harsh cleanser"],
    synonyms: [
      "ammonium laureth sulphate",
      "ALES"
    ]
  }

};
