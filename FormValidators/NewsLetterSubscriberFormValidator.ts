
import { CreateNewsLetterSubscriberModel } from "@/types/model/NewsLetterSubscriber.model";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup"

const createNewsLetterSubscriber = () => {
  const defaultValues: CreateNewsLetterSubscriberModel = {
    email: "",
  }
  const NewsLetterSubscriberFormSchema = Yup.object({
    email: Yup.string().email().required(),
  }).required();
  return useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(NewsLetterSubscriberFormSchema),
    reValidateMode: "onChange"
  });
}

const NewsLetterSubscriberFormValidators = {
  createNewsLetterSubscriber,
}

export default NewsLetterSubscriberFormValidators;