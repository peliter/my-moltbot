"use client";

import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { AlertTriangle, Info, BellRing } from 'lucide-react';

const EventNotification = () => {
  const { lastEvent } = useGameStore();

  if (!lastEvent) return null;

  return (
    <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-2xl animate-in slide-in-from-top duration-500 mb-6">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-emerald-500/20 rounded-full text-emerald-500">
          <BellRing size={18} />
        </div>
        <div>
          <h4 className="text-emerald-400 font-bold text-sm">【市場動態】{lastEvent.title}</h4>
          <p className="text-slate-300 text-xs mt-1 leading-relaxed">{lastEvent.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventNotification;
