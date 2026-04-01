import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { readFileSync } from "fs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const booksDir = "./data/books";

const colors = [
  "#C97B63", "#7B9EA8", "#A8856B", "#8B7DB8", "#6B8E6B",
  "#B88B6B", "#7BA8A8", "#A87B8B", "#8B9E6B", "#6B7BB8",
  "#B8A86B", "#7B8BA8", "#A86B7B", "#6BA87B", "#8B6BB8",
  "#B86B8B", "#7BB8A8", "#A8A86B", "#6B8BB8", "#8BA86B",
  "#B87BA8", "#7B6BA8", "#A86BA8", "#6BB87B", "#8BB86B",
  "#B8886B", "#7BA86B", "#A87BA8", "#6B7BA8", "#8B7BA8",
  "#B86BA8", "#7BB86B", "#A88B6B",
];

interface BookInfo {
  slug: string; title: string; author: string; desc: string; summary: string;
}

// Sorted by estimated duration (shortest first)
const newBooks: BookInfo[] = [
  { slug: "aladdin", title: "Aladdin", author: "Traditional", desc: "A poor boy discovers a magical lamp with a powerful genie inside.", summary: "A poor boy finds a magic lamp containing a powerful genie. With its help he wins a princess, but a sorcerer wants the lamp for himself." },
  { slug: "king-of-the-golden-river", title: "The King of the Golden River", author: "John Ruskin", desc: "Two cruel brothers and one kind brother seek a legendary golden river.", summary: "In a fertile valley, two cruel brothers and their kind younger brother Gluck each seek the legendary Golden River. Only one has a pure heart." },
  { slug: "happy-prince", title: "The Happy Prince and Other Tales", author: "Oscar Wilde", desc: "A golden statue and a swallow sacrifice everything to help the poor.", summary: "A golden statue of a prince, with the help of a little swallow, gives away his jewels and gold to help the poor people of the city." },
  { slug: "raggedy-ann-stories", title: "Raggedy Ann Stories", author: "Johnny Gruelle", desc: "A beloved rag doll comes to life for heartwarming adventures.", summary: "Raggedy Ann, a lovable rag doll, leads the nursery toys on adventures when no one is looking — from kite rides to encounters with new dolls." },
  { slug: "doctor-dolittle", title: "The Story of Doctor Dolittle", author: "Hugh Lofting", desc: "A doctor who can talk to animals goes on extraordinary adventures.", summary: "Doctor John Dolittle learns to speak animal languages and travels to Africa to save monkeys from a terrible sickness." },
  { slug: "just-so-stories", title: "Just So Stories", author: "Rudyard Kipling", desc: "Playful tales of how animals got their unique features.", summary: "Whimsical tales explaining how the elephant got his trunk, how the leopard got his spots, and other delightful animal origins." },
  { slug: "american-fairy-tales", title: "American Fairy Tales", author: "L. Frank Baum", desc: "Modern fairy tales set in America, full of wonder and wit.", summary: "Modern fairy tales set in American cities and suburbs, where magic hides in ordinary places — from enchanted phonographs to glass dogs that come to life." },
  { slug: "mother-goose-in-prose", title: "Mother Goose in Prose", author: "L. Frank Baum", desc: "Classic nursery rhymes retold as charming prose stories.", summary: "Familiar nursery rhymes — Humpty Dumpty, Jack and Jill, Little Bo-Peep — transformed into full prose stories with charm and wit." },
  { slug: "bambi", title: "Bambi: A Life in the Woods", author: "Felix Salten", desc: "A young deer grows up in the forest, learning about life and danger.", summary: "A young deer named Bambi grows up in the forest, making friends, facing danger from hunters, and learning the ways of nature from the wise old stag." },
  { slug: "princess-and-the-goblin", title: "The Princess and the Goblin", author: "George MacDonald", desc: "A princess and a miner's son battle goblins beneath the mountain.", summary: "Princess Irene discovers a secret stairway to her mysterious great-great-grandmother, while miner boy Curdie uncovers a goblin plot." },
  { slug: "treasure-seekers", title: "The Story of the Treasure Seekers", author: "E. Nesbit", desc: "Six resourceful children try creative schemes to restore the family fortune.", summary: "The six Bastable children, whose family has fallen on hard times, try every scheme imaginable to restore the family fortune." },
  { slug: "five-children-and-it", title: "Five Children and It", author: "E. Nesbit", desc: "Five siblings discover a sand fairy who grants one wish per day.", summary: "Five children dig up a Psammead — a grumpy sand fairy who grants one wish per day. But every wish goes hilariously wrong before sunset." },
  { slug: "pollyanna", title: "Pollyanna", author: "Eleanor H. Porter", desc: "An orphan girl's 'glad game' transforms a grumpy town.", summary: "After her father dies, optimistic Pollyanna moves in with her stern Aunt Polly. Her 'glad game' gradually transforms the whole town." },
  { slug: "princess-and-curdie", title: "The Princess and Curdie", author: "George MacDonald", desc: "A miner's son is sent on a quest to save a kingdom from evil.", summary: "Curdie the miner's son is given a magical gift by a mysterious grandmother and sent to save the king from a plot to poison him." },
  { slug: "wind-in-the-willows", title: "The Wind in the Willows", author: "Kenneth Grahame", desc: "Mole, Rat, Toad, and Badger share adventures along the riverbank.", summary: "Along a peaceful riverbank, Mole, Water Rat, wise Badger, and reckless Mr. Toad share adventures, friendship, and one very wild car ride." },
  { slug: "railway-children", title: "The Railway Children", author: "E. Nesbit", desc: "Three children move to the countryside and have adventures by the railway.", summary: "When their father is taken away, Roberta, Peter, and Phyllis move to the country. They befriend the railway porter and try to clear their father's name." },
  { slug: "black-beauty", title: "Black Beauty", author: "Anna Sewell", desc: "A horse tells his life story, from gentle pastures to hard city streets.", summary: "A handsome horse narrates his life — from happy days in the countryside to hard work pulling cabs in London — teaching kindness to all creatures." },
  { slug: "phoenix-and-the-carpet", title: "The Phoenix and the Carpet", author: "E. Nesbit", desc: "Children find a magic carpet and a Phoenix egg in their nursery.", summary: "When a Phoenix hatches from an egg found in a new nursery carpet, five children discover the carpet is magic and can fly them anywhere." },
  { slug: "around-the-world-in-eighty-days", title: "Around the World in Eighty Days", author: "Jules Verne", desc: "A gentleman bets he can circle the globe in just eighty days.", summary: "Phileas Fogg bets his fortune that he can travel around the world in 80 days. With his loyal valet Passepartout, he races across continents." },
  { slug: "a-little-princess", title: "A Little Princess", author: "Frances Hodgson Burnett", desc: "A wealthy girl loses everything but never loses her imagination.", summary: "Sara Crewe lives like a princess at a London boarding school — until her father dies and she loses everything. But her kindness keeps her spirit alive." },
  { slug: "prince-and-the-pauper", title: "The Prince and the Pauper", author: "Mark Twain", desc: "A prince and a poor boy who look identical swap lives.", summary: "Young Prince Edward and pauper Tom Canty, who look exactly alike, switch places. Each discovers the other's world is nothing like expected." },
  { slug: "story-of-the-amulet", title: "The Story of the Amulet", author: "E. Nesbit", desc: "Children travel through time using a magical ancient amulet.", summary: "The children from Five Children and It find half an ancient amulet that can open doorways through time — to Babylon, Egypt, and Atlantis." },
  { slug: "rebecca-of-sunnybrook-farm", title: "Rebecca of Sunnybrook Farm", author: "Kate Douglas Wiggin", desc: "A lively girl brings sunshine to her stern aunts' household.", summary: "Spirited Rebecca goes to live with her strict aunts in a small town. Her energy and imagination win over even the sternest hearts." },
  { slug: "wouldbegoods", title: "The Wouldbegoods", author: "E. Nesbit", desc: "Mischievous children try to be good — with hilariously mixed results.", summary: "The Bastable children, sent to the country to behave, form a society to do good deeds — but their well-meaning plans always go amusingly wrong." },
  { slug: "secret-garden", title: "The Secret Garden", author: "Frances Hodgson Burnett", desc: "A lonely girl discovers a hidden garden that changes everything.", summary: "Spoiled Mary Lennox, orphaned in India, discovers a locked garden at her uncle's estate. Tending it transforms her — and heals those around her." },
  { slug: "journey-to-the-center-of-the-earth", title: "Journey to the Center of the Earth", author: "Jules Verne", desc: "A professor and his nephew descend into a volcano to reach Earth's core.", summary: "Professor Lidenbrock discovers a coded message leading to the center of the Earth. With his nephew Axel, they descend into an Icelandic volcano." },
  { slug: "at-the-back-of-the-north-wind", title: "At the Back of the North Wind", author: "George MacDonald", desc: "A boy befriends the North Wind and travels to magical lands.", summary: "Little Diamond befriends the North Wind, a beautiful and mysterious woman who carries him on incredible journeys through the night sky." },
  { slug: "heidi", title: "Heidi", author: "Johanna Spyri", desc: "A spirited girl finds joy in the Swiss Alps with her grandfather.", summary: "Orphaned Heidi is sent to live with her grumpy grandfather in the Swiss Alps. She brings joy to everyone she meets." },
  { slug: "anne-of-green-gables", title: "Anne of Green Gables", author: "Lucy Maud Montgomery", desc: "An imaginative orphan girl transforms life on a quiet farm.", summary: "Anne Shirley, a red-haired orphan with a wild imagination, is sent to Green Gables by mistake. She wins hearts and finds a true home." },
  { slug: "twenty-thousand-leagues", title: "Twenty Thousand Leagues Under the Seas", author: "Jules Verne", desc: "Captain Nemo takes prisoners on an epic submarine voyage.", summary: "Captured by mysterious Captain Nemo aboard the submarine Nautilus, Professor Aronnax voyages through the world's oceans." },
  { slug: "swiss-family-robinson", title: "The Swiss Family Robinson", author: "Johann David Wyss", desc: "A shipwrecked family builds an incredible life on a tropical island.", summary: "After a shipwreck, a family of six builds an extraordinary home on a tropical island, taming animals and exploring their paradise." },
  { slug: "blue-fairy-book", title: "The Blue Fairy Book", author: "Andrew Lang", desc: "A treasury of classic fairy tales from around the world.", summary: "A magnificent collection of fairy tales: Cinderella, Sleeping Beauty, Hansel and Gretel, Aladdin, and dozens more from world folklore." },
  { slug: "little-women", title: "Little Women", author: "Louisa May Alcott", desc: "Four sisters grow up during the Civil War, sharing love and dreams.", summary: "Meg, Jo, Beth, and Amy March grow up during the Civil War, navigating love, loss, ambition, and the bonds of sisterhood." },
];

async function main() {
  let sortOrder = 23;
  let count = 0;

  for (const book of newBooks) {
    let text: string;
    try {
      text = readFileSync(`${booksDir}/${book.slug}.txt`, "utf-8").trim();
    } catch {
      console.log(`  SKIP (no file): ${book.slug}`);
      continue;
    }

    const wordCount = text.split(/\s+/).length;
    const minutes = Math.round(wordCount / 150 * 10) / 10;

    await prisma.book.upsert({
      where: { id: book.slug },
      update: { text, estimatedMinutes: minutes, sortOrder },
      create: {
        id: book.slug,
        title: book.title,
        author: book.author,
        description: book.desc,
        summary: book.summary,
        text,
        coverColor: colors[count % colors.length],
        pageCount: Math.round(wordCount / 250),
        ageRange: "6-12",
        estimatedMinutes: minutes,
        category: "classic",
        sortOrder,
      },
    });

    console.log(`  + ${book.title} (~${minutes} min)`);
    sortOrder++;
    count++;
  }

  console.log(`\nSeeded ${count} books`);
}

main().finally(() => prisma.$disconnect());
