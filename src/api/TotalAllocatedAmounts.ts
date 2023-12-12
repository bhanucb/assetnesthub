import faker from "faker";

export interface RealEstateAllocatedAmount {
  date: Date;
  totalAmount: number;
}

const generateFakeAllocatedData = (): RealEstateAllocatedAmount[] => {
  const allocatedData: RealEstateAllocatedAmount[] = [];

  // Generate data for the last 24 months
  for (let i = 24; i >= 0; i--) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - i);
    const totalAmount = faker.datatype.number({ min: 50000, max: 200000 });

    const allocatedAmount: RealEstateAllocatedAmount = {
      date: currentDate,
      totalAmount,
    };

    allocatedData.push(allocatedAmount);
  }

  return allocatedData;
};

export function getTotalAllocatedAmounts(): Promise<
  Array<RealEstateAllocatedAmount>
> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(generateFakeAllocatedData()), 445)
  );
}
