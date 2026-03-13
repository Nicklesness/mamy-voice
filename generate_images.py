"""Generate illustrations for Mamy Voice using Gemini/Imagen API."""
from google import genai
from google.genai import types
import pathlib
import base64

client = genai.Client(api_key="AIzaSyDDUdIInqE5QDIqCKe-h2kVrj-h3R5K51I")

ONBOARDING_DIR = pathlib.Path("public/images/onboarding")
BOOKS_DIR = pathlib.Path("public/images/books")
ONBOARDING_DIR.mkdir(parents=True, exist_ok=True)
BOOKS_DIR.mkdir(parents=True, exist_ok=True)

# Style matching the reference: warm watercolor illustration, mother & child, cozy nursery
STYLE = (
    "Warm watercolor-style illustration with soft peach, cream, and blush tones. "
    "Gentle hand-drawn feel, like a children's book illustration. "
    "Cozy nursery atmosphere with warm golden lighting, soft textures. "
    "Characters have a sweet, gentle anime-influenced style with soft features. "
    "Color palette: peach, warm cream, blush pink, soft brown, muted gold, lavender. "
    "No text, no UI elements, no watermarks, no logos, no words. "
    "High quality, detailed but soft illustration."
)

ONBOARDING_SLIDES = [
    {
        "name": "slide1_voice",
        "prompt": (
            f"A young mother with brown wavy hair sitting in a wooden rocking chair, "
            f"holding and cuddling her sleeping toddler. She is reading a storybook to the child. "
            f"Cozy nursery room with soft curtains, warm sunset light through window, "
            f"plush toys on shelves, fairy lights. "
            f"Warm, loving, intimate moment. {STYLE}"
        ),
    },
    {
        "name": "slide2_magic",
        "prompt": (
            f"A magical open storybook lying on a soft blanket, with tiny fairy tale characters "
            f"like a bunny, a little bear, a bird gently floating out of the pages surrounded by "
            f"golden sparkles and soft stars. A cozy nursery background with warm lighting. "
            f"Dreamy and enchanting mood. {STYLE}"
        ),
    },
    {
        "name": "slide3_child",
        "prompt": (
            f"A happy toddler with curly hair sitting on a soft pillow "
            f"hugging a plush bunny toy, wearing cozy pajamas, eyes closed with a peaceful smile, "
            f"listening to something magical. Soft dreamy clouds and tiny stars floating above. "
            f"Warm nursery room with fairy lights and soft blankets. {STYLE}"
        ),
    },
]

BOOK_COVERS = [
    {
        "name": "kolobok",
        "prompt": (
            f"A cheerful round golden bun character with a cute smiling face, "
            f"rolling along a forest path. The path winds through a gentle forest with "
            f"birch trees and wildflowers. A friendly rabbit watches from behind a bush. "
            f"Bright, cheerful mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "repka",
        "prompt": (
            f"An enormous turnip growing in a garden, with a grandpa pulling it with all his might. "
            f"Behind him a chain of helpers: grandma, a girl, a dog, a cat, and a tiny mouse. "
            f"Everyone is pulling together, leaning back. Lush vegetable garden setting. "
            f"Fun, energetic mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "kurochka-ryaba",
        "prompt": (
            f"A cute little brown hen sitting proudly next to a shining golden egg on a nest of straw. "
            f"An old grandpa and grandma look at the egg with wonder and amazement. "
            f"Cozy farmhouse kitchen interior with wooden table and warm light. "
            f"Magical, warm mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "teremok",
        "prompt": (
            f"A charming tiny wooden house in a meadow with wildflowers. "
            f"Cute forest animals peeking from windows and the door: a mouse, a frog, a bunny, and a fox. "
            f"A big friendly bear standing outside looking at the small house. "
            f"Whimsical, fairytale mood. Children's book cover illustration. {STYLE}"
        ),
    },
    {
        "name": "tri-medvedya",
        "prompt": (
            f"Three bears of different sizes walking together "
            f"through a beautiful forest toward their cozy wooden cottage. "
            f"Papa bear is big, mama bear is medium, baby bear is tiny and playful. "
            f"Warm forest setting with sunlight filtering through trees. "
            f"Sweet, family mood. Children's book cover illustration. {STYLE}"
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
        ),
    )

    if response.generated_images:
        img = response.generated_images[0]
        output_path.write_bytes(img.image.image_bytes)
        print(f"  Saved: {output_path}")
    else:
        print(f"  No image generated for {output_path.stem}")


print("=== Generating onboarding slides ===\n")
for slide in ONBOARDING_SLIDES:
    print(f"Generating {slide['name']}...")
    try:
        generate_image(slide["prompt"], ONBOARDING_DIR / f"{slide['name']}.png")
    except Exception as e:
        print(f"  Error: {e}")

print("\n=== Generating book covers ===\n")
for book in BOOK_COVERS:
    print(f"Generating {book['name']}...")
    try:
        generate_image(book["prompt"], BOOKS_DIR / f"{book['name']}.png")
    except Exception as e:
        print(f"  Error: {e}")

print("\nDone!")
