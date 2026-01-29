import FinanceDashboard from '@/components/FinanceDashboard';
import PropertyList from '@/components/PropertyList';
import PropertyMarket from '@/components/PropertyMarket';

export default function Home() {
  return (
    <main className="min-h-screen bg-black py-12">
      <FinanceDashboard />
      
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側：房產清單 (佔 2 欄) */}
          <div className="lg:col-span-2">
            <PropertyList />
          </div>
          
          {/* 右側：房產商城 (佔 1 欄) */}
          <div className="space-y-8">
            <PropertyMarket />
            
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-white font-bold mb-4">市場情報</h3>
              <p className="text-slate-400 text-sm italic">
                「目前房貸利率穩定在 2.0% ~ 2.5% 之間。市場傳聞下半年房價可能有 1% ~ 2% 的波動，建議保持充足現金流...」
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
