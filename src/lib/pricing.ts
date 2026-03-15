export interface MinutePack {
  id: string;
  name: string;
  minutes: number;
  priceCents: number;
  priceDisplay: string;
  popular?: boolean;
}

export const MINUTE_PACKS: MinutePack[] = [
  {
    id: "starter",
    name: "Starter",
    minutes: 30,
    priceCents: 499,
    priceDisplay: "$4.99",
  },
  {
    id: "popular",
    name: "Popular",
    minutes: 60,
    priceCents: 799,
    priceDisplay: "$7.99",
    popular: true,
  },
  {
    id: "family",
    name: "Family",
    minutes: 120,
    priceCents: 1299,
    priceDisplay: "$12.99",
  },
];

export function getPackById(id: string) {
  return MINUTE_PACKS.find((p) => p.id === id);
}
