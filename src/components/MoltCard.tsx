import React, { useState, useEffect } from 'react';

const MoltCard = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setPosition({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <div 
      className="relative w-full max-w-md p-8 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl transition-all duration-500 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 背景動態光暈 - 避開藍紫漸變，改用深綠與青色 */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(45, 212, 191, 0.4) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/20">
            🥧
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">小派 (Pi)</h3>
            <p className="text-teal-400 text-sm font-medium">您的技術夥伴已上線</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <p className="text-slate-300 text-sm leading-relaxed">
              「代碼不僅是邏輯的堆砌，更是工藝的展現。讓我們一起打造些驚人的東西吧！」
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'TypeScript', 'Tailwind'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-semibold border border-slate-700">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full mt-8 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold transition-all transform active:scale-95 shadow-lg shadow-teal-500/20">
          開始新的專案
        </button>
      </div>
    </div>
  );
};

export default MoltCard;
