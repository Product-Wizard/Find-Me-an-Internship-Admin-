import { JobCategoryType, JobType } from "./types/model/Job.model";

export interface StandardServerResponse<T> {
  error: boolean;
  data: T;
  message: string;
  pagination?: pagination
  token?: string;
}

export interface ApiPaginationQuery {
  page: number;
  perPage: number;
}

export interface JobQuery {
  type?: JobType;
  title?: string;
  company?: string;
  location?: string;
  type?: string;
  category?: string;
  link?: string;
  description?: string;
}

export interface ResourceQuery {
  title?: string;
  category?: string;
  author?: string;
  imageUrl?: string;
  summary?: string;
  body?: string;
}


export interface OrganizationQuery {
  email: string;
  company_name: string;
  industry: string;
  company_size: string;
}
export interface JobApplicationQuery {
  fullname?: string;
  email?: string;
  phone?: string;
  job_id?: string;
}


export interface StudentQuery {
  email?: string;
  full_name?: string;
  year_of_study?: year_of_study;
  course_of_study?: string;
}

interface NewsLetterSubscriberQuery {
  email?: string;
  id?: number;
}
export interface pagination {
  nextPage: number;
  previousPage: number;
  totalPages: number;
}