
export interface ScholarshipType {
  type: string;
  coverage: string;
  costAfterScholarship: string;
  duration: string;
  highlight?: boolean;
}

export interface HousingOption {
  occupancy: number;
  priceRmb: number;
  priceMad: number;
}

export interface Campus {
  name: string;
  location: string;
  housing: HousingOption[];
  images: string[];
}

export interface UniversityOffer {
  name: string;
  ranking: string;
  location: string;
  program: string;
  degreeLevel: string;
  duration: string;
  tuitionRmb: number;
  applicationFee: string;
  cscaTestRequired: string;
  scholarships: ScholarshipType[];
  campuses: Campus[];
  requirements: {
    english: string[];
    documents: string[];
    other: string[];
  };
}
