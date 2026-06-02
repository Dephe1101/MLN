import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud, RotateCcw, Share2, Download, X, Maximize2,
  Terminal, Power, ChevronLeft, ChevronRight, AlertTriangle, Flag
} from 'lucide-react';

// Data from boicanh.md
const TAB_DATA = {
  boicanh: {
    title: "PHẦN 1: BỐI CẢNH 2030 (GIẢ ĐỊNH)",
    content: [
      { id: 'kinhte', title: "Kinh tế", desc: "Lực lượng sản xuất (AI tạo sinh) phát triển vượt bậc, đưa chi phí sản xuất tiệm cận 0. Tuy nhiên, 90% của cải tập trung vào tay các tập đoàn tư bản công nghệ." },
      { id: 'xahoi', title: "Xã hội", desc: "Hàng tỷ lao động trí óc mất việc, trở thành lực lượng 'thừa thãi'." },
      { id: 'chinhtri', title: "Chính trị", desc: "Mâu thuẫn gay gắt giữa giới siêu giàu và người thất nghiệp; bùng nổ các phong trào đòi 'Đánh thuế Robot' và 'Thu nhập cơ bản vô điều kiện'." }
    ]
  },
  nguyennhan: {
    title: "PHẦN 2: NGUYÊN NHÂN TẤT YẾU",
    content: [
      { id: 'nguongoc', title: "1. Nguồn gốc sâu xa: Mâu thuẫn kinh tế cốt lõi", desc: "Sự phát triển đột phá của AI chính là bước tiến vĩ đại của lực lượng sản xuất. Lẽ ra nó phải giải phóng con người, nhưng việc tư bản độc quyền sở hữu AI đã biến quan hệ sản xuất này thành gông cùm. Theo C.Mác: 'Từ chỗ là những hình thức phát triển của lực lượng sản xuất, những quan hệ ấy trở thành những xiềng xích'." },
      { id: 'tructiep', title: "2. Nguyên nhân trực tiếp: Đấu tranh giai cấp đạt đỉnh", desc: "Hàng tỷ người mất việc đứng lên chống lại giới tinh hoa sở hữu AI. Trong xã hội có giai cấp, đấu tranh giai cấp là nguyên nhân trực tiếp dẫn đến cách mạng xã hội." },
      { id: 'batluc', title: "3. Sự bất lực của cải lương", desc: "Nhà nước tư bản sẽ không bao giờ tước đoạt triệt để lợi ích của giới siêu giàu để chia cho người nghèo. Nhà nước về bản chất là công cụ bảo vệ trật tự hiện hành." }
    ]
  },
  dubao: {
    title: "PHẦN 3: DỰ BÁO HÌNH THÁI XÃ HỘI",
    content: [
      { id: 'banchat', title: "1. Không phải sụp đổ, mà là thay đổi về chất", desc: "Xóa bỏ sự độc quyền của các tập đoàn AI không đồng nghĩa với hủy diệt công nghệ, mà là đập tan ách áp bức cũ để xây dựng trật tự công bằng hơn." },
      { id: 'buocnhay', title: "2. Bước nhảy vọt lên Hình thái mới", desc: "Nhân loại sẽ xác lập một quan hệ sản xuất mới (sở hữu chung về AI), từ đó tiến lên một xã hội nơi của cải được phân phối công bằng cho toàn dân." }
    ]
  }
};

const TICKER_ITEMS = [
  "Sở hữu tư nhân hóa thành xiềng xích",
  "LLSX cực đại: Tiềm năng giải phóng triệt để",
  "Hàng tỷ người trở thành lực lượng 'thừa thãi'",
  "Phá bỏ QHSX cũ, thiết lập hình thái mới"
];

