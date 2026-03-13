export interface ReadingPassage {
  id: number;
  label: string;
  text: string;
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 1,
    label: "Narration & Dialogue",
    text: "In a small cottage at the edge of the forest, there lived a kind old woman. Every evening she would light a candle by the window and settle into her favorite rocking chair. Outside, the pine trees swayed gently, and the wind tapped softly on the glass. She would take out her big book of stories and open it to the page where she had stopped the night before.\n\nWho lives in this little house? Who lives in this tiny house? asked the rabbit, knocking on the door. It's me, the little mouse! And who are you? I'm the rabbit! May I come in and live with you? Oh, please do come in! the mouse said happily. And so they lived together — cheerful and kind.",
  },
  {
    id: 2,
    label: "Warmth & Expression",
    text: "Now close your eyes, my darling. The story isn't over — it has simply drifted into a dream. There, in your dream, kind animals, an enchanted forest, and a warm golden light are waiting for you. Sleep peacefully. Mommy is here. Mommy is always here.\n\nSuddenly — bang! — the door flew open and the wind rushed in. Oh my! gasped the kitten and dove under the blanket. Tick-tock, tick-tock went the clock on the wall. Drip-drip-drip went the rain on the roof. And then everything grew still. And the sun peeked out. Hooray! cried the kitten. A rainbow!",
  },
];

export const TOTAL_PASSAGES = READING_PASSAGES.length;
export const MIN_FRAGMENT_DURATION = 15; // seconds
