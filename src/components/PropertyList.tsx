"use client";

import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { formatCurrency } from '../lib/finance-utils';
import { Building, Trash2, TrendingUp, Info } from 'lucide-react';

const PropertyList = () => {
  const { properties, sellProperty } = useGameStore();

  if (properties.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-3xl flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-2xl">
          🏠
        </div>
        <h2 className="text-xl font-bold text-white mb-2">房產清單暫無數據</h2>
        <p className="text-slate-500 max-w-sm">
          點擊右側商城購買你的第一間房產，開始累積資產！
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Building className="text-blue-500" size={20} />
        <h2 className="text-xl font-bold text-white">我的房產 ({properties.length})</h2>
      </div>
      <div className="space-y-4">
        {properties.map((prop) => {
          const equity = prop.currentValue - prop.loanAmount;
          const ltv = (prop.loanAmount / prop.currentValue) * 100;
          
          return (
            <div key={prop.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
              {/* 裝飾性進度條：資產佔比 */}
              <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all" style={{ width: `${100 - ltv}%` }} />
              
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{prop.name}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <TrendingUp size={12} /> 估值：{formatCurrency(prop.currentValue)}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Info size={12} /> 貸款：{formatCurrency(prop.loanAmount)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-right mr-4">
                    <p className="text-xs text-slate-500 uppercase">目前權益</p>
                    <p className="text-md font-bold text-emerald-400">{formatCurrency(equity)}</p>
                  </div>
                  <button 
                    onClick={() => {
                      if(confirm(`確定要以 ${formatCurrency(prop.currentValue)} 賣出 ${prop.name} 嗎？`)) {
                        sellProperty(prop.id);
                      }
                    }}
                    className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">剩餘期數</p>
                  <p className="text-sm text-white">{prop.remainingTerm} 個月</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">租金收入</p>
                  <p className="text-sm text-white">{formatCurrency(prop.monthlyRent)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">槓桿率</p>
                  <p className="text-sm text-white">{ltv.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyList;
