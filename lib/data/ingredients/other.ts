import { Ingredient } from 'haircare-ingredients-analyzer';

export const other: Record<string, Ingredient> = {
  // Other
    "aminomethyl propanol": {
    name: "Aminomethyl Propanol",
    description: "A pH adjuster and buffering agent commonly used in hair care products.",
    category: ["pH adjuster"],
    synonyms: [
      "amino-2-methyl-1-propanol",
      "amino methyl propanol",
      "AMP"
    ]
  },
  "witch hazel": {
    name: "Witch Hazel",
    description: "An astringent ingredient that can be drying to hair.",
    category: ["astringent"],
    notes: "Use with caution in hair care products",
    synonyms: [
      "hamamelis virginiana",
      "winterbloom"
    ]
  }
};
