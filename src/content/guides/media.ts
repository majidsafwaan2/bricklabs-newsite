import type { GuidePhoto } from "./types";

const suppliedCoverPhotos = {
  "gear-ratio-demonstrator": {
    src: "/guides/gear-ratio-demonstrator/gear-ratio-example.webp",
    alt: "Brick-compatible mechanism with a small driving gear meshed to a much larger gear.",
    caption: "Brick-built example of a large gear driven by a smaller gear. The guide below uses a different frame and may use different tooth counts.",
    width: 515,
    height: 388,
    fit: "contain",
    relationship: "same-mechanism-example",
    sourceType: "user-provided"
  },
  "compound-gear-train": {
    src: "/guides/compound-gear-train/compound-gear-train-example.webp",
    alt: "Brick-compatible compound gear train with several gears sharing parallel shafts.",
    caption: "Brick-built compound gear train showing multiple reduction stages. The guide below may use different tooth counts and spacing.",
    width: 516,
    height: 387,
    fit: "contain",
    relationship: "same-mechanism-example",
    sourceType: "user-provided"
  },
  "cardboard-arcade-button": {
    src: "/guides/cardboard-arcade-button/cardboard-arcade-button-example.webp",
    alt: "A handmade controller box with three large blue arcade buttons on its top panel.",
    caption: "Three-button controller demonstrating the same press-to-switch idea. The cardboard version in this guide uses a different enclosure and contact system.",
    width: 2400,
    height: 1800,
    fit: "cover",
    focalPoint: "50% 48%",
    relationship: "inspiration-example",
    sourceType: "user-provided"
  },
  "rubber-band-car": {
    src: "/guides/rubber-band-car/rubber-band-car-example.webp",
    alt: "A small pink craft-stick car with four blue wheels and a visible rubber-band drive.",
    caption: "Rubber-band-powered model car using the same stored-energy principle. The guide below uses a different frame and wheel layout.",
    width: 449,
    height: 480,
    fit: "contain",
    relationship: "same-mechanism-example",
    sourceType: "user-provided"
  },
  "pulley-elevator": {
    src: "/guides/pulley-elevator/pulley-elevator-example.webp",
    alt: "Brick-built pulley elevator with a suspended car, rope path, supporting wall, and free pull cord.",
    caption: "Brick-built pulley elevator showing the car, rope path, frame, and free input end. The classroom build in this guide may differ.",
    width: 696,
    height: 812,
    fit: "contain",
    relationship: "same-mechanism-example",
    sourceType: "user-provided"
  },
  "simple-motorized-fan": {
    src: "/guides/simple-motorized-fan/simple-motorized-fan-example.webp",
    alt: "Rendered brick-compatible standing fan with three blades, a motor, and a rigid support frame.",
    caption: "Rendered brick-compatible fan example illustrating motor-driven rotation and blade pitch. The guarded low-voltage fan in this guide uses a different frame.",
    width: 800,
    height: 800,
    fit: "contain",
    relationship: "inspiration-example",
    sourceType: "user-provided"
  },
  "scratch-arcade-game": {
    src: "/guides/scratch-arcade-game/scratch-arcade-game-example.webp",
    alt: "Scratch project screenshot with the Scratch cat and a blue arcade maze game.",
    caption: "Scratch arcade-game screenshot shown as interface inspiration. The collecting game in this guide uses different sprites and rules.",
    width: 738,
    height: 363,
    fit: "contain",
    relationship: "inspiration-example",
    sourceType: "user-provided"
  },
  "idler-gear-direction-reverser": {
    src: "/guides/idler-gear-direction-reverser/idler-gear-direction-example.webp",
    alt: "Brick-compatible multi-gear assembly with several meshed gears mounted in a rigid frame.",
    caption: "Brick-built multi-gear assembly showing intermediate gears routing rotation. The idler-only mechanism in this guide is simpler and differs in layout.",
    width: 638,
    height: 480,
    fit: "contain",
    relationship: "inspiration-example",
    sourceType: "user-provided"
  }
} satisfies Record<string, GuidePhoto>;

export const builderMomentPhoto = {
  src: "/images/chuck-norris-builder-meme.webp",
  alt: "Brick-building meme reading: Chuck Norris does not build LEGO; he roundhouses the bricks into sculptures.",
  caption: "Builder reaction meme supplied by the site owner.",
  width: 377,
  height: 530,
  fit: "contain",
  relationship: "inspiration-example",
  sourceType: "user-provided"
} satisfies GuidePhoto;

export function coverPhotoForGuide(slug: string): GuidePhoto | undefined {
  return suppliedCoverPhotos[slug as keyof typeof suppliedCoverPhotos];
}

export const suppliedCoverPhotoCount = Object.keys(suppliedCoverPhotos).length;
