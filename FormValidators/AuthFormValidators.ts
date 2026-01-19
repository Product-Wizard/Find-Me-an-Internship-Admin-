import * as Yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Login } from "@/types/model/Auth.model"


const LoginForm = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
}).required();

const createLoginForm = () => {
  const initialValues: Login = {
    email: "",
    password: "",
  }
  return useForm({
    defaultValues: initialValues,
    reValidateMode: "onChange",
    resolver: yupResolver(LoginForm),
  })
}

const AuthFormValidator = {
  createLoginForm
}

export default AuthFormValidator;