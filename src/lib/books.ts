import type { Book } from "@/types";

const books: Book[] = [
  {
    id: "kolobok",
    title: "The Round Bun",
    author: "Russian Folk Tale",
    description: "A cheerful little bun rolls through the forest, outsmarting everyone he meets.",
    summary: "A cheerful little bun escapes from grandma and grandpa, rolling through the forest. He outruns a rabbit, a wolf, and a bear — but a clever fox has other plans.",
    coverColor: "#FFD93D",
    pageCount: 4,
    ageRange: "2-4",
    duration: 5,
    text: `Once upon a time, an old woman baked a round bun. She set it on the windowsill to cool. But the bun rolled away into the forest! He met a rabbit, a wolf, and a bear — and outsang them all. But the clever fox tricked him. The end!`,
  },
  {
    id: "repka",
    title: "The Giant Turnip",
    author: "Russian Folk Tale",
    description: "Everyone pulls together to harvest an enormous turnip.",
    summary: "Grandpa plants a turnip that grows enormous. He can't pull it out alone, so one by one the whole family and their pets join in. Together, they finally pull it free!",
    coverColor: "#A8E6CF",
    pageCount: 3,
    ageRange: "2-3",
    duration: 3,
    text: `Grandpa planted a turnip that grew enormous. He pulled and pulled but couldn't get it out. Grandma, the granddaughter, the dog, the cat, and finally a tiny mouse all helped. Together they pulled it out! The end!`,
  },
  {
    id: "kurochka-ryaba",
    title: "The Golden Egg",
    author: "Russian Folk Tale",
    description: "A little hen lays a very special golden egg.",
    summary: "A little hen named Ryaba lays a golden egg. Grandpa and grandma try to crack it, but a tiny mouse does it by accident. Don't worry — Ryaba promises a new one.",
    coverColor: "#FFB347",
    pageCount: 2,
    ageRange: "2-3",
    duration: 2,
    text: `An old man and woman had a hen named Ryaba. One day she laid a golden egg. They tried to crack it but couldn't. A mouse ran by and knocked it off the table. It broke! But Ryaba promised a new one. The end!`,
  },
  {
    id: "teremok",
    title: "The Little House",
    author: "Russian Folk Tale",
    description: "Forest animals find a tiny house and try to share it.",
    summary: "A tiny house in a meadow becomes home to more and more forest animals. Each one asks to move in — until a big bear tries to fit and the house tumbles down!",
    coverColor: "#B19CD9",
    pageCount: 4,
    ageRange: "2-4",
    duration: 4,
    text: `A little house stood in a field. A mouse, a frog, a rabbit, a fox, and a wolf all moved in together. Then a big bear came and sat on the roof — and crushed the house! But they built a new one, even better. The end!`,
  },
  {
    id: "tri-medvedya",
    title: "The Three Bears",
    author: "Russian Folk Tale",
    description: "A curious girl explores a cottage belonging to three bears.",
    summary: "A curious girl wanders into a forest cottage belonging to three bears. She tries their chairs, porridge, and beds — but when the bears come home, she'd better run!",
    coverColor: "#87CEEB",
    pageCount: 5,
    ageRange: "3-5",
    duration: 5,
    text: `A little girl got lost in the forest and found a cottage. Inside lived three bears. She tried their chairs, porridge, and beds. The littlest was always just right! When the bears came home, she woke up and ran away. The end!`,
  },
];

export function getBooks(): Book[] {
  return books;
}

export function getBookById(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}