export const PresentationPage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('boicanh');
  const [time, setTime] = useState("");
  const [channel, setChannel] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(`${now.toLocaleTimeString('vi-VN')} | ${now.toLocaleDateString('vi-VN')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextChannel = () => setChannel(prev => (prev % 3) + 1);
  const handlePrevChannel = () => setChannel(prev => (prev === 1 ? 3 : prev - 1));

  return (
    <div className="fixed inset-0 bg-[#0d1117] text-slate-300 font-sans overflow-hidden flex flex-col selection:bg-red-500/30 selection:text-red-200">

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex flex-col p-4 gap-4 h-full">

        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border border-white/5 bg-[#161b22]/50 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <h1 className="font-['Cinzel'] text-xl md:text-2xl font-bold text-red-500 tracking-widest uppercase">
              BẢNG TIN TRÍ TUỆ NHÂN TẠO 2030 VÀ TẤT YẾU CỦA CÁCH MẠNG XÃ HỘI
            </h1>
            <span className="text-xs border border-red-900/50 bg-red-950/30 text-red-400 px-2 py-1 rounded">HỒ SƠ MẬT: 2030</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-sm text-cyan-400/80 bg-cyan-950/20 px-3 py-1.5 rounded border border-cyan-900/30">
              {time || "00:00:00 | 00/00/0000"}
            </div>
            <button
              onClick={onClose}
              className="bg-red-950/50 border border-red-900/50 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-lg transition-colors group"
              title="Quay lại sách 3D"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ticker Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-16">
          {TICKER_ITEMS.map((item, i) => (
            <div key={i} className="bg-[#161b22] border border-white/5 rounded-lg flex items-center justify-center px-4 text-xs font-medium text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors cursor-default text-center">
              {item}
            </div>
          ))}
        </div>

        {/* Bottom Split Layout */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">

          {/* Left Panel: TV Screen & Controls */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">

            {/* TV Screen */}
            <div className="flex-1 bg-[#161b22] border border-white/5 rounded-2xl p-3 flex flex-col">
              <div className="flex-1 bg-[#090b10] rounded-xl border border-white/5 relative overflow-hidden flex flex-col items-center justify-center group">
                <img
                  src="/radar.png"
                  alt="Radar Visualization"
                  className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen group-hover:opacity-50 transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 border-[0.5px] border-cyan-500/10" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)' }} />

                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="z-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-cyan-500/50 animate-[spin_10s_linear_infinite] flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 rounded-full border border-cyan-400/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    </div>
                  </div>
                  <h3 className="font-['Cinzel'] text-xl font-bold text-slate-200 tracking-widest mb-2">HỆ THỐNG TRỰC QUAN</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Đang tải luồng dữ liệu [{activeTab}]...</p>
                </motion.div>
              </div>

              {/* Controls under TV */}
              <div className="h-16 mt-3 bg-[#11141a] rounded-xl border border-white/5 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-red-950/50 border border-red-900/50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                    <Power className="w-5 h-5" />
                  </button>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase">Trạng thái</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> TRỰC TUYẾN
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">KÊNH {channel}</span>
                  <div className="flex border border-white/10 rounded-lg overflow-hidden">
                    <button onClick={handlePrevChannel} className="p-2 hover:bg-white/5 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                    <div className="w-px bg-white/10" />
                    <button onClick={handleNextChannel} className="p-2 hover:bg-white/5 transition-colors"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Left Conclusion Card */}
            <div className="bg-[#161b22] border border-red-900/50 rounded-xl p-5 flex flex-col justify-between group hover:border-red-500/50 transition-colors h-36 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-900/20 blur-[30px] rounded-full group-hover:bg-red-500/20 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest">KẾT LUẬN CHIẾN LƯỢC</h4>
                </div>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-['Lora']">
                  Khủng hoảng việc làm AI là biểu hiện tột cùng của mâu thuẫn giữa <span className="text-cyan-400 font-bold">sức sản xuất khổng lồ</span> và <span className="text-red-400 font-bold">sở hữu tư nhân lạc hậu</span>. Cách mạng xã hội là đòi hỏi khách quan, tất yếu để phá bỏ "xiềng xích", mở đường cho hình thái xã hội tiến bộ hơn.
                </p>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase font-bold relative z-10">
                <span className="text-red-500">MỨC ĐỘ TẤT YẾU: TUYỆT ĐỐI</span>
                <span className="text-slate-500">HỆ QUẢ: BƯỚC NHẢY VỌT</span>
              </div>
            </div>

          </div>

          {/* Right Panel: Content Area */}
          <div className="flex-1 bg-[#161b22] border border-white/5 rounded-2xl flex flex-col overflow-hidden relative">
            <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-10 opacity-30">
              <div className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center"><div className="w-1 h-1 bg-white rounded-full" /></div>
              <div className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-sm rotate-45" /></div>
            </div>

            <div className="p-6 border-b border-white/5">
              <h4 className="text-xs text-red-500 font-bold tracking-widest uppercase mb-1">TÀI LIỆU THUYẾT TRÌNH & PHÂN TÍCH</h4>
              <h2 className="font-['Cinzel'] text-2xl md:text-3xl font-bold text-slate-100 leading-tight">
                TRÍ TUỆ NHÂN TẠO 2030 <br /> VÀ TẤT YẾU CỦA CÁCH MẠNG XÃ HỘI
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 px-6">
              {[
                { id: 'boicanh', label: 'BỐI CẢNH', icon: '📖' },
                { id: 'nguyennhan', label: 'NGUYÊN NHÂN', icon: '🔍' },
                { id: 'dubao', label: 'DỰ BÁO', icon: '👁' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-xs font-bold tracking-widest uppercase transition-colors relative flex items-center gap-2
                    ${activeTab === tab.id ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <span className="opacity-70">{tab.icon}</span> {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 w-full pr-2"
                >
                  <div className="mb-8">
                    <h3 className="font-['Cinzel'] text-xl font-bold text-slate-200 mb-2">{TAB_DATA[activeTab].title}</h3>
                    <div className="h-px w-full bg-gradient-to-r from-red-500/50 to-transparent" />
                  </div>

                  {TAB_DATA[activeTab].content.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className="bg-black/20 border border-white/5 rounded-xl p-5 hover:bg-black/40 hover:border-white/10 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-cyan-400 mb-3">{item.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed font-['Lora']">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}

                  <div className="mt-8 pt-4 border-t border-white/5 relative h-12 w-full overflow-hidden flex items-center rounded-b-xl group">
                    <svg width="0" height="0" className="absolute">
                      <defs>
                        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                    </svg>

                    <motion.div
                      animate={{ x: [0, -200] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="flex items-center text-red-500/60 group-hover:text-cyan-400/80 transition-colors"
                      style={{ width: '4000px' }}
                    >
                      {[...Array(20)].map((_, i) => (
                        <svg key={i} width="200" height="40" viewBox="0 0 200 40" className="flex-none fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#neon-glow)">
                          <path d="M 0,20 L 50,20 L 55,10 L 65,35 L 75,5 L 85,25 L 90,20 L 150,20 L 155,15 L 165,30 L 175,10 L 180,20 L 200,20" />
                        </svg>
                      ))}
                    </motion.div>
                    
                    <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                      <span className="text-[10px] text-cyan-400 font-mono tracking-widest bg-[#161b22]/90 px-3 py-1 border border-white/5 rounded backdrop-blur-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        PHÂN TÍCH TÍN HIỆU...
                      </span>
                      <span className="text-[10px] text-red-500 font-mono tracking-widest bg-[#161b22]/90 px-3 py-1 border border-white/5 rounded backdrop-blur-sm">
                        MAC_ENGINE_V3
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-[#161b22] via-transparent to-[#161b22] pointer-events-none" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
