import { z } from 'zod';
import { FileSchema, FolderSchema, FolderTreeSchema } from './schema';

export type File = z.infer<typeof FileSchema>;
export type Folder = z.infer<typeof FolderSchema> & {
  children?: Folder[];
};
export type FolderTree = z.infer<typeof FolderTreeSchema>;

export const ROOT_SELECTION_VALUE = '/';
export const HOME_BREADCRUMB_INDEX = -1;
