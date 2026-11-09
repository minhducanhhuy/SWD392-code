import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { Combo, CartSummary } from '../types';
import { api } from '../services/api';

interface ComboSelectionModalProps {
  combo: Combo | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedCart: CartSummary) => void;
  onToast: (msg: string, type?: 'success' | 'error') => void;
}

export const ComboSelectionModal: React.FC<ComboSelectionModalProps> = ({
  combo,
  isOpen,
  onClose,
  onSuccess,
  onToast,
}) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (combo) {
      const defaults: Record<string, string> = {};
      combo.items.forEach((item) => {
        if (item.product.variants.length > 0) {
          defaults[item.productId] = item.product.variants[0].id;
        }
      });
      setSelectedVariants(defaults);
    }
  }, [combo]);

  if (!isOpen || !combo) return null;

  const handleConfirm = async () => {
    setLoading(true);
    const selections = Object.entries(selectedVariants).map(([productId, variantId]) => ({
      productId,
      variantId,
    }));

    try {
      const updatedCart = await api.addComboToCart(combo.id, selections);
      onSuccess(updatedCart);
      onToast(`Đã thêm trọn bộ combo "${combo.name}" vào giỏ hàng!`, 'success');
      onClose();
    } catch (err: any) {
      onToast(err.response?.data?.message || 'Lỗi thêm combo vào giỏ', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Chọn Phân Loại Cho Gói Combo</h3>
              <p className="text-xs text-purple-600 font-semibold truncate max-w-xs">{combo.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <p className="text-xs text-slate-500">
            Vui lòng chọn màu sắc và kích cỡ cho từng sản phẩm thành phần trong gói:
          </p>

          <div className="space-y-3">
            {combo.items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-xl space-y-2.5"
              >
                <div className="flex items-center gap-3">
                  {item.product.images[0] && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                    />
                  )}
                  <span className="font-bold text-xs text-slate-800 truncate">
                    {item.product.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {item.product.variants.map((v) => {
                    const isSelected = selectedVariants[item.productId] === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() =>
                          setSelectedVariants({ ...selectedVariants, [item.productId]: v.id })
                        }
                        className={`p-2 rounded-lg text-left text-xs border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="truncate text-[11px]">{v.color}</div>
                        <div className="text-[10px] text-slate-500 flex justify-between mt-0.5">
                          <span>Size {v.size}</span>
                          <span>Còn {v.stockQty}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-between text-xs">
            <span className="font-bold text-purple-800">Giá trọn gói ưu đãi:</span>
            <span className="text-base font-black text-purple-900">
              {combo.calculatedComboPrice.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-white cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleConfirm}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{loading ? 'Đang thêm...' : 'Xác nhận Thêm Vào Giỏ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

