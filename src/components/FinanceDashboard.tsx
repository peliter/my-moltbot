"use client";

import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { formatCurrency } from '../lib/finance-utils';
import { Wallet, Building2, TrendingDown, Landmark, ArrowRightCircle } from 'lucide-react';

const FinanceDashboard = () => {
  const { cash, properties, age, currentMonth, nextMonth } = useGameStore();

  // 計算匯總數據
  const totalPropertyValue = properties.reduce((sum, p) => sum + p.currentValue, 0);
  const totalDebt = properties.reduce((sum, p) => sum + p.loanAmount, 0);
  const totalAssets = cash + totalPropertyValue;
  const netWorth = totalAssets - totalDebt;
  
  // LTV (貸款成數) = 總負債 / 總房產價值
  const ltv = totalPropertyValue > 0 ? (totalDebt / totalPropertyValue) * 100 : 0;

  const displayAge = Math.floor(age / 12);
  const displayMonth = age % 12;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* 頂部資訊列 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            《槓桿人生》 <span className="text-emerald-500 text-sm font-normal">房產模擬器 v1.0</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            當前時間：{displayAge} 歲 {displayMonth} 個月 (第 {currentMonth} 個月)
          </p>
        </div>
        <button 
          onClick={nextMonth}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
        >
          下一個月 <ArrowRightCircle size={20} />
        </button>
      </div>

      {/* 財務卡片區域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 現金 */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Wallet className="text-emerald-500" size={24} />
            </div>
            <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">流動資金</span>
          </div>
          <p className="text-slate-400 text-sm">當前現金</p>
          <p className="text-2xl font-bold text-white mt-1">{formatCurrency(cash)}</p>
        </div>

        {/* 總資產 */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Building2 className="text-blue-500" size={24} />
            </div>
            <span className="text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-1 rounded">含房產估值</span>
          </div>
          <p className="text-slate-400 text-sm">總資產</p>
          <p className="text-2xl font-bold text-white mt-1">{formatCurrency(totalAssets)}</p>
        </div>

        {/* 總負債 */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <TrendingDown className="text-red-500" size={24} />
            </div>
            <span className="text-xs font-medium text-red-500 bg-red-500/10 px-2 py-1 rounded">銀行貸款</span>
          </div>
          <p className="text-slate-400 text-sm">總負債</p>
          <p className="text-2xl font-bold text-white mt-1">{formatCurrency(totalDebt)}</p>
        </div>

        {/* LTV */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Landmark className="text-amber-500" size={24} />
            </div>
            <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded">槓桿率</span>
          </div>
          <p className="text-slate-400 text-sm">LTV (貸款成數)</p>
          <p className="text-2xl font-bold text-white mt-1">{ltv.toFixed(1)}%</p>
        </div>
      </div>

      {/* 淨資產摘要 */}
      <div className="bg-emerald-900/10 border border-emerald-500/20 p-6 rounded-3xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-emerald-500 text-sm font-semibold uppercase tracking-wider">Net Worth 淨資產</p>
            <p className="text-4xl font-black text-white mt-2">{formatCurrency(netWorth)}</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-slate-500 text-xs">資產分配</p>
            <div className="flex gap-2 mt-2">
              <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-emerald-500" 
                  style={{ width: `${(cash / totalAssets) * 100}%` }}
                />
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${(totalPropertyValue / totalAssets) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
