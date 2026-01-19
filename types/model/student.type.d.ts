export type year_of_study = "fresh_man" | "sophomore" | "junior" | "senior" | ""

export interface StudentModelInterface {
  id: number;
  email: string;
  full_name: string;
  course_of_study: string;
  year_of_study: year_of_study;
}