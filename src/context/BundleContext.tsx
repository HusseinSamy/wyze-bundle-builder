import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Product } from '../data/products';
import {
  INITIAL_QUANTITIES,
  INITIAL_ACTIVE_VARIANTS,
  PRODUCTS,
} from '../data/products';

interface BundleState {
  quantities: Record<string, Record<string, number>>;
  activeVariants: Record<string, string>;
  activeStep: number;
}

interface BundleCtx {
  state: BundleState;
  setQty: (productId: string, variantId: string, qty: number) => void;
  setVariant: (productId: string, variantId: string) => void;
  goToStep: (step: number) => void;
  saveSystem: () => void;
  getTotalQtyForStep: (stepIndex: number) => number;
  getQty: (productId: string, variantId: string) => number;
  getActiveVariant: (productId: string) => string;
}

type Action =
  { type: 'SET_QTY'; productId: string; variantId: string; qty: number }
  | { type: 'SET_VARIANT'; productId: string; variantId: string }
  | { type: 'GO_TO_STEP'; step: number };

const STORAGE_KEY = 'wyze-bundle-v1';

function loadFromStorage(): BundleState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return null;
  }
}

function getInitialState(): BundleState {
  const saved = loadFromStorage();
  if (saved) return saved;
  return {
    quantities: INITIAL_QUANTITIES,
    activeVariants: INITIAL_ACTIVE_VARIANTS,
    activeStep: 1,
  };
}

function reducer(state: BundleState, action: Action): BundleState {
  switch (action.type) {
    case 'SET_QTY': {
      const varMap = { ...(state.quantities[action.productId] ?? {}), [action.variantId]: Math.max(0, action.qty) };
      return { ...state, quantities: { ...state.quantities, [action.productId]: varMap } };
    }
    case 'SET_VARIANT':
      return { ...state, activeVariants: { ...state.activeVariants, [action.productId]: action.variantId } };
    case 'GO_TO_STEP':
      return { ...state, activeStep: action.step };
    default:
      return state;
  }
}

const Ctx = createContext<BundleCtx>(null!);

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  // Auto-persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function setQty(productId: string, variantId: string, qty: number) {
    dispatch({ type: 'SET_QTY', productId, variantId, qty });
  }
  function setVariant(productId: string, variantId: string) {
    dispatch({ type: 'SET_VARIANT', productId, variantId });
  }
  function goToStep(step: number) {
    dispatch({ type: 'GO_TO_STEP', step });
  }
  function saveSystem() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    alert('Your system has been saved! It will be restored on your next visit.');
  }
  function getTotalQtyForStep(stepIndex: number) {
    // stepIndex is 1-based step id
    const stepCategories: Record<number, string> = {
      1: 'cameras', 2: 'plans', 3: 'sensors', 4: 'accessories',
    };
    const cat = stepCategories[stepIndex];
    const products = PRODUCTS.filter(p => p.category === cat);
    return products.reduce((sum, p) => {
      const varMap = state.quantities[p.id] ?? {};
      const total = Object.values(varMap).reduce((s, q) => s + q, 0);
      return sum + (total > 0 ? 1 : 0); // count distinct products selected
    }, 0);
  }
  function getQty(productId: string, variantId: string) {
    return state.quantities[productId]?.[variantId] ?? 0;
  }
  function getActiveVariant(productId: string) {
    return state.activeVariants[productId] ?? '';
  }

  return (
    <Ctx.Provider value={{ state, setQty, setVariant, goToStep, saveSystem, getTotalQtyForStep, getQty, getActiveVariant }}>
      {children}
    </Ctx.Provider>
  );
}

export const useBundle = () => useContext(Ctx);

// Helper to compute review line items from state
export function useReviewItems() {
  const { state } = useBundle();
  const items: Array<{
    product: Product;
    variantId: string;
    variantLabel: string;
    qty: number;
    linePrice: number;
    lineCompare?: number;
  }> = [];

  for (const product of PRODUCTS) {
    const varMap = state.quantities[product.id] ?? {};
    for (const [variantId, qty] of Object.entries(varMap)) {
      if (qty <= 0) continue;
      const variant = product.variants.find(v => v.id === variantId);
      items.push({
        product,
        variantId,
        variantLabel: variant?.label ?? '',
        qty,
        linePrice: product.price * qty,
        lineCompare: product.comparePrice !== undefined ? product.comparePrice * qty : undefined,
      });
    }
  }
  return items;
}

export function useOrderTotals() {
  const items = useReviewItems();

  let totalSale = 0;
  let totalCompare = 0;

  for (const item of items) {
    totalSale += item.linePrice;
    totalCompare += item.lineCompare ?? item.linePrice;
  }

  const savings = totalCompare - totalSale;
  const shipping = totalSale > 0 ? 0 : 5.99;
  const shippingCompare = 5.99;

  return { totalSale: totalSale + shipping, totalCompare: totalCompare + shippingCompare, savings: savings + shippingCompare - shipping };
}
