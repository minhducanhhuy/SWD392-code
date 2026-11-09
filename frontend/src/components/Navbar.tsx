import React from 'react';
import { ShoppingBag, Sparkles, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  activeTab: 'shop' | 'combos' | 'admin';
  setActiveTab: (tab: 'shop' | 'combos' | 'admin') => void;
  cartItemCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartItemCount,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('shop')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl tracking-tighter shadow-md group-hover:bg-purple-700 transition-colors">
              TL
            </div>
            <div>
              <span className="text-lg font-black tracking-widest text-slate-900 block leading-tight font-serif">
                THIERLAVIER
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                Luxury Streetwear Studio
              </span>
            </div>
          </div>

          {/* Navigation Pills */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveTab('shop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === 'shop'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-purple-600" />
              <span>Bộ Sưu Tập</span>
            </button>

            <button
              onClick={() => setActiveTab('combos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === 'combos'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Combo Ưu Đãi</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <span>Quản Trị Combo</span>
            </button>
          </nav>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-purple-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Giỏ hàng</span>
          </button>
        </div>

        {/* Mobile Nav Tabs */}
        <div className="flex md:hidden border-t border-slate-100 py-2 gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'shop' ? 'bg-purple-100 text-purple-900 font-bold' : 'text-slate-600'
            }`}
          >
            Bộ Sưu Tập
          </button>
          <button
            onClick={() => setActiveTab('combos')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'combos' ? 'bg-purple-100 text-purple-900 font-bold' : 'text-slate-600'
            }`}
          >
            Combo Ưu Đãi
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'admin' ? 'bg-purple-100 text-purple-900 font-bold' : 'text-slate-600'
            }`}
          >
            Quản Trị Combo
          </button>
        </div>
      </div>
    </header>
  );
};

