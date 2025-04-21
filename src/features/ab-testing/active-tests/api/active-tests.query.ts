import { useQuery } from '@tanstack/react-query';

import {
  TestListAllQueriesOptions,
  testQueriesOptions,
} from '@/features/ab-testing/active-tests/api/active-tests.query-key-factories';
import { GetAllTestCampaignPayload } from '@/features/ab-testing/active-tests/api/active-tests.types';

export const useTestCampaignListAllQuery = (
  payload: GetAllTestCampaignPayload,
  options?: TestListAllQueriesOptions
) => {
  return useQuery(testQueriesOptions.listAll(payload, options));
};
