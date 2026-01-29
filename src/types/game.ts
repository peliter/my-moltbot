/**
 * 《槓桿人生：房產模擬器》- 核心類型定義
 */

// 房產定義
export interface Property {
  id: string;
  name: string;
  purchasePrice: number;    // 購入價格
  currentValue: number;     // 當前估值
  loanAmount: number;       // 剩餘貸款金額
  monthlyRent: number;      // 月租金收入
  loanTerm: number;         // 貸款期限 (月)
  remainingTerm: number;    // 剩餘還款期數 (月)
  interestRate: number;     // 當前利率 (年利率，例如 0.02 表示 2%)
  gracePeriod: number;      // 寬限期剩餘月數
  purchaseAge: number;      // 購入時的玩家年齡
}

// 財務記錄 (用於圖表)
export interface FinancialHistory {
  month: number;
  totalAssets: number;      // 總資產 (現金 + 房產估值)
  netWorth: number;         // 淨資產 (總資產 - 總負債)
  cash: number;             // 現金
  totalDebt: number;        // 總負債
}

// 隨機事件
export interface GameEvent {
  id: string;
  title: string;
  description: string;
  impactType: 'interest' | 'market' | 'cash';
  value: number;            // 影響數值
  duration: number;         // 持續時間 (月)
}

// 遊戲核心狀態
export interface GameState {
  // 基礎狀態
  playerName: string;
  age: number;              // 當前年齡 (月為單位)
  currentMonth: number;     // 遊戲進行月數
  cash: number;             // 現金
  
  // 房產與財務
  properties: Property[];
  history: FinancialHistory[];
  
  // 環境變數
  baseInterestRate: number; // 基礎市場利率
  marketTrend: number;      // 市場波動係數
  
  // 動作
  nextMonth: () => void;
  buyProperty: (property: Omit<Property, 'id' | 'purchaseAge' | 'currentValue'>) => void;
  sellProperty: (id: string) => void;
  makeExtraPayment: (id: string, amount: number) => void;
  resetGame: () => void;
}
