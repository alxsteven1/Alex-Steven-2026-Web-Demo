

export interface CityData {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  size: "big" | "small";
  roles: string[];
  imageCount: number; 
  logo?: string; 
}

// The magic string that fixes GitHub Pages 404 errors
const BASE_PATH = "/Alex-Steven-2026-Web-Demo";

export const CITIES: CityData[] = [
  {
    id: "london",
    name: "Manager at Wimbledon Tennis Championship",
    country: "London - United Kingdom",
    lat: 51.5074,
    lng: -0.1278,
    size: "big",
    roles: ["Coming Soon - 2026", "Team Leader - 2025", "Kitchen Porter - 2024"],
    imageCount: 7,
    logo: `${BASE_PATH}/content/london/londonlogo.png`
  },
  {
    id: "pretoria",
    name: "Student at the University of Pretoria",
    country: "South Africa",
    lat: -25.2479,
    lng: 28.1293,
    size: "big",
    roles: ["Final Year Information Technology Student", "Social Media Manager", "TuksFM Presenter - 2025"],
    imageCount: 7,
    logo: `${BASE_PATH}/content/pretoria/pretorialogo.png`
  },
  {
    id: "joburg",
    name: "HeronBridge College - Johannesburg",
    country: "South Africa",
    // Fixed: Coordinates now point to Johannesburg instead of the Free State
    lat: -26.4041,
    lng: 27.0473,
    size: "big",
    roles: ["Advanced Program  Math", "Community Service Full Colours", "Full Colours for Sport"],
    imageCount: 4,
    logo: `${BASE_PATH}/content/joburg/joburglogo.png`
  },
  {
    id: "capetown",
    name: "Cape Town",
    country: "South Africa",
    lat: -33.9249,
    lng: 18.4241,
    size: "small",
    roles: ["Tech Hub of South Africa", "One Of My Favourite Cities", "My Home For One Month A Year"],
    imageCount: 5
  },
  {
    id: "bulawayo",
    name: "Bulawayo with Zimco",
    country: "Zimbabwe",
    lat: -20.1465,
    lng: 28.5833,
    size: "small",
    roles: ["Mining Industry Internship"],
    imageCount: 5,
    logo: `${BASE_PATH}/content/bulawayo/bulawayologo.png`
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093,
    size: "small",
    roles: ["Feels Like South Africa", "Friends And Family -2021"],
    imageCount: 5
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    size: "small",
    roles: ["The Most Beautiful City In The World"],
    imageCount: 5
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
    size: "small",
    // Fixed: Changed "Africa" to "the Middle East"
    roles: ["Tech Hub of the Middle East", "Inspiring Levels Of Innovation"], 
    imageCount: 3
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    lat: 52.3676,
    lng: 4.9041,
    size: "small",
    roles: ["Contiki - 2022"],
    imageCount: 5
  },
  {
    id: "munich",
    name: "Munich",
    country: "Germany",
    lat: 48.1351,
    lng: 11.5820,
    size: "small",
    roles: ["Contiki - 2022"],
    imageCount: 4
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    lat: 41.9028,
    lng: 12.4964,
    size: "small",
    roles: ["Contiki - 2022"],
    imageCount: 3
  },
  {
    id: "atlanta",
    name: "Atlanta - Epi-Use Offices",
    country: "USA",
    lat: 33.7490,
    lng: -84.3880,
    size: "small",
    roles: ["Currently Interning for Epi-Use", "SAP Software Specialists"],
    imageCount: 1,
    logo: `${BASE_PATH}/content/atlanta/atlantalogo.png`
  }
];
