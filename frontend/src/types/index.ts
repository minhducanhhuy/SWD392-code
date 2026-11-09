export interface Variant {
  id: string;
  color: string;
  size: string;
  sku: string;
  price: number | null;
  stockQty: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  originalPrice: number | null;
  images: string[];
  variants: Variant[];
}

export interface ComboItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Combo {
  id: string;
  name: string;
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BUNDLE_PRICE';
  discountVal: number;
  bundlePrice: number | null;
  totalOriginalPrice: number;
  calculatedComboPrice: number;
  savingsAmount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  items: ComboItem[];
}

export interface CartItemModel {
  id: string;
  variantId: string;
  productName: string;
  color: string;
  size: string;
  sku: string;
  image: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  stockQty: number;
  comboId?: string;
  comboGroupId?: string;
}

export interface CartSummary {
  sessionId: string;
  totalItems: number;
  rawSubtotal: number;
  comboDiscountTotal: number;
  finalSubtotal: number;
  items: CartItemModel[];
}

export interface CreateComboPayload {
  name: string;
  code: string;
  description?: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BUNDLE_PRICE';
  discountVal: number;
  bundlePrice?: number;
  startDate: string;
  endDate: string;
  isActive?: boolean;
  items: Array<{ productId: string; quantity: number }>;
}

export interface AddComboToCartPayload {
  sessionId?: string;
  comboId: string;
  selectedVariants: Array<{ productId: string; variantId: string }>;
}

