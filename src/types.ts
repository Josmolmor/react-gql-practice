interface Continent {
  code: string;
  countries: Country[];
  name: string;
}

interface Language {
  code: string;
  name: string;
  native: string;
  rtl: boolean;
}

interface State {
  code: string;
  country: Country;
  name: string;
}

interface Subdivision {
  code: string;
  emoji: string;
  name: string;
}

export interface Country {
  awsRegion: string;
  capital?: string;
  code: string;
  continent: Continent;
  currencies: string[];
  currency?: string;
  emoji: string;
  emojiU: string;
  languages: Language[];
  name: string;
  native: string;
  phone: string;
  phones: string[];
  states: State[];
  subdivisions: Subdivision[];
}
