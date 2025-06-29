// src/shared/api/api.service.ts  (혹은 entities/file.api.ts)

import { MOCK_FOLDER_TREE } from './api.constant';
import { api } from './api.instance';
import { FileDtoSchema, FolderTreeDtoSchema } from './api.schema';

import type { Options } from 'ky';
import type {
  CreateFolderDto,
  FolderContentsDto,
  FolderContentsQuery,
  FolderTreeDto,
  UploadFileDto,
} from './api.types';

export async function getFolderTree(options?: Options): Promise<FolderTreeDto> {
  // const res = await api('folders/tree', {
  //   method: 'GET',
  //   ...options,
  // }).json<FolderTreeDto>();
  // return FolderTreeDtoSchema.parse(res);
  console.log(options);
  await new Promise((resolve) => setTimeout(resolve, 100));
  return MOCK_FOLDER_TREE as unknown as FolderTreeDto;
}

export async function createFolder(dto: CreateFolderDto) {
  const res = await api('File/CreateVirtualFolder', {
    method: 'POST',
    headers: {
      RequestVerificationToken: (
        document.querySelector('input[name="__RequestVerificationToken"]') as HTMLInputElement
      )?.value,
    },
    json: dto,
  }).json<FolderTreeDto>();
  return FolderTreeDtoSchema.parse(res);
}

export async function getFolderContents(query: FolderContentsQuery = {}, options?: Options) {
  const { folderId, ...searchParams } = query;

  const endPoint = folderId ? `folders/${folderId}/contents` : `folders/contents`;

  const res = await api(endPoint, {
    method: 'GET',
    searchParams,
    ...options,
  }).json<FolderContentsDto>();
  return res;

  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // return toFolderContents([...MOCK_FILES, ...MOCK_FOLDERS]);
}

export async function uploadFile(dto: UploadFileDto, _options?: Options) {
  const { file, parentId } = dto;
  const formData = new FormData();
  formData.append('file', file);
  if (parentId) {
    formData.append('parentId', parentId);
  }

  const res = await api('files/upload', {
    method: 'POST',
    body: formData,
    ..._options,
  }).json<UploadFileDto>();
  return FileDtoSchema.parse(res);
}
