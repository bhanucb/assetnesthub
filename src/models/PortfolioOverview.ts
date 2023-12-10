import { RawMessage } from "./RawMessage";

export type PortfolioOverview = Pick<
  RawMessage,
  | "portfolioName"
  | "department"
  | "investmentType"
  | "currentValue"
  | "initialInvestment"
  | "roi"
  | "riskLevel"
  | "assetAllocation"
  | "benchmark"
  | "manager"
>;
