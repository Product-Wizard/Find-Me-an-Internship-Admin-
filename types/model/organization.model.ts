
export type company_size = "1-10" | "11-50" | "50+" | "";

export interface OrganizationModelInterface {
  id: number;
  email: string;
  company_name: string;
  industry: string;
  company_size: company_size;
}