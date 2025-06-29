'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { getFileIcon } from '@/shared/lib/file-icon';
import { FolderIcon } from 'lucide-react';
import type { FormattedFolderContentsDto } from '@/shared/api/api.types';

type FileSystemItem = FormattedFolderContentsDto[number] & { isUploading?: boolean };

export const columns: ColumnDef<FileSystemItem>[] = [
  {
    accessorKey: 'name',
    header: '이름',
    cell: ({ row }) => {
      const item = row.original;

      if (item.type === 'file') {
        const { fileName, extension, isUploading } = item;
        return (
          <div
            className={`flex items-center gap-2 text-muted-foreground text-sm ${isUploading ? 'opacity-60 animate-pulse' : ''}`}
          >
            {getFileIcon(extension)}
            <div>
              <span>{fileName}</span>
              <span className="text-xs opacity-70">.{extension}</span>
              {isUploading && <span className="text-xs ml-2 text-blue-500">업로드 중...</span>}
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <FolderIcon className="h-4 w-4 text-blue-500" />
            <span>{item.name}</span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: 'updatedAt',
    header: '수정일',
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      const isUploading = row.original.type === 'file' && row.original.isUploading;
      return (
        <div className={`text-sm text-muted-foreground ${isUploading ? 'opacity-60' : ''}`}>
          {updatedAt}
        </div>
      );
    },
  },
  {
    accessorKey: 'size',
    header: () => <div className="text-right">크기</div>,
    cell: ({ row }) => {
      const { size } = row.original;
      const isUploading = row.original.type === 'file' && row.original.isUploading;
      return <div className={`text-right text-sm ${isUploading ? 'opacity-60' : ''}`}>{size}</div>;
    },
  },
];
