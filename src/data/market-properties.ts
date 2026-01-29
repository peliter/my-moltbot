import { Property } from '../types/game';

export const MARKET_PROPERTIES: Omit<Property, 'id' | 'loanAmount' | 'remainingTerm' | 'purchaseAge' | 'currentValue' | 'gracePeriod'>[] = [
  {
    name: "捷運小資套房",
    purchasePrice: 5000000,
    monthlyRent: 15000,
    interestRate: 0.021,
    loanTerm: 360,
  },
  {
    name: "市中心兩房兩廳",
    purchasePrice: 15000000,
    monthlyRent: 35000,
    interestRate: 0.021,
    loanTerm: 360,
  },
  {
    name: "郊區景觀別墅",
    purchasePrice: 35000000,
    monthlyRent: 70000,
    interestRate: 0.023,
    loanTerm: 240,
  },
  {
    name: "信義區豪宅",
    purchasePrice: 120000000,
    monthlyRent: 250000,
    interestRate: 0.025,
    loanTerm: 240,
  }
];
