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

// export const MUDRAS: Mudra[] = [
//   {
//     id: "pataka",
//     name: "Pataka",
//     category: "Asamyuta",
//     symbolism: ["Clouds", "Forest", "River"],
//     description:
//       "The 'Flag' gesture. It is the beginning of all Mudras in Bharatanatyam. Used to denote an elephant, a forest, or the act of opening a door.",
//     meaning:
//       "Pataka means 'flag'. This is the foundational hand gesture in classical Indian dance. The four fingers are extended and held together, with the thumb bent across the palm.",
//     fingerPosition:
//       "Four fingers extended and joined together. Thumb bent and placed across the palm.",
//     usage: [
//       "Denoting a forest",
//       "Representing clouds",
//       "Showing a river",
//       "Greeting the deity",
//       "Indicating royalty",
//     ],
//     region: "Tamil Nadu",
//     form: "Bharatanatyam",
//     icon: "🏳️",
//     gradientFrom: "#92400e",
//     gradientTo: "#1c1917",
//   },
//   {
//     id: "tripataka",
//     name: "Tripataka",
//     category: "Asamyuta",
//     symbolism: ["Crown", "Tree", "Thunder"],
//     description:
//       "The 'Three-parts of a flag'. Used to represent a crown, a tree, a thunderbolt, or the application of tilaka on the forehead.",
//     meaning:
//       "Tripataka, derived from 'Tri' (three) and 'Pataka' (flag), represents three portions of a flag. The ring finger is bent while other fingers remain extended.",
//     fingerPosition:
//       "Index, middle, and little fingers extended. Ring finger bent to touch the thumb.",
//     usage: [
//       "Representing a crown",
//       "Depicting a tree",
//       "Showing a thunderbolt",
//       "Applying tilaka",
//       "Holding a torch",
//     ],
//     region: "Tamil Nadu",
//     form: "Bharatanatyam / Kuchipudi",
//     icon: "🌩️",
//     gradientFrom: "#44403c",
//     gradientTo: "#78350f",
//   },
//   {
//     id: "mayura",
//     name: "Mayura",
//     category: "Asamyuta",
//     symbolism: ["Peacock", "Bird", "Creepers"],
//     description:
//       "The 'Peacock' gesture. Often used to depict the majestic bird, applying kumkum, or stroking the hair in various dance forms.",
//     meaning:
//       "Mayura (peacock) represents the national bird of India. The thumb and index finger touch while the little finger is raised, mimicking a peacock's beak.",
//     fingerPosition:
//       "Thumb and index finger touching at tips. Middle and ring fingers bent. Little finger raised elegantly.",
//     usage: [
//       "Depicting a peacock",
//       "Applying kumkum",
//       "Stroking the hair",
//       "Showing a lotus creeper",
//       "Representing feathers",
//     ],
//     region: "Kerala",
//     form: "Kathakali / Bharatanatyam",
//     icon: "🦚",
//     gradientFrom: "#064e3b",
//     gradientTo: "#292524",
//   },
//   {
//     id: "ardhachandra",
//     name: "Ardhachandra",
//     category: "Asamyuta",
//     symbolism: ["Half Moon", "Waist", "Beginning"],
//     description:
//       "The 'Half Moon' gesture. Represents the crescent moon, the waist, and is used in the beginning of many compositions.",
//     meaning:
//       "Ardhachandra (half moon) is formed by spreading all fingers wide and bending the thumb. It evokes the crescent moon's gentle curve.",
//     fingerPosition:
//       "All five fingers spread wide and extended. Thumb bent inward at the base joint.",
//     usage: [
//       "Depicting the crescent moon",
//       "Representing the waist",
//       "Showing a plate",
//       "Describing concentration",
//     ],
//     region: "Andhra Pradesh",
//     form: "Kuchipudi / Bharatanatyam",
//     icon: "🌙",
//     gradientFrom: "#312e81",
//     gradientTo: "#1c1917",
//   },
//   {
//     id: "alapadmam",
//     name: "Alapadmam",
//     category: "Asamyuta",
//     symbolism: ["Lotus", "Beauty", "Fullness"],
//     description:
//       "The 'Blooming Lotus' gesture. Represents beauty, fullness, and the blossoming of a flower. One of the most expressive gestures.",
//     meaning:
//       "Alapadmam (blooming lotus) depicts the fully open lotus flower. All five fingers are spread apart and curved gently, creating the shape of a blossoming flower.",
//     fingerPosition:
//       "All five fingers spread apart and curved gently outward, resembling the petals of a blooming lotus.",
//     usage: [
//       "Depicting a blooming lotus",
//       "Showing a beautiful face",
//       "Representing fullness",
//       "Describing the sun",
//       "Showing abundance",
//     ],
//     region: "Tamil Nadu",
//     form: "Bharatanatyam",
//     icon: "🪷",
//     gradientFrom: "#831843",
//     gradientTo: "#4c0519",
//   },
//   {
//     id: "chandrakala",
//     name: "Chandrakala",
//     category: "Asamyuta",
//     symbolism: ["Moon", "Night", "Shiva"],
//     description:
//       "The 'Moon Digit' gesture. Represents a digit of the moon worn by Lord Shiva, associated with the night sky and lunar energy.",
//     meaning:
//       "Chandrakala (a digit of the moon) is a delicate gesture associated with lunar deities. The little finger is raised while other fingers curl gently.",
//     fingerPosition:
//       "Little finger raised and extended. Other fingers gently curved inward. Thumb lightly touching the ring finger.",
//     usage: [
//       "Representing the moon",
//       "Depicting Lord Shiva",
//       "Showing night",
//       "Describing calmness",
//     ],
//     region: "Tamil Nadu",
//     form: "Bharatanatyam",
//     icon: "🌛",
//     gradientFrom: "#172554",
//     gradientTo: "#312e81",
//   },
//   {
//     id: "kartharimukam",
//     name: "Kartharimukam",
//     category: "Asamyuta",
//     symbolism: ["Scissors", "Separation", "Contrast"],
//     description:
//       "The 'Scissors Face' gesture. Represents separation, contrast, or the cutting action. Used to depict the act of cutting or two opposites.",
//     meaning:
//       "Kartharimukam (scissors/separated) depicts the concept of duality and separation. The index and middle fingers are spread apart like open scissors.",
//     fingerPosition:
//       "Index and middle fingers extended and spread apart. Ring and little fingers curled. Thumb bent across the palm.",
//     usage: [
//       "Depicting separation",
//       "Showing contrast",
//       "Representing two things",
//       "Cutting action",
//       "Showing eyes (sideways glance)",
//     ],
//     region: "Tamil Nadu",
//     form: "Bharatanatyam / Mohiniyattam",
//     icon: "✂️",
//     gradientFrom: "#450a0a",
//     gradientTo: "#1c1917",
//   },
//   {
//     id: "hamsaasya",
//     name: "Hamsaasya",
//     category: "Asamyuta",
//     symbolism: ["Swan's Beak", "Flower", "Pearl"],
//     description:
//       "The 'Swan's Beak' gesture. Delicately represents the swan's beak, picking flowers, or stringing pearls in a necklace.",
//     meaning:
//       "Hamsaasya (swan's face) mimics the graceful beak of a swan. The thumb and index finger touch at the tips while other fingers extend elegantly.",
//     fingerPosition:
//       "Thumb and index finger touching at tips forming a beak shape. Middle, ring, and little fingers extended together.",
//     usage: [
//       "Depicting a swan",
//       "Picking flowers",
//       "Stringing a garland",
//       "Representing a pearl",
//       "Showing a beak",
//     ],
//     region: "Tamil Nadu",
//     form: "Bharatanatyam",
//     icon: "🦢",
//     gradientFrom: "#334155",
//     gradientTo: "#18181b",
//   },
//   {
//     id: "kapitham",
//     name: "Kapitham",
//     category: "Asamyuta",
//     symbolism: ["Apple", "Worship", "Holding"],
//     description:
//       "The 'Elephant Apple' gesture. Used in the context of worship, holding a lamp, or offering fruits. Very common in devotional compositions.",
//     meaning:
//       "Kapitham (elephant apple) is used extensively in devotional contexts. The thumb and index finger curve together while the other fingers remain extended.",
//     fingerPosition:
//       "Index finger bent to touch the thumb. Other three fingers extended straight. Creates a partial circle with thumb and index.",
//     usage: [
//       "Holding a lamp (deepa)",
//       "Offering fruits",
//       "Worship gestures",
//       "Depicting Lakshmi",
//       "Representing a bell",
//     ],
//     region: "Tamil Nadu",
//     form: "Bharatanatyam / Odissi",
//     icon: "🍎",
//     gradientFrom: "#7c2d12",
//     gradientTo: "#450a0a",
//   },
//   {
//     id: "shikaram",
//     name: "Shikaram",
//     category: "Asamyuta",
//     symbolism: ["Peak", "Bow", "Husband"],
//     description:
//       "The 'Peak' gesture. Represents a mountain peak, a bow, or the husband in classical dance narratives.",
//     meaning:
//       "Shikaram (peak/summit) symbolizes height, strength, and excellence. The thumb is raised upright while other fingers curl into a fist.",
//     fingerPosition:
//       "Thumb raised straight upward. All four fingers curled into a fist below the thumb.",
//     usage: [
//       "Representing a mountain",
//       "Depicting a bow",
//       "Showing a husband",
//       "Strength and power",
//       "Indicating a tower",
//     ],
//     region: "Andhra Pradesh",
//     form: "Kuchipudi / Bharatanatyam",
//     icon: "⛰️",
//     gradientFrom: "#134e4a",
//     gradientTo: "#1c1917",
//   },
//   {
//     id: "soochi",
//     name: "Soochi",
//     category: "Asamyuta",
//     symbolism: ["Needle", "One", "Universe"],
//     description:
//       "The 'Needle' gesture. Represents oneness, the universe, or a needle. Often used to indicate 'this one' or singleness in a composition.",
//     meaning:
//       "Soochi (needle) is the gesture of singularity and focus. The index finger points upward while all other fingers and the thumb curl closed.",
//     fingerPosition:
//       "Index finger extended and pointing upward. All other fingers curled into the palm. Thumb tucked over the curled fingers.",
//     usage: [
//       "Indicating 'this one'",
//       "Representing the universe",
//       "Showing a needle",
//       "Concept of oneness",
//       "Pointing direction",
//     ],
//     region: "Tamil Nadu",
//     form: "Bharatanatyam",
//     icon: "☝️",
//     gradientFrom: "#2e1065",
//     gradientTo: "#1c1917",
//   },
//   {
//     id: "anjali",
//     name: "Anjali",
//     category: "Samyuta",
//     symbolism: ["Prayer", "Reverence", "Greeting"],
//     description:
//       "The 'Salutation' gesture using both hands. Both palms press together in the universal gesture of prayer, greeting, and deep reverence.",
//     meaning:
//       "Anjali (offering/salutation) is the most universally recognized Indian gesture. Both palms are pressed together at the chest or forehead in namaste.",
//     fingerPosition:
//       "Both palms pressed flat together, fingers pointing upward. Thumbs lightly crossed or parallel.",
//     usage: [
//       "Prayer and worship",
//       "Greeting (Namaste)",
//       "Deep reverence",
//       "Beginning of a performance",
//       "Saluting elders",
//     ],
//     region: "Pan-India",
//     form: "All Classical Forms",
//     icon: "🙏",
//     gradientFrom: "#78350f",
//     gradientTo: "#1a0f00",
//   },
//   {
//     id: "kapota",
//     name: "Kapota",
//     category: "Samyuta",
//     symbolism: ["Pigeon", "Respect", "Agreement"],
//     description:
//       "The 'Pigeon' gesture with both hands. Represents humility and respect, like a pigeon with folded wings, used to show agreement or submission.",
//     meaning:
//       "Kapota (pigeon) symbolizes humility and peaceful submission. Both hands come together with fingers interlaced, thumbs crossing.",
//     fingerPosition:
//       "Both hands joined with fingers interlaced pointing forward. Thumbs crossing each other on top.",
//     usage: [
//       "Showing humility",
//       "Expressing agreement",
//       "Respectful submission",
//       "Depicting a pigeon",
//       "Ceremonial salutation",
//     ],
//     region: "Karnataka",
//     form: "Bharatanatyam / Yakshagana",
//     icon: "🕊️",
//     gradientFrom: "#374151",
//     gradientTo: "#1c1917",
//   },
//   {
//     id: "karkata",
//     name: "Karkata",
//     category: "Samyuta",
//     symbolism: ["Crab", "Multitude", "Branch"],
//     description:
//       "The 'Crab' gesture with both hands interlocked. Represents a large crowd, branches of a tree, or the intertwining of vines.",
//     meaning:
//       "Karkata (crab) depicts things that are numerous or intertwined. Both hands come together with fingers interlocked and spread like crab claws.",
//     fingerPosition:
//       "Both hands interlocked with fingers spreading outward in alternating directions.",
//     usage: [
//       "Depicting a forest",
//       "Showing a multitude",
//       "Representing branches",
//       "Crab movement",
//       "Interlaced vines",
//     ],
//     region: "Tamil Nadu",
//     form: "Bharatanatyam",
//     icon: "🦀",
//     gradientFrom: "#7f1d1d",
//     gradientTo: "#431407",
//   },
// ];

