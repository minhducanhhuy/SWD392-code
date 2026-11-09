import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { BusinessRulesPill } from './components/BusinessRulesPill';
import { ProductCard } from './components/ProductCard';
import { ComboCard } from './components/ComboCard';
import { CartDrawer } from './components/CartDrawer';
import { ComboSelectionModal } from './components/ComboSelectionModal';
import { AdminComboManager } from './components/AdminComboManager';
import { Toast } from './components/Toast';
import { useCart } from './hooks/useCart';
import { useCombos } from './hooks/useCombos';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'combos' | 'admin'>('shop');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const {
    cart,
    setCart,
    isDrawerOpen,
    setIsDrawerOpen,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart(showToast);

  const {
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
    refreshCombos,
  } = useCombos(showToast);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItemCount={cart?.totalItems || 0}
        onOpenCart={() => setIsDrawerOpen(true)}
      />

      {/* Store Service Commitments Banner */}
      <BusinessRulesPill />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs font-semibold text-slate-600">Đang tải sản phẩm thời trang Thierlavier...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto my-16 bg-white border border-rose-200 rounded-2xl p-6 text-center shadow-sm space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Không thể kết nối đến máy chủ</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Vui lòng đảm bảo máy chủ Backend Thierlavier (Port 3001) đang hoạt động.
              </p>
            </div>
            <button
              onClick={() => refreshCombos()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Thử kết nối lại</span>
            </button>
          </div>
        ) : (
          <>
            {/* TAB 1: SHOPPING CATALOG */}
            {activeTab === 'shop' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      Bộ Sưu Tập Thời Trang Thierlavier
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Khám phá các thiết kế thời trang đường phố cao cấp. Chọn màu sắc và kích cỡ phù hợp với bạn.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                    {products.length} Mẫu Thiết Kế
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(vId, qty) => addItem(vId, qty)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: COMBOS */}
            {activeTab === 'combos' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Gói Combo Khuyến Mãi Tiết Kiệm
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Tiết kiệm hơn khi mua trọn bộ. Ưu đãi chiết khấu tự động được áp dụng ngay trong giỏ hàng.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {combos.map((combo) => (
                    <ComboCard
                      key={combo.id}
                      combo={combo}
                      onOpenModal={(c) => openComboModal(c)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: ADMIN COMBOS */}
            {activeTab === 'admin' && (
              <AdminComboManager
                adminCombos={adminCombos}
                products={products}
                onRefresh={fetchAdminCombos}
                onToggleStatus={toggleComboStatus}
                onDeleteCombo={deleteCombo}
                onToast={showToast}
              />
            )}
          </>
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cart={cart}
        onUpdateQty={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />

      {/* Combo Variant Selection Modal */}
      <ComboSelectionModal
        combo={activeComboForModal}
        isOpen={isModalOpen}
        onClose={closeComboModal}
        onSuccess={(updatedCart) => {
          setCart(updatedCart);
          setIsDrawerOpen(true);
        }}
        onToast={showToast}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
