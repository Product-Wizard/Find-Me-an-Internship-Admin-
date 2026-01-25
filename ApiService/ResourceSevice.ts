import ResourceApi from "@/api/resourceApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiQueryMutationKeys from "@/consts/ApiQueryMutationKeys";
import { ApiPaginationQuery, ResourceQuery } from "@/global";
import { ResourceModelInterface, CreateResourceType } from "@/types/model/Resource.model";


const createResourceServiceMutation = () => {
  return useMutation({
    mutationFn: ResourceApi.createResource,
    mutationKey: ApiQueryMutationKeys.ResourceQuryMutationKeys.createResourceMutationKeys
  });
}

const updateResourceServiceMutation = () => {
  return useMutation({
    mutationFn: ResourceApi.updateResource,
    mutationKey: ApiQueryMutationKeys.ResourceQuryMutationKeys.updateResourceMutationKeys
  });
}

const deleteResourceServiceMutation = () => {
  return useMutation({
    mutationFn: ResourceApi.deleteResource,
    mutationKey: ApiQueryMutationKeys.ResourceQuryMutationKeys.deleteResourceMutationKeys
  });
}

const fetchResourcesServiceQuery = (paginationQuery: ApiPaginationQuery & ResourceQuery) => {
  return useQuery({
    queryFn: () => ResourceApi.getResources(paginationQuery),
    queryKey: [ ...ApiQueryMutationKeys.ResourceQuryMutationKeys.getResourcesQueryKeys, paginationQuery.page ],
  });
}

const fetchResourceServiceQuery = (id: number) => {
  return useQuery({
    queryFn: () => ResourceApi.getResource(id),
    queryKey: [ ...ApiQueryMutationKeys.ResourceQuryMutationKeys.getResourceQueryKeys, id ]
  });
}


const ResourceService = {
  createResourceServiceMutation,
  updateResourceServiceMutation,
  deleteResourceServiceMutation,
  fetchResourcesServiceQuery,
  fetchResourceServiceQuery
}

export default ResourceService;