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
  propertyTypes: Array<string>
): PropertyData[] => {
  const fakeData: PropertyData[] = [];

  for (let i = 0; i < propertyTypes.length; i++) {
    const propertyId = faker.datatype.uuid();
    const propertyType = propertyTypes[i];
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

export function getRealEstateData(): Promise<Array<PropertyData>> {
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
