export default interface IAppDetails {
  type: string;
  name: string;
  steam_appid: number;
  required_age: string;
  is_free: boolean;
  controller_support: string;
  dlc: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  website: string;
  pc_requirements: PcRequirements;
  mac_requirements: any[];
  linux_requirements: PcRequirements;
  legal_notice: string;
  developers: string[];
  publishers: string[];
  price_overview: PriceOverview;
  packages: number[];
  package_groups: PackageGroup[];
  platforms: Platforms;
  metacritic: Metacritic;
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  movies: Movie[];
  recommendations: Recommendations;
  achievements: Achievements;
  release_date: ReleaseDate;
  support_info: SupportInfo;
  background: string;
  content_descriptors: ContentDescriptors;
}

interface ContentDescriptors {
  ids: any[];
  notes?: any;
}

interface SupportInfo {
  url: string;
  email: string;
}

interface ReleaseDate {
  coming_soon: boolean;
  date: string;
}

interface Achievements {
  total: number;
  highlighted: Highlighted[];
}

interface Highlighted {
  name: string;
  path: string;
}

interface Recommendations {
  total: number;
}

interface Movie {
  id: number;
  name: string;
  thumbnail: string;
  webm: Webm;
  mp4: Webm;
  highlight: boolean;
}

interface Webm {
  '480': string;
  max: string;
}

interface Screenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

interface Genre {
  id: string;
  description: string;
}

interface Category {
  id: number;
  description: string;
}

interface Metacritic {
  score: number;
  url: string;
}

interface Platforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

interface PackageGroup {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: Sub[];
}

interface Sub {
  packageid: number;
  percent_savings_text: string;
  percent_savings: number;
  option_text: string;
  option_description: string;
  can_get_free_license: string;
  is_free_license: boolean;
  price_in_cents_with_discount: number;
}

interface PriceOverview {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
  initial_formatted: string;
  final_formatted: string;
}

interface PcRequirements {
  minimum: string;
  recommended: string;
}
