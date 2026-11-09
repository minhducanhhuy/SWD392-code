import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../services/api';
import { Combo, Product } from '../types';

export function useCombos(onToast: (msg: string, type?: 'success' | 'error') => void) {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [adminCombos, setAdminCombos] = useState<Combo[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Stable ref for onToast to prevent infinite re-render loops
  const onToastRef = useRef(onToast);
  useEffect(() => {
    onToastRef.current = onToast;
  }, [onToast]);

  // Modal State for Combo Variant Selection
  const [activeComboForModal, setActiveComboForModal] = useState<Combo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchStoreData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [prodsData, combosData] = await Promise.all([
        api.getProducts(),
        api.getActiveCombos(),
      ]);
      setProducts(prodsData || []);
      setCombos(combosData || []);
    } catch (err: any) {
      console.error('Failed to load store data:', err);
      const errMsg = err.response?.data?.message || 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra Backend.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAdminCombos = useCallback(async () => {
    try {
      const data = await api.getAdminCombos();
      setAdminCombos(data || []);
    } catch (err: any) {
      console.error('Failed to load admin combos:', err);
    }
  }, []);

  useEffect(() => {
    fetchStoreData();
  }, [fetchStoreData]);

  // Open modal to select size/color for combo
  const openComboModal = (combo: Combo) => {
    setActiveComboForModal(combo);
    setIsModalOpen(true);
  };

  const closeComboModal = () => {
    setActiveComboForModal(null);
    setIsModalOpen(false);
  };

  // Toggle combo active status
  const toggleComboStatus = async (id: string) => {
    try {
      await api.toggleComboStatus(id);
      onToastRef.current('Đã cập nhật trạng thái Combo thành công', 'success');
      await Promise.all([fetchAdminCombos(), api.getActiveCombos().then(setCombos)]);
    } catch (err: any) {
      onToastRef.current(err.response?.data?.message || 'Lỗi cập nhật trạng thái', 'error');
    }
  };

  // Delete combo
  const deleteCombo = async (id: string) => {
    try {
      await api.deleteCombo(id);
      onToastRef.current('Đã xóa gói Combo thành công', 'success');
      await Promise.all([fetchAdminCombos(), api.getActiveCombos().then(setCombos)]);
    } catch (err: any) {
      onToastRef.current(err.response?.data?.message || 'Lỗi xóa Combo', 'error');
    }
  };

  return {
    combos,
    adminCombos,
    products,
    loading,
    error,
    activeComboForModal,
    isModalOpen,
    openComboModal,
    closeComboModal,
    fetchAdminCombos,
    toggleComboStatus,
    deleteCombo,
    refreshCombos: fetchStoreData,
  };
}

