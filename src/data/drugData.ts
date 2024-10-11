import { DrugInfo } from '../types/DrugInfo';

export const drugData: DrugInfo = {
  drug_name: "Pregabalin",
  search_url: "https://www.drugs.com/pregabalin.html",
  chemical_class: "GABA derivative",
  psychoactive_class: "Depressant",
  dosages: {
    routes_of_administration: [
      {
        route: "oral",
        units: "mg",
        dose_ranges: {
          threshold: "75 mg",
          light: "150 mg",
          common: "300 mg",
          strong: "600 mg",
          heavy: "900 mg"
        }
      },
      {
        route: "insufflated",
        units: "mg",
        dose_ranges: {
          threshold: "Not recommended",
          light: "Not recommended",
          common: "Not recommended",
          strong: "Not recommended",
          heavy: "Not recommended"
        }
      }
    ]
  },
  duration: {
    total_duration: "6-8 hours",
    onset: "30-60 minutes",
    peak: "1-2 hours",
    offset: "4-6 hours",
    after_effects: "Up to 24 hours"
  },
  addiction_potential: "Moderate, with potential for misuse and dependency, especially at higher doses.",
  interactions: {
    dangerous: [
      "Alcohol",
      "Opioids"
    ],
    unsafe: [
      "Benzodiazepines"
    ],
    caution: [
      "Other depressants"
    ]
  },
  notes: "Pregabalin is primarily used for nerve pain, seizures, and anxiety disorders. It is known for its calming and sedative effects. High doses can lead to psychoactive effects, including euphoria and hallucinations. Long-term use may lead to tolerance and dependency.",
  subjective_effects: [
    "Anxiolysis",
    "Contentment",
    "Pleasant tactile sensations",
    "Profound pain relief",
    "Increase in feelings of love and empathy",
    "Trance",
    "Talk for hours",
    "Boost to energy level"
  ],
  tolerance: {
    full_tolerance: "Within days of continuous use",
    half_tolerance: "1-2 weeks",
    zero_tolerance: "2-4 weeks",
    cross_tolerances: [
      "Gabapentin"
    ]
  },
  half_life: "6.3 hours",
  citations: [
    {
      name: "Drugs.com - Pregabalin",
      reference: "https://www.drugs.com/pregabalin.html"
    },
    {
      name: "DrugBank - Pregabalin",
      reference: "https://go.drugbank.com/drugs/DB00230"
    },
    {
      name: "DrugWise - Pregabalin",
      reference: "https://www.drugwise.org.uk/pregabalin/"
    }
  ],
  categories: [
    "depressant",
    "sedative",
    "habit-forming"
  ]
};