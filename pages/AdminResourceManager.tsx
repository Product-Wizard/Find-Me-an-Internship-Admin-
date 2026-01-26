import { useState } from "react";
import { Plus, Search } from "lucide-react";
import AddEditResource from "@/components/AddEditResource";
import ResourceItem from "@/components/ResourceItem";
import ResourceApi from "@/api/resourceApi";
import ResourceService from "@/ApiService/ResourceSevice";
import { useQueryClient } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import Paginator from "@/components/Paginator";

const PER_PAGE = 20;

export const AdminResourceManager = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [addNewResource, setAddNewResource] = useState(false);
  const [search, setSearch] = useState("");
  const resourceQuery = ResourceService.fetchResourcesServiceQuery({
    page: page,
    perPage: PER_PAGE,
    author: search,
    body: search,
    category: search,
    title: search,
    summary: search,
  });

  const trigerFilterSearch = () => {
    setPage(1);
    setTimeout(
      () =>
        queryClient.invalidateQueries({
          queryKey: [
            ...ApiQueryMutationKeys.ResourceQuryMutationKeys
              .getResourcesQueryKeys,
            1,
          ],
        }),
      400
    );
  };

  const trigerRefreshSearch = () => {
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

  return (
    <div className='space-y-6 animate-fade-in'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-brand-dark'>
            Resource Center
          </h2>
          <p className='text-slate-500'>
            Manage blog posts and student guides.
          </p>
        </div>

        <button
          onClick={() => setAddNewResource(true)}
          className='w-full md:w-auto bg-brand-teal hover:bg-brand-dark text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-sm'
        >
          <Plus className='w-4 h-4' /> New Article
        </button>
      </div>

      <div className='flex items-center'>
        <input
          type='text'
          placeholder='Search resources by title, summary, job category...'
          className='w-full pl-10 p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-brand-teal'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onBlur={trigerFilterSearch}
        />
        <button type='submit' className=' rounded-lg bg-brand-teal p-3 ml-1'>
          <Search className='w-4 h-4 text-white' />
        </button>
      </div>

      {addNewResource ? (
        <AddEditResource
          isAdding={true}
          handleClose={() => setAddNewResource(false)}
          handleOnAddSuccess={trigerRefreshSearch}
        />
      ) : null}

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {(resourceQuery?.data?.data || []).map((resource: any) => (
          <ResourceItem page={page} key={resource.id} resource={resource} />
        ))}
      </div>

      {/* pagination */}
      <div>
        <Paginator
          currentPage={page}
          handlePageChange={setPage}
          pagination={resourceQuery?.data?.pagination}
        />
      </div>
    </div>
  );
};
