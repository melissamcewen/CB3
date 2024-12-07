export const filterCategories = {
  sulfate: {
    id: 'sulfate',
    stateKey: 'sulfate',
    label: 'Sulfates',
    warningMessage: 'Contains sulfates',
    matchCategories: ['sulfate'],
    badgeColor: 'warning',
    minConfidence: 0.8
  },
  'non-soluble-silicone': {
    id: 'non-soluble silicone',
    stateKey: 'non-soluble silicone',
    label: 'Non-soluble Silicones',
    warningMessage: 'Contains silicones',
    matchCategories: ['non-soluble silicone'],
    badgeColor: 'error',
    minConfidence: 0.7
  },
  'water-soluble-silicone': {
    id: 'water-soluble silicone',
    label: 'Water-soluble Silicones',
    warningMessage: 'Contains silicones',
    matchCategories: ['water-soluble silicone'],
    badgeColor: 'warning',
    minConfidence: 0.7
  },
  'drying-alcohol': {
    id: 'drying alcohol',
    label: 'Drying Alcohols',
    warningMessage: 'Contains drying alcohols',
    matchCategories: ['drying alcohol'],
    badgeColor: 'warning',
    minConfidence: 0.8
  },
  'non-soluble-wax': {
    id: 'non-soluble wax',
    label: 'Non-soluble Waxes',
    warningMessage: 'Contains non-soluble waxes',
    matchCategories: ['non-soluble wax'],
    badgeColor: 'warning',
    minConfidence: 0.7
  }
} as const;

export type FilterCategory = keyof typeof filterCategories;

export const createInitialFilters = () => {
  return Object.fromEntries(
    Object.entries(filterCategories).map(([key, config]) => [
      config.stateKey,
      true
    ])
  );
};

export const mapFiltersToApi = (filters: Record<string, boolean>) => {
  return Object.fromEntries(
    Object.entries(filterCategories).map(([key, config]) => [
      key,
      filters[config.stateKey]
    ])
  );
};
