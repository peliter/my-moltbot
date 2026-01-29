"use client";

import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { formatCurrency } from '../lib/finance-utils';
import { TrendingUp } from 'lucide-react';

const AssetChart = () => {
  const { history } = useGameStore();

  if (history.length < 2) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-slate-900/50 border border-slate-800 rounded-3xl text-slate-500">
        <TrendingUp size={32} className="mb-2 opacity-20" />
        <p>積累數據中，請前進到下一個月...</p>
      </div>
    );
  }

  // 格式化數據供圖表使用
  const data = history.map(h => ({
    name: `M${h.month}`,
    "總資產": h.totalAssets,
    "淨資產": h.netWorth,
    "現金": h.cash
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-emerald-500" size={20} />
        <h2 className="text-xl font-bold text-white">資產增長曲線</h2>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
              itemStyle={{ fontSize: '12px' }}
              formatter={(value: number) => [formatCurrency(value), ""]}
            />
            <Area 
              type="monotone" 
              dataKey="淨資產" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorAssets)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssetChart;
