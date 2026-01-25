import { AxiosResponse } from "axios";
import api from "./api";
import { CreateResourceType, ResourceModelInterface } from "@/types/model/Resource.model";
import moment from "moment";
import { ApiPaginationQuery, StandardServerResponse } from "@/global";

const createResource = async (data: CreateResourceType) => {
  const result = await api.post<typeof data, AxiosResponse<StandardServerResponse<ResourceModelInterface>>>("/resource", data);
  result.data.data.dateUploaded = moment(result.data.data.createdAt).fromNow();
  return result.data;
}

const updateResource = async (data: ResourceModelInterface) => {
  const id = data.id;
  delete data.id;
  const result = await api.put<typeof data, AxiosResponse<StandardServerResponse<ResourceModelInterface>>>(`/resource/${id}`, data);
  result.data.data.dateUploaded = moment(result.data.data.createdAt).fromNow();
  return result.data;
}
const getResources = async (paginationParams: ApiPaginationQuery) => {
  const keys = Object.keys(paginationParams);
  keys.map(key => !paginationParams[ key ] ? delete paginationParams[ key ] : null);
  const result = await api.get<any, AxiosResponse<StandardServerResponse<ResourceModelInterface[]>>>("/resource", {
    params: paginationParams
  });
  result.data.data.forEach(item => item.dateUploaded = moment(item.createdAt).fromNow());
  return result.data;
}

const getResource = async (resourceId: number) => {
  const result = await api.get<any, AxiosResponse<StandardServerResponse<ResourceModelInterface>>>(`/resource/${resourceId}`);
  result.data.data.dateUploaded = moment(result.data.data.createdAt).fromNow();
  return result.data;
}

const deleteResource = async (resourceId: number) => {
  const result = await api.delete<any, AxiosResponse<StandardServerResponse<null>>>(`/resource/${resourceId}`);
  return result.data;
}

const ResourceApi = {
  createResource,
  getResources,
  updateResource,
  getResource,
  deleteResource,
}

export default ResourceApi;