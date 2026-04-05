export interface Plan {
  id: string;
  name: string;
  priceCents: number;
  priceDisplay: string;
  hours: number;
  extraHourCents: number;
  extraHourDisplay: string;
  bookExample: string;
  lavaOfferId: string;
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "bookshelf",
    name: "Bookshelf",
    priceCents: 2990,
    priceDisplay: "$29.90",
    hours: 3,
    extraHourCents: 599,
    extraHourDisplay: "$5.99",
    bookExample: "Alice's Adventures in Wonderland\nor Winnie-the-Pooh",
    lavaOfferId: "9d50d924-e287-4c92-9168-ce2346964ede",
  },
  {
    id: "reading-room",
    name: "Reading Room",
    priceCents: 5990,
    priceDisplay: "$59.90",
    hours: 8,
    extraHourCents: 499,
    extraHourDisplay: "$4.99",
    bookExample: "Journey to the Centre of the Earth\nby Jules Verne",
    lavaOfferId: "5c736c61-90d5-4370-b759-c15619f6f323",
    popular: true,
  },
  {
    id: "home-library",
    name: "Home Library",
    priceCents: 9990,
    priceDisplay: "$99.90",
    hours: 15,
    extraHourCents: 399,
    extraHourDisplay: "$3.99",
    bookExample: "Little Women\nby Louisa May Alcott",
    lavaOfferId: "1fb8f060-dc5b-4ffa-8436-8d000cf95395",
  },
];

export function getPlanById(id: string) {
  return PLANS.find((p) => p.id === id);
}

// Keep backward compatibility for checkout API
export interface MinutePack {
  id: string;
  name: string;
  minutes: number;
  priceCents: number;
  priceDisplay: string;
  popular?: boolean;
}

export const MINUTE_PACKS: MinutePack[] = PLANS.map((p) => ({
  id: p.id,
  name: p.name,
  minutes: p.hours * 60,
  priceCents: p.priceCents,
  priceDisplay: p.priceDisplay,
  popular: p.popular,
}));

export function getPackById(id: string) {
  return MINUTE_PACKS.find((p) => p.id === id);
}
