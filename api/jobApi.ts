import { AxiosResponse } from "axios";
import api from "./api";
import { CreateJobModelInterface, JobModelInterface } from "@/types/model/Job.model";
import moment from "moment";
import { ApiPaginationQuery, StandardServerResponse } from "@/global";

const createJob = async (data: CreateJobModelInterface) => {
  const result = await api.post<typeof data, AxiosResponse<StandardServerResponse<JobModelInterface>>>("/job", data);
  result.data.data.postedDate = moment(result.data.data.createdAt).fromNow();
  return result.data;
}

const updateJob = async (data: JobModelInterface) => {
  const id = data.id;
  delete data.id;
  const result = await api.put<typeof data, AxiosResponse<StandardServerResponse<JobModelInterface>>>(`/job/${id}`, data);
  result.data.data.postedDate = moment(result.data.data.createdAt).fromNow();
  return result.data;
}
const getJobs = async (paginationParams: ApiPaginationQuery) => {
  const keys = Object.keys(paginationParams);
  keys.map(key => !paginationParams[ key ] ? delete paginationParams[ key ] : null);
  const result = await api.get<any, AxiosResponse<StandardServerResponse<JobModelInterface[]>>>("/job", {
    params: paginationParams
  });
  result.data.data.forEach(item => item.postedDate = moment(item.createdAt).fromNow());
  return result.data;
}

const getJob = async (jobId: number) => {
  const result = await api.get<any, AxiosResponse<StandardServerResponse<JobModelInterface>>>(`/job/${jobId}`);
  result.data.data.postedDate = moment(result.data.data.createdAt).fromNow();
  return result.data;
}

const deleteJob = async (jobId: number) => {
  const result = await api.delete<any, AxiosResponse<StandardServerResponse<null>>>(`/job/${jobId}`);
  return result.data;
}

const JobApi = {
  createJob,
  getJobs,
  updateJob,
  getJob,
  deleteJob,
}

export default JobApi;