import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { readFileSync } from "fs";
import { join } from "path";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface BookSeed {
  id: string;
  title: string;
  author: string;
  description: string;
  summary: string;
  text: string;
  coverColor: string;
  pageCount: number;
  ageRange: string;
  category: string;
  sortOrder: number;
}

function loadBookText(slug: string): string {
  const path = join(__dirname, "..", "data", "books", `${slug}.txt`);
  return readFileSync(path, "utf-8").trim();
}

const books: BookSeed[] = [
  {
    id: "goodnight-moon",
    title: "Goodnight Moon",
    author: "Margaret Wise Brown",
    description: "A little bunny says goodnight to everything in his room.",
    summary:
      "In a cozy green room, a little bunny whispers goodnight to all the familiar things — the moon, the stars, the mittens, and the quiet old lady whispering hush.",
    coverColor: "#2D5A3D",
    pageCount: 3,
    ageRange: "1-3",
    category: "classic",
    sortOrder: 21,
    text: `In the great green room there was a fireplace, and a red balloon, and a picture of a cow jumping over the moon. Goodnight room. Goodnight moon. Goodnight stars. Goodnight air. Goodnight noises everywhere. The end!`,
  },
  {
    id: "very-hungry-caterpillar",
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    description: "A tiny caterpillar eats his way through a week of food.",
    summary:
      "A tiny caterpillar hatches from an egg and eats through fruits, treats, and leaves all week long. By Sunday he's big and fat — and turns into a beautiful butterfly!",
    coverColor: "#E74C3C",
    pageCount: 3,
    ageRange: "1-3",
    category: "classic",
    sortOrder: 22,
    text: `One Sunday morning a tiny caterpillar hatched from an egg. He was very hungry. He ate through one apple, two pears, three plums, and so much more! He got a stomachache. Then he ate a nice green leaf and felt much better. He built a cocoon and became a beautiful butterfly! The end!`,
  },
  {
    id: "where-wild-things",
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    description:
      "A boy sails to an island of wild creatures and becomes their king.",
    summary:
      "Max puts on his wolf suit and makes mischief. He's sent to bed without supper — but his room grows into a jungle, and he sails to where the wild things are!",
    coverColor: "#F4A460",
    pageCount: 4,
    ageRange: "3-5",
    category: "classic",
    sortOrder: 23,
    text: `Max wore his wolf suit and made mischief. His mother called him wild thing and sent him to bed. But a forest grew in his room, and he sailed to where the wild things are! They roared and gnashed their teeth, but Max tamed them. He became king of all wild things! But he was lonely, so he sailed back home — where his supper was waiting, still hot. The end!`,
  },
  {
    id: "guess-how-much",
    title: "Guess How Much I Love You",
    author: "Sam McBratney",
    description:
      "A little hare and big hare try to measure their love.",
    summary:
      "Little Nutbrown Hare wants to show Big Nutbrown Hare how much he loves him. They stretch their arms, reach up high, and hop — but love is always hard to measure!",
    coverColor: "#DEB887",
    pageCount: 3,
    ageRange: "2-4",
    category: "classic",
    sortOrder: 24,
    text: `Little Nutbrown Hare said, guess how much I love you! He stretched his arms as wide as they could go. Big Nutbrown Hare stretched his even wider. I love you this much! They reached up high, hopped, and pointed to the moon. I love you to the moon, said Little Hare. And back, whispered Big Hare, kissing him goodnight. The end!`,
  },
  {
    id: "giving-tree",
    title: "The Giving Tree",
    author: "Shel Silverstein",
    description: "A tree gives everything to the boy she loves.",
    summary:
      "A tree loves a little boy. As he grows, she gives him her apples, branches, and trunk. In the end, she's just a stump — but still has enough to offer him a place to sit.",
    coverColor: "#7CB342",
    pageCount: 3,
    ageRange: "3-5",
    category: "classic",
    sortOrder: 25,
    text: `Once there was a tree who loved a little boy. He climbed her trunk and swung from her branches. As he grew, the tree gave him her apples to sell, her branches to build a house, and her trunk to make a boat. Now she was just a stump. The boy came back, old and tired. I have a stump to sit on, said the tree. And the boy sat down. And the tree was happy. The end!`,
  },
  {
    id: "kolobok",
    title: "The Round Bun",
    author: "Russian Folk Tale",
    description:
      "A cheerful little bun rolls through the forest, outsmarting everyone he meets.",
    summary:
      "A cheerful little bun escapes from grandma and grandpa, rolling through the forest. He outruns a rabbit, a wolf, and a bear — but a clever fox has other plans.",
    coverColor: "#FFD93D",
    pageCount: 4,
    ageRange: "2-4",
    category: "fairy-tale",
    sortOrder: 26,
    text: `Once upon a time, an old woman baked a round bun. She set it on the windowsill to cool. But the bun rolled away into the forest! He met a rabbit, a wolf, and a bear — and outsang them all. But the clever fox tricked him. The end!`,
  },
  {
    id: "repka",
    title: "The Giant Turnip",
    author: "Russian Folk Tale",
    description:
      "Everyone pulls together to harvest an enormous turnip.",
    summary:
      "Grandpa plants a turnip that grows enormous. He can't pull it out alone, so one by one the whole family and their pets join in. Together, they finally pull it free!",
    coverColor: "#A8E6CF",
    pageCount: 3,
    ageRange: "2-3",
    category: "fairy-tale",
    sortOrder: 27,
    text: `Grandpa planted a turnip that grew enormous. He pulled and pulled but couldn't get it out. Grandma, the granddaughter, the dog, the cat, and finally a tiny mouse all helped. Together they pulled it out! The end!`,
  },
  {
    id: "kurochka-ryaba",
    title: "The Golden Egg",
    author: "Russian Folk Tale",
    description: "A little hen lays a very special golden egg.",
    summary:
      "A little hen named Ryaba lays a golden egg. Grandpa and grandma try to crack it, but a tiny mouse does it by accident. Don't worry — Ryaba promises a new one.",
    coverColor: "#FFB347",
    pageCount: 2,
    ageRange: "2-3",
    category: "fairy-tale",
    sortOrder: 28,
    text: `An old man and woman had a hen named Ryaba. One day she laid a golden egg. They tried to crack it but couldn't. A mouse ran by and knocked it off the table. It broke! But Ryaba promised a new one. The end!`,
  },
  {
    id: "teremok",
    title: "The Little House",
    author: "Russian Folk Tale",
    description: "Forest animals find a tiny house and try to share it.",
    summary:
      "A tiny house in a meadow becomes home to more and more forest animals. Each one asks to move in — until a big bear tries to fit and the house tumbles down!",
    coverColor: "#B19CD9",
    pageCount: 4,
    ageRange: "2-4",
    category: "fairy-tale",
    sortOrder: 29,
    text: `A little house stood in a field. A mouse, a frog, a rabbit, a fox, and a wolf all moved in together. Then a big bear came and sat on the roof — and crushed the house! But they built a new one, even better. The end!`,
  },
  {
    id: "tri-medvedya",
    title: "The Three Bears",
    author: "Russian Folk Tale",
    description:
      "A curious girl explores a cottage belonging to three bears.",
    summary:
      "A curious girl wanders into a forest cottage belonging to three bears. She tries their chairs, porridge, and beds — but when the bears come home, she'd better run!",
    coverColor: "#87CEEB",
    pageCount: 5,
    ageRange: "3-5",
    category: "fairy-tale",
    sortOrder: 30,
    text: `A little girl got lost in the forest and found a cottage. Inside lived three bears. She tried their chairs, porridge, and beds. The littlest was always just right! When the bears came home, she woke up and ran away. The end!`,
  },
  // ─── Full-length books (text loaded from data/books/) ───
  {
    id: "alice-in-wonderland",
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    description: "A curious girl falls down a rabbit hole into a fantastical world.",
    summary: "Alice follows a White Rabbit down a hole and discovers a world where nothing makes sense — mad tea parties, a grinning cat, and a furious Queen of Hearts.",
    coverColor: "#5B8DB8",
    pageCount: 80,
    ageRange: "6-10",
    category: "classic",
    sortOrder: 1,
    text: loadBookText("alice-in-wonderland"),
  },
  {
    id: "through-the-looking-glass",
    title: "Through the Looking-Glass",
    author: "Lewis Carroll",
    description: "Alice steps through a mirror into a world of living chess pieces.",
    summary: "Alice climbs through a looking-glass and finds herself in a strange land organized like a giant chess game, meeting Tweedledee, Tweedledum, and the Red Queen.",
    coverColor: "#8B6DB8",
    pageCount: 90,
    ageRange: "6-10",
    category: "classic",
    sortOrder: 7,
    text: loadBookText("through-the-looking-glass"),
  },
  {
    id: "wonderful-wizard-of-oz",
    title: "The Wonderful Wizard of Oz",
    author: "L. Frank Baum",
    description: "A Kansas girl is swept by a tornado to a magical land.",
    summary: "Dorothy and her dog Toto are carried by a cyclone to Oz, where they join a Scarecrow, a Tin Woodman, and a Cowardly Lion on a journey to the Emerald City.",
    coverColor: "#2E8B57",
    pageCount: 120,
    ageRange: "6-10",
    category: "classic",
    sortOrder: 3,
    text: loadBookText("wonderful-wizard-of-oz"),
  },
  {
    id: "ozma-of-oz",
    title: "Ozma of Oz",
    author: "L. Frank Baum",
    description: "Dorothy returns to Oz and rescues the Royal Family of Ev.",
    summary: "Dorothy is shipwrecked near the Land of Ev, meets a mechanical man named Tik-Tok, and teams up with Ozma to rescue a queen and her children from the Nome King.",
    coverColor: "#DAA520",
    pageCount: 130,
    ageRange: "6-10",
    category: "classic",
    sortOrder: 10,
    text: loadBookText("ozma-of-oz"),
  },
  {
    id: "marvelous-land-of-oz",
    title: "The Marvelous Land of Oz",
    author: "L. Frank Baum",
    description: "A boy named Tip escapes a witch and discovers his true identity.",
    summary: "Tip runs away from the witch Mombi with a pumpkin-headed man he brought to life, and journeys to the Emerald City where a surprising secret about his past awaits.",
    coverColor: "#3CB371",
    pageCount: 140,
    ageRange: "6-10",
    category: "classic",
    sortOrder: 11,
    text: loadBookText("marvelous-land-of-oz"),
  },
  {
    id: "peter-pan",
    title: "Peter Pan",
    author: "J. M. Barrie",
    description: "A boy who never grows up takes three children to Neverland.",
    summary: "Peter Pan flies Wendy, John, and Michael to Neverland — a land of pirates, fairies, and Lost Boys. Adventure awaits, but so does the villainous Captain Hook.",
    coverColor: "#4682B4",
    pageCount: 150,
    ageRange: "6-10",
    category: "classic",
    sortOrder: 2,
    text: loadBookText("peter-pan"),
  },
  {
    id: "jungle-book",
    title: "The Jungle Book",
    author: "Rudyard Kipling",
    description: "A boy raised by wolves learns the law of the jungle.",
    summary: "Mowgli is raised by wolves in the Indian jungle, taught by Baloo the bear and Bagheera the panther, and must face the tiger Shere Khan who wants him dead.",
    coverColor: "#556B2F",
    pageCount: 170,
    ageRange: "7-12",
    category: "classic",
    sortOrder: 5,
    text: loadBookText("jungle-book"),
  },
  {
    id: "second-jungle-book",
    title: "The Second Jungle Book",
    author: "Rudyard Kipling",
    description: "More tales of Mowgli and the creatures of the Indian jungle.",
    summary: "Mowgli continues his adventures in the jungle — leading a buffalo stampede, discovering an ancient treasure, and finally choosing between the world of animals and men.",
    coverColor: "#6B8E23",
    pageCount: 200,
    ageRange: "7-12",
    category: "classic",
    sortOrder: 12,
    text: loadBookText("second-jungle-book"),
  },
  {
    id: "treasure-island",
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    description: "A boy finds a pirate map and sets sail for buried treasure.",
    summary: "Young Jim Hawkins discovers a treasure map and joins a voyage to a distant island. But the ship's cook, Long John Silver, has his own plans for the gold.",
    coverColor: "#B8860B",
    pageCount: 180,
    ageRange: "8-12",
    category: "classic",
    sortOrder: 4,
    text: loadBookText("treasure-island"),
  },
  {
    id: "adventures-of-tom-sawyer",
    title: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    description: "A mischievous boy has adventures along the Mississippi River.",
    summary: "Tom Sawyer tricks his friends into painting a fence, falls in love, hunts for treasure, and witnesses a murder — all in one unforgettable summer on the Mississippi.",
    coverColor: "#CD853F",
    pageCount: 220,
    ageRange: "8-12",
    category: "classic",
    sortOrder: 8,
    text: loadBookText("adventures-of-tom-sawyer"),
  },
  {
    id: "grimms-fairy-tales",
    title: "Grimms' Fairy Tales",
    author: "Brothers Grimm",
    description: "A collection of beloved fairy tales: Cinderella, Rapunzel, Hansel and Gretel, and more.",
    summary: "The Brothers Grimm collected hundreds of fairy tales from German folklore — stories of clever children, wicked witches, enchanted forests, and happy endings.",
    coverColor: "#9370DB",
    pageCount: 300,
    ageRange: "5-10",
    category: "fairy-tale",
    sortOrder: 6,
    text: loadBookText("grimms-fairy-tales"),
  },
  {
    id: "adventures-of-huckleberry-finn",
    title: "Adventures of Huckleberry Finn",
    author: "Mark Twain",
    description: "A runaway boy and an escaped slave raft down the Mississippi.",
    summary: "Huck Finn fakes his own death and escapes down the Mississippi on a raft with Jim, a runaway slave. Together they face con men, feuding families, and moral dilemmas.",
    coverColor: "#8B7355",
    pageCount: 280,
    ageRange: "10-14",
    category: "classic",
    sortOrder: 9,
    text: loadBookText("adventures-of-huckleberry-finn"),
  },
];

function estimateMinutes(text: string): number {
  const wordCount = text.split(/\s+/).length;
  return Math.round((wordCount / 150) * 10) / 10;
}

async function main() {
  console.log("Seeding books...");

  for (const book of books) {
    const minutes = estimateMinutes(book.text);
    const wordCount = book.text.split(/\s+/).length;
    await prisma.book.upsert({
      where: { id: book.id },
      update: {
        title: book.title,
        author: book.author,
        description: book.description,
        summary: book.summary,
        text: book.text,
        coverColor: book.coverColor,
        pageCount: book.pageCount,
        ageRange: book.ageRange,
        estimatedMinutes: minutes,
        category: book.category,
        sortOrder: book.sortOrder,
      },
      create: {
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        summary: book.summary,
        text: book.text,
        coverColor: book.coverColor,
        pageCount: book.pageCount,
        ageRange: book.ageRange,
        estimatedMinutes: minutes,
        category: book.category,
        sortOrder: book.sortOrder,
      },
    });
    console.log(`  + ${book.title} (${wordCount} words, ~${minutes} min)`);
  }

  console.log(`\nSeeded ${books.length} books.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
