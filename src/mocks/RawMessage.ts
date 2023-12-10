import { RawMessage } from "../models/RawMessage";
import faker from "faker"; // Function to generate a random RawMessage

// Function to generate a random RawMessage
const generateRandomRawMessage = (): RawMessage => {
  const id = faker.datatype.uuid();
  const portfolioName = faker.company.companyName();
  const department = faker.random.arrayElement([
    "Equity",
    "Fixed Income",
    "Alternative Investments",
    "Global Strategies",
  ]);
  const investmentType = faker.random.arrayElement([
    "Stocks",
    "Bonds",
    "Real Estate",
  ]);
  const startDate = faker.date.past().toISOString().split("T")[0];
  const currentValue = faker.datatype.number({ min: 500000, max: 2000000 });
  const initialInvestment = faker.datatype.number({
    min: 300000,
    max: 1000000,
  });
  const roi = faker.datatype.float({ min: 5, max: 30, precision: 0.01 });
  const riskLevel = faker.random.arrayElement(["Low", "Moderate", "High"]);
  const assetAllocation = {
    stocks: faker.datatype.number({ min: 40, max: 80 }),
    bonds: faker.datatype.number({ min: 20, max: 60 }),
  };
  const benchmark = faker.company.bsNoun();
  const manager = faker.name.findName();
  const performanceMetrics = {
    annualizedReturn: faker.datatype.float({
      min: 10,
      max: 25,
      precision: 0.01,
    }),
    standardDeviation: faker.datatype.float({
      min: 5,
      max: 15,
      precision: 0.01,
    }),
    sharpeRatio: faker.datatype.float({ min: 0.5, max: 2, precision: 0.01 }),
  };
  const holdings = Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    () =>
      faker.random.arrayElement([
        "ABCD",
        "XYZA",
        "QWER",
        "PLMN",
        "STUV",
        "JKLO",
        "MNOP",
        "WXYZ",
        "UVWX",
        "EFGH",
        "IJKL",
        "BCDE",
        "LMNO",
        "OPQR",
        "FGHI",
        "HIJK",
        "VWXY",
        "NOPQ",
        "QRST",
        "YZAB",
        "DEFG",
        "IJKM",
        "STUV",
        "MNOP",
        "PQRS",
        "KLMN",
        "OPQS",
        "ABCD",
        "UVWX",
        "XYZA",
        "LMNO",
        "WXYZ",
        "QRST",
        "YZAB",
        "EFGH",
        "IJKL",
        "JKLO",
        "FGHI",
        "VWXY",
        "HIJK",
        "NOPQ",
        "QWER",
        "PLMN",
        "STUV",
        "JKLO",
        "MNOP",
        "BCDE",
        "WXYZ",
        "UVWX",
        "IJKL",
        "EFGH",
        "HIJK",
        "QRST",
        "YZAB",
        "DEFG",
        "PQRS",
        "KLMN",
        "MNOP",
        "ABCD",
        "OPQR",
        "UVWX",
        "XYZA",
        "STUV",
        "QRST",
        "HIJK",
        "NOPQ",
        "BCDE",
        "WXYZ",
        "PQRS",
        "EFGH",
        "JKLO",
        "YZAB",
        "IJKL",
        "KLMN",
        "OPQR",
        "DEFG",
        "UVWX",
        "XYZA",
        "FGHI",
        "LMNO",
        "QRST",
        "NOPQ",
        "HIJK",
        "PQRS",
        "BCDE",
        "WXYZ",
        "JKLO",
        "KLMN",
        "IJKL",
        "OPQR",
        "EFGH",
        "UVWX",
        "QRST",
        "STUV",
        "XYZA",
        "FGHI",
        "NOPQ",
        "PQRS",
        "JKLO",
        "WXYZ",
      ])
  );
  const transactionHistory = Array.from(
    { length: faker.datatype.number({ min: 1, max: 5 }) },
    () => ({
      date: faker.date.past().toISOString().split("T")[0],
      action: faker.random.arrayElement(["Buy", "Sell"]),
      amount: faker.datatype.number({ min: 1000, max: 50000 }),
      price: faker.datatype.number({ min: 50, max: 200 }),
      transactionType: faker.random.arrayElement(["Buy", "Sell"]),
      fees: faker.datatype.number({ min: 10, max: 100 }),
      dividends: faker.datatype.number({ min: 0, max: 500 }),
      notes: faker.lorem.sentence(),
    })
  );
  const dividends = faker.datatype.number({ min: 0, max: 10000 });
  const feesAndExpenses = faker.datatype.number({ min: 0, max: 5000 });
  const notesComments = faker.lorem.sentence();

  return {
    id,
    portfolioName,
    department,
    investmentType,
    startDate,
    currentValue,
    initialInvestment,
    roi,
    riskLevel,
    assetAllocation,
    benchmark,
    manager,
    performanceMetrics,
    holdings,
    transactionHistory,
    dividends,
    feesAndExpenses,
    notesComments,
  };
};

export function getMockRawMessages(rowCount: number = 1000) {
  return Array.from({ length: rowCount }, generateRandomRawMessage);
}
