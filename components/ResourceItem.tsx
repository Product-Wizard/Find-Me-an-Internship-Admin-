import {
  CreateResourceType,
  ResourceModelInterface,
} from "@/types/model/Resource.model";
import { Trash2, Edit2Icon } from "lucide-react";
import AddEditResource from "./AddEditResource";
import BlockLoadingIndicator from "./BlockLoadingIndicator";
import ResourceService from "@/ApiService/ResourceSevice";
import { useQueryClient } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import { useState } from "react";
import toast from "react-hot-toast";

interface ResourceItemProps {
  resource: ResourceModelInterface;
  page: number;
}
function ResourceItem({ resource, page }: ResourceItemProps) {
  const queryClient = useQueryClient();
  const deleteResourceMutation =
    ResourceService.deleteResourceServiceMutation();
  const [edit, setEdit] = useState(false);

  const data: CreateResourceType & { id: number } = {
    id: resource.id,
    author: resource.author,
    body: resource.body,
    category: resource.category,
    summary: resource.summary,
    imageUrl: resource.imageUrl,
    title: resource.title,
  };

  const trigerRefreshPage = () => {
    setTimeout(
      () =>
        queryClient.invalidateQueries({
          queryKey: [
            ...ApiQueryMutationKeys.ResourceQuryMutationKeys
              .getResourcesQueryKeys,
            page,
          ],
        }),
      400
    );
  };

  const handleDeleteResource = () => {
    const isDelete = confirm("are you sure you want to delete this resource ?");
    if (isDelete == false) return;
    deleteResourceMutation.mutate(resource.id, {
      onSuccess: (data) => {
        toast.success(data.message || "resource deleted");
        trigerRefreshPage();
      },
      onError: (data: any) => {
        toast.error(
          data.response.message || data.message || "error deleting resource"
        );
      },
    });
  };
  return (
    <div
      key={resource.id}
      className='bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col group hover:shadow-md transition-shadow'
    >
      {edit ? (
        <AddEditResource
          handleClose={() => setEdit(false)}
          isAdding={false}
          handleOnEditSuccess={trigerRefreshPage}
          resource={data}
        />
      ) : null}
      {deleteResourceMutation.isPaused ? <BlockLoadingIndicator /> : null}
      <div className='relative h-40 mb-4 rounded-lg overflow-hidden'>
        <img
          src={resource.imageUrl || "https://via.placeholder.com/400"}
          className='w-full h-full object-cover'
          alt={resource.title}
        />
        <div className='absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
          <button
            onClick={handleDeleteResource}
            className='bg-white/90 p-2 rounded-full text-red-500 hover:text-red-700'
          >
            <Trash2 className='w-4 h-4' />
          </button>
          <button
            onClick={() => setEdit(true)}
            className='bg-white/90 p-2 rounded-full text-blue-500 hover:text-blue-700'
          >
            <Edit2Icon className='w-4 h-4' />
          </button>
        </div>
      </div>
      <div className='mb-2'>
        <span className='text-xs capitalize font-bold text-brand-teal bg-brand-teal/10 px-2 py-1 rounded'>
          {resource.category?.replaceAll("_", " ")}
        </span>
      </div>
      <h3 className='font-bold text-brand-dark mb-2 line-clamp-2'>
        {resource.title}
      </h3>
      <div className='mt-auto pt-4 flex justify-between items-center text-xs text-slate-500 border-t border-slate-50'>
        <span>{resource.author}</span>
        <span>{resource.dateUploaded}</span>
      </div>
    </div>
  );
}

export default ResourceItem;
