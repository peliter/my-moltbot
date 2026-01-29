import { create } from 'zustand';
import { GameState, Property, FinancialHistory } from '../types/game';
import { calculatePropertyMonthlyFlow } from '../lib/finance-utils';
import { RANDOM_EVENTS } from '../data/random-events';

const INITIAL_CASH = 1000000;
const INITIAL_AGE = 25 * 12;

interface ExtendedGameState extends GameState {
  lastEvent: { title: string; description: string } | null;
}

export const useGameStore = create<ExtendedGameState>((set, get) => ({
  playerName: 'Peliter',
  age: INITIAL_AGE,
  currentMonth: 0,
  cash: INITIAL_CASH,
  properties: [],
  history: [],
  baseInterestRate: 0.02,
  marketTrend: 1.0,
  lastEvent: null,

  nextMonth: () => {
    const state = get();
    let newCash = state.cash;
    let eventToDisplay = null;
    let newMarketTrend = 1.0 + (Math.random() * 0.01 - 0.005);
    let eventInterestMod = 0;
    let eventRentMod = 1.0;

    // 隨機事件處理 (5% 機率)
    if (Math.random() < 0.05) {
      const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
      eventToDisplay = { title: event.title, description: event.description };
      
      if (event.impactType === 'cash') newCash += event.value;
      if (event.impactType === 'market') newMarketTrend *= event.value;
      if (event.impactType === 'interest') eventInterestMod = event.value;
      if (event.impactType === 'rent') eventRentMod = event.value;
    }

    const updatedProperties = state.properties.map((prop) => {
      // 應用事件影響
      const currentProp = {
        ...prop,
        interestRate: prop.interestRate + eventInterestMod,
        monthlyRent: prop.monthlyRent * eventRentMod
      };
      
      const flow = calculatePropertyMonthlyFlow(currentProp);
      newCash += (flow.rentIncome - flow.interestPaid - flow.principalPaid);
      
      return {
        ...prop,
        interestRate: currentProp.interestRate,
        monthlyRent: currentProp.monthlyRent,
        loanAmount: prop.loanAmount - flow.principalPaid,
        remainingTerm: prop.remainingTerm - 1,
        gracePeriod: Math.max(0, prop.gracePeriod - 1),
        currentValue: prop.currentValue * newMarketTrend
      };
    }).filter(prop => prop.remainingTerm >= 0);

    newCash -= 30000; // 生活費

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
      history: [...state.history, newHistoryRecord].slice(-360),
      marketTrend: newMarketTrend,
      lastEvent: eventToDisplay
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
    history: [],
    lastEvent: null
  })
}));
