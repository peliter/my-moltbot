import FinanceDashboard from '@/components/FinanceDashboard';
import PropertyList from '@/components/PropertyList';
import PropertyMarket from '@/components/PropertyMarket';
import AssetChart from '@/components/AssetChart';

export default function Home() {
  return (
    <main className="min-h-screen bg-black py-12">
      <FinanceDashboard />
      
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* 第一行：圖表 */}
        <div className="mb-8">
          <AssetChart />
        </div>

        {/* 第二行：主要內容 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側：房產清單 */}
          <div className="lg:col-span-2">
            <PropertyList />
          </div>
          
          {/* 右側：商城與情報 */}
          <div className="space-y-8">
            <PropertyMarket />
            
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-white font-bold mb-4">市場情報</h3>
              <p className="text-slate-400 text-sm italic leading-relaxed">
                「目前市場環境充滿波動。我們模擬了每月約 3 萬元的基礎生活開銷。注意保持穩定的現金流以支應每月房貸與生活支出...」
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
