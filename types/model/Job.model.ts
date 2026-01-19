export type JobType = 'remote' | 'on-site' | 'hybrid' | "";
export type JobCategoryType = "marketing" | "tech" | "admin" | "research" | "finance" | "design" | "";
export interface JobModelInterface {
  id: number;
  title: string;
  company: string;
  location: string;
  type: JobType;
  category: JobCategoryType;
  link: string;
  // organization_id: number;
  postedDate: string;
  description: string;

  readonly createdAt: string;
  readonly updatedAt: string;
}
export type CreateJobModelInterface = Omit<JobModelInterface, "id" | "createdAt" | "updatedAt" | "postedDate">