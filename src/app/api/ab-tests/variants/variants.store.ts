export enum VARIANT_TYPE {
  CTA = 'CTA',
  PRICE = 'PRICE',
}

export type Variant = {
  description?: string;
  key: VARIANT_TYPE;
  options: string[];
};

const variantStore = new Map<string, Variant>([
  [VARIANT_TYPE.PRICE, { key: VARIANT_TYPE.PRICE, options: ['0', '1'] }],
  [VARIANT_TYPE.CTA, { key: VARIANT_TYPE.CTA, options: ['0', '1'] }],
]);

export function getAllVariants() {
  return Object.fromEntries(variantStore);
}

export function getVariant(key: string) {
  return variantStore.get(key);
}

export function createOrUpdateVariant(variant: Variant) {
  variantStore.set(variant.key, variant);
  return variant;
}

export function deleteVariant(key: string) {
  return variantStore.delete(key);
}
