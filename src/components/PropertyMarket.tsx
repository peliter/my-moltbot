"use client";

import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { formatCurrency } from '../lib/finance-utils';
import { ShoppingCart, Home, Key } from 'lucide-react';
import { MARKET_PROPERTIES } from '../data/market-properties';

const PropertyMarket = () => {
  const { buyProperty, cash } = useGameStore();

  const handleBuy = (baseProp: any) => {
    // 預設貸款 8 成，寬限期 0 年
    const loanAmount = baseProp.purchasePrice * 0.8;
    const downPayment = baseProp.purchasePrice - loanAmount;

    if (cash < downPayment) {
      alert("現金不足以支付首付款！");
      return;
    }

    buyProperty({
      ...baseProp,
      loanAmount: loanAmount,
      remainingTerm: baseProp.loanTerm,
      gracePeriod: 0,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="text-emerald-500" size={20} />
        <h2 className="text-xl font-bold text-white">房產商城</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MARKET_PROPERTIES.map((prop, index) => {
          const downPayment = prop.purchasePrice * 0.2;
          return (
            <div key={index} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-emerald-500/50 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Home size={20} />
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase">預估租金</p>
                  <p className="text-emerald-400 font-bold">{formatCurrency(prop.monthlyRent)}/月</p>
                </div>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{prop.name}</h3>
              <p className="text-slate-400 text-sm mb-4">總價：{formatCurrency(prop.purchasePrice)}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-800/50 p-2 rounded-lg">
                  <p className="text-[10px] text-slate-500 uppercase">首付 (20%)</p>
                  <p className="text-sm text-white font-medium">{formatCurrency(downPayment)}</p>
                </div>
                <div className="bg-slate-800/50 p-2 rounded-lg">
                  <p className="text-[10px] text-slate-500 uppercase">利率</p>
                  <p className="text-sm text-white font-medium">{(prop.interestRate * 100).toFixed(1)}%</p>
                </div>
              </div>

              <button 
                onClick={() => handleBuy(prop)}
                disabled={cash < downPayment}
                className={`w-full py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  cash >= downPayment 
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20" 
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Key size={16} /> 簽約購入
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyMarket;
