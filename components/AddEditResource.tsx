import {
  CreateResourceType,
  ResourceModelInterface,
} from "@/types/model/Resource.model";
import { ImageIcon, X } from "lucide-react";
import BlockLoadingIndicator from "./BlockLoadingIndicator";
import ResourceFormValidator from "@/FormValidators/ResourceValidators";
import FormErrorMessage from "./FormErrorMessage";
import ResourceService from "@/ApiService/ResourceSevice";
import toast from "react-hot-toast";

interface AddEditResourceProps {
  handleClose: () => void;
  resource?: ResourceModelInterface;
  isAdding: boolean;
  handleOnAddSuccess?: () => void;
  handleOnEditSuccess?: () => void;
}

function AddEditResource({
  handleClose,
  resource,
  isAdding,
  handleOnAddSuccess,
  handleOnEditSuccess,
}: AddEditResourceProps) {
  const resourceForm = ResourceFormValidator.createResourceForm(resource);
  // mutation instance
  const resourceMutation = isAdding
    ? ResourceService.createResourceServiceMutation()
    : ResourceService.updateResourceServiceMutation();

  // handle submit form data
  const handleSubmit = (data: CreateResourceType) => {
    resourceMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.message);
        resourceForm.reset();
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
            `error ${isAdding ? "creating" : "updating"} content`
        );
      },
    });
  };
  return (
    <div className='absolute z-40  w-full top-0 right-0 flex justify-center items-center'>
      <div className='bg-white p-8  rounded-2xl shadow-lg border border-slate-100 animate-fade-in-up'>
        {resourceMutation.isPaused ? <BlockLoadingIndicator /> : null}
        <div className='flex justify-between items-center mb-6 border-b border-slate-100 pb-4'>
          <h3 className='text-xl font-bold text-brand-dark'>
            {isAdding ? "Create New" : "Update"} Content
          </h3>
          <button
            onClick={() => {
              handleClose();
              resourceForm.reset();
            }}
            className='p-2 hover:bg-slate-100 rounded-full'
          >
            <X className='w-5 h-5 text-slate-500' />
          </button>
        </div>

        <form
          onSubmit={resourceForm.handleSubmit(handleSubmit)}
          className='space-y-6'
        >
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Title
              </label>
              <input
                className='w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none'
                placeholder='Article Title'
                {...resourceForm.register("title")}
              />
              <FormErrorMessage
                message={resourceForm?.formState?.errors?.title?.message}
              />
            </div>
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Category
              </label>
              <select
                {...resourceForm.register("category")}
                className='w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none'
              >
                <option value='career_advice'>Career Advice</option>
                <option value='industry_trends'>Industry Trends</option>
                <option value='resume_tips'>Resume Tips</option>
                <option value='student_stories'>Student Stories</option>
              </select>
              <FormErrorMessage
                message={resourceForm?.formState?.errors?.category?.message}
              />
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Author
              </label>
              <input
                {...resourceForm.register("author")}
                className='w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none'
                placeholder='Author Name'
              />
              <FormErrorMessage
                message={resourceForm?.formState?.errors?.author?.message}
              />
            </div>
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>
                Image URL
              </label>
              <div className='relative'>
                <ImageIcon className='absolute left-3 top-3.5 w-5 h-5 text-slate-400' />
                <input
                  type='text'
                  className='w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none'
                  placeholder='https://...'
                  {...resourceForm.register("imageUrl")}
                />
                <FormErrorMessage
                  message={resourceForm?.formState?.errors?.imageUrl?.message}
                />
              </div>
            </div>
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              Summary
            </label>
            <input
              type='text'
              className='w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none'
              placeholder='Brief summary...'
              {...resourceForm.register("summary")}
            />
            <FormErrorMessage
              message={resourceForm?.formState?.errors?.summary?.message}
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-slate-700 mb-2'>
              Content (HTML supported)
            </label>
            <textarea
              rows={6}
              className='w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none font-mono text-sm'
              placeholder='<p>Write content here...</p>'
              {...resourceForm.register("body")}
            />
            <FormErrorMessage
              message={resourceForm?.formState?.errors?.body?.message}
            />
          </div>
          <div className='flex justify-end gap-3 pt-4'>
            <button
              type='button'
              onClick={() => {
                resourceForm.reset();
                handleClose();
              }}
              className='px-6 py-2 text-slate-600 font-medium'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-brand-teal hover:bg-brand-dark text-white px-8 py-2 rounded-lg font-bold transition-colors'
            >
              {isAdding ? "Publish" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditResource;
