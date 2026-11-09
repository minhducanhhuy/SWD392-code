import React, { useState } from 'react';
import { Plus, Tag } from 'lucide-react';
import { Product } from '../types';
import { api } from '../services/api';

interface AdminComboFormProps {
  products: Product[];
  onComboCreated: () => void;
  onToast: (msg: string, type?: 'success' | 'error') => void;
}

export const AdminComboForm: React.FC<AdminComboFormProps> = ({
  products,
  onComboCreated,
  onToast,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    discountType: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED_AMOUNT' | 'BUNDLE_PRICE',
    discountVal: 15,
    bundlePrice: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    selectedProductIds: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedProductIds.length < 2) {
      onToast('Một Combo phải chứa ít nhất 2 sản phẩm!', 'error');
      return;
    }

    try {
      await api.createCombo({
        ...formData,
        discountVal: Number(formData.discountVal),
        bundlePrice: formData.bundlePrice ? Number(formData.bundlePrice) : undefined,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        items: formData.selectedProductIds.map((pid) => ({ productId: pid, quantity: 1 })),
      });

      onToast('Tạo gói Combo mới thành công!', 'success');
      onComboCreated();
      setFormData({
        name: '',
        code: '',
        description: '',
        discountType: 'PERCENTAGE',
        discountVal: 15,
        bundlePrice: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        selectedProductIds: [],
      });
    } catch (err: any) {
      onToast(err.response?.data?.message || 'Lỗi khi tạo Combo', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <Plus className="w-4 h-4 text-purple-600" />
        <h3 className="font-bold text-slate-900 text-sm">Tạo Gói Combo Khuyến Mãi</h3>
      </div>

      <div className="space-y-1">
        <label className="text-[11px] font-bold text-slate-600 uppercase">Tên Combo:</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="VD: Combo Thời Trang Thu Đông"
          className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="text-[11px] font-bold text-slate-600 uppercase">Mã Code:</label>
          <input
            type="text"
            required
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            placeholder="COMBO-01"
            className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 uppercase font-mono"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-slate-600 uppercase">Loại giảm:</label>
          <select
            value={formData.discountType}
            onChange={(e: any) => setFormData({ ...formData, discountType: e.target.value })}
            className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-slate-50 cursor-pointer"
          >
            <option value="PERCENTAGE">Phần trăm (%)</option>
            <option value="FIXED_AMOUNT">Số tiền (VNĐ)</option>
            <option value="BUNDLE_PRICE">Giá trọn gói</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="text-[11px] font-bold text-slate-600 uppercase">Mức giảm:</label>
          <input
            type="number"
            min="0"
            value={formData.discountVal}
            onChange={(e) => setFormData({ ...formData, discountVal: Number(e.target.value) })}
            className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50"
          />
        </div>
        <div>
          <label className="text-[11px] font-bold text-slate-600 uppercase">Ngày kết thúc:</label>
          <input
            type="date"
            required
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full text-xs border border-slate-200 rounded-lg px-2 py-2 bg-slate-50"
          />
        </div>
      </div>

      {/* Product Selection */}
      <div className="space-y-1">
        <label className="text-[11px] font-bold text-slate-600 uppercase">
          Chọn sản phẩm trong gói (Ít nhất 2):
        </label>
        <div className="space-y-1 max-h-32 overflow-y-auto border border-slate-200 p-2 rounded-lg bg-slate-50">
          {products.map((p) => {
            const isChecked = formData.selectedProductIds.includes(p.id);
            return (
              <label key={p.id} className="flex items-center gap-2 text-xs text-slate-700 hover:bg-slate-100 p-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    const ids = e.target.checked
                      ? [...formData.selectedProductIds, p.id]
                      : formData.selectedProductIds.filter((id) => id !== p.id);
                    setFormData({ ...formData, selectedProductIds: ids });
                  }}
                  className="rounded text-purple-600"
                />
                <span className="truncate">{p.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
      >
        <Plus className="w-4 h-4" />
        <span>Lưu Gói Combo Khuyến Mãi</span>
      </button>
    </form>
  );
};

