import * as Yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateResourceType } from "@/types/model/Resource.model"


const ResourceForm = Yup.object({
  author: Yup.string().required(),
  body: Yup.string().required(),
  category: Yup.string().required(),
  imageUrl: Yup.string().url().required().label("image url"),
  summary: Yup.string().required(),
  title: Yup.string().required(),
}).required();

const createResourceForm = (resource?: CreateResourceType) => {
  const initialValues: CreateResourceType = {
    author: "",
    body: "",
    category: "",
    imageUrl: "",
    summary: "",
    title: ""
  }
  return useForm({
    defaultValues: resource || initialValues,
    reValidateMode: "onChange",
    resolver: yupResolver(ResourceForm),
  })
}

const ResourceFormValidator = {
  createResourceForm,
}

export default ResourceFormValidator;