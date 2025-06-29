import type { FolderTree } from '../model/types';

export const hasChildren = (node: FolderTree): boolean => {
  return Boolean(node.children && node.children.length > 0);
};

export const getChildren = (node: FolderTree): FolderTree[] => {
  return node.children || [];
};
