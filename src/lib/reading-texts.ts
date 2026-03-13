export interface ReadingPassage {
  id: number;
  label: string;
  text: string;
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 1,
    label: "Read Aloud",
    text: "In a small cottage at the edge of the forest, there lived a kind old woman. Every evening she would light a candle by the window and settle into her favorite rocking chair. Outside, the pine trees swayed gently, and the wind tapped softly on the glass. She would take out her big book of stories and open it to the page where she had stopped the night before.\n\nWho lives in this little house? Who lives in this tiny house? asked the rabbit, knocking on the door. It's me, the little mouse! And who are you? I'm the rabbit! May I come in and live with you? Oh, please do come in! the mouse said happily. And so they lived together — cheerful and kind.",
  },
];

export const TOTAL_PASSAGES = READING_PASSAGES.length;
export const MIN_FRAGMENT_DURATION = 15; // seconds
