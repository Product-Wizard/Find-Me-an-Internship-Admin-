export type JobType = 'remote' | 'on-site' | 'hybrid' | "";
export type JobCategoryType = "stem " | "humanities_and_art" | "commercial_and_finance" | "non_Profit" | "";
export type JobLocalityType = "local" | "remote" | "international" | "";
export type JobTrainigScope = "siwes_or_general" | "graduate_training" | "international" | "";

export interface JobModelInterface {
  id: number;
  title: string;
  company: string;
  location: string;
  type: JobType;
  category: JobCategoryType;
  link: string;
  state: string;
  postedDate: string;
  description: string;
  job_training_scope: JobTrainigScope;
  applicants_count: number;

  readonly createdAt: string;
  readonly updatedAt: string;
}
export type CreateJobModelInterface = Omit<JobModelInterface, "id" | "createdAt" | "updatedAt" | "postedDate" | "applicants_count">