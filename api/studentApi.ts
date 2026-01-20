import { AxiosResponse } from "axios";
import api from "./api";
import { StudentModelInterface } from "@/types/model/student.model";
import moment from "moment";
import { ApiPaginationQuery, StandardServerResponse, StudentQuery } from "@/global";

const getStudents = async (paginationParams: ApiPaginationQuery & StudentQuery) => {
  const keys = Object.keys(paginationParams);
  keys.map(key => !paginationParams[ key ] ? delete paginationParams[ key ] : null);
  const result = await api.get<any, AxiosResponse<StandardServerResponse<StudentModelInterface[]>>>("/student", {
    params: paginationParams
  });
  // result.data.data.forEach(item => item.postedDate = moment(item.createdAt).fromNow());
  return result.data;
}

const getStudent = async (jobId: number) => {
  const result = await api.get<any, AxiosResponse<StandardServerResponse<StudentModelInterface>>>(`/student/${jobId}`);
  // result.data.data.postedDate = moment(result.data.data.createdAt).fromNow();
  return result.data;
}

const deleteStudent = async (studentId: number) => {
  const result = await api.delete<any, AxiosResponse<StandardServerResponse<null>>>(`/student/${studentId}`);
  return result.data;
}

const StudentApi = {
  getStudents,
  getStudent,
  deleteStudent,
}

export default StudentApi;