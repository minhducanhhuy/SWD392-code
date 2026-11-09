import React from 'react';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { Combo } from '../types';

interface ComboCardProps {
  combo: Combo;
  onOpenModal: (combo: Combo) => void;
}

export const ComboCard: React.FC<ComboCardProps> = ({ combo, onOpenModal }) => {
  return (
    <div className="bg-white rounded-2xl border border-purple-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
              <Sparkles className="w-3 h-3 text-purple-600" />
              Mã: {combo.code}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2.5 leading-snug group-hover:text-purple-700 transition-colors">
              {combo.name}
            </h3>
          </div>
          <span className="inline-block px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black shadow-xs whitespace-nowrap">
            Tiết kiệm {combo.savingsAmount.toLocaleString('vi-VN')} đ
          </span>
        </div>

        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
          {combo.description}
        </p>

        {/* Constituent Products */}
        <div className="mt-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
            Sản phẩm trong gói ({combo.items.length} món):
          </span>
          <div className="grid grid-cols-2 gap-2">
            {combo.items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50/80 border border-slate-200/60 rounded-xl p-2.5 flex items-center gap-2.5"
              >
                {item.product.images[0] && (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800 truncate">{item.product.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {item.product.basePrice.toLocaleString('vi-VN')} đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mt-5 p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-[11px] text-slate-500 block">Giá gốc gói:</span>
            <span className="line-through text-slate-400 font-semibold">
              {combo.totalOriginalPrice.toLocaleString('vi-VN')} đ
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold text-purple-700 block">Giá ưu đãi Combo:</span>
            <span className="text-base font-black text-purple-900">
              {combo.calculatedComboPrice.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <button
          onClick={() => onOpenModal(combo)}
          className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Chọn Size & Mua Combo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

