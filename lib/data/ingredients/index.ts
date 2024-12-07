import { Ingredient } from 'haircare-ingredients-analyzer';
import { alcohols } from './alcohols';
import { sulfates } from './sulfates';
import { silicones } from './silicones';
import { preservatives } from './preservatives';
import { soap } from './soap';
import { otherCleansers } from './otherCleansers';
import { waxes } from './waxes';
import { other } from './other';

export const ingredients: Record<string, Ingredient> = {
  ...alcohols,
  ...sulfates,
  ...silicones,
  ...preservatives,
  ...soap,
  ...otherCleansers,
  ...waxes,
  ...other,
};

export default ingredients;
