/** §382: three independent character-exact explanation literals; no runtime constants. */
export const SARAH_CURRENCY_MATCH_GOLDENS = {
  'P-USD': 'Sarah’s savings are in Zambian kwacha, while her course fee is fixed in US dollars. The fee’s kwacha cost depends on the example exchange rate.',
  'P-ZMW': 'Sarah’s savings are in Zambian kwacha, and her course fee is fixed in the same currency. The fee’s kwacha cost does not depend on the example exchange rate.',
  'C-ZMW': 'Sarah’s savings are in Zambian kwacha, and her course fee is now fixed in the same currency. The fee’s kwacha cost no longer depends on the example exchange rate.',
} as const;
