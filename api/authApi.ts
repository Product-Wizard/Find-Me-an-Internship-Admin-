import { AxiosResponse } from "axios";
import { StudentModelInterface } from "@/types/model/student.model";
import { OrganizationModelInterface } from "@/types/model/organization.model";
import api from "./api";
import { Login } from "@/types/model/Auth.model";
import { User } from "@/types/model/user.model";
import { StandardServerResponse } from "@/global";

const login = async (data: Login) => {
  const result = await api.post<typeof data, AxiosResponse<StandardServerResponse<User>>>("/auth/admin/login", data);
  return result.data;
}

const AuthApi = {
  login
}

export default AuthApi;