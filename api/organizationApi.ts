import { AxiosResponse } from "axios";
import api from "./api";
import { OrganizationModelInterface } from "@/types/model/organization.model";
import moment from "moment";
import { ApiPaginationQuery, OrganizationQuery, StandardServerResponse } from "@/global";

const getOrganizations = async (paginationParams: ApiPaginationQuery & OrganizationQuery) => {
  const keys = Object.keys(paginationParams);
  keys.map(key => !paginationParams[ key ] ? delete paginationParams[ key ] : null);
  const result = await api.get<any, AxiosResponse<StandardServerResponse<OrganizationModelInterface[]>>>("/organization", {
    params: paginationParams
  });
  // result.data.data.forEach(item => item.postedDate = moment(item.createdAt).fromNow());
  return result.data;
}

const getOrganization = async (jobId: number) => {
  const result = await api.get<any, AxiosResponse<StandardServerResponse<OrganizationModelInterface>>>(`/organization/${jobId}`);
  // result.data.data.postedDate = moment(result.data.data.createdAt).fromNow();
  return result.data;
}

const deleteOrganization = async (organizationId: number) => {
  const result = await api.delete<any, AxiosResponse<StandardServerResponse<null>>>(`/organization/${organizationId}`);
  return result.data;
}

const OrganizationApi = {
  getOrganizations,
  getOrganization,
  deleteOrganization,
}

export default OrganizationApi;