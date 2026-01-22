import { useState } from "react";
import { Trash2 } from "lucide-react";
import { JobApplicationModelInterface } from "@/types/model/JobApplication.model";
import { useQueryClient } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import JobApplicationService from "@/ApiService/JobApplicationSevice";
import BlockLoadingIndicator from "./BlockLoadingIndicator";
import toast from "react-hot-toast";
interface JobApplicantItemProps {
  jobApplication: JobApplicationModelInterface;
  currentPage: number;
}

function JobApplicantItem({
  jobApplication,
  currentPage,
}: JobApplicantItemProps) {
  const delteJobApplicationMutation =
    JobApplicationService.deleteJobApplicationServiceMutation();
  const queryClient = useQueryClient();
  const refreshCurrentPage = () => {
    queryClient.invalidateQueries({
      queryKey: [
        ...ApiQueryMutationKeys.JobQuryMutationKeys.getJobsQueryKeys,
        currentPage,
      ],
    });
  };

  const handleDeleteJob = () => {
    const isDelete = confirm(
      "are you sure you want to delete this job application ?"
    );
    if (isDelete == false) return;
    delteJobApplicationMutation.mutate(jobApplication.id, {
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
    <tr className='hover:bg-slate-50/50 transition-colors group'>
      {delteJobApplicationMutation.isPending ? <BlockLoadingIndicator /> : null}
      <td className='p-4'>
        <div className='font-bold text-brand-dark'>
          {jobApplication?.fullname}
        </div>
      </td>
      <td className='p-4 text-sm text-slate-600'>
        <div className='flex items-center gap-1'>{jobApplication?.email}</div>
      </td>
      <td className='p-4 text-sm text-slate-600'>
        <div className='flex items-center gap-1'>{jobApplication?.phone}</div>
      </td>

      <td className='p-4 text-sm text-slate-500'>
        {jobApplication.job?.company}
      </td>
      <td className='p-4 text-sm text-slate-500'>
        {jobApplication?.job?.category}
      </td>
      <td className='p-4 text-sm text-slate-500'>
        {jobApplication?.job?.type}
      </td>
      <td className='p-4 text-sm text-slate-500'>
        {jobApplication?.job?.title}
      </td>
      <td className='p-4 text-sm text-slate-500'>
        {jobApplication.applicationDate}
      </td>
      <td className='p-4 text-right'>
        <div className='flex justify-end gap-2'>
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

export default JobApplicantItem;
