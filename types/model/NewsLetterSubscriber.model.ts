export interface NewsLetterSubscriberModelInterface {
  id: number;
  email: string;
  createdAt?: string;
  subscribedAt?: string;
  updatedAt?: string;
}

export type CreateNewsLetterSubscriberModel = Omit<NewsLetterSubscriberModelInterface, "id" | "createdAt" | "updatedAt" | "subscribedAt">