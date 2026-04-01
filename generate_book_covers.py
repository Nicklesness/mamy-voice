"""Generate cover illustrations for new books using Gemini/Imagen API."""
from google import genai
from google.genai import types
import pathlib

client = genai.Client(api_key="AIzaSyCZct8WJB-0JiCZuQHooEhQnY1F5IoajUY")

BOOKS_DIR = pathlib.Path("public/images/books")
BOOKS_DIR.mkdir(parents=True, exist_ok=True)

STYLE = (
    "Warm watercolor-style illustration with soft peach, cream, and blush tones. "
    "Gentle hand-drawn feel, like a children's book illustration. "
    "Cozy atmosphere with warm golden lighting, soft textures. "
    "Characters have a sweet, gentle anime-influenced style with soft features. "
    "Color palette: peach, warm cream, blush pink, soft brown, muted gold, lavender. "
    "No text, no UI elements, no watermarks, no logos, no words. "
    "High quality, detailed but soft illustration. Portrait orientation 3:4 ratio."
)

BOOK_COVERS = [
    {
        "name": "alice-in-wonderland",
        "prompt": (
            f"A curious little girl with blonde hair in a blue dress falling down a magical rabbit hole, "
            f"surrounded by floating playing cards, a pocket watch, teacups, and a white rabbit. "
            f"Whimsical wonderland with mushrooms and roses. "
            f"Dreamy, magical mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "through-the-looking-glass",
        "prompt": (
            f"A little girl with blonde hair reaching through an ornate mirror that ripples like water. "
            f"On the other side, a chess board landscape with giant chess pieces. "
            f"A red queen chess piece and a grinning cat visible in the mirror world. "
            f"Magical, mysterious mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "wonderful-wizard-of-oz",
        "prompt": (
            f"A little girl in a blue dress with a small dog, walking on a golden yellow brick road "
            f"toward a glowing emerald green city in the distance. "
            f"A scarecrow, a tin man, and a lion walking beside her. "
            f"Fields of poppies and a rainbow sky. "
            f"Adventurous, hopeful mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "ozma-of-oz",
        "prompt": (
            f"A little girl standing on a beach with a mechanical copper man (robot) beside her. "
            f"A golden hen on her shoulder. In the background, a magical kingdom with colorful towers. "
            f"Ocean waves and sandy shore. "
            f"Adventurous, fantastical mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "marvelous-land-of-oz",
        "prompt": (
            f"A boy running through a magical landscape with a tall man who has a jack-o-lantern pumpkin head. "
            f"An emerald green city with sparkling towers in the background. "
            f"Magical butterflies and flowers surround them. "
            f"Fun, whimsical mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "peter-pan",
        "prompt": (
            f"A boy in green flying through a starry night sky over a moonlit island. "
            f"A tiny glowing fairy with golden dust beside him. "
            f"Below: a pirate ship on calm water, a lagoon, and a lush forest. "
            f"Three children flying behind him in their pajamas. "
            f"Magical, adventurous night mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "jungle-book",
        "prompt": (
            f"A small boy with dark hair sitting happily on the back of a large friendly black panther "
            f"in a lush tropical jungle. A big brown bear lounges nearby, smiling. "
            f"Exotic flowers, vines, and warm sunlight filtering through the canopy. "
            f"Warm, adventurous mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "second-jungle-book",
        "prompt": (
            f"A boy standing tall on a rock in the jungle, surrounded by a pack of wolves "
            f"looking up at him with respect. Moonlight illuminates the scene. "
            f"Dense jungle foliage, fireflies glowing. "
            f"Majestic, wild mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "treasure-island",
        "prompt": (
            f"A young boy holding a rolled treasure map, standing on the bow of a wooden sailing ship. "
            f"A tropical island with palm trees visible in the distance. "
            f"A friendly parrot perched on a barrel nearby. Blue ocean and dramatic sky. "
            f"Exciting, adventurous mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "adventures-of-tom-sawyer",
        "prompt": (
            f"A mischievous boy with a straw hat and bare feet sitting on a wooden fence by a river. "
            f"He holds a fishing rod. A white picket fence half-painted white beside him. "
            f"A small town with church steeple in the background, Mississippi River. "
            f"Sunny, carefree summer mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "grimms-fairy-tales",
        "prompt": (
            f"An open magical storybook with tiny fairy tale scenes floating out of it: "
            f"a glass slipper, a tower with long golden hair, a gingerbread house, a frog with a crown. "
            f"An enchanted forest setting with soft golden light and fireflies. "
            f"Magical, enchanting mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "adventures-of-huckleberry-finn",
        "prompt": (
            f"A boy in overalls and a straw hat lying on a wooden raft floating down a wide river. "
            f"Golden sunset reflecting on the calm water. "
            f"Lush green riverbanks with willow trees. A lantern glowing on the raft. "
            f"Peaceful, free-spirited mood. Children's book cover illustration. {STYLE}"
        ),
    },
]

MODEL = "imagen-4.0-generate-001"


def generate_image(prompt: str, output_path: pathlib.Path):
    """Generate an image using Imagen 4.0."""
    response = client.models.generate_images(
        model=MODEL,
        prompt=prompt,
        config=types.GenerateImagesConfig(
            number_of_images=1,
            aspect_ratio="3:4",
        ),
    )

    if response.generated_images:
        img = response.generated_images[0]
        output_path.write_bytes(img.image.image_bytes)
        print(f"  Saved: {output_path}")
    else:
        print(f"  No image generated for {output_path.stem}")


print("=== Generating book covers ===\n")
for book in BOOK_COVERS:
    output = BOOKS_DIR / f"{book['name']}.png"
    if output.exists():
        print(f"Skipping {book['name']} (already exists)")
        continue
    print(f"Generating {book['name']}...")
    try:
        generate_image(book["prompt"], output)
    except Exception as e:
        print(f"  Error: {e}")

print("\nDone!")
