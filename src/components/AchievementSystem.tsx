"use client";

import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Trophy, Lock } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievements';

const AchievementSystem = () => {
  const { unlockedAchievements } = useGameStore();

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-amber-500" size={20} />
        <h2 className="text-xl font-bold text-white">成就系統</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {ACHIEVEMENTS.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          
          return (
            <div 
              key={achievement.id} 
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                isUnlocked 
                ? "bg-amber-500/10 border-amber-500/30" 
                : "bg-slate-800/30 border-slate-700/50 opacity-50"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${
                isUnlocked ? "bg-amber-500/20" : "bg-slate-800"
              }`}>
                {isUnlocked ? achievement.icon : <Lock size={20} className="text-slate-600" />}
              </div>
              <div>
                <h4 className={`font-bold text-sm ${isUnlocked ? "text-amber-400" : "text-slate-500"}`}>
                  {achievement.title}
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">{achievement.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementSystem;
