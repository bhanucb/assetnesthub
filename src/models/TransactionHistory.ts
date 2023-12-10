import { RawMessage, TransactionHistory } from "./RawMessage";

export type TransactionHistoy = Pick<RawMessage, "portfolioName"> &
  Pick<
    TransactionHistory,
    | "date"
    | "action"
    | "amount"
    | "price"
    | "transactionType"
    | "fees"
    | "dividends"
    | "notes"
  >;
