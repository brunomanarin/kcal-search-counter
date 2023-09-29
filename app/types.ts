export type FoodSearchResponse = {
    totalHits: number;
    currentPage: number;
    totalPages: number;
    pageList: number[];
    foodSearchCriteria: {
      dataType: string[];
      query: string;
      generalSearchInput: string;
      pageNumber: number;
      sortBy: string;
      sortOrder: string;
      numberOfResultsPerPage: number;
      pageSize: number;
      requireAllWords: boolean;
      foodTypes: string[];
    };
    foods: {
      fdcId: number;
      description: string;
      commonNames: string;
      additionalDescriptions: string;
      dataType: string;
      ndbNumber: number;
      publishedDate: string;
      foodCategory: string;
      mostRecentAcquisitionDate: string;
      allHighlightFields: string;
      score: number;
      microbes: any[]; // You can specify a more specific type if needed
      foodNutrients: {
        nutrientId: number;
        nutrientName: string;
        nutrientNumber: string;
        unitName: string;
        derivationCode: string;
        derivationDescription: string;
        derivationId: number;
        value: number;
        foodNutrientSourceId: number;
        foodNutrientSourceCode: string;
        foodNutrientSourceDescription: string;
        rank: number;
        indentLevel: number;
        foodNutrientId: number;
        dataPoints: number;
        min: number;
        max: number;
        median: number;
      }[];
    }[];
    aggregations: {
      dataType: {
        Branded: number;
        "Survey (FNDDS)": number;
        "SR Legacy": number;
        Foundation: number;
        Experimental: number;
      };
      nutrients: Record<string, number>; // You can specify a more specific type if needed
    };
  };

export type Food = {
  fdcId: number;
  description: string;
  commonNames: string;
  additionalDescriptions: string;
  dataType: string;
  ndbNumber: number;
  publishedDate: string;
  foodCategory: string;
  mostRecentAcquisitionDate: string;
  allHighlightFields: string;
  score: number;
  microbes: any[]; // You can specify a more specific type if needed
  foodNutrients: {
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    derivationCode: string;
    derivationDescription: string;
    derivationId: number;
    value: number;
    foodNutrientSourceId: number;
    foodNutrientSourceCode: string;
    foodNutrientSourceDescription: string;
    rank: number;
    indentLevel: number;
    foodNutrientId: number;
    dataPoints: number;
    min: number;
    max: number;
    median: number;
  }[];
}