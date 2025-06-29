import { FolderPlus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { CreateFolderDialog } from './create-folder-dialog';
import { useOverlay } from '@/shared/lib/hooks';
import { useCreateFolderMutation } from '../api/mutation';

type Props = {
  parentId?: string;
};

export function CreateFolderButton({ parentId }: Props) {
  const overlay = useOverlay();
  const { mutate: createFolder } = useCreateFolderMutation();

  const handleClick = async () => {
    const { isConfirmed, data: name } = await overlay.open<string>(({ isOpen, close, confirm }) => (
      <CreateFolderDialog isOpen={isOpen} onClose={close} onConfirm={confirm} />
    ));

    if (isConfirmed && name) {
      createFolder({ name, parentId: parentId ?? null });
    }
  };

  return (
    <Button type="button" variant="outline" onClick={handleClick}>
      <FolderPlus className="mr-1" />
      폴더 생성
    </Button>
  );
}