export const MUDRAS: Mudra[] = [
  {
    id: "pataka",
    name: "Pataka",
    category: "Asamyuta",
    symbolism: ["Clouds", "Forest", "River", "Sky", "Authority"],
    description:
      "The foundational 'Flag' gesture and the starting point of all hand gestures in Bharatanatyam. Pataka is extremely versatile and is used in both abstract and narrative storytelling. It can represent natural elements like sky and water, social symbols like royalty, and spiritual meanings like blessings. Due to its clarity, it is also widely used in gesture recognition systems.\n\nPataka Mudra is one of the most essential and foundational hand gestures used in Indian classical dance forms such as Bharatanatyam, Kuchipudi, and Kathakali. The term 'Pataka' means 'flag' in Sanskrit, and the mudra visually resembles a flat, extended palm like a flag held upright. It is considered a core building block gesture, widely used as a base for learning and forming many other mudras, making it one of the first hand positions taught to beginners.\n\nTo perform Pataka Mudra, all fingers are stretched straight and held close together, while the thumb is gently bent inward to touch the base of the index finger. The palm should remain flat, firm, and well-aligned without appearing stiff. Precision is important—each finger must maintain uniform spacing and subtle tension to achieve the aesthetic clarity required in classical dance. This mudra may look simple, but mastering its control, alignment, and expressiveness is crucial for clean technique.\n\nPataka Mudra is highly versatile and carries multiple meanings depending on the context, movement, and facial expressions (abhinaya) used along with it. It can symbolize natural elements such as clouds, wind, forests, rivers, and the night, as well as abstract ideas like blessing, denial, stopping, or authority. Because of this adaptability, it acts almost like a 'universal gesture,' capable of conveying both literal and symbolic meanings within a performance.\n\nIn dance storytelling (Nritya), Pataka Mudra plays a significant role in depicting scenes, actions, and emotions. It is used in sequences to show opening or beginning actions, to represent expansive surroundings like skies or oceans, and to emphasize dramatic moments. Its simplicity allows dancers to combine it with body movements and expressions seamlessly, making it an indispensable tool for narrative expression and visual communication in classical dance traditions.",
    meaning: "Represents a flag, openness, and structured expression.",
    fingerPosition:
      "All fingers extended and joined, thumb bent inward across the palm.",
    usage: [
      "Forest and nature depiction",
      "Clouds and sky",
      "Blessings",
      "Royal authority",
      "Starting gesture",
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
    symbolism: ["Crown", "Tree", "Thunder", "Fire"],
    description:
      "Tripataka is derived from Pataka by bending the ring finger. It adds expressive variation and is used for depicting powerful and dynamic objects like lightning, crowns, and weapons.",
    meaning: "Three-part flag symbolizing transformation.",
    fingerPosition: "Ring finger bent, others extended.",
    usage: ["Crown", "Tree", "Thunderbolt", "Weapons"],
    region: "Tamil Nadu",
    form: "Bharatanatyam",
    icon: "🌩️",
    gradientFrom: "#44403c",
    gradientTo: "#78350f",
  },

  {
    id: "ardhapataka",
    name: "Ardhapataka",
    category: "Asamyuta",
    symbolism: ["Leaves", "Knife", "Edges"],
    description:
      "A variation of Tripataka used to represent partial objects and sharp elements.",
    meaning: "Half flag.",
    fingerPosition: "Little finger bent inward.",
    usage: ["Leaves", "Knife", "Riverbanks"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🍃",
    gradientFrom: "#14532d",
    gradientTo: "#052e16",
  },

  {
    id: "kartarimukha",
    name: "Kartarimukha",
    category: "Asamyuta",
    symbolism: ["Separation", "Duality", "Conflict"],
    description:
      "Represents division, separation, and contrast. Used in emotional storytelling.",
    meaning: "Scissor face.",
    fingerPosition: "Index and middle fingers split.",
    usage: ["Separation", "Lightning", "Conflict"],
    region: "India",
    form: "Bharatanatyam",
    icon: "✂️",
    gradientFrom: "#450a0a",
    gradientTo: "#1c1917",
  },

  {
    id: "mayura",
    name: "Mayura",
    category: "Asamyuta",
    symbolism: ["Peacock", "Beauty"],
    description: "Elegant mudra representing peacock and grace.",
    meaning: "Peacock.",
    fingerPosition: "Thumb and index touching, little finger raised.",
    usage: ["Peacock", "Tilak", "Adornment"],
    region: "Kerala",
    form: "Bharatanatyam",
    icon: "🦚",
    gradientFrom: "#064e3b",
    gradientTo: "#292524",
  },

  {
    id: "ardhachandra",
    name: "Ardhachandra",
    category: "Asamyuta",
    symbolism: ["Moon", "Calmness"],
    description: "Represents the crescent moon and calmness.",
    meaning: "Half moon.",
    fingerPosition: "All fingers extended, thumb bent.",
    usage: ["Moon", "Waist", "Plate"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🌙",
    gradientFrom: "#312e81",
    gradientTo: "#1c1917",
  },

  {
    id: "arala",
    name: "Arala",
    category: "Asamyuta",
    symbolism: ["Drinking", "Wind"],
    description: "Used to show drinking or flowing elements.",
    meaning: "Bent.",
    fingerPosition: "Index finger bent.",
    usage: ["Drinking", "Wind"],
    region: "India",
    form: "Bharatanatyam",
    icon: "💧",
    gradientFrom: "#1e3a8a",
    gradientTo: "#020617",
  },

  {
    id: "shukatunda",
    name: "Shukatunda",
    category: "Asamyuta",
    symbolism: ["Parrot", "Arrow"],
    description: "Represents sharp and pointed forms.",
    meaning: "Parrot beak.",
    fingerPosition: "Index bent sharply.",
    usage: ["Arrow", "Bird"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🐦",
    gradientFrom: "#065f46",
    gradientTo: "#022c22",
  },

  {
    id: "mushti",
    name: "Mushti",
    category: "Asamyuta",
    symbolism: ["Strength", "Anger"],
    description: "Closed fist representing power and aggression.",
    meaning: "Fist.",
    fingerPosition: "All fingers closed.",
    usage: ["Fighting", "Holding"],
    region: "India",
    form: "Bharatanatyam",
    icon: "✊",
    gradientFrom: "#1f2937",
    gradientTo: "#020617",
  },

  {
    id: "shikhara",
    name: "Shikhara",
    category: "Asamyuta",
    symbolism: ["Peak", "Bow"],
    description: "Thumb raised gesture representing strength.",
    meaning: "Peak.",
    fingerPosition: "Thumb up, others closed.",
    usage: ["Bow", "Husband"],
    region: "India",
    form: "Bharatanatyam",
    icon: "👍",
    gradientFrom: "#065f46",
    gradientTo: "#022c22",
  },

  {
    id: "kapitta",
    name: "Kapitta",
    category: "Asamyuta",
    symbolism: ["Lakshmi", "Offering"],
    description: "Used in devotional contexts.",
    meaning: "Elephant apple.",
    fingerPosition: "Index touches thumb.",
    usage: ["Lamp", "Goddess"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🍎",
    gradientFrom: "#7c2d12",
    gradientTo: "#450a0a",
  },

  {
    id: "katakamukha",
    name: "Katakamukha",
    category: "Asamyuta",
    symbolism: ["Garland", "Holding"],
    description: "Used to hold objects like garlands.",
    meaning: "Bracelet opening.",
    fingerPosition: "Three fingers joined.",
    usage: ["Garland", "Necklace"],
    region: "India",
    form: "Bharatanatyam",
    icon: "💍",
    gradientFrom: "#78350f",
    gradientTo: "#1c1917",
  },

  {
    id: "suchi",
    name: "Suchi",
    category: "Asamyuta",
    symbolism: ["One", "Pointing"],
    description: "Indicates singularity and direction.",
    meaning: "Needle.",
    fingerPosition: "Index finger extended.",
    usage: ["One", "Direction"],
    region: "India",
    form: "Bharatanatyam",
    icon: "☝️",
    gradientFrom: "#2e1065",
    gradientTo: "#1c1917",
  },

  {
    id: "chandrakala",
    name: "Chandrakala",
    category: "Asamyuta",
    symbolism: ["Moon", "Shiva"],
    description: "Represents lunar symbolism.",
    meaning: "Moon digit.",
    fingerPosition: "Little finger extended.",
    usage: ["Moon", "Shiva"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🌛",
    gradientFrom: "#172554",
    gradientTo: "#312e81",
  },

  {
    id: "padmakosha",
    name: "Padmakosha",
    category: "Asamyuta",
    symbolism: ["Lotus", "Fruit"],
    description: "Represents fullness and offering.",
    meaning: "Lotus bud.",
    fingerPosition: "Fingers curved inward.",
    usage: ["Fruit", "Offering"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🌸",
    gradientFrom: "#831843",
    gradientTo: "#4c0519",
  },

  {
    id: "sarpashirsha",
    name: "Sarpashirsha",
    category: "Asamyuta",
    symbolism: ["Snake", "Flow"],
    description: "Represents serpents and fluid motion.",
    meaning: "Snake head.",
    fingerPosition: "Fingers curved forward.",
    usage: ["Snake", "Water"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🐍",
    gradientFrom: "#14532d",
    gradientTo: "#052e16",
  },

  {
    id: "mrigashirsha",
    name: "Mrigashirsha",
    category: "Asamyuta",
    symbolism: ["Deer", "Grace"],
    description: "Represents gentleness and curiosity.",
    meaning: "Deer head.",
    fingerPosition: "Three fingers extended.",
    usage: ["Deer", "Calling"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🦌",
    gradientFrom: "#78350f",
    gradientTo: "#1c1917",
  },

  {
    id: "simhamukha",
    name: "Simhamukha",
    category: "Asamyuta",
    symbolism: ["Lion", "Power"],
    description: "Represents strength and healing.",
    meaning: "Lion face.",
    fingerPosition: "Fingers joined uniquely.",
    usage: ["Lion", "Medicine"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🦁",
    gradientFrom: "#92400e",
    gradientTo: "#1c1917",
  },

  {
    id: "kangula",
    name: "Kangula",
    category: "Asamyuta",
    symbolism: ["Bell", "Small objects"],
    description: "Used for delicate objects.",
    meaning: "Small object.",
    fingerPosition: "Ring finger bent.",
    usage: ["Bell", "Fruit"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🔔",
    gradientFrom: "#78350f",
    gradientTo: "#1c1917",
  },

  {
    id: "alapadma",
    name: "Alapadma",
    category: "Asamyuta",
    symbolism: ["Lotus", "Beauty"],
    description: "Fully bloomed lotus gesture representing elegance.",
    meaning: "Bloomed lotus.",
    fingerPosition: "Fingers spread outward.",
    usage: ["Beauty", "Flower"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🪷",
    gradientFrom: "#831843",
    gradientTo: "#4c0519",
  },

  {
    id: "chatura",
    name: "Chatura",
    category: "Asamyuta",
    symbolism: ["Intelligence", "Subtlety"],
    description: "Represents cleverness and delicate actions.",
    meaning: "Clever.",
    fingerPosition: "Fingers curved selectively.",
    usage: ["Soft actions", "Expression"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🤏",
    gradientFrom: "#1e293b",
    gradientTo: "#020617",
  },

  {
    id: "bhramara",
    name: "Bhramara",
    category: "Asamyuta",
    symbolism: ["Bee", "Love"],
    description: "Represents a bee and attraction.",
    meaning: "Bee.",
    fingerPosition: "Thumb and middle joined.",
    usage: ["Bee", "Love"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🐝",
    gradientFrom: "#f59e0b",
    gradientTo: "#78350f",
  },

  {
    id: "hamsasya",
    name: "Hamsasya",
    category: "Asamyuta",
    symbolism: ["Swan", "Elegance"],
    description: "Represents grace and beauty.",
    meaning: "Swan beak.",
    fingerPosition: "Thumb and index joined.",
    usage: ["Jewelry", "Delicacy"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🦢",
    gradientFrom: "#334155",
    gradientTo: "#18181b",
  },

  {
    id: "hamsapaksha",
    name: "Hamsapaksha",
    category: "Asamyuta",
    symbolism: ["Wing", "Movement"],
    description: "Represents wings and flowing motion.",
    meaning: "Swan wing.",
    fingerPosition: "Fingers extended and curved.",
    usage: ["Wings", "Wind"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🪽",
    gradientFrom: "#334155",
    gradientTo: "#020617",
  },

  {
    id: "sandamsha",
    name: "Sandamsha",
    category: "Asamyuta",
    symbolism: ["Grasping", "Holding"],
    description: "Represents grasping or holding.",
    meaning: "Pinching.",
    fingerPosition: "Fingers opening and closing.",
    usage: ["Holding", "Collecting"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🤌",
    gradientFrom: "#78350f",
    gradientTo: "#1c1917",
  },

  {
    id: "mukula",
    name: "Mukula",
    category: "Asamyuta",
    symbolism: ["Bud", "Food"],
    description: "Represents a flower bud or food.",
    meaning: "Bud.",
    fingerPosition: "All fingers joined.",
    usage: ["Eating", "Flower"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🌱",
    gradientFrom: "#166534",
    gradientTo: "#052e16",
  },

  {
    id: "tamrachuda",
    name: "Tamrachuda",
    category: "Asamyuta",
    symbolism: ["Rooster", "Alertness"],
    description: "Represents a rooster and alertness.",
    meaning: "Rooster crest.",
    fingerPosition: "Index raised with variation.",
    usage: ["Rooster"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🐓",
    gradientFrom: "#7c2d12",
    gradientTo: "#450a0a",
  },

  {
    id: "trishula",
    name: "Trishula",
    category: "Asamyuta",
    symbolism: ["Trident", "Shiva"],
    description: "Represents Lord Shiva’s trident.",
    meaning: "Trident.",
    fingerPosition: "Three fingers extended.",
    usage: ["Shiva", "Weapon"],
    region: "India",
    form: "Bharatanatyam",
    icon: "🔱",
    gradientFrom: "#1e293b",
    gradientTo: "#020617",
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
