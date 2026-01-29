import { create } from 'zustand';
import { GameState, Property, FinancialHistory, GameEvent } from '../types/game';
import { calculatePropertyMonthlyFlow } from '../lib/finance-utils';

const INITIAL_CASH = 1000000;
const INITIAL_AGE = 25 * 12; // 25 歲開始

export const useGameStore = create<GameState>((set, get) => ({
  playerName: 'Peliter',
  age: INITIAL_AGE,
  currentMonth: 0,
  cash: INITIAL_CASH,
  properties: [],
  history: [],
  baseInterestRate: 0.02,
  marketTrend: 1.0,

  nextMonth: () => {
    const state = get();
    
    // 1. 隨機事件處理 (假設 10% 機率發生波動)
    let newMarketTrend = 1.0;
    const random = Math.random();
    if (random > 0.95) newMarketTrend = 1.05; // 房價大漲 5%
    else if (random < 0.05) newMarketTrend = 0.95; // 房價大跌 5%
    else newMarketTrend = 1.0 + (Math.random() * 0.01 - 0.005); // 平時微幅波動 -0.5% ~ +0.5%

    let newCash = state.cash;
    const updatedProperties = state.properties.map((prop) => {
      const flow = calculatePropertyMonthlyFlow(prop);
      
      // 現金變動 = 租金收入 - 利息支出 - 本金償還
      newCash += (flow.rentIncome - flow.interestPaid - flow.principalPaid);
      
      // 更新房產狀態
      return {
        ...prop,
        loanAmount: prop.loanAmount - flow.principalPaid,
        remainingTerm: prop.remainingTerm - 1,
        gracePeriod: Math.max(0, prop.gracePeriod - 1),
        currentValue: prop.currentValue * newMarketTrend
      };
    }).filter(prop => prop.remainingTerm >= 0);

    // 每月生活費扣除 (假設每月基本開銷 3 萬)
    newCash -= 30000;

    // 2. 結算當月歷史
    const totalPropertyValue = updatedProperties.reduce((sum, p) => sum + p.currentValue, 0);
    const totalDebt = updatedProperties.reduce((sum, p) => sum + p.loanAmount, 0);
    
    const newHistoryRecord: FinancialHistory = {
      month: state.currentMonth + 1,
      totalAssets: newCash + totalPropertyValue,
      netWorth: (newCash + totalPropertyValue) - totalDebt,
      cash: newCash,
      totalDebt: totalDebt
    };

    set((state) => ({
      currentMonth: state.currentMonth + 1,
      age: state.age + 1,
      cash: newCash,
      properties: updatedProperties,
      history: [...state.history, newHistoryRecord].slice(-360), // 只保留最近 30 年數據
      marketTrend: newMarketTrend
    }));
  },

  buyProperty: (propData) => {
    const state = get();
    const downPayment = propData.purchasePrice - propData.loanAmount;
    
    if (state.cash < downPayment) return;

    const newProperty: Property = {
      ...propData,
      id: Math.random().toString(36).substr(2, 9),
      currentValue: propData.purchasePrice,
      purchaseAge: state.age,
      gracePeriod: propData.gracePeriod || 0
    };

    set((state) => ({
      cash: state.cash - downPayment,
      properties: [...state.properties, newProperty]
    }));
  },

  sellProperty: (id) => {
    const state = get();
    const property = state.properties.find(p => p.id === id);
    if (!property) return;

    const gain = property.currentValue - property.loanAmount;
    
    set((state) => ({
      cash: state.cash + gain,
      properties: state.properties.filter(p => p.id !== id)
    }));
  },

  makeExtraPayment: (id, amount) => {
    const state = get();
    if (state.cash < amount) return;

    set((state) => ({
      cash: state.cash - amount,
      properties: state.properties.map(p => 
        p.id === id ? { ...p, loanAmount: Math.max(0, p.loanAmount - amount) } : p
      )
    }));
  },

  resetGame: () => set({
    age: INITIAL_AGE,
    currentMonth: 0,
    cash: INITIAL_CASH,
    properties: [],
    history: []
  })
}));
