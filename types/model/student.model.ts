
export type internship_type = "general_internship" | "siwes" | "graduate_opportunities" | "students_sign_up" | "";

export interface StudentModelInterface {
  id: number;
  email: string;
  full_name: string;
  internship_type: internship_type;
  course_of_study: string;
  password?: string;
  defaultPassword: boolean;
}