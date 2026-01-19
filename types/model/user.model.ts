import { company_size } from "./organization.model";
import { year_of_study } from "./student.type";
export interface User {
  id: number;
  email: string;
  full_name?: string;
  year_of_study?: year_of_study;
  company_name?: string;
  company_size?: company_size;
}