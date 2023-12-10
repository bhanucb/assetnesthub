export type AssetAllocation = {
  stocks: number;
  bonds: number;
}

export type PerformanceMetrics = {
  annualizedReturn: number;
  standardDeviation: number;
  sharpeRatio: number
}

export type TransactionHistory = {
  date: string;
  action: string;
  amount: number;
  price: number;
  transactionType: string;
  fees: number;
  dividends: number;
  notes: string;
}

export type RawMessage = {
  id: string;
  portfolioName: string;
  department: string;
  investmentType: string;
  startDate: string;
  currentValue: number;
  initialInvestment: number;
  roi: number;
  riskLevel: string;
  assetAllocation: AssetAllocation;
  benchmark: string;
  manager: string;
  performanceMetrics: PerformanceMetrics;
  holdings: Array<string>;
  transactionHistory: Array<TransactionHistory>;
  dividends: number;
  feesAndExpenses: number;
  notesComments: string;
};
