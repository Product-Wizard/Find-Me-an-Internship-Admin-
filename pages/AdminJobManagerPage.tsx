import React, { useState, useEffect } from "react";
import { Search, Plus, FileSpreadsheet, Filter, Loader2 } from "lucide-react";
import JobService from "@/ApiService/JobSevice";
import { CreateJobModelInterface, JobType } from "@/types/model/Job.model";
import toast from "react-hot-toast";
import BlockLoadingIndicator from "@/components/BlockLoadingIndicator";
import AddEditJob from "@/components/AddEditJob";
import JobItem from "@/components/JobItem";
import Paginator from "@/components/Paginator";
import { useQueryClient } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";

const ITEMS_PER_PAGE = 20;

const AdminJobManagerPage = () => {
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<JobType>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const createJobMutation = JobService.createJobServiceMutation();
  const fetchJobsQuery = JobService.fetchJobsServiceQuery({
    page: currentPage || 1,
    perPage: ITEMS_PER_PAGE,
    type: typeFilter,
    title: filter,
    company: filter,
    category: filter,
    description: filter,
    link: filter,
    location: filter,
  });

  // Reset pagination when filters change
  const trigerFilterSearch = () => {
    setCurrentPage(1);
    queryClient.invalidateQueries({
      queryKey: [...ApiQueryMutationKeys.JobQuryMutationKeys.getJobsQueryKeys],
    });
  };

  useEffect(() => {
    trigerFilterSearch();
  }, [typeFilter]);
  const queryClient = useQueryClient();

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const lines = text.split("\n");
        const newJobs: CreateJobModelInterface[] = [];

        // Start from 1 to skip header
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(",");
          if (row.length >= 5) {
            newJobs.push({
              // id: +i,
              locale_type: "",
              title: row[0].trim(),
              company: row[1].trim(),
              location: row[2].trim(),
              type:
                (row[3].trim() as "remote" | "on-site" | "hybrid") || "on-site",
              description: row[5]?.trim() || "Imported via CSV",
              // postedDate: "Imported",
              category: row[4].trim() as any,
              link: "http://test.com",
            });
          }
        }

        // Simulate a small delay for better UX
        // TODO: api call to create multiple job listings
      };

      reader.onerror = () => {
        toast.error("Error reading file");
      };

      reader.readAsText(file);
    }
  };
  console.log("fetch job loading", fetchJobsQuery.isPending);
  return (
    <div className='space-y-6 animate-fade-in w-full max-w-full overflow-x-auto'>
      {createJobMutation.isPending ? <BlockLoadingIndicator /> : null}
      {fetchJobsQuery.isPending || fetchJobsQuery.isLoading ? (
        <BlockLoadingIndicator />
      ) : null}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-brand-dark'>Job Management</h2>
          <p className='text-slate-500'>
            Oversee active listings and applications.
          </p>
        </div>
        <div className='flex flex-wrap gap-2 w-full md:w-auto'>
          <label
            className={`flex-1 md:flex-none justify-center cursor-pointer bg-white border border-slate-200 hover:border-brand-teal text-slate-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
              isUploading ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            {isUploading ? (
              <Loader2 className='w-4 h-4 text-brand-teal animate-spin' />
            ) : (
              <FileSpreadsheet className='w-4 h-4 text-green-600' />
            )}
            <span className='text-sm'>
              {isUploading ? "Importing..." : "Import CSV"}
            </span>
            <input
              type='file'
              accept='.csv'
              className='hidden'
              onChange={handleCsvUpload}
              disabled={isUploading}
            />
          </label>
          <button
            onClick={() => setIsAdding(true)}
            className='flex-1 md:flex-none justify-center bg-brand-teal hover:bg-brand-dark text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all shadow-sm'
          >
            <Plus className='w-4 h-4' />{" "}
            <span className='hidden sm:inline'>Add Opportunity</span>
            <span className='sm:hidden'>Add</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <AddEditJob
          initialData={undefined}
          handleClose={() => setIsAdding(false)}
          isAdding={isAdding}
          handleOnAddSuccess={() => {
            setCurrentPage(1);
            queryClient.invalidateQueries({
              queryKey: [
                ...ApiQueryMutationKeys.JobQuryMutationKeys.getJobsQueryKeys,
                currentPage,
              ],
            });
          }}
        />
      )}

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
                placeholder='Search by title or company...'
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
        <div className='flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-4'>
          <Filter className='w-4 h-4 text-slate-400' />
          <select
            className='bg-transparent text-sm font-medium text-slate-600 outline-none w-full md:w-auto'
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
          >
            <option value=''>All Types</option>
            <option value='remote'>Remote</option>
            <option value='on-site'>On-site</option>
            <option value='hybrid'>Hybrid</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className='bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left min-w-[800px]'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Role / Company
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Location
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Type
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Posted
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {(fetchJobsQuery?.data?.data || []).map((job) => (
                <JobItem
                  currentPage={currentPage}
                  job={job}
                  key={job?.id?.toString()}
                />
              ))}
            </tbody>
          </table>
        </div>

        {(fetchJobsQuery?.data?.data || []).length === 0 ? (
          <div className='p-12 text-center text-slate-400'>
            No jobs found matching your filters.
          </div>
        ) : (
          <Paginator
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            pagination={fetchJobsQuery?.data?.pagination}
          />
        )}
      </div>
    </div>
  );
};

export default AdminJobManagerPage;
