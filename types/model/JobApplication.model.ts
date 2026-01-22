import { JobModelInterface } from "./Job.model";

export interface JobApplicationModelInterface {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  job_id: string;
  job?: JobModelInterface;
  applicationDate: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type CreateJobApplicationType = Omit<JobApplicationModelInterface, "id" | "job" | "applicationDate" | "createdAt" | "updatedAt">