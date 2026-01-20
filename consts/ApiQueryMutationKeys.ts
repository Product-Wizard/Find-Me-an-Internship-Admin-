

const JobQuryMutationKeys = Object.freeze({
  createJobMutationKeys: [ "create_job" ],
  updateJobMutationKeys: [ "update_job" ],
  getJobsQueryKeys: [ "get_jobs" ],
  getJobQueryKeys: [ "get_job" ],
  deleteJobMutationKeys: [ "delete_job" ],
})

const AuthMutationKeys = Object.freeze({
  loginMutationKeys: [ "login" ],
});

const StudentMutationQueryKeys = Object.freeze({
  getStudentsQueryKeys: [ "get_students" ],
  getStudentQueryKeys: [ "get_student" ],
  deleteStudentMutationKeys: [ "delete_student" ],
});

const OrganizationMutationQueryKeys = Object.freeze({
  getOrganizationsQueryKeys: [ "get_organizations" ],
  getOrganizationQueryKeys: [ "get_organization" ],
  deleteOrganizationMutationKeys: [ "delete_organization" ],
});

const ApiQueryMutationKeys = Object.freeze({
  JobQuryMutationKeys,
  AuthMutationKeys,
  StudentMutationQueryKeys,
  OrganizationMutationQueryKeys
});

export default ApiQueryMutationKeys