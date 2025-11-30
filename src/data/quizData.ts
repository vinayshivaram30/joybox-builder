import { QuizQuestionData } from "@/components/QuizQuestion";
import { PersonalityResultData } from "@/components/PersonalityResult";

// -----------------------------
// ToyLuv Personality Engine
// -----------------------------

export const CATEGORY_KEYS = [
  "builder",
  "creative",
  "active",
  "imagination",
  "problem_solver",
  "social",
  "sensory",
  "high_energy",
  "explorer",
  "focused",
  "flexible",
  "seeker_of_novelty",
  "independent",
  "guided",
  "curious",
  "observer",
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export type PersonalityId =
  | "curious_builder"
  | "imaginative_storyteller"
  | "active_explorer"
  | "problem_solver"
  | "social_connector"
  | "sensory_seeker"
  | "tiny_engineer"
  | "creative_maker"
  | "quiet_thinker"
  | "curious_explorer";

export const quizQuestions: QuizQuestionData[] = [
  {
    id: "age",
    question: "How old is your child?",
    answers: [
      { id: "1-2", text: "1-2 years", icon: "👶", value: "toddler" },
      { id: "3-4", text: "3-4 years", icon: "🧒", value: "preschool" },
      { id: "5-6", text: "5-6 years", icon: "👧", value: "kindergarten" },
      { id: "7+", text: "7+ years", icon: "🧑", value: "school" },
    ],
  },
  {
    id: "play-type",
    question: "What kind of play does your child enjoy most?",
    answers: [
      { id: "building", text: "Building & Construction", icon: "🏗️", value: "builder" },
      { id: "creative", text: "Arts & Crafts", icon: "🎨", value: "creative" },
      { id: "active", text: "Active & Outdoor", icon: "⚽", value: "active" },
      { id: "pretend", text: "Pretend & Role Play", icon: "🎭", value: "imagination" },
      { id: "sensory", text: "Sensory & Tactile Play", icon: "✨", value: "sensory" },
      { id: "puzzles", text: "Puzzles & Quiet Games", icon: "🧩", value: "problem_solver" },
    ],
  },
  {
    id: "energy",
    question: "What's your child's energy level?",
    answers: [
      { id: "high", text: "Always on the move!", icon: "⚡", value: "high_energy" },
      { id: "explorer", text: "Curious and constantly exploring", icon: "🔍", value: "explorer" },
      { id: "sensory", text: "Loves sensory play, reacts to textures/sounds", icon: "✨", value: "sensory" },
      { id: "focused", text: "Calm & focused", icon: "🧘‍♂️", value: "focused" },
      { id: "flexible", text: "Mix of active & calm", icon: "🌟", value: "flexible" },
      { id: "novelty", text: "Depends on the day", icon: "🔄", value: "seeker_of_novelty" },
    ],
  },
  {
    id: "attention",
    question: "How long can they focus on one activity?",
    answers: [
      { id: "short", text: "5-10 minutes", icon: "⏱️", value: "short" },
      { id: "medium", text: "10-20 minutes", icon: "⏲️", value: "medium" },
      { id: "long", text: "20+ minutes", icon: "⏰", value: "long" },
      { id: "very-long", text: "Gets lost in play!", icon: "🌀", value: "very-long" },
    ],
  },
  {
    id: "learning",
    question: "What learning area interests them most?",
    answers: [
      { id: "stem", text: "Science & Math", icon: "🔬", value: "problem_solver" },
      { id: "language", text: "Reading & Stories", icon: "📚", value: "imagination" },
      { id: "motor", text: "Physical Skills", icon: "🤸‍♂️", value: "active" },
      { id: "social", text: "Social & Emotional", icon: "❤️", value: "social" },
      { id: "creative", text: "Creative & Art-based Learning", icon: "🎨", value: "creative" },
      { id: "sensory", text: "Sensory Exploration", icon: "✨", value: "sensory" },
    ],
  },
  {
    id: "social",
    question: "How does your child prefer to play?",
    answers: [
      { id: "solo", text: "Independent play", icon: "🎯", value: "independent" },
      { id: "parent", text: "With parents", icon: "👨‍👩‍👧", value: "guided" },
      { id: "peers", text: "With other kids", icon: "👫", value: "social" },
      { id: "sensory", text: "Sensory or hands-on play", icon: "✨", value: "sensory" },
      { id: "focused", text: "Structured / focused play", icon: "🧩", value: "focused" },
      { id: "flexible", text: "Any way works!", icon: "😊", value: "flexible" },
    ],
  },
];

// PERSONALITY DEFINITIONS
export const personalityTypes: Record<PersonalityId, PersonalityResultData> = {
  curious_builder: {
    title: "The Curious Builder",
    emoji: "🏗️",
    description: "Your child loves building, arranging, and seeing how things fit together.",
    toyCategories: [
      { name: "Building Blocks", icon: "🧱" },
      { name: "STEM Kits", icon: "🔬" },
      { name: "Puzzles", icon: "🧩" },
    ],
  },
  imaginative_storyteller: {
    title: "The Imaginative Storyteller",
    emoji: "📚",
    description: "Your child creates stories, characters, and pretend worlds.",
    toyCategories: [
      { name: "Story Books", icon: "📖" },
      { name: "Pretend Play", icon: "🎭" },
      { name: "Puppets", icon: "🧸" },
    ],
  },
  active_explorer: {
    title: "The Active Explorer",
    emoji: "⚽",
    description: "Your child learns through movement, action, and big body play.",
    toyCategories: [
      { name: "Sports Toys", icon: "🏀" },
      { name: "Outdoor Games", icon: "🪁" },
      { name: "Active Play", icon: "🤸" },
    ],
  },
  problem_solver: {
    title: "The Problem Solver",
    emoji: "🧩",
    description: "Your child enjoys puzzles, challenges, and figuring things out.",
    toyCategories: [
      { name: "Logic Puzzles", icon: "🧩" },
      { name: "STEM Toys", icon: "🔬" },
      { name: "Brain Teasers", icon: "🎯" },
    ],
  },
  social_connector: {
    title: "The Social Connector",
    emoji: "🌟",
    description: "Your child enjoys group play, sharing, and collaboration.",
    toyCategories: [
      { name: "Group Games", icon: "🎲" },
      { name: "Sharing Activities", icon: "🤝" },
      { name: "Communication Play", icon: "💬" },
    ],
  },
  sensory_seeker: {
    title: "The Sensory Seeker",
    emoji: "✨",
    description: "Your child loves textures, sounds, lights, and hands-on sensory play.",
    toyCategories: [
      { name: "Sensory Kits", icon: "🌈" },
      { name: "Textured Toys", icon: "🧸" },
      { name: "Light Toys", icon: "💡" },
    ],
  },
  tiny_engineer: {
    title: "The Tiny Engineer",
    emoji: "⚙️",
    description: "Your child is curious about mechanisms, gears, and how things work.",
    toyCategories: [
      { name: "Engineering Kits", icon: "🔧" },
      { name: "STEM Building", icon: "⚙️" },
      { name: "Mechanical Puzzles", icon: "🧩" },
    ],
  },
  creative_maker: {
    title: "The Creative Maker",
    emoji: "🎨",
    description: "Your child enjoys making, decorating, and building unique creations.",
    toyCategories: [
      { name: "Art Kits", icon: "🖌️" },
      { name: "Clay Sets", icon: "🪴" },
      { name: "Building Toys", icon: "🧱" },
    ],
  },
  quiet_thinker: {
    title: "The Quiet Thinker",
    emoji: "🤔",
    description: "Your child prefers calm, focused, and thoughtful play.",
    toyCategories: [
      { name: "Quiet Play Kits", icon: "🧘" },
      { name: "Montessori Materials", icon: "📚" },
      { name: "Simple Puzzles", icon: "🧩" },
    ],
  },
  curious_explorer: {
    title: "The Curious Explorer",
    emoji: "🔍",
    description: "Your child loves discovering, testing, and exploring new things.",
    toyCategories: [
      { name: "Exploration Kits", icon: "🔭" },
      { name: "Movement Toys", icon: "🚗" },
      { name: "Active Play Sets", icon: "⚽" },
    ],
  },
};

// PERSONALITY PRIORITY (tie-breaker)
export const PERSONALITY_PRIORITY: PersonalityId[] = [
  "curious_builder",
  "tiny_engineer",
  "problem_solver",
  "creative_maker",
  "imaginative_storyteller",
  "curious_explorer",
  "active_explorer",
  "sensory_seeker",
  "quiet_thinker",
  "social_connector",
];

// STEP 1 — Category scoring
function computeCategoryScores(hints: CategoryKey[]) {
  const scores: Record<string, number> = {};
  CATEGORY_KEYS.forEach((k) => (scores[k] = 0));
  hints.forEach((h) => (scores[h] += 1));
  return scores;
}

// STEP 2 — Compute personality scores
function computePersonalityScores(category: Record<string, number>) {
  const c = category;

  return {
    curious_builder: c.builder + 0.5 * c.problem_solver + 0.5 * c.independent,
    imaginative_storyteller:
      c.imagination + 0.5 * c.creative + 0.5 * c.social + 0.5 * c.guided,
    active_explorer: c.active + c.high_energy + 0.5 * c.explorer,
    problem_solver:
      c.problem_solver + c.focused + 0.5 * c.independent + 0.5 * c.observer,
    social_connector: c.social + 0.5 * c.guided + 0.5 * c.flexible,
    sensory_seeker: c.sensory + 0.5 * c.high_energy,
    tiny_engineer:
      c.builder + c.problem_solver + c.focused + 0.5 * c.observer,
    creative_maker:
      c.creative + c.imagination + 0.5 * c.sensory + 0.5 * c.flexible,
    quiet_thinker: c.focused + c.independent + 0.5 * c.imagination,
    curious_explorer:
      c.explorer + c.curious + c.seeker_of_novelty + 0.5 * c.active,
  };
}

// STEP 3 — Pick best personality
function pickBestPersonality(scores: Record<PersonalityId, number>): PersonalityId {
  let best: PersonalityId = "curious_builder";
  let max = -Infinity;

  for (const id of PERSONALITY_PRIORITY) {
    if (scores[id] > max) {
      max = scores[id];
      best = id;
    }
  }

  return best;
}

// MAIN CALCULATION FUNCTION
export function calculatePersonality(answers: Record<string, string>): PersonalityResultData {
  // Collect all category hints from answers
  const hints: CategoryKey[] = [];
  
  Object.values(answers).forEach((value) => {
    if (CATEGORY_KEYS.includes(value as CategoryKey)) {
      hints.push(value as CategoryKey);
    }
  });
  
  const categoryScores = computeCategoryScores(hints);
  const personalityScores = computePersonalityScores(categoryScores);
  const bestPersonality = pickBestPersonality(personalityScores);
  
  return personalityTypes[bestPersonality];
}
