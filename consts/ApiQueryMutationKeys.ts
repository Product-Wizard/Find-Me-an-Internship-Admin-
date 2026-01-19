

const JobQuryMutationKeys = Object.freeze({
  createJobMutationKeys: [ "create_job" ],
  updateJobMutationKeys: [ "update_job" ],
  getJobsQueryKeys: [ "get_jobs" ],
  getJobQueryKeys: [ "get_job" ],
  deleteJobMutationKeys: [ "delete_job" ],
})

const AuthMutationKeys = Object.freeze({
  loginMutationKeys: [ "login" ],
})
const ApiQueryMutationKeys = Object.freeze({
  JobQuryMutationKeys,
  AuthMutationKeys,
})

export default ApiQueryMutationKeys