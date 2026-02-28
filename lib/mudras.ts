export type MudraCategory = "Asamyuta" | "Samyuta" | "Nritta";

export interface Mudra {
  id: string;
  name: string;
  category: MudraCategory;
  symbolism: string[];
  description: string;
  meaning: string;
  fingerPosition: string;
  usage: string[];
  region: string;
  form: string;
  icon: string; // emoji used as fallback icon
  gradientFrom: string; // CSS color for gradient start
  gradientTo: string; // CSS color for gradient end
}

export const MUDRAS: Mudra[] = [
  {
    id: "pataka",
    name: "Pataka",
    category: "Asamyuta",
    symbolism: ["Clouds", "Forest", "River"],
    description:
      "The 'Flag' gesture. It is the beginning of all Mudras in Bharatanatyam. Used to denote an elephant, a forest, or the act of opening a door.",
    meaning:
      "Pataka means 'flag'. This is the foundational hand gesture in classical Indian dance. The four fingers are extended and held together, with the thumb bent across the palm.",
    fingerPosition:
      "Four fingers extended and joined together. Thumb bent and placed across the palm.",
    usage: [
      "Denoting a forest",
      "Representing clouds",
      "Showing a river",
      "Greeting the deity",
      "Indicating royalty",
    ],
    region: "Tamil Nadu",
    form: "Bharatanatyam",
    icon: "🏳️",
    gradientFrom: "#92400e",
    gradientTo: "#1c1917",
  },
  {
    id: "tripataka",
    name: "Tripataka",
    category: "Asamyuta",
    symbolism: ["Crown", "Tree", "Thunder"],
    description:
      "The 'Three-parts of a flag'. Used to represent a crown, a tree, a thunderbolt, or the application of tilaka on the forehead.",
    meaning:
      "Tripataka, derived from 'Tri' (three) and 'Pataka' (flag), represents three portions of a flag. The ring finger is bent while other fingers remain extended.",
    fingerPosition:
      "Index, middle, and little fingers extended. Ring finger bent to touch the thumb.",
    usage: [
      "Representing a crown",
      "Depicting a tree",
      "Showing a thunderbolt",
      "Applying tilaka",
      "Holding a torch",
    ],
    region: "Tamil Nadu",
    form: "Bharatanatyam / Kuchipudi",
    icon: "🌩️",
    gradientFrom: "#44403c",
    gradientTo: "#78350f",
  },
  {
    id: "mayura",
    name: "Mayura",
    category: "Asamyuta",
    symbolism: ["Peacock", "Bird", "Creepers"],
    description:
      "The 'Peacock' gesture. Often used to depict the majestic bird, applying kumkum, or stroking the hair in various dance forms.",
    meaning:
      "Mayura (peacock) represents the national bird of India. The thumb and index finger touch while the little finger is raised, mimicking a peacock's beak.",
    fingerPosition:
      "Thumb and index finger touching at tips. Middle and ring fingers bent. Little finger raised elegantly.",
    usage: [
      "Depicting a peacock",
      "Applying kumkum",
      "Stroking the hair",
      "Showing a lotus creeper",
      "Representing feathers",
    ],
    region: "Kerala",
    form: "Kathakali / Bharatanatyam",
    icon: "🦚",
    gradientFrom: "#064e3b",
    gradientTo: "#292524",
  },
  {
    id: "ardhachandra",
    name: "Ardhachandra",
    category: "Asamyuta",
    symbolism: ["Half Moon", "Waist", "Beginning"],
    description:
      "The 'Half Moon' gesture. Represents the crescent moon, the waist, and is used in the beginning of many compositions.",
    meaning:
      "Ardhachandra (half moon) is formed by spreading all fingers wide and bending the thumb. It evokes the crescent moon's gentle curve.",
    fingerPosition:
      "All five fingers spread wide and extended. Thumb bent inward at the base joint.",
    usage: [
      "Depicting the crescent moon",
      "Representing the waist",
      "Showing a plate",
      "Describing concentration",
    ],
    region: "Andhra Pradesh",
    form: "Kuchipudi / Bharatanatyam",
    icon: "🌙",
    gradientFrom: "#312e81",
    gradientTo: "#1c1917",
  },
  {
    id: "alapadmam",
    name: "Alapadmam",
    category: "Asamyuta",
    symbolism: ["Lotus", "Beauty", "Fullness"],
    description:
      "The 'Blooming Lotus' gesture. Represents beauty, fullness, and the blossoming of a flower. One of the most expressive gestures.",
    meaning:
      "Alapadmam (blooming lotus) depicts the fully open lotus flower. All five fingers are spread apart and curved gently, creating the shape of a blossoming flower.",
    fingerPosition:
      "All five fingers spread apart and curved gently outward, resembling the petals of a blooming lotus.",
    usage: [
      "Depicting a blooming lotus",
      "Showing a beautiful face",
      "Representing fullness",
      "Describing the sun",
      "Showing abundance",
    ],
    region: "Tamil Nadu",
    form: "Bharatanatyam",
    icon: "🪷",
    gradientFrom: "#831843",
    gradientTo: "#4c0519",
  },
  {
    id: "chandrakala",
    name: "Chandrakala",
    category: "Asamyuta",
    symbolism: ["Moon", "Night", "Shiva"],
    description:
      "The 'Moon Digit' gesture. Represents a digit of the moon worn by Lord Shiva, associated with the night sky and lunar energy.",
    meaning:
      "Chandrakala (a digit of the moon) is a delicate gesture associated with lunar deities. The little finger is raised while other fingers curl gently.",
    fingerPosition:
      "Little finger raised and extended. Other fingers gently curved inward. Thumb lightly touching the ring finger.",
    usage: [
      "Representing the moon",
      "Depicting Lord Shiva",
      "Showing night",
      "Describing calmness",
    ],
    region: "Tamil Nadu",
    form: "Bharatanatyam",
    icon: "🌛",
    gradientFrom: "#172554",
    gradientTo: "#312e81",
  },
  {
    id: "kartharimukam",
    name: "Kartharimukam",
    category: "Asamyuta",
    symbolism: ["Scissors", "Separation", "Contrast"],
    description:
      "The 'Scissors Face' gesture. Represents separation, contrast, or the cutting action. Used to depict the act of cutting or two opposites.",
    meaning:
      "Kartharimukam (scissors/separated) depicts the concept of duality and separation. The index and middle fingers are spread apart like open scissors.",
    fingerPosition:
      "Index and middle fingers extended and spread apart. Ring and little fingers curled. Thumb bent across the palm.",
    usage: [
      "Depicting separation",
      "Showing contrast",
      "Representing two things",
      "Cutting action",
      "Showing eyes (sideways glance)",
    ],
    region: "Tamil Nadu",
    form: "Bharatanatyam / Mohiniyattam",
    icon: "✂️",
    gradientFrom: "#450a0a",
    gradientTo: "#1c1917",
  },
  {
    id: "hamsaasya",
    name: "Hamsaasya",
    category: "Asamyuta",
    symbolism: ["Swan's Beak", "Flower", "Pearl"],
    description:
      "The 'Swan's Beak' gesture. Delicately represents the swan's beak, picking flowers, or stringing pearls in a necklace.",
    meaning:
      "Hamsaasya (swan's face) mimics the graceful beak of a swan. The thumb and index finger touch at the tips while other fingers extend elegantly.",
    fingerPosition:
      "Thumb and index finger touching at tips forming a beak shape. Middle, ring, and little fingers extended together.",
    usage: [
      "Depicting a swan",
      "Picking flowers",
      "Stringing a garland",
      "Representing a pearl",
      "Showing a beak",
    ],
    region: "Tamil Nadu",
    form: "Bharatanatyam",
    icon: "🦢",
    gradientFrom: "#334155",
    gradientTo: "#18181b",
  },
  {
    id: "kapitham",
    name: "Kapitham",
    category: "Asamyuta",
    symbolism: ["Apple", "Worship", "Holding"],
    description:
      "The 'Elephant Apple' gesture. Used in the context of worship, holding a lamp, or offering fruits. Very common in devotional compositions.",
    meaning:
      "Kapitham (elephant apple) is used extensively in devotional contexts. The thumb and index finger curve together while the other fingers remain extended.",
    fingerPosition:
      "Index finger bent to touch the thumb. Other three fingers extended straight. Creates a partial circle with thumb and index.",
    usage: [
      "Holding a lamp (deepa)",
      "Offering fruits",
      "Worship gestures",
      "Depicting Lakshmi",
      "Representing a bell",
    ],
    region: "Tamil Nadu",
    form: "Bharatanatyam / Odissi",
    icon: "🍎",
    gradientFrom: "#7c2d12",
    gradientTo: "#450a0a",
  },
  {
    id: "shikaram",
    name: "Shikaram",
    category: "Asamyuta",
    symbolism: ["Peak", "Bow", "Husband"],
    description:
      "The 'Peak' gesture. Represents a mountain peak, a bow, or the husband in classical dance narratives.",
    meaning:
      "Shikaram (peak/summit) symbolizes height, strength, and excellence. The thumb is raised upright while other fingers curl into a fist.",
    fingerPosition:
      "Thumb raised straight upward. All four fingers curled into a fist below the thumb.",
    usage: [
      "Representing a mountain",
      "Depicting a bow",
      "Showing a husband",
      "Strength and power",
      "Indicating a tower",
    ],
    region: "Andhra Pradesh",
    form: "Kuchipudi / Bharatanatyam",
    icon: "⛰️",
    gradientFrom: "#134e4a",
    gradientTo: "#1c1917",
  },
  {
    id: "soochi",
    name: "Soochi",
    category: "Asamyuta",
    symbolism: ["Needle", "One", "Universe"],
    description:
      "The 'Needle' gesture. Represents oneness, the universe, or a needle. Often used to indicate 'this one' or singleness in a composition.",
    meaning:
      "Soochi (needle) is the gesture of singularity and focus. The index finger points upward while all other fingers and the thumb curl closed.",
    fingerPosition:
      "Index finger extended and pointing upward. All other fingers curled into the palm. Thumb tucked over the curled fingers.",
    usage: [
      "Indicating 'this one'",
      "Representing the universe",
      "Showing a needle",
      "Concept of oneness",
      "Pointing direction",
    ],
    region: "Tamil Nadu",
    form: "Bharatanatyam",
    icon: "☝️",
    gradientFrom: "#2e1065",
    gradientTo: "#1c1917",
  },
  {
    id: "anjali",
    name: "Anjali",
    category: "Samyuta",
    symbolism: ["Prayer", "Reverence", "Greeting"],
    description:
      "The 'Salutation' gesture using both hands. Both palms press together in the universal gesture of prayer, greeting, and deep reverence.",
    meaning:
      "Anjali (offering/salutation) is the most universally recognized Indian gesture. Both palms are pressed together at the chest or forehead in namaste.",
    fingerPosition:
      "Both palms pressed flat together, fingers pointing upward. Thumbs lightly crossed or parallel.",
    usage: [
      "Prayer and worship",
      "Greeting (Namaste)",
      "Deep reverence",
      "Beginning of a performance",
      "Saluting elders",
    ],
    region: "Pan-India",
    form: "All Classical Forms",
    icon: "🙏",
    gradientFrom: "#78350f",
    gradientTo: "#1a0f00",
  },
  {
    id: "kapota",
    name: "Kapota",
    category: "Samyuta",
    symbolism: ["Pigeon", "Respect", "Agreement"],
    description:
      "The 'Pigeon' gesture with both hands. Represents humility and respect, like a pigeon with folded wings, used to show agreement or submission.",
    meaning:
      "Kapota (pigeon) symbolizes humility and peaceful submission. Both hands come together with fingers interlaced, thumbs crossing.",
    fingerPosition:
      "Both hands joined with fingers interlaced pointing forward. Thumbs crossing each other on top.",
    usage: [
      "Showing humility",
      "Expressing agreement",
      "Respectful submission",
      "Depicting a pigeon",
      "Ceremonial salutation",
    ],
    region: "Karnataka",
    form: "Bharatanatyam / Yakshagana",
    icon: "🕊️",
    gradientFrom: "#374151",
    gradientTo: "#1c1917",
  },
  {
    id: "karkata",
    name: "Karkata",
    category: "Samyuta",
    symbolism: ["Crab", "Multitude", "Branch"],
    description:
      "The 'Crab' gesture with both hands interlocked. Represents a large crowd, branches of a tree, or the intertwining of vines.",
    meaning:
      "Karkata (crab) depicts things that are numerous or intertwined. Both hands come together with fingers interlocked and spread like crab claws.",
    fingerPosition:
      "Both hands interlocked with fingers spreading outward in alternating directions.",
    usage: [
      "Depicting a forest",
      "Showing a multitude",
      "Representing branches",
      "Crab movement",
      "Interlaced vines",
    ],
    region: "Tamil Nadu",
    form: "Bharatanatyam",
    icon: "🦀",
    gradientFrom: "#7f1d1d",
    gradientTo: "#431407",
  },
];

export function getMudraById(id: string): Mudra | undefined {
  return MUDRAS.find((m) => m.id === id);
}

export function getMudrasByCategory(category: MudraCategory): Mudra[] {
  return MUDRAS.filter((m) => m.category === category);
}

export function searchMudras(query: string): Mudra[] {
  const q = query.toLowerCase();
  return MUDRAS.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.symbolism.some((s) => s.toLowerCase().includes(q)) ||
      m.category.toLowerCase().includes(q),
  );
}
