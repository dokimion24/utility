import { ZodType } from 'zod';
import { formatDate, formatFileSize } from '../lib/format';
import type { File, Folder, FolderTree } from '../../file/entities/file';
import type { FormattedFolderContentsDto } from './api.types';

/**
 * Ky의 Response 객체에서 JSON을 읽어와 Zod 스키마로 검증 후 반환하는 헬퍼
 */
export function parseResponseJson<Data>(schema: ZodType<Data>) {
  return async (response: Response): Promise<Data> => {
    const json = await response.json();
    return schema.parse(json);
  };
}

export function toFolderContents(items: (File | Folder)[]): FormattedFolderContentsDto {
  return items.map((item) => ({
    ...item,
    size: formatFileSize(item.size),
    createdAt: formatDate(item.createdAt),
    updatedAt: formatDate(item.updatedAt),
    type: 'fileName' in item ? ('file' as const) : ('folder' as const),
  })) as FormattedFolderContentsDto;
}

export const toFile = (file: File) => {
  return {
    ...file,
    size: formatFileSize(file.size),
    updatedAt: formatDate(file.updatedAt),
    createdAt: formatDate(file.createdAt),
  };
};

export const toFolderTree = (folderTree: FolderTree): FolderTree => {
  return {
    ...folderTree,
    createdAt: formatDate(folderTree.createdAt),
    updatedAt: formatDate(folderTree.updatedAt),
    children: folderTree.children?.map(toFolderTree),
  };
};
