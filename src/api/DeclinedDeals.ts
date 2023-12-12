import faker from "faker";

export interface DeclinedDealData {
  dealId: string;
  dealName: string;
  declineReason: string;
  proposalAmount: number;
  currentInvestedPercentage: number;
}

const generateFakeDeclinedDealsData = (count: number): DeclinedDealData[] => {
  const fakeData: DeclinedDealData[] = [];

  for (let i = 0; i < count; i++) {
    const dealId = faker.datatype.uuid();
    const dealName = faker.company.companyName();
    const declineReason = faker.random.arrayElement([
      "Insufficient Funds",
      "High Risk",
      "Market Conditions",
    ]);
    const proposalAmount = faker.datatype.number({ min: 100000, max: 1000000 });
    const currentInvestedPercentage = faker.datatype.number({
      min: 10,
      max: 50,
    });

    const declinedDeal: DeclinedDealData = {
      dealId,
      dealName,
      declineReason,
      proposalAmount,
      currentInvestedPercentage,
    };

    fakeData.push(declinedDeal);
  }

  return fakeData;
};

export function getDeclinedDeals(): Promise<Array<DeclinedDealData>> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(generateFakeDeclinedDealsData(100)), 445)
  );
}
