export const FILE_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
  DOCUMENT: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
  SPREADSHEET: ['xls', 'xlsx', 'csv'],
  PRESENTATION: ['ppt', 'pptx'],
  AUDIO: ['mp3', 'wav', 'flac', 'aac'],
  VIDEO: ['mp4', 'avi', 'mov', 'wmv', 'flv'],
  ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz'],
  CODE: ['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'scss', 'json', 'xml'],
} as const;

export const FOLDER_TREE = {
  INDENT_SIZE: 24,
  BASE_PADDING: 16,
  EXPAND_BUTTON_SIZE: 22,
} as const;
