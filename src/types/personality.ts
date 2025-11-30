import { PersonalityId } from "@/data/quizData";

export interface PersonalityResultData {
  title: string;
  description: string;
  emoji: string;
  toyCategories: Array<{
    name: string;
    icon: string;
  }>;
  id?: PersonalityId;
  scores?: Record<PersonalityId, number>;
}
