import StudentApi from "@/api/studentApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import { ApiPaginationQuery, StudentQuery } from "@/global";


const fetchStudentsServiceQuery = (paginationQuery: ApiPaginationQuery & StudentQuery) => {
  return useQuery({
    queryFn: () => StudentApi.getStudents(paginationQuery),
    queryKey: [ ...ApiQueryMutationKeys.StudentMutationQueryKeys.getStudentsQueryKeys, paginationQuery.page ],
  });
}

const fetchStudentServiceQuery = (id: number) => {
  return useQuery({
    queryFn: () => StudentApi.getStudent(id),
    queryKey: [ ...ApiQueryMutationKeys.JobQuryMutationKeys.getJobQueryKeys, id ]
  });
}

const deleteStudentServiceMutation = () => {
  return useMutation({
    mutationFn: StudentApi.deleteStudent,
    mutationKey: ApiQueryMutationKeys.JobQuryMutationKeys.deleteJobMutationKeys
  });
}


const StudentService = {
  fetchStudentServiceQuery,
  fetchStudentsServiceQuery,
  deleteStudentServiceMutation,
}

export default StudentService;