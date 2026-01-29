import FinanceDashboard from '@/components/FinanceDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-black py-12">
      <FinanceDashboard />
      
      {/* 預留給後續開發的區域 */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 p-12 rounded-3xl flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-2xl">
              🏠
            </div>
            <h2 className="text-xl font-bold text-white mb-2">房產清單暫無數據</h2>
            <p className="text-slate-500 max-w-sm">
              點擊「下一個月」來模擬時間流逝，或是在後續功能中購買你的第一間房產。
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-white font-bold mb-4">市場情報</h3>
              <p className="text-slate-400 text-sm italic">
                「目前房貸利率穩定在 2.0%，市場情緒中性。專家建議關注 LTV 保持在安全水位...」
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
