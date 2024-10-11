export interface DrugInfo {
  drug_name: string;
  search_url: string;
  chemical_class: string;
  psychoactive_class: string;
  dosages: {
    routes_of_administration: {
      route: string;
      units: string;
      dose_ranges: {
        threshold: string;
        light: string;
        common: string;
        strong: string;
        heavy: string;
      };
    }[];
  };
  duration: {
    total_duration: string;
    onset: string;
    peak: string;
    offset: string;
    after_effects: string;
  };
  addiction_potential: string;
  interactions: {
    dangerous: string[];
    unsafe: string[];
    caution: string[];
  };
  notes: string;
  subjective_effects: string[];
  tolerance: {
    full_tolerance: string;
    half_tolerance: string;
    zero_tolerance: string;
    cross_tolerances: string[];
  };
  half_life: string;
  citations: {
    name: string;
    reference: string;
  }[];
  categories: string[];
}