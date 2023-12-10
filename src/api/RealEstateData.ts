import faker from "faker";

interface PropertyData {
  propertyType: string;
  minAmount: number;
  currentInvested: number;
  totalAllocated: number;
  maxAmount: number;
}

const generateRealEstateData = (count: number): PropertyData[] => {
  const fakeData: PropertyData[] = [];

  for (let i = 0; i < count; i++) {
    const propertyType = faker.random.arrayElement([
      "Residential",
      "Commercial",
      "Industrial",
      "Vacant Land",
    ]);
    const minAmount = faker.datatype.number({ min: 30000, max: 100000 });
    const currentInvested = faker.datatype.number({ min: 80000, max: 300000 });
    const totalAllocated = faker.datatype.number({ min: 150000, max: 500000 });
    const maxAmount = faker.datatype.number({ min: 200000, max: 1000000 });

    const propertyEntry: PropertyData = {
      propertyType,
      minAmount,
      currentInvested,
      totalAllocated,
      maxAmount,
    };

    fakeData.push(propertyEntry);
  }

  return fakeData;
};

export function getRealEstateData() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(generateRealEstateData(10)), 445)
  );
}
