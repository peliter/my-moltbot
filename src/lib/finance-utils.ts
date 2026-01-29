/**
 * 財務計算工具函數
 */

/**
 * 計算本息平均攤還的每月還款額
 * @param principal 貸款本金
 * @param annualRate 年利率 (0.02 代表 2%)
 * @param months 總期數 (月)
 * @returns 每月還款金額
 */
export const calculateMonthlyPayment = (
  principal: number,
  annualRate: number,
  months: number
): number => {
  if (annualRate === 0) return principal / months;
  const monthlyRate = annualRate / 12;
  const x = Math.pow(1 + monthlyRate, months);
  const monthly = (principal * x * monthlyRate) / (x - 1);
  return monthly;
};

/**
 * 計算單一房產的本月財務變動
 * @param property 房產對象
 * @returns { interestPaid: 利息支出, principalPaid: 本金償還, rentIncome: 租金收入 }
 */
export const calculatePropertyMonthlyFlow = (property: any) => {
  const monthlyRate = property.interestRate / 12;
  
  // 利息支出 = 剩餘本金 * 月利率
  const interestPaid = property.loanAmount * monthlyRate;
  
  let principalPaid = 0;
  
  // 如果還在寬限期內，只付利息
  if (property.gracePeriod > 0) {
    principalPaid = 0;
  } else {
    // 否則計算剩餘期數的本息平均攤還
    const totalMonthly = calculateMonthlyPayment(
      property.loanAmount,
      property.interestRate,
      property.remainingTerm
    );
    principalPaid = totalMonthly - interestPaid;
  }

  return {
    interestPaid,
    principalPaid: Math.min(principalPaid, property.loanAmount),
    rentIncome: property.monthlyRent
  };
};

/**
 * 格式化貨幣 (TWD)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(amount);
};
