import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { useDebounceCallback } from '@/shared/lib/hooks';

interface SearchFileInputProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  delay?: number;
}

export const SearchFileInput = ({
  onSearch,
  placeholder = '파일 검색',
  delay = 300,
}: SearchFileInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useDebounceCallback((query: string) => {
    onSearch?.(query);
  }, delay);

  const handleChange = (value: string) => {
    // input 값 즉시 업데이트
    setInputValue(value);
    // 검색은 debounce 처리
    debouncedSearch(value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
