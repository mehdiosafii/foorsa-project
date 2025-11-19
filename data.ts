
import { UniversityOffer } from './types';

export const OFFER_DATA: UniversityOffer = {
  name: "Beijing Institute of Technology (BIT)",
  ranking: "Shanghai Ranking #13",
  location: "Beijing, China",
  program: "Aeronautical and Astronautical Engineering",
  degreeLevel: "Bachelor",
  duration: "4 Years",
  tuitionRmb: 30000,
  applicationFee: "600 RMB",
  cscaTestRequired: "No",
  scholarships: [
    {
      type: "Type A",
      coverage: "Tuition + Accommodation + Monthly Stipend (2500 RMB)",
      costAfterScholarship: "0 RMB",
      duration: "4 Years",
      highlight: true
    },
    {
      type: "Type B",
      coverage: "Tuition + Accommodation",
      costAfterScholarship: "0 RMB",
      duration: "4 Years",
      highlight: true
    },
    {
      type: "Type C",
      coverage: "Tuition Only",
      costAfterScholarship: "Plus Accommodation Costs",
      duration: "4 Years"
    },
    {
      type: "Type D",
      coverage: "Tuition + Accommodation (1 Year)",
      costAfterScholarship: "0 RMB (First Year)",
      duration: "1 Year"
    },
    {
      type: "Type E",
      coverage: "Tuition Only (1 Year)",
      costAfterScholarship: "Plus Accommodation Costs",
      duration: "1 Year"
    },
    {
      type: "Type F",
      coverage: "50% Tuition (1 Year)",
      costAfterScholarship: "15,000 RMB (~20,000 MAD) + Accommodation",
      duration: "1 Year"
    },
    {
      type: "Type G",
      coverage: "25% Tuition (1 Year)",
      costAfterScholarship: "22,000 RMB (~29,000 MAD) + Accommodation",
      duration: "1 Year"
    }
  ],
  campuses: [
    {
      name: "Zhongguancun Campus",
      location: "Haidian District, Beijing",
      housing: [
        { occupancy: 2, priceRmb: 1350, priceMad: 1800 },
        { occupancy: 3, priceRmb: 1200, priceMad: 1600 },
        { occupancy: 4, priceRmb: 900, priceMad: 1200 },
      ],
      images: [
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1000"
      ]
    },
    {
      name: "Liangxiang Campus",
      location: "Fangshan District, Beijing",
      housing: [
        { occupancy: 2, priceRmb: 900, priceMad: 1200 },
        { occupancy: 3, priceRmb: 700, priceMad: 950 },
        { occupancy: 4, priceRmb: 500, priceMad: 700 },
      ],
      images: [
        "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1000"
      ]
    }
  ],
  requirements: {
    english: ["Efset", "Duolingo", "TOEFL", "IELTS"],
    documents: ["Letter of Guarantee (for students under 18)", "Standard application documents"],
    other: ["Online Interview required for scholarship"]
  }
};
