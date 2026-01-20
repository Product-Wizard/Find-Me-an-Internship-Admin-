import OrganizationApi from "@/api/organizationApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import { ApiPaginationQuery, OrganizationQuery } from "@/global";


const fetchOrganizationsServiceQuery = (paginationQuery: ApiPaginationQuery & OrganizationQuery) => {
  return useQuery({
    queryFn: () => OrganizationApi.getOrganizations(paginationQuery),
    queryKey: [ ...ApiQueryMutationKeys.OrganizationMutationQueryKeys.getOrganizationsQueryKeys, paginationQuery.page ],
  });
}

const fetchOrganizationServiceQuery = (id: number) => {
  return useQuery({
    queryFn: () => OrganizationApi.getOrganization(id),
    queryKey: [ ...ApiQueryMutationKeys.OrganizationMutationQueryKeys.getOrganizationQueryKeys, id ]
  });
}

const deleteOrganizationServiceMutation = () => {
  return useMutation({
    mutationFn: OrganizationApi.deleteOrganization,
    mutationKey: ApiQueryMutationKeys.OrganizationMutationQueryKeys.deleteOrganizationMutationKeys
  });
}


const OrganizationService = {
  fetchOrganizationServiceQuery,
  fetchOrganizationsServiceQuery,
  deleteOrganizationServiceMutation,
}

export default OrganizationService;