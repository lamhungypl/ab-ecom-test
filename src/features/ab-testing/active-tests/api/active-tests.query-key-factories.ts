import {
  DefaultError,
  keepPreviousData,
  queryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

import {
  GetAllTestCampaignPayload,
  GetAllTestCampaignResponse,
} from '@/features/ab-testing/active-tests/api/active-tests.types';
import { getAllTestCampaign } from '@/features/ab-testing/test-creation/api/test-creation.api';

export const testKeys = {
  all: ['tests'] as const,
  lists: () => [...testKeys.all, 'list'] as const,
  listAll: (payload: GetAllTestCampaignPayload) => [...testKeys.lists(), 'all'] as const,
};

export type TestListAllQueriesOptions = Partial<
  UseQueryOptions<
    GetAllTestCampaignResponse,
    DefaultError,
    GetAllTestCampaignResponse,
    ReturnType<typeof testKeys.listAll>
  >
>;

export const testQueriesOptions = {
  listAll: (payload: GetAllTestCampaignPayload, options?: TestListAllQueriesOptions) => {
    return queryOptions({
      queryKey: testKeys.listAll(payload),
      queryFn: () => getAllTestCampaign(payload),
      placeholderData: keepPreviousData,
      ...options,
    });
  },
};
