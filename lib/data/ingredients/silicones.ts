import { Ingredient } from 'haircare-ingredients-analyzer';

export const silicones: Record<string, Ingredient> = {
  "dimethicone": {
    name: "Dimethicone",
    description: "A silicone that forms a barrier on hair. Can build up without proper cleansing.",
    category: ["non-soluble silicone"],
    notes: "May require sulfates for complete removal",
    synonyms: [
      "polydimethylsiloxane",
      "PDMS"
    ]
  },
   "amodimethicone": {
    name: "Amodimethicone",
    description: "A modified silicone that adheres more strongly to damaged areas of hair.",
    category: ["non-soluble silicone"],
    notes: "Can build up over time, may require clarifying",
    synonyms: [
      "amino functional silicone",
      "aminopropyl dimethicone"
    ]
  },

  "cyclomethicone": {
    name: "Cyclomethicone",
    description: "A lightweight, volatile silicone that evaporates from hair.",
    category: ["water-soluble silicone"],
    notes: "Generally considered safe as it doesn't build up",
    synonyms: [
      "cyclopentasiloxane",
      "cyclotetrasiloxane",
      "cyclic silicone"
    ]
  },

  "peg-dimethicone": {
    name: "PEG-Dimethicone",
    description: "A water-soluble silicone modified with polyethylene glycol.",
    category: ["water-soluble silicone"],
    notes: "Less likely to build up than regular dimethicone",
    synonyms: [
      "bis-peg dimethicone",
      "peg-modified dimethicone",
      "dimethicone copolyol"
    ]
  }// ... other silicones
};
