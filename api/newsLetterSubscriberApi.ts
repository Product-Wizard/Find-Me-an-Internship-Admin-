import { AxiosResponse } from "axios";
import { NewsLetterSubscriberModelInterface } from "@/types/model/NewsLetterSubscriber.model";
import api from "./api";
import { ApiPaginationQuery, NewsLetterSubscriberQuery, StandardServerResponse } from "@/global";
import moment from "moment";


const getNewsLetterSubscribers = async (paginationParams: (ApiPaginationQuery & NewsLetterSubscriberQuery)) => {
  const keys = Object.keys(paginationParams);
  keys.map(key => !paginationParams[ key ] ? delete paginationParams[ key ] : null);
  const result = await api.get<any, AxiosResponse<StandardServerResponse<NewsLetterSubscriberModelInterface[]>>>("/news_letter_subscriber", {
    params: paginationParams
  });
  result.data.data.forEach(item => item.subscribedAt = moment(item.createdAt).fromNow());
  return result.data;
}

const getNewsLetterSubscriber = async (NewsLetterSubscriberId: number) => {
  const result = await api.get<any, AxiosResponse<StandardServerResponse<NewsLetterSubscriberModelInterface>>>(`/news_letter_subscriber/${NewsLetterSubscriberId}`);
  result.data.data.subscribedAt = moment(result.data.data.createdAt).fromNow();
  return result.data;
}

const deleteNewsLetterSubscriber = async (newsLetterSubscriberId: number) => {
  const result = await api.delete<any, AxiosResponse<StandardServerResponse<null>>>(`/news_letter_subscriber/${newsLetterSubscriberId}`);
  return result.data;
}

const NewsLetterSubscriberApi = {
  getNewsLetterSubscriber,
  getNewsLetterSubscribers,
  deleteNewsLetterSubscriber,
}

export default NewsLetterSubscriberApi;