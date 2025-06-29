import { queryOptions, keepPreviousData } from '@tanstack/react-query';
import { getFolderTree, getFolderContents } from '../../../../shared/api/api.service';

import { queryClient } from '../../../../shared/lib/providers/query-provider';
import type { FolderContentsQuery } from '../../../../shared/api/api.types';
import { toFolderContents, toFolderTree } from '@/shared/api/api.lib';

export const FILE_QUERY_KEY = ['file'];

export const fileQueries = {
  getFolderTree: () =>
    queryOptions({
      queryKey: [...FILE_QUERY_KEY, 'getFolderTree'],
      queryFn: () => {
        return getFolderTree().then(toFolderTree);
      },
      placeholderData: keepPreviousData,
      initialData: () => queryClient.getQueryData([...FILE_QUERY_KEY, 'getFolderTree']),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState([...FILE_QUERY_KEY, 'getFolderTree'])?.dataUpdatedAt,
    }),

  getFolderContents: (query: FolderContentsQuery = {}) =>
    queryOptions({
      queryKey: [...FILE_QUERY_KEY, 'getFolderContents', query],
      queryFn: () => getFolderContents(query).then(toFolderContents),
      placeholderData: keepPreviousData,
      initialData: () => queryClient.getQueryData([...FILE_QUERY_KEY, 'getFolderContents', query]),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState([...FILE_QUERY_KEY, 'getFolderContents', query])?.dataUpdatedAt,
    }),
};
