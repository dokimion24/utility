import { UploadCloud } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useRef } from 'react';
import { useUploadFileMutation } from '../api/mutation';

interface UploadFileButtonProps {
  parentId?: string;
}

export function UploadFileButton({ parentId }: UploadFileButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadFileMutation = useUploadFileMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFileMutation.mutate({ file, parentId });
    }
  };

  return (
    <>
      <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={uploadFileMutation.isPending}
      >
        <UploadCloud className="mr-1" />
        파일 업로드
      </Button>
    </>
  );
}
