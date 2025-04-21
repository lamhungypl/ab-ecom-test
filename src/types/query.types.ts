import '@tanstack/react-query';

import { InvalidateQueryFilters } from '@tanstack/react-query';

type MessageBuilder = (data: any) => string;
type QueryToast = {
  disableToast?: boolean;
  disableToastSuccess?: boolean;
  errorMessage?: string | MessageBuilder;
  successMessage?: string;
  title?: string;
};

type InvalidatesBuilder = <TData, TVariable>(builder: {
  data: TData;
  variable: TVariable;
}) => InvalidateQueryFilters;

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidates?: InvalidatesBuilder;
    } & QueryToast;

    queryMeta: {} & QueryToast;
  }
}
