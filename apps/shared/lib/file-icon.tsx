import {
  FileText,
  FileImage,
  FileVideo,
  FileMusic,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FileX,
  File as FileIcon,
  Folder,
} from 'lucide-react';

export const getFileIcon = (extension: string, isFolder = false) => {
  // 폴더인 경우
  if (isFolder) {
    return <Folder className="w-4 h-4 text-blue-400" />;
  }

  const ext = extension.toLowerCase();

  // 텍스트/문서 파일
  if (['txt', 'md', 'doc', 'docx', 'pdf', 'rtf'].includes(ext)) {
    return <FileText className="w-4 h-4 text-blue-500" />;
  }

  // 이미지 파일
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'].includes(ext)) {
    return <FileImage className="w-4 h-4 text-green-500" />;
  }

  // 비디오 파일
  if (['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'].includes(ext)) {
    return <FileVideo className="w-4 h-4 text-purple-500" />;
  }

  // 오디오 파일
  if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'].includes(ext)) {
    return <FileMusic className="w-4 h-4 text-pink-500" />;
  }

  // 압축 파일
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(ext)) {
    return <FileArchive className="w-4 h-4 text-orange-500" />;
  }

  // 코드 파일
  if (
    [
      'js',
      'ts',
      'jsx',
      'tsx',
      'html',
      'css',
      'scss',
      'json',
      'xml',
      'py',
      'java',
      'cpp',
      'c',
      'cs',
      'php',
      'rb',
      'go',
      'rs',
    ].includes(ext)
  ) {
    return <FileCode className="w-4 h-4 text-yellow-500" />;
  }

  // 스프레드시트 파일
  if (['xls', 'xlsx', 'csv', 'ods'].includes(ext)) {
    return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />;
  }

  // 실행 파일
  if (['exe', 'msi', 'dmg', 'pkg', 'deb', 'rpm'].includes(ext)) {
    return <FileX className="w-4 h-4 text-red-500" />;
  }

  // 기본 파일 아이콘
  return <FileIcon className="w-4 h-4 text-gray-500" />;
};

// 파일 타입별 색상을 반환하는 유틸리티 함수
export const getFileTypeColor = (extension: string) => {
  const ext = extension.toLowerCase();

  if (['txt', 'md', 'doc', 'docx', 'pdf', 'rtf'].includes(ext)) return 'text-blue-500';
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'].includes(ext)) return 'text-green-500';
  if (['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'].includes(ext)) return 'text-purple-500';
  if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'].includes(ext)) return 'text-pink-500';
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(ext)) return 'text-orange-500';
  if (
    [
      'js',
      'ts',
      'jsx',
      'tsx',
      'html',
      'css',
      'scss',
      'json',
      'xml',
      'py',
      'java',
      'cpp',
      'c',
      'cs',
      'php',
      'rb',
      'go',
      'rs',
    ].includes(ext)
  )
    return 'text-yellow-500';
  if (['xls', 'xlsx', 'csv', 'ods'].includes(ext)) return 'text-emerald-500';
  if (['exe', 'msi', 'dmg', 'pkg', 'deb', 'rpm'].includes(ext)) return 'text-red-500';

  return 'text-gray-500';
};
