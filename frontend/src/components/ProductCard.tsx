import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Package, AlertCircle } from 'lucide-react';
import { Product, Variant } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (variantId: string, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || '',
  );
  const [quantity, setQuantity] = useState<number>(1);

  const selectedVariant: Variant | undefined = product.variants.find(
    (v) => v.id === selectedVariantId,
  );
  const isOutOfStock = !selectedVariant || selectedVariant.stockQty <= 0;

  const handleAdd = () => {
    if (!selectedVariantId || isOutOfStock) return;
    onAddToCart(selectedVariantId, quantity);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Product Image */}
        <div className="h-60 bg-slate-100 relative overflow-hidden">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <Package className="w-12 h-12" />
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-rose-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                Tạm hết hàng
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-purple-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="text-lg font-black text-slate-900">
              {product.basePrice.toLocaleString('vi-VN')} đ
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {product.originalPrice.toLocaleString('vi-VN')} đ
              </span>
            )}
          </div>

          {/* Variant Selector (Colors & Sizes) */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Chọn phân loại (Màu & Size):
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantId(v.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left transition-all cursor-pointer ${
                    selectedVariantId === v.id
                      ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50'
                  }`}
                >
                  <div className="truncate text-[11px]">{v.color}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>Size {v.size}</span>
                    <span className={v.stockQty <= 5 ? 'text-amber-600 font-bold' : ''}>
                      {v.stockQty > 0 ? `Còn ${v.stockQty}` : 'Hết'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Số lượng:</span>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer shadow-xs"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-black w-6 text-center text-slate-800">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer shadow-xs"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add To Cart Button */}
      <div className="p-5 pt-0">
        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Thêm vào giỏ hàng</span>
        </button>
      </div>
    </div>
  );
};

