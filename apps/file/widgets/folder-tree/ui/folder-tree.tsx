import {
  type FolderTree as FolderTreeType,
  type Folder as FolderType,
  hasChildren,
  getChildren,
} from '@/file/entities/file';
import { useState } from 'react';
import { FolderItem } from './folder-item';

type FolderTreeProps = {
  folderTree: FolderTreeType;
  selectedFolder?: FolderType;
  onSelect?: (folder: FolderType) => void;
  currentPath?: string;
  depth?: number;
};

// const buildNodePath = (currentPath: string, nodeName: string): string =>
//   currentPath ? `${currentPath}/${nodeName}` : nodeName;

const isNodeSelected = (
  selectedFolder: FolderType | undefined,
  currentFolder: FolderTreeType
): boolean => {
  if (!selectedFolder) return false;
  return selectedFolder.id === currentFolder.id;
};

export function FolderTree({ folderTree, selectedFolder, onSelect, depth = 0 }: FolderTreeProps) {
  const [isOpen, setIsOpen] = useState(false);

  // const nodePath = buildNodePath(currentPath, folderTree.name);
  const folderChildren = getChildren(folderTree);
  const isSelected = isNodeSelected(selectedFolder, folderTree);
  const nodeHasChildren = hasChildren(folderTree);

  const handleFolderClick = () => {
    onSelect?.(folderTree);
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <FolderItem
        name={folderTree.name}
        isSelected={isSelected}
        hasChildren={nodeHasChildren}
        isOpen={isOpen}
        depth={depth}
        onFolderClick={handleFolderClick}
        onToggleExpand={handleToggleExpand}
      />

      {isOpen && nodeHasChildren && (
        <div>
          {folderChildren.map((child) => (
            <FolderTree
              key={child.name}
              folderTree={child}
              selectedFolder={selectedFolder}
              onSelect={onSelect}
              currentPath={child.path}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
