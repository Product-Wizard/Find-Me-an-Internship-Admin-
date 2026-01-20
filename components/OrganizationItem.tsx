import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import OrganizationService from "@/ApiService/OrganizationService";
import BlockLoadingIndicator from "./BlockLoadingIndicator";
import toast from "react-hot-toast";
import { OrganizationModelInterface } from "@/types/model/organization.model";
interface JobItemProps {
  organization: OrganizationModelInterface;
  page: number;
}

function OrganizationItem({ organization, page }: JobItemProps) {
  const queryClient = useQueryClient();
  const deleteOrganizationMutation =
    OrganizationService.deleteOrganizationServiceMutation();

  const refreshCurrentPage = () => {
    queryClient.invalidateQueries({
      queryKey: [
        ...ApiQueryMutationKeys.OrganizationMutationQueryKeys
          .getOrganizationsQueryKeys,
        page,
      ],
    });
  };
  const handleDeleteOrganization = () => {
    const isDelete = confirm(
      `Are you sure you want to delete ${organization.company_name}`
    );
    if (!isDelete) return;
    deleteOrganizationMutation.mutate(organization.id, {
      onSuccess: (data) => {
        toast.success(data.message || "organization deleted");
        refreshCurrentPage();
      },
      onError: (data: any) => {
        toast.error(
          data.response.message || data.message || "error deleting organization"
        );
      },
    });
  };
  return (
    <tr
      key={organization?.id}
      className='hover:bg-slate-50/50 transition-colors group'
    >
      {deleteOrganizationMutation.isPending ? <BlockLoadingIndicator /> : null}
      <td className='p-4'>
        <p className='font-bold text-brand-dark'>
          {organization?.company_name}
        </p>
      </td>
      <td className='p-4 text-sm text-slate-600'>
        <p className='font-bold text-brand-dark'>{organization?.email}</p>
      </td>
      <td className='p-4'>
        <p className='font-bold text-brand-dark'>{organization?.industry}</p>
      </td>
      <td className='p-4 text-sm text-slate-500'>
        {organization.company_size}
      </td>
      <td className='p-4 text-right'>
        <div className='flex justify-end gap-2'>
          <button
            onClick={handleDeleteOrganization}
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

export default OrganizationItem;
