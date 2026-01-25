import NewsLetterSubscriberApi from "@/api/newsLetterSubscriberApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import { ApiPaginationQuery, NewsLetterSubscriberQuery } from "@/global";

const getNewsLetterSubscribersServiceMutation = (data: ApiPaginationQuery & NewsLetterSubscriberQuery) => {
  return useQuery({
    queryFn: () => NewsLetterSubscriberApi.getNewsLetterSubscribers(data),
    queryKey: [ ...ApiQueryMutationKeys.NewsLetterSubscriberApiQuryMutationKeys.getNewsLetterSubscribersApiQueryKeys, data.page ]
  });
}

const getNewsLetterSubscriberServiceMutation = (newsLetterSubscriberId: number) => {
  return useQuery({
    queryFn: () => NewsLetterSubscriberApi.getNewsLetterSubscriber(newsLetterSubscriberId),
    queryKey: [ ...ApiQueryMutationKeys.NewsLetterSubscriberApiQuryMutationKeys.getNewsLetterSubscriberApiQueryKeys, newsLetterSubscriberId ]
  });
}

const deleteNewsLetterSubscriberServiceMutation = () => {
  return useMutation({
    mutationFn: NewsLetterSubscriberApi.deleteNewsLetterSubscriber,
    mutationKey: [ ...ApiQueryMutationKeys.NewsLetterSubscriberApiQuryMutationKeys.deleteNewsLetterSubscriberApiQueryKeys ]
  });
}



const NewsLetterSubscriberService = {
  getNewsLetterSubscribersServiceMutation,
  getNewsLetterSubscriberServiceMutation,
  deleteNewsLetterSubscriberServiceMutation,
}

export default NewsLetterSubscriberService;