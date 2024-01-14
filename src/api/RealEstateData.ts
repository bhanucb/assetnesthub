import faker from "faker";

export interface PropertyData {
  propertyId: string;
  propertyType: string;
  minAmount: number;
  currentInvested: number;
  totalAllocated: number;
  maxAmount: number;
}

const generateFakeRealEstateData = (
  propertyTypes: string[]
): PropertyData[] => {
  const fakeData: PropertyData[] = [];

  for (const propertyType of propertyTypes) {
    const propertyId = faker.datatype.uuid();
    const minAmount = faker.datatype.number({ min: 30000, max: 100000 });
    const currentInvested = faker.datatype.number({ min: 80000, max: 300000 });
    const totalAllocated = faker.datatype.number({ min: 150000, max: 500000 });
    const maxAmount = faker.datatype.number({ min: 200000, max: 1000000 });

    const propertyEntry: PropertyData = {
      propertyId,
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

export function getRealEstateData(): Promise<PropertyData[]> {
  const propertyTypes = [
    "Residential",
    "Commercial",
    "Industrial",
    "Vacant Land",
    "Office",
    "Retail",
  ];
  return new Promise((resolve) =>
    setTimeout(() => resolve(generateFakeRealEstateData(propertyTypes)), 445)
  );
}
