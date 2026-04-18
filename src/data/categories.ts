export const ITEM_CATEGORIES = [
  "Furniture",
  "Clothing & Textiles",
  "Cosmetic Appliance Damage"
];

export const isCategoryInScope = (category: string) => {
  return ITEM_CATEGORIES.includes(category);
};
