import { z } from 'zod';
import {
  FolderTreeDtoSchema,
  FolderContentsSchema,
  FolderContentsQuerySchema,
  ApiErrorDataSchema,
  ApiErrorDataDtoSchema,
  UploadFileDtoSchema,
  CreateFolderDtoSchema,
} from './api.schema';
import type { File } from '../../file/entities/file';

export type FolderTreeDto = z.infer<typeof FolderTreeDtoSchema>;

export type FolderContentsDto = z.infer<typeof FolderContentsSchema>;
export type FolderContentsQuery = z.infer<typeof FolderContentsQuerySchema>;

export type CreateFolderDto = z.infer<typeof CreateFolderDtoSchema>;
export type UploadFileDto = z.infer<typeof UploadFileDtoSchema>;

export type FormattedFolderContentsDto = (
  | (Omit<File, 'size' | 'updatedAt' | 'createdAt'> & {
      size: string;
      updatedAt: string;
      createdAt: string;
      type: 'file';
    })
  | (Omit<FolderTreeDto, 'size' | 'updatedAt' | 'createdAt'> & {
      size: string;
      updatedAt: string;
      createdAt: string;
      type: 'folder';
    })
)[];

export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>;
export type ApiErrorDataDto = z.infer<typeof ApiErrorDataDtoSchema>;
