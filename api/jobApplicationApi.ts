import { AxiosResponse } from "axios";
import api from "./api";
import { CreateJobApplicationType, JobApplicationModelInterface } from "@/types/model/JobApplication.model";
import moment from "moment";
import { ApiPaginationQuery, StandardServerResponse } from "@/global";


const getJobApplications = async (paginationParams: ApiPaginationQuery) => {
  const keys = Object.keys(paginationParams);
  keys.map(key => !paginationParams[ key ] ? delete paginationParams[ key ] : null);
  const result = await api.get<any, AxiosResponse<StandardServerResponse<JobApplicationModelInterface[]>>>("/job_application", {
    params: paginationParams
  });
  result.data.data.forEach(item => item.applicationDate = moment(item.createdAt).fromNow());
  return result.data;
}

const getJobApplication = async (jobApplicationId: number) => {
  const result = await api.get<any, AxiosResponse<StandardServerResponse<JobApplicationModelInterface>>>(`/job_application/${jobApplicationId}`);
  result.data.data.applicationDate = moment(result.data.data.createdAt).fromNow();
  return result.data;
}

const deleteJobApplication = async (jobApplicationId: number) => {
  const result = await api.delete<any, AxiosResponse<StandardServerResponse<null>>>(`/job_application/${jobApplicationId}`);
  return result.data;
}

const JobApplicationApi = {
  getJobApplications,
  getJobApplication,
  deleteJobApplication,
}

export default JobApplicationApi;