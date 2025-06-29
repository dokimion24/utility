import { z } from 'zod';
import { FileSchema, FolderTreeSchema } from '../../file/entities/file/model/schema';

export const FolderTreeDtoSchema = FolderTreeSchema;

export const CreateFolderDtoSchema = z.object({
  parentId: z.string().nullable(),
  name: z.string(),
});

export const FileDtoSchema = FileSchema;
export const UploadFileDtoSchema = z.object({
  file: z.instanceof(File),
  parentId: z.string().uuid().optional(),
});

export const FolderContentsSchema = z.array(z.union([FileDtoSchema, FolderTreeDtoSchema]));

export const FolderContentsQuerySchema = z.object({
  folderId: z.string().optional(),
  name: z.string().optional(),
});

// 파일 검색용 추가 필드 스키마
// export const FileSearchExtraSchema = z.object({
//   folderName: z.string().optional(),
//   matchType: z.enum(['filename', 'content']).optional(),
// });

// export const FileSearchDtoSchema = z.object({
//   files: z.array(z.any()), // 타입은 FileDto[]로 별도 정의
//   totalCount: z.number(),
// });

// export const FileSearchQuerySchema = z.object({
//   q: z.string().min(1),
//   folderId: z.string().uuid().optional(),
//   fileType: z.enum(['pdf', 'doc', 'docx', 'txt', 'jpg', 'png', 'gif', 'mp4', 'mp3']).optional(),
// });

export const ApiErrorDataDtoSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

export const ApiErrorDataSchema = z.array(z.string());

export const FolderContentsDtoSchema = z.array(z.union([FileSchema, FolderTreeDtoSchema]));

export const FormattedFolderContentsSchema = z.array(
  z.object({
    // ... existing code ...
  })
);
