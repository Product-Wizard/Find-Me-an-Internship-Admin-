

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

const JobApplicationMutationQueryKeys = Object.freeze({
  getJobApplicationsQueryKeys: [ "get_Job_applications" ],
  getJobApplicationQueryKeys: [ "get_Job_application" ],
  deleteJobApplicationMutationKeys: [ "delete_Job_application" ],
});

const NewsLetterSubscriberApiQuryMutationKeys = Object.freeze({
  createNewsLetterSubscriberApiMutationKeys: [ "create_news_letter_subscriber" ],

})

const ApiQueryMutationKeys = Object.freeze({
  JobQuryMutationKeys,
  AuthMutationKeys,
  StudentMutationQueryKeys,
  OrganizationMutationQueryKeys,
  JobApplicationMutationQueryKeys,
  NewsLetterSubscriberApiQuryMutationKeys
});

export default ApiQueryMutationKeys