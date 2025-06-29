import { useMutation, type UseMutationOptions, type DefaultError } from '@tanstack/react-query';
import { uploadFile } from '../../../../shared/api/api.service';
import { toFile } from '../../../../shared/api/api.lib';
import { queryClient } from '../../../../shared/lib/providers/query-provider';
import { fileQueries } from '../../../entities/file';
import type { UploadFileDto } from '@/shared/api/api.types';

export function useUploadFileMutation(
  options: Pick<
    UseMutationOptions<ReturnType<typeof toFile>, DefaultError, UploadFileDto>,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {}
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ['file', 'upload', ...mutationKey],

    mutationFn: (dto: UploadFileDto) => {
      return uploadFile(dto).then(toFile);
    },

    onMutate,
    onSuccess: async (uploadedFile, uploadData, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: fileQueries.getFolderContents().queryKey,
        }),
        onSuccess?.(uploadedFile, uploadData, context),
      ]);
    },

    onError,
    onSettled,
  });
}
