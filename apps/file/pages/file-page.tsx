import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FolderTree } from '@/file/widgets/folder-tree';

import { Toolbar } from '@/file/widgets/toolbar';
import { SubToolbar } from '@/file/widgets/sub-toolbar';
import { fileQueries, type Folder, ROOT_SELECTION_VALUE } from '@/file/entities/file';

import { DataTable, columns } from '@/file/widgets/file-table';

const findFolderByPath = (folder: Folder, path: string): Folder | null => {
  if (folder.path === path) {
    return folder;
  }
  if (folder.children) {
    for (const child of folder.children) {
      const found = findFolderByPath(child, path);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export default function FilePage() {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const folderContentsParams = {
    ...(selectedFolder?.id && { folderId: selectedFolder.id }),
    ...(searchQuery.trim() && { name: searchQuery }),
  };

  const { data: folderTree } = useQuery(fileQueries.getFolderTree());
  const { data: folderContents } = useQuery(fileQueries.getFolderContents(folderContentsParams));

  if (!folderTree) return null;

  const handlePathChange = (path: string) => {
    const targetFolder = findFolderByPath(folderTree, path);
    console.log('targetFolder', targetFolder);
    if (targetFolder) {
      setSelectedFolder(targetFolder);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Toolbar selectedFolderId={selectedFolder?.id} />

      <div className="flex flex-1 min-h-0">
        <aside className="w-64 border-r bg-muted/50 py-1 overflow-y-auto">
          <FolderTree
            folderTree={folderTree}
            selectedFolder={selectedFolder ?? undefined}
            onSelect={setSelectedFolder}
          />
        </aside>

        <section className="flex-1 overflow-y-auto">
          <SubToolbar
            selectedPath={selectedFolder?.path ?? ROOT_SELECTION_VALUE}
            onPathClick={handlePathChange}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            rootFolderName={folderTree.name}
          />

          <div>
            {folderContents && folderContents.length > 0 ? (
              <DataTable columns={columns} data={folderContents} />
            ) : (
              <div className="text-muted-foreground text-center text-md py-8">
                {searchQuery
                  ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
                  : selectedFolder
                    ? '이 폴더에 파일이 없습니다.'
                    : '새 폴더/파일을 추가해보세요.'}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
