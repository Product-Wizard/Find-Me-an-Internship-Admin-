import AuthApi from "@/api/authApi";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import { useMutation } from "@tanstack/react-query";



const loginServiceMutation = () => {
  return useMutation({
    mutationFn: AuthApi.login,
    mutationKey: ApiQueryMutationKeys.AuthMutationKeys.loginMutationKeys,
  });
}

const AuthService = {
  loginServiceMutation,
};

export default AuthService;