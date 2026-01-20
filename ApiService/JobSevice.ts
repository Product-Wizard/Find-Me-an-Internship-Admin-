import JobApi from "@/api/jobApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import { ApiPaginationQuery, JobQuery } from "@/global";
import { JobModelInterface } from "@/types/model/Job.model";

const createJobServiceMutation = () => {
  return useMutation({
    mutationFn: JobApi.createJob,
    mutationKey: ApiQueryMutationKeys.JobQuryMutationKeys.createJobMutationKeys
  });
}

const updateJobServiceMutation = () => {
  return useMutation({
    mutationFn: JobApi.updateJob,
    mutationKey: ApiQueryMutationKeys.JobQuryMutationKeys.updateJobMutationKeys
  });
}

const deleteJobServiceMutation = () => {
  return useMutation({
    mutationFn: JobApi.deleteJob,
    mutationKey: ApiQueryMutationKeys.JobQuryMutationKeys.deleteJobMutationKeys
  });
}

const fetchJobsServiceQuery = (paginationQuery: ApiPaginationQuery & JobQuery) => {
  return useQuery({
    queryFn: () => JobApi.getJobs(paginationQuery),
    queryKey: [ ...ApiQueryMutationKeys.JobQuryMutationKeys.getJobsQueryKeys, paginationQuery.page ],
  });
}

const fetchJobServiceQuery = (id: number) => {
  return useQuery({
    queryFn: () => JobApi.getJob(id),
    queryKey: [ ...ApiQueryMutationKeys.JobQuryMutationKeys.getJobQueryKeys, id ]
  });
}


const JobService = {
  createJobServiceMutation,
  updateJobServiceMutation,
  deleteJobServiceMutation,
  fetchJobsServiceQuery,
  fetchJobServiceQuery
}

export default JobService;