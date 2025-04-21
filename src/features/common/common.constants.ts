import { EntityState } from '@/features/common/common.types';
import { createEntityAdapter } from '@/features/common/utils/entities';

export const baseUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV == null || process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const EVENT_STORE_NAVIGATION_CHANGED = 'ev-store-navigation-changed';
export const EVENT_TEST_ELEMENT_RENDERED = 'ev-test-element-rendered';

const prefix = 'ab-test';

type SelectableElement = {
  description: string;
  id: string;
};
export const selectableElements: Record<string, SelectableElement> = {
  cta_buy: { id: `${prefix}-cta_buy`, description: 'Button Buy Now' },
  hero_headline: {
    id: `${prefix}-hero-headline`,
    description: 'Hero Headline',
  },
  hero_sub_headline: {
    id: `${prefix}-hero-sub-headline`,
    description: 'Hero Sub headline',
  },
  hero_paragraph: {
    id: `${prefix}-hero-paragraph`,
    description: 'Hero Paragraph',
  },
  product_title: {
    id: `${prefix}-product-tittle`,
    description: 'Product Title',
  },
  product_price: {
    id: `${prefix}-product-price`,
    description: 'Product Price',
  },
} as const;

export const selectableElementsAdapter = createEntityAdapter<SelectableElement>();

const initialState: EntityState<SelectableElement> = selectableElementsAdapter.getInitialState();

export const selectableElementsState = Object.values(selectableElements).reduce(
  (state, element) => {
    selectableElementsAdapter.addOne(state, element);
    return state;
  },
  initialState
);

export const selectableElementEntities: EntityState<SelectableElement> = {
  ids: Object.values(selectableElements).map((item) => item.id),
  entities: {},
};
export const selectableIds = Object.values(selectableElements).map((el) => el.id);
export const selectableTargetElSelectors = selectableIds.map((elId) => `data-testid="${elId}"`);
