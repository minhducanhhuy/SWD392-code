import { useState, useEffect, useCallback, useRef } from 'react';
import { api, SESSION_ID } from '../services/api';
import { CartSummary } from '../types';

export function useCart(onToast: (msg: string, type?: 'success' | 'error') => void) {
  const [cart, setCart] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const onToastRef = useRef(onToast);
  useEffect(() => {
    onToastRef.current = onToast;
  }, [onToast]);

  const fetchCart = useCallback(async () => {
    try {
      const data = await api.getCart();
      setCart(data);
    } catch (err: any) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Thêm sản phẩm vào giỏ
  const addItem = async (variantId: string, quantity: number) => {
    try {
      const updatedCart = await api.addToCart(variantId, quantity);
      setCart(updatedCart);
      onToastRef.current('Đã thêm sản phẩm vào giỏ hàng thành công!', 'success');
      setIsDrawerOpen(true);
    } catch (err: any) {
      onToastRef.current(err.response?.data?.message || 'Không thể thêm vào giỏ hàng', 'error');
    }
  };

  // Cập nhật số lượng
  const updateQuantity = async (itemId: string, newQty: number) => {
    if (newQty < 1) {
      return removeItem(itemId);
    }
    if (newQty > 10) {
      onToastRef.current('Tối đa 10 sản phẩm cùng loại trong giỏ hàng!', 'error');
      return;
    }

    try {
      const updatedCart = await api.updateCartQty(itemId, newQty);
      setCart(updatedCart);
    } catch (err: any) {
      onToastRef.current(err.response?.data?.message || 'Lỗi cập nhật số lượng', 'error');
    }
  };

  // Xóa sản phẩm khỏi giỏ
  const removeItem = async (itemId: string) => {
    try {
      const updatedCart = await api.removeCartItem(itemId);
      setCart(updatedCart);
      onToastRef.current('Đã xóa sản phẩm khỏi giỏ hàng', 'success');
    } catch (err: any) {
      onToastRef.current(err.response?.data?.message || 'Lỗi xóa sản phẩm', 'error');
    }
  };

  // Làm trống giỏ hàng
  const clearCart = async () => {
    try {
      const emptyCart = await api.clearCart();
      setCart(emptyCart);
      onToastRef.current('Đã làm trống giỏ hàng', 'success');
    } catch (err: any) {
      onToastRef.current(err.response?.data?.message || 'Lỗi xóa giỏ hàng', 'error');
    }
  };

  return {
    cart,
    setCart,
    loading,
    isDrawerOpen,
    setIsDrawerOpen,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: fetchCart,
  };
}

