import JobApplicationApi from "@/api/jobApplicationApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import { ApiPaginationQuery, JobApplicationQuery } from "@/global";

const fetchJobApplicationsServiceQuery = (paginationQuery: ApiPaginationQuery & JobApplicationQuery) => {
  return useQuery({
    queryFn: () => JobApplicationApi.getJobApplications(paginationQuery),
    queryKey: [ ...ApiQueryMutationKeys.JobApplicationMutationQueryKeys.getJobApplicationsQueryKeys, paginationQuery.page ],
  });
}

const fetchJobApplicationServiceQuery = (id: number) => {
  return useQuery({
    queryFn: () => JobApplicationApi.getJobApplication(id),
    queryKey: [ ...ApiQueryMutationKeys.JobApplicationMutationQueryKeys.getJobApplicationQueryKeys, id ]
  });
}

const deleteJobApplicationServiceMutation = () => {
  return useMutation({
    mutationFn: JobApplicationApi.deleteJobApplication,
    mutationKey: ApiQueryMutationKeys.JobApplicationMutationQueryKeys.deleteJobApplicationMutationKeys
  });
}


const JobApplicationService = {
  deleteJobApplicationServiceMutation,
  fetchJobApplicationsServiceQuery,
  fetchJobApplicationServiceQuery
}

export default JobApplicationService;