import { Trash2 } from "lucide-react";
import { NewsLetterSubscriberModelInterface } from "@/types/model/NewsLetterSubscriber.model";
import { useQueryClient } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import NewsLetterSubscriberSevice from "@/ApiService/NewsLetterSubscriberSevice";
import BlockLoadingIndicator from "./BlockLoadingIndicator";
import toast from "react-hot-toast";
interface NewsletterSubscriberItemProps {
  newsletterSubscriber: NewsLetterSubscriberModelInterface;
  page: number;
}

function NewsletterSubscriberItem({
  newsletterSubscriber,
  page,
}: NewsletterSubscriberItemProps) {
  const queryClient = useQueryClient();
  const deleteNewsletterSubscriberMutation =
    NewsLetterSubscriberSevice.deleteNewsLetterSubscriberServiceMutation();

  const refreshCurrentPage = () => {
    queryClient.invalidateQueries({
      queryKey: [
        ...ApiQueryMutationKeys.NewsLetterSubscriberApiQuryMutationKeys
          .getNewsLetterSubscribersApiQueryKeys,
        page,
      ],
    });
  };

  const handleDeleteNewsletterSubscriber = () => {
    const isDelete = confirm(`Are you sure you want to delete this subscriber`);
    if (!isDelete) return;
    deleteNewsletterSubscriberMutation.mutate(newsletterSubscriber.id, {
      onSuccess: (data) => {
        toast.success(data.message || "subscriber deleted");
        refreshCurrentPage();
      },
      onError: (data: any) => {
        toast.error(
          data.response.message || data.message || "error deleting subscriber"
        );
      },
    });
  };

  return (
    <tr
      key={newsletterSubscriber?.id}
      className='hover:bg-slate-50/50 transition-colors group'
    >
      {deleteNewsletterSubscriberMutation.isPending ? (
        <BlockLoadingIndicator />
      ) : null}
      <td className='p-4'>
        <p className='font-bold text-brand-dark'>{newsletterSubscriber?.id}</p>
      </td>
      <td className='p-4 text-sm text-slate-600'>
        <p className='font-bold text-brand-dark'>
          {newsletterSubscriber?.email}
        </p>
      </td>
      <td className='p-4'>
        <p className='font-bold text-brand-dark'>
          {newsletterSubscriber?.subscribedAt}
        </p>
      </td>
      <td className='p-4 text-right'>
        <div className='flex justify-end gap-2'>
          <button
            onClick={handleDeleteNewsletterSubscriber}
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

export default NewsletterSubscriberItem;
