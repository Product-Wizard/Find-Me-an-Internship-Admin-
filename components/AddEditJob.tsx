import React from "react";
import JobFormValidator from "@/FormValidators/JobFormValidators";
import JobService from "@/ApiService/JobSevice";
import toast from "react-hot-toast";
import { CreateJobModelInterface } from "@/types/model/Job.model";
import FormErrorMessage from "./FormErrorMessage";
import BlockLoadingIndicator from "./BlockLoadingIndicator";

interface AddEditJobProps {
  isAdding: boolean;
  initialData: CreateJobModelInterface;
  handleClose: () => void;
  handleOnAddSuccess?: () => void;
  handleOnEditSuccess?: () => void;
}
function AddEditJob({
  isAdding,
  initialData,
  handleClose,
  handleOnAddSuccess,
  handleOnEditSuccess,
}: AddEditJobProps) {
  const jobForm = JobFormValidator.createJobForm(initialData);
  const jobMutation = isAdding
    ? JobService.createJobServiceMutation()
    : JobService.updateJobServiceMutation();

  const handleSubmitJob = (data: CreateJobModelInterface) => {
    // Add new job
    jobMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.message);
        jobForm.reset();
        if (isAdding) {
          if (handleOnAddSuccess) handleOnAddSuccess();
          handleClose();
        } else {
          if (handleOnEditSuccess) handleOnEditSuccess();
          handleClose();
        }
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.message ||
            error?.message ||
            `error ${isAdding ? "creating" : "updating"} listing`
        );
      },
    });
  };

  return (
    <div className='bg-white z-30 absolute top-0 left-0  p-6 rounded-xl border border-brand-teal/20 shadow-lg mb-6 animate-fade-in-up    overflow-x-auto no-scrollbar scroll-smooth  border-slate-200  whitespace-nowrap w-auto '>
      <h3 className='font-bold text-brand-dark mb-4'>
        {isAdding ? "Add New Opportunity" : "Edit Opportunity"}
      </h3>
      {jobMutation.isPending ? <BlockLoadingIndicator /> : null}
      <div>
        <form
          onSubmit={jobForm.handleSubmit(handleSubmitJob)}
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
        >
          <div>
            <input
              type='text'
              placeholder='Job Title'
              className='p-2 border rounded'
              {...jobForm.register("title")}
            />
            <FormErrorMessage
              message={jobForm?.formState?.errors?.title?.message}
            />
          </div>

          <div>
            <input
              type='text'
              placeholder='Company'
              className='p-2 border rounded'
              {...jobForm.register("company")}
            />
            <FormErrorMessage
              message={jobForm?.formState?.errors?.company?.message}
            />
          </div>

          <div>
            <input
              type='text'
              placeholder='Location'
              className='p-2 border rounded'
              {...jobForm.register("location")}
            />
            <FormErrorMessage
              message={jobForm?.formState?.errors?.location?.message}
            />
          </div>

          <div>
            <input
              type='text'
              placeholder='Link'
              className='p-2 border rounded'
              {...jobForm.register("link")}
            />
            <FormErrorMessage
              message={jobForm?.formState?.errors?.link?.message}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <select
                className='p-2 border rounded'
                {...jobForm.register("type")}
                // place='Select Job Type'
              >
                <option value=''>Select Job Type</option>
                <option value='on-site'>On-site</option>
                <option value='remote'>Remote</option>
                <option value='hybrid'>Hybrid</option>
              </select>
              <FormErrorMessage
                message={jobForm?.formState?.errors?.type?.message}
              />
            </div>

            <div>
              <select
                className='p-2 border rounded'
                {...jobForm.register("category")}
              >
                <option value=''>Select Job Category</option>
                <option value='stem'>Stem</option>
                <option value='humanities_and_art'>Humanities/Art</option>
                <option value='commercial_and_finance'>
                  Commercial/Finance
                </option>
                <option value='non_Profit'>Non-Profit</option>
                {/* <option value='marketing'>Marketing</option>
                <option value='finance'>Finance</option>
                <option value='tech'>Tech</option>
                <option value='design'>Design</option>
                <option value='admin'>Admin</option>
                <option value='research'>Research</option> */}
              </select>
              <FormErrorMessage
                message={jobForm?.formState?.errors?.category?.message}
              />
            </div>
          </div>
          <div>
            <select
              className='p-2 border rounded'
              {...jobForm.register("job_training_scope")}
            >
              <option value=''> Internship Training Type</option>
              <option value='siwes_or_general'>Siwes or General</option>
              <option value='graduate_training'>Graduate Training</option>
              <option value='international'>International</option>
            </select>
            <FormErrorMessage
              message={jobForm?.formState?.errors?.job_training_scope?.message}
            />
          </div>
          <div>
            <textarea
              placeholder='Description'
              className='p-2 border rounded md:col-span-2 w-full'
              rows={5}
              {...jobForm.register("description")}
            ></textarea>
            <FormErrorMessage
              message={jobForm?.formState?.errors?.description?.message}
            />
          </div>

          <div className='md:col-span-2 flex justify-start gap-2 mt-2'>
            <button
              onClick={handleClose}
              type='button'
              className='px-4 py-2 text-slate-500'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-brand-teal text-white rounded font-bold'
            >
              {isAdding ? "Save Job" : "Update Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditJob;
