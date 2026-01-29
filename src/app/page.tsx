import FinanceDashboard from '@/components/FinanceDashboard';
import PropertyList from '@/components/PropertyList';
import PropertyMarket from '@/components/PropertyMarket';
import AssetChart from '@/components/AssetChart';
import EventNotification from '@/components/EventNotification';

export default function Home() {
  return (
    <main className="min-h-screen bg-black py-12">
      <FinanceDashboard />
      
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* 隨機事件通知區 */}
        <EventNotification />

        {/* 第一行：圖表 */}
        <div className="mb-8">
          <AssetChart />
        </div>

        {/* 第二行：主要內容 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyList />
          </div>
          
          <div className="space-y-8">
            <PropertyMarket />
            
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-white font-bold mb-4">市場情報</h3>
              <p className="text-slate-400 text-sm italic leading-relaxed">
                「房產投資不僅是買賣，更是對宏觀經濟的應對。留意隨時可能發生的市場事件，它們將直接影響你的現金流與資產估值...」
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
