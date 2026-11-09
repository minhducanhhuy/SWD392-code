import React, { useEffect } from 'react';
import { Layers, Trash2, Power } from 'lucide-react';
import { Combo, Product } from '../types';
import { AdminComboForm } from './AdminComboForm';

interface AdminComboManagerProps {
  adminCombos: Combo[];
  products: Product[];
  onRefresh: () => void;
  onToggleStatus: (id: string) => void;
  onDeleteCombo: (id: string) => void;
  onToast: (msg: string, type?: 'success' | 'error') => void;
}

export const AdminComboManager: React.FC<AdminComboManagerProps> = ({
  adminCombos,
  products,
  onRefresh,
  onToggleStatus,
  onDeleteCombo,
  onToast,
}) => {
  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Create Combo Form */}
      <div>
        <AdminComboForm
          products={products}
          onComboCreated={onRefresh}
          onToast={onToast}
        />
      </div>

      {/* Existing Combos List */}
      <div className="lg:col-span-2 space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Danh sách Combo trong Hệ Thống ({adminCombos.length})
          </h3>
          <p className="text-xs text-slate-500">
            Quản trị trạng thái kích hoạt, thời gian hiệu lực và xóa gói combo.
          </p>
        </div>

        <div className="space-y-3">
          {adminCombos.map((ac) => (
            <div
              key={ac.id}
              className={`bg-white rounded-2xl border p-4.5 transition shadow-xs ${
                ac.isActive ? 'border-purple-200' : 'border-slate-200 bg-slate-50/50 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {ac.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        ac.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {ac.isActive ? 'ĐANG KÍCH HOẠT' : 'ĐÃ TẮT'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-1.5">{ac.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{ac.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleStatus(ac.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      ac.isActive
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{ac.isActive ? 'Tắt' : 'Bật'}</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Xóa combo "${ac.name}"?`)) onDeleteCombo(ac.id);
                    }}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                {ac.items.map((i) => (
                  <span
                    key={i.id}
                    className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                  >
                    {i.product?.name}
                  </span>
                ))}
              </div>

              {/* Dates */}
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-4">
                <span>Bắt đầu: {new Date(ac.startDate).toLocaleDateString('vi-VN')}</span>
                <span>Kết thúc: {new Date(ac.endDate).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

