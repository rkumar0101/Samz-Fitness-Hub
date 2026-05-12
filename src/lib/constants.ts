export const BRAND = {
  name: "Samz Fitness Hub",
  phoneE164: "919832589366",
  email: "fitnesshub.slg2@gmail.com",
  cityLine: "Siliguri, West Bengal",
  addressLine:
    "12, Premendra Mitra Sarani, Ward 23, Arabinda Pally, Siliguri, West Bengal 734006",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Samz%20Fitness%20Hub%20Siliguri&output=embed",
  hours: {
    weekdays: "Mon-Sat: 6:00 AM - 12:00 PM, 4:00 PM - 10:00 PM",
    sunday: "Sunday closed",
  },
};

export const NAV_LINKS = [
  { id: "branches", label: "Branches" },
  { id: "compare", label: "Compare" },
  { id: "facilities", label: "Facilities" },
  { id: "plan-builder", label: "AI Planner" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
] as const;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Samz Fitness Hub, I want details about membership. Branch: _____. Preferred time: _____.";

export type Branch = {
  id: string;
  name: string;
  shortName: string;
  area: string;
  landmark: string;
  address: string;
  mapLink: string;
  timings: string[];
  admission: string;
  contact: string;
  pricing: {
    monthly: number;
    quarterly: number;
    halfYearly: number;
    yearly: number;
    coupleYearly: number;
    groupYearly?: number;
    ptMonthly: number;
  };
  note?: string;
  images: string[];
};

export const DEFAULT_TIMINGS = [
  "06:00 AM - 12:00 PM",
  "04:00 PM - 10:00 PM",
  "Monday to Saturday",
  "Sunday closed",
];

export const BRANCHES: Branch[] = [
  {
    id: "fit-beat",
    name: "FIT-BEAT UNISEX GYM",
    shortName: "Gym 1",
    area: "Laketown, Ward 33",
    landmark: "Near Sarkar Traders",
    address:
      "Near Sarkar Traders, Laketown, Ward 33, Siliguri, West Bengal 734007, India",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=FIT-BEAT%20UNISEX%20GYM%20Near%20Sarkar%20Traders%20Laketown%20Siliguri",
    timings: DEFAULT_TIMINGS,
    admission: "Nil till offer",
    contact: "9832589366",
    pricing: {
      monthly: 1500,
      quarterly: 4000,
      halfYearly: 6000,
      yearly: 10000,
      coupleYearly: 16000,
      groupYearly: 8000,
      ptMonthly: 3000,
    },
    note: "Group yearly package is per person, minimum 3 members.",
    images: [
      "/gym-images/fit-beat-1.jpeg",
      "/gym-images/fit-beat-2.jpeg",
      "/gym-images/fit-beat-3.jpeg",
      "/gym-images/fit-beat-4.jpeg",
      "/gym-images/fit-beat-5.jpeg",
    ],
  },
  {
    id: "fitness-hub-3",
    name: "FITNESS HUB 3.0",
    shortName: "Gym 2",
    area: "Siliguri central area",
    landmark: "Map pin available",
    address: "Exact branch location available on Google Maps.",
    mapLink: "https://maps.app.goo.gl/n4kGJ3tiCdKy6FuX9?g_st=aw",
    timings: DEFAULT_TIMINGS,
    admission: "Nil till offer",
    contact: "9832589366",
    pricing: {
      monthly: 800,
      quarterly: 1800,
      halfYearly: 3000,
      yearly: 5000,
      coupleYearly: 8000,
      ptMonthly: 1500,
    },
    images: ["/gym-images/fitness-hub-4-2.jpeg", "/gym-images/fit-beat-3.jpeg"],
  },
  {
    id: "fitness-hub-4",
    name: "FITNESS HUB 4.0",
    shortName: "Gym 3",
    area: "Haiderpara",
    landmark: "Haripal More, near Swamiji More",
    address: "Exactly at Haripal More, near Swamiji More, Haiderpara",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Fitness%20Hub%204.0%20Haripal%20More%20Swamiji%20More%20Haiderpara",
    timings: DEFAULT_TIMINGS,
    admission: "Nil till offer",
    contact: "9832589366",
    pricing: {
      monthly: 1500,
      quarterly: 4000,
      halfYearly: 6000,
      yearly: 10000,
      coupleYearly: 16000,
      groupYearly: 8000,
      ptMonthly: 3000,
    },
    note: "Group yearly package is per person, minimum 3 members.",
    images: [
      "/gym-images/fitness-hub-4-1.jpeg",
      "/gym-images/fitness-hub-4-2.jpeg",
      "/gym-images/fitness-hub-4-3.jpeg",
      "/gym-images/fitness-hub-4-4.jpeg",
      "/gym-images/fitness-hub-4-5.jpeg",
    ],
  },
  {
    id: "fitness-hub-2",
    name: "FITNESS HUB 2.0",
    shortName: "Gym 4",
    area: "Arabinda Pally, Ward 23",
    landmark: "Premendra Mitra Sarani",
    address:
      "12, Premendra Mitra Sarani, Ward 23, Arabinda Pally, Siliguri, West Bengal 734006",
    mapLink: "https://g.co/kgs/ZuFXy7",
    timings: [
      "06:00 AM - 11:30 AM",
      "04:00 PM - 10:00 PM",
      "Monday to Saturday",
      "Sunday closed",
    ],
    admission: "Nil till offer",
    contact: "9832589366",
    pricing: {
      monthly: 1000,
      quarterly: 2400,
      halfYearly: 4200,
      yearly: 7200,
      coupleYearly: 12000,
      ptMonthly: 2000,
    },
    images: [
      "/gym-images/fitness-hub-2-1.jpeg",
      "/gym-images/fitness-hub-2-2.jpeg",
      "/gym-images/fitness-hub-2-3.jpeg",
      "/gym-images/fitness-hub-2-4.jpeg",
      "/gym-images/fitness-hub-2-5.jpeg",
    ],
  },
];
