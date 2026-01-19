import { JobCategoryType, JobType } from "./types/model/Job.model";

interface StandardServerResponse<T> {
  error: boolean;
  data: T;
  message: string;
  pagination?: pagination
  token?: string;
}

export interface ApiPaginationQuery {
  page: number;
  perPage: number;
  type?: JobType;
  title?: string;
  company?: string;
  location?: string;
  type?: string;
  category?: string;
  link?: string;
  description?: string;
}

export interface pagination {
  nextPage: number;
  previousPage: number;
  totalPages: number;
}