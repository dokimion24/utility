import { Folder } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { FOLDER_TREE } from '@/file/entities/file';
import { ExpandButton } from './expand-button';

type FolderItemProps = {
  name: string;
  isSelected: boolean;
  hasChildren: boolean;
  isOpen: boolean;
  depth: number;
  onFolderClick: () => void;
  onToggleExpand: (e: React.MouseEvent) => void;
};

const getIndentStyle = (depth: number) => ({
  paddingLeft: `${depth * FOLDER_TREE.INDENT_SIZE + FOLDER_TREE.BASE_PADDING}px`,
});

export function FolderItem({
  name,
  isSelected,
  hasChildren,
  isOpen,
  depth,
  onFolderClick,
  onToggleExpand,
}: FolderItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 py-1 cursor-pointer hover:bg-gray-100 transition-colors',
        isSelected && 'bg-gray-200'
      )}
      style={getIndentStyle(depth)}
      onClick={onFolderClick}
    >
      {hasChildren && <ExpandButton isOpen={isOpen} onToggle={onToggleExpand} />}

      <Folder
        className={cn(
          'w-5 h-5 text-sky-500',
          !hasChildren && 'ml-6' // 화살표 버튼 크기만큼 왼쪽 마진
        )}
      />
      <span className="truncate flex-1 min-w-0">{name}</span>
    </div>
  );
}
