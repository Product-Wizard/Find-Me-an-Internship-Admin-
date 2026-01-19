import * as Yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateJobModelInterface } from "@/types/model/Job.model"

const JobForm = Yup.object({
  category: Yup.string().required(),
  company: Yup.string().required(),
  description: Yup.string().required(),
  location: Yup.string().required(),
  link: Yup.string().url().required(),
  title: Yup.string().required(),
  type: Yup.string().required(),
  locale_type: Yup.string().required().label("locality type"),
}).required();

const createJobForm = (intialData?: CreateJobModelInterface) => {
  const initialValues: CreateJobModelInterface = {
    category: "",
    company: "",
    description: "",
    location: "",
    link: "",
    title: "",
    type: "",
    locale_type: ""
  }
  return useForm({
    defaultValues: intialData || initialValues,
    reValidateMode: "onChange",
    resolver: yupResolver(JobForm),
  });
}

const JobFormValidator = {
  createJobForm,
};

export default JobFormValidator;