import FinanceDashboard from '@/components/FinanceDashboard';
import PropertyList from '@/components/PropertyList';
import PropertyMarket from '@/components/PropertyMarket';
import AssetChart from '@/components/AssetChart';
import EventNotification from '@/components/EventNotification';
import AchievementSystem from '@/components/AchievementSystem';

export default function Home() {
  return (
    <main className="min-h-screen bg-black py-12">
      <FinanceDashboard />
      
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <EventNotification />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左側主要區域 */}
          <div className="lg:col-span-3 space-y-8">
            <AssetChart />
            <PropertyList />
          </div>
          
          {/* 右側側邊欄 */}
          <div className="space-y-8">
            <AchievementSystem />
            <PropertyMarket />
            
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">市場情報</h3>
              <p className="text-slate-400 text-xs italic leading-relaxed">
                「房產投資不僅是買賣，更是對宏觀經濟的應對。達成特定成就將標誌著你的財務自由之路...」
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
