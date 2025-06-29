import { SearchFileInput } from '@/file/features/search-file/ui/search-file-input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import React from 'react';

// 루트 선택값과 빵조각 라벨을 정의
export const ROOT_SELECTION_VALUE = '/';
export const ROOT_BREADCRUMB_LABEL = 'Home';

interface SubToolbarProps {
  selectedPath: string;
  onPathClick: (path: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  rootFolderName: string;
}

export function SubToolbar({
  selectedPath,
  onPathClick,
  onSearch,
  searchQuery,
  rootFolderName,
}: SubToolbarProps) {
  const pathSegments =
    selectedPath === ROOT_SELECTION_VALUE ? [] : selectedPath.split('/').filter(Boolean);
  const showBreadcrumb = selectedPath === ROOT_SELECTION_VALUE || pathSegments.length > 0;

  const handleCrumbClick = (index: number) => {
    if (index === -1) {
      onPathClick(ROOT_SELECTION_VALUE);
    } else {
      const newPath = '/' + pathSegments.slice(0, index + 1).join('/');
      onPathClick(newPath);
    }
  };

  console.log(searchQuery);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b bg-background">
      <Breadcrumb>
        <BreadcrumbList>
          {showBreadcrumb && (
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCrumbClick(-1);
                }}
              >
                {rootFolderName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}

          {pathSegments.map((segment, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCrumbClick(idx);
                  }}
                >
                  {segment}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <SearchFileInput onSearch={onSearch} />
    </div>
  );
}
