import { useMutation, type UseMutationOptions, type DefaultError } from '@tanstack/react-query';
import { createFolder } from '../../../../shared/api/api.service';
import { toFolderTree } from '../../../../shared/api/api.lib';
import { queryClient } from '../../../../shared/lib/providers/query-provider';
import { fileQueries } from '../../../entities/file';
import type { CreateFolderDto } from '@/shared/api/api.types';

export function useCreateFolderMutation(
  options: Pick<
    UseMutationOptions<ReturnType<typeof toFolderTree>, DefaultError, CreateFolderDto>,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {}
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ['file', 'upload', ...mutationKey],

    mutationFn: async (dto: CreateFolderDto) => {
      const createdFolder = await createFolder(dto);
      return toFolderTree(createdFolder);
    },

    onMutate,
    onSuccess: async (createdFolder, createData, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: fileQueries.getFolderTree().queryKey,
        }),
        onSuccess?.(createdFolder, createData, context),
      ]);
    },

    onError,
    onSettled,
  });
}
