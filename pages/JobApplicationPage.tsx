import { useState } from "react";
import { Search } from "lucide-react";
import JobApplicationService from "@/ApiService/JobApplicationSevice";
import BlockLoadingIndicator from "@/components/BlockLoadingIndicator";
import Paginator from "@/components/Paginator";
import { useQueryClient } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import JobApplicationItem from "@/components/JobApplicantItem";

const ITEMS_PER_PAGE = 20;

const JobApplicationPage = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const fetchJobApplicationQuery =
    JobApplicationService.fetchJobApplicationsServiceQuery({
      page: currentPage || 1,
      perPage: ITEMS_PER_PAGE,
      fullname: filter,
      email: filter,
      job_id: filter,
      phone: filter,
    });

  // Reset pagination when filters change
  const trigerFilterSearch = () => {
    setCurrentPage(1);
    queryClient.invalidateQueries({
      queryKey: [
        ...ApiQueryMutationKeys.JobApplicationMutationQueryKeys
          .getJobApplicationsQueryKeys,
        1,
      ],
    });
  };

  return (
    <div className='space-y-6 animate-fade-in w-full max-w-full overflow-x-auto'>
      {fetchJobApplicationQuery.isPending ||
      fetchJobApplicationQuery.isLoading ? (
        <BlockLoadingIndicator />
      ) : null}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-brand-dark'>
            Job Applications
          </h2>
        </div>
      </div>
      {/* Filters */}
      <div className='bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-2.5 w-4 h-4 text-slate-400' />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              trigerFilterSearch();
            }}
          >
            <div className='flex items-center'>
              <input
                type='text'
                placeholder='Search by job applicants by name, job id, email, job category, or phone ...'
                className='w-full pl-10 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-brand-teal'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                onBlur={trigerFilterSearch}
              />
              <button
                type='submit'
                className=' rounded-lg bg-brand-teal p-3 ml-1'
              >
                <Search className='w-4 h-4 text-white' />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className='bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col'>
        <div>
          <table className='w-full overflow-x-scroll text-left min-w-[800px]'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Name
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Email
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Phone
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Company Name
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Job Category
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Job type
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase text-right'>
                  Job Title
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase text-right'>
                  Time of Application
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {(fetchJobApplicationQuery?.data?.data || []).map(
                (jobApplication) => (
                  <JobApplicationItem
                    currentPage={currentPage}
                    jobApplication={jobApplication}
                    key={jobApplication?.id?.toString()}
                  />
                )
              )}
            </tbody>
          </table>
        </div>

        {(fetchJobApplicationQuery?.data?.data || []).length === 0 ? (
          <div className='p-12 text-center text-slate-400'>
            No job application found matching your filters.
          </div>
        ) : (
          <Paginator
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            pagination={fetchJobApplicationQuery?.data?.pagination}
          />
        )}
      </div>
    </div>
  );
};

export default JobApplicationPage;
