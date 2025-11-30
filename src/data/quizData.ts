import { QuizQuestionData } from "@/components/QuizQuestion";
import { PersonalityResultData } from "@/components/PersonalityResult";

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
      { id: "high", text: "Always on the move!", icon: "⚡", value: "high-energy" },
      { id: "balanced", text: "Mix of active & calm", icon: "🌟", value: "balanced" },
      { id: "calm", text: "Calm & focused", icon: "🧘", value: "calm" },
      { id: "varies", text: "Depends on the day", icon: "🔄", value: "varies" },
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
      { id: "stem", text: "Science & Math", icon: "🔬", value: "stem" },
      { id: "language", text: "Reading & Stories", icon: "📚", value: "language" },
      { id: "motor", text: "Physical Skills", icon: "🤸", value: "motor" },
      { id: "social", text: "Social & Emotional", icon: "❤️", value: "social" },
    ],
  },
  {
    id: "social",
    question: "How does your child prefer to play?",
    answers: [
      { id: "solo", text: "Independent play", icon: "🎯", value: "solo" },
      { id: "parent", text: "With parents", icon: "👨‍👩‍👧", value: "parent" },
      { id: "peers", text: "With other kids", icon: "👫", value: "peers" },
      { id: "flexible", text: "Any way works!", icon: "🤗", value: "flexible" },
    ],
  },
];

export const personalityTypes: Record<string, PersonalityResultData> = {
  builder: {
    title: "The Curious Builder",
    emoji: "🏗️",
    description: "Your child loves to construct, experiment, and figure out how things work!",
    toyCategories: [
      { name: "Building Blocks", icon: "🧱" },
      { name: "STEM Kits", icon: "🔬" },
      { name: "Puzzles", icon: "🧩" },
    ],
  },
  creative: {
    title: "The Creative Explorer",
    emoji: "🎨",
    description: "Your child expresses themselves through art, crafts, and imaginative creation!",
    toyCategories: [
      { name: "Art Supplies", icon: "🖍️" },
      { name: "Craft Kits", icon: "✂️" },
      { name: "DIY Projects", icon: "🎭" },
    ],
  },
  active: {
    title: "The Active Adventurer",
    emoji: "⚽",
    description: "Your child thrives on movement, outdoor play, and physical challenges!",
    toyCategories: [
      { name: "Sports Toys", icon: "🏀" },
      { name: "Outdoor Games", icon: "🪁" },
      { name: "Active Play", icon: "🤸" },
    ],
  },
  storyteller: {
    title: "The Story Weaver",
    emoji: "📚",
    description: "Your child loves books, storytelling, and imaginative role play!",
    toyCategories: [
      { name: "Story Books", icon: "📖" },
      { name: "Pretend Play", icon: "🎭" },
      { name: "Puppets", icon: "🧸" },
    ],
  },
  balanced: {
    title: "The Versatile Player",
    emoji: "🌟",
    description: "Your child enjoys a wonderful mix of different play styles!",
    toyCategories: [
      { name: "Mixed Activities", icon: "🎪" },
      { name: "Learning Games", icon: "🎲" },
      { name: "Creative Play", icon: "🎨" },
    ],
  },
  sensorySeeker: {
    title: "The Sensory Seeker",
    emoji: "✨",
    description: "Your child loves textures, lights, sounds, and hands-on sensations. They explore the world using touch and movement.",
    toyCategories: [
      { name: "Sensory Kits", icon: "🌈" },
      { name: "Textured Toys", icon: "🧸" },
      { name: "Light Toys", icon: "💡" },
    ],
  },
  tinyEngineer: {
    title: "The Tiny Engineer",
    emoji: "⚙️",
    description: "Your child wants to know how things work. They enjoy gears, levers, mechanisms, and figuring out cause-and-effect.",
    toyCategories: [
      { name: "Engineering Kits", icon: "🔧" },
      { name: "STEM Building", icon: "⚙️" },
      { name: "Mechanical Puzzles", icon: "🧩" },
    ],
  },
  creativeMaker: {
    title: "The Creative Maker",
    emoji: "🎨",
    description: "Your child expresses themselves through hands-on creativity. They enjoy transforming simple materials into something new.",
    toyCategories: [
      { name: "Art Kits", icon: "🖌️" },
      { name: "Clay Sets", icon: "🪴" },
      { name: "Building Toys", icon: "🧱" },
    ],
  },
  quietThinker: {
    title: "The Quiet Thinker",
    emoji: "🤔",
    description: "Your child prefers calm, focused play. They take time to observe, understand, and work slowly but steadily.",
    toyCategories: [
      { name: "Quiet Play Kits", icon: "🧘" },
      { name: "Montessori Materials", icon: "📚" },
      { name: "Simple Puzzles", icon: "🧩" },
    ],
  },
  curiousExplorer: {
    title: "The Curious Explorer",
    emoji: "🔍",
    description: "Your child wants to move, climb, push, pull, and interact with everything around them. Exploration excites them more than structured play.",
    toyCategories: [
      { name: "Exploration Kits", icon: "🔭" },
      { name: "Movement Toys", icon: "🚗" },
      { name: "Active Play Sets", icon: "⚽" },
    ],
  },
};

export function calculatePersonality(answers: Record<string, string>): PersonalityResultData {
  const playType = answers["play-type"];
  const energy = answers["energy"];
  const attention = answers["attention"];
  const learning = answers["learning"];
  const social = answers["social"];
  
  // Advanced personality mapping based on multiple factors
  
  // Direct play-type signals (highest priority)
  if (playType === "sensory") {
    return personalityTypes.sensorySeeker;
  }
  
  if (playType === "problem_solver") {
    // If they picked puzzles + calm energy = Quiet Thinker
    if (energy === "calm" || attention === "very-long") {
      return personalityTypes.quietThinker;
    }
    // Otherwise default to builder (problem solver)
    return personalityTypes.builder;
  }
  
  // Tiny Engineer: Building + STEM focus + good attention
  if (playType === "builder" && learning === "stem" && (attention === "long" || attention === "very-long")) {
    return personalityTypes.tinyEngineer;
  }
  
  // Creative Maker: Creative play + not STEM focused
  if (playType === "creative" && learning !== "stem") {
    return personalityTypes.creativeMaker;
  }
  
  // Quiet Thinker: Calm energy + long attention
  if (energy === "calm" && (attention === "long" || attention === "very-long")) {
    return personalityTypes.quietThinker;
  }
  
  // Sensory Seeker: High energy + motor skills focus
  if (energy === "high-energy" && learning === "motor") {
    return personalityTypes.sensorySeeker;
  }
  
  // Curious Explorer: Active + exploration-driven
  if (playType === "active" && (energy === "varies" || attention === "short" || attention === "medium")) {
    return personalityTypes.curiousExplorer;
  }
  
  // Social Connector: Pretend play + social preference
  if (playType === "imagination" && (social === "peers" || social === "flexible")) {
    return personalityTypes.balanced; // Using balanced for social connector
  }
  
  // Original personality types (fallbacks)
  if (playType === "builder") return personalityTypes.builder;
  if (playType === "creative") return personalityTypes.creative;
  if (playType === "active") return personalityTypes.active;
  if (playType === "imagination") return personalityTypes.storyteller;
  
  return personalityTypes.balanced;
}
