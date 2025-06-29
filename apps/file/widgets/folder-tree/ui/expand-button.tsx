import { ChevronRight } from 'lucide-react';

type ExpandButtonProps = {
  isOpen: boolean;
  onToggle: (e: React.MouseEvent) => void;
};

export function ExpandButton({ isOpen, onToggle }: ExpandButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 -m-1"
      aria-label={isOpen ? '폴더 접기' : '폴더 펼치기'}
    >
      <ChevronRight
        className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-90' : ''}`}
      />
    </button>
  );
}
