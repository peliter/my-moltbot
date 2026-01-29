export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: any) => boolean;
  unlocked: boolean;
}

export const ACHIEVEMENTS: Omit<Achievement, 'unlocked'>[] = [
  {
    id: 'first_home',
    title: '成家立業',
    description: '購買人生第一間房產',
    icon: '🏠',
    condition: (state) => state.properties.length >= 1,
  },
  {
    id: 'millionaire',
    title: '百萬富翁',
    description: '淨資產達到 500 萬 TWD',
    icon: '💰',
    condition: (state) => (state.cash + state.properties.reduce((sum: number, p: any) => sum + p.currentValue, 0) - state.properties.reduce((sum: number, p: any) => sum + p.loanAmount, 0)) >= 5000000,
  },
  {
    id: 'landlord',
    title: '專業包租公',
    description: '擁有 3 間以上的房產',
    icon: '🔑',
    condition: (state) => state.properties.length >= 3,
  },
  {
    id: 'leverage_master',
    title: '槓桿大師',
    description: '總負債超過 5,000 萬 TWD',
    icon: '📈',
    condition: (state) => state.properties.reduce((sum: number, p: any) => sum + p.loanAmount, 0) >= 50000000,
  },
  {
    id: 'debt_free',
    title: '無債一身輕',
    description: '在擁有房產的情況下，總負債歸零',
    icon: '🕊️',
    condition: (state) => state.properties.length > 0 && state.properties.reduce((sum: number, p: any) => sum + p.loanAmount, 0) === 0,
  }
];
