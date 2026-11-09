import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { CartSummary } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartSummary | null;
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-600" />
              <h2 className="font-bold text-slate-900 text-base">Giỏ hàng của bạn</h2>
              <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                {cart?.totalItems || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {cart && cart.items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer px-2 py-1"
                >
                  Xóa tất cả
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-100">
            {!cart || cart.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-16">
                <ShoppingBag className="w-16 h-16 stroke-1 text-slate-300 mb-3" />
                <p className="font-semibold text-slate-700 text-sm">Giỏ hàng đang trống</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Hãy dạo xem sản phẩm hoặc chọn gói combo ưu đãi để thêm vào giỏ.
                </p>
              </div>
            ) : (
              cart.items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 items-center">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">
                      {item.productName}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.color} · Size: <span className="font-bold">{item.size}</span>
                    </p>
                    {item.comboId && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded mt-1">
                        <Tag className="w-2.5 h-2.5" /> Gói Combo
                      </span>
                    )}
                    <p className="text-xs font-black text-slate-900 mt-1">
                      {item.unitPrice.toLocaleString('vi-VN')} đ
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Financial Breakdown */}
          {cart && cart.items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/70 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Tạm tính:</span>
                  <span className="font-semibold text-slate-800">
                    {cart.rawSubtotal.toLocaleString('vi-VN')} đ
                  </span>
                </div>

                {cart.comboDiscountTotal > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/60">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      Chiết khấu Combo:
                    </span>
                    <span>-{cart.comboDiscountTotal.toLocaleString('vi-VN')} đ</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Tổng thanh toán:</span>
                  <span className="text-purple-700">
                    {cart.finalSubtotal.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>

              <button
                onClick={() => alert(`Đặt hàng thành công với số tiền ${cart.finalSubtotal.toLocaleString('vi-VN')} đ!`)}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-purple-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Xác nhận Đặt hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

