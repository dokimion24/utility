import { CreateFolderButton } from '@/file/features/create-folder/ui/create-folder-button';
import { UploadFileButton } from '@/file/features/upload-file/ui/upload-file-button';

interface ToolbarProps {
  selectedFolderId?: string;
}

export function Toolbar({ selectedFolderId }: ToolbarProps) {
  return (
    <div className="flex gap-2 p-2 border-b bg-muted">
      <CreateFolderButton parentId={selectedFolderId} />
      <UploadFileButton parentId={selectedFolderId} />
    </div>
  );
}
