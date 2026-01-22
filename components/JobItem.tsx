import { useState } from "react";
import { Trash2, Building2, MapPin, Edit } from "lucide-react";
import {
  CreateJobModelInterface,
  JobModelInterface,
} from "@/types/model/Job.model";
import { useQueryClient } from "@tanstack/react-query";
import AddEditJob from "./AddEditJob";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import JobService from "@/ApiService/JobSevice";
import BlockLoadingIndicator from "./BlockLoadingIndicator";
import toast from "react-hot-toast";
interface JobItemProps {
  job: JobModelInterface;
  currentPage: number;
}

function JobItem({ job, currentPage }: JobItemProps) {
  const [edit, setEdit] = useState(false);
  const delteJobMutation = JobService.deleteJobServiceMutation();
  const queryClient = useQueryClient();
  const refreshCurrentPage = () => {
    queryClient.invalidateQueries({
      queryKey: [
        ...ApiQueryMutationKeys.JobQuryMutationKeys.getJobsQueryKeys,
        currentPage,
      ],
    });
  };
  const editJobData: CreateJobModelInterface & { id: number } = {
    id: job.id,
    category: job.category,
    company: job.company,
    description: job.description,
    link: job.link,
    location: job.location,
    title: job.title,
    type: job.type,
    job_training_scope: job.job_training_scope,
  };
  const handleDeleteJob = () => {
    const isDelete = confirm("are you sure you want to delete this job ?");
    if (isDelete == false) return;
    delteJobMutation.mutate(job.id, {
      onSuccess: (data) => {
        toast.success(data.message || "listing deleted");
        refreshCurrentPage();
      },
      onError: (data: any) => {
        toast.error(
          data.response.message || data.message || "error deleting job"
        );
      },
    });
  };
  return (
    <tr key={job?.id} className='hover:bg-slate-50/50 transition-colors group'>
      {delteJobMutation.isPending ? <BlockLoadingIndicator /> : null}
      {edit ? (
        <AddEditJob
          initialData={editJobData}
          isAdding={false}
          handleClose={() => setEdit(false)}
          handleOnEditSuccess={refreshCurrentPage}
        />
      ) : null}
      <td className='p-4'>
        <div className='font-bold text-brand-dark'>{job?.title}</div>
        <div className='text-sm text-slate-500 flex items-center gap-1'>
          <Building2 className='w-3 h-3' /> {job?.company}
        </div>
      </td>
      <td className='p-4 text-sm text-slate-600'>
        <div className='flex items-center gap-1'>
          <MapPin className='w-3 h-3 text-slate-400' /> {job?.location}
        </div>
      </td>
      <td className='p-4'>
        <span
          className={`px-2 py-1 rounded text-xs font-medium capitalize ${
            job?.type === "remote"
              ? "bg-purple-100 text-purple-700"
              : job?.type === "hybrid"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {job?.type}
        </span>
      </td>
      <td className='p-4 text-sm text-slate-500'>{job?.postedDate}</td>
      <td className='p-4 text-sm text-slate-500'>{job?.applicants_count}</td>
      <td className='p-4 text-right'>
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => setEdit(true)}
            className='p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors'
            title='Edit'
          >
            <Edit className='w-4 h-4' />
          </button>
          <button
            onClick={handleDeleteJob}
            className='p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors'
            title='Delete'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default JobItem;
