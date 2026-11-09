import axios from 'axios';
import { AddComboToCartPayload, CreateComboPayload } from '../types';

export const SESSION_ID = 'duc-guest-session-001';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Products
  getProducts: () => apiClient.get('/products').then((res) => res.data),

  // Cart Management
  getCart: (sessionId = SESSION_ID) =>
    apiClient.get(`/cart?sessionId=${sessionId}`).then((res) => res.data),

  addToCart: (variantId: string, quantity: number, sessionId = SESSION_ID) =>
    apiClient.post('/cart/items', { sessionId, variantId, quantity }).then((res) => res.data),

  updateCartQty: (itemId: string, quantity: number) =>
    apiClient.patch(`/cart/items/${itemId}`, { quantity }).then((res) => res.data),

  removeCartItem: (itemId: string) =>
    apiClient.delete(`/cart/items/${itemId}`).then((res) => res.data),

  clearCart: (sessionId = SESSION_ID) =>
    apiClient.delete(`/cart?sessionId=${sessionId}`).then((res) => res.data),

  // Promotional Combos
  getActiveCombos: () => apiClient.get('/combos').then((res) => res.data),

  addComboToCart: (comboId: string, selectedVariants: Array<{ productId: string; variantId: string }>, sessionId = SESSION_ID) =>
    apiClient.post('/combos/add-to-cart', { sessionId, comboId, selectedVariants }).then((res) => res.data),

  getAdminCombos: () => apiClient.get('/combos/admin/all').then((res) => res.data),

  createCombo: (payload: any) => apiClient.post('/combos/admin', payload).then((res) => res.data),

  toggleComboStatus: (id: string) => apiClient.patch(`/combos/admin/${id}/toggle-status`).then((res) => res.data),

  deleteCombo: (id: string) => apiClient.delete(`/combos/admin/${id}`).then((res) => res.data),
};

