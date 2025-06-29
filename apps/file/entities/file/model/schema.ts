import { z } from 'zod';

export const FileSchema = z.object({
  id: z.string().uuid(),
  fileName: z.string(),
  extension: z.string(),
  size: z.number().int().nonnegative(),
  mimeType: z.string(),
  parentId: z.string().uuid().nullable(),
  path: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const FolderSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number().int().nonnegative(),
  path: z.string(),
  parentId: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const FolderTreeSchema: z.ZodType<
  z.infer<typeof FolderSchema> & { children?: z.infer<typeof FolderTreeSchema>[] }
> = z.lazy(() =>
  FolderSchema.extend({
    children: z.array(FolderTreeSchema).optional(),
  })
);
