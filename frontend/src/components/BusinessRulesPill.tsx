import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, CheckCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const BusinessRulesPill: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const commitments = [
    { title: 'Tự động tính chiết khấu', desc: 'Hệ thống tự động tính toán tổng tiền minh bạch và khấu trừ ưu đãi combo tốt nhất' },
    { title: 'Tiết kiệm không cần mã', desc: 'Mua theo Combo được chiết khấu trực tiếp vào giỏ hàng mà không cần nhập voucher' },
    { title: 'Giới hạn số lượng mua', desc: 'Tối đa 10 sản phẩm cùng loại trên mỗi đơn hàng để đảm bảo trải nghiệm mua sắm' },
    { title: 'Gói Combo độc quyền', desc: 'Mỗi sản phẩm được kết hợp trong gói combo ưu đãi tối ưu nhất tại cùng một thời điểm' },
    { title: 'Tồn kho chuẩn xác 100%', desc: 'Cập nhật kho hàng thời gian thực; tự động báo hết hàng khi sản phẩm vừa bán hết' },
    { title: 'Thời hạn ưu đãi minh bạch', desc: 'Chương trình khuyến mãi áp dụng chính xác theo khung thời gian hiệu lực niêm yết' },
  ];

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            Cam kết dịch vụ:
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Miễn phí vận chuyển toàn quốc · Tự động áp dụng ưu đãi Combo · Kiểm soát tồn kho thời gian thực
          </span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-semibold transition cursor-pointer"
        >
          <span>{expanded ? 'Thu gọn cam kết' : 'Xem chính sách & quy chuẩn'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 pt-1 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800">
            {commitments.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-md bg-purple-900/60 text-purple-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-purple-700/50">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-100 text-xs block">{item.title}</span>
                  <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

