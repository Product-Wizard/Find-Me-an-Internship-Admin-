import { useState } from "react";
import { Search } from "lucide-react";
import NewsLetterSubscriberSevice from "@/ApiService/NewsLetterSubscriberSevice";
import BlockLoadingIndicator from "@/components/BlockLoadingIndicator";
import Paginator from "@/components/Paginator";
import { useQueryClient } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import NewsletterSubscriberItem from "@/components/NewsletterSubscriberItem";

const ITEMS_PER_PAGE = 20;

const NewsletterSubscriberPage = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const fetchNewsLetterSubscribersQuery =
    NewsLetterSubscriberSevice.getNewsLetterSubscribersServiceMutation({
      page: currentPage || 1,
      perPage: ITEMS_PER_PAGE,
      email: filter,
      // id: filter,
    });

  // Reset pagination when filters change
  const trigerFilterSearch = () => {
    setCurrentPage(1);
    queryClient.invalidateQueries({
      queryKey: [
        ...ApiQueryMutationKeys.NewsLetterSubscriberApiQuryMutationKeys
          .getNewsLetterSubscribersApiQueryKeys,
        1,
      ],
    });
  };

  return (
    <div className='space-y-6 animate-fade-in w-full max-w-full overflow-x-auto'>
      {fetchNewsLetterSubscribersQuery.isPending ||
      fetchNewsLetterSubscribersQuery.isLoading ? (
        <BlockLoadingIndicator />
      ) : null}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-brand-dark'>
            Newsletter Subscribers
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
                placeholder='Search by newsletter subsciber by email or id...'
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
        <div className='overflow-x-auto'>
          <table className='w-full text-left min-w-[800px]'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Subscribers ID
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Email
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase'>
                  Subscribed At
                </th>
                <th className='p-4 text-xs font-bold text-slate-500 uppercase text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {(fetchNewsLetterSubscribersQuery?.data?.data || []).map(
                (newsletterSubscriber) => (
                  <NewsletterSubscriberItem
                    page={currentPage}
                    newsletterSubscriber={newsletterSubscriber}
                    key={newsletterSubscriber?.id?.toString()}
                  />
                )
              )}
            </tbody>
          </table>
        </div>

        {(fetchNewsLetterSubscribersQuery?.data?.data || []).length === 0 ? (
          <div className='p-12 text-center text-slate-400'>
            No newsletter subscriber found matching your filters.
          </div>
        ) : (
          <Paginator
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            pagination={fetchNewsLetterSubscribersQuery?.data?.pagination}
          />
        )}
      </div>
    </div>
  );
};

export default NewsletterSubscriberPage;
