
export type CategoryType = "career_advice" | "industry_trends" | "resume_tips" | "student_stories" | ""


export interface ResourceModelInterface {
  id: number;
  title: string;
  category: CategoryType;
  author: string;
  imageUrl: string;
  summary: string;
  body: string;
  dateUploaded?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateResourceType = Omit<ResourceModelInterface, "id" | "dateUploaded" | "createdAt" | "updatedAt">