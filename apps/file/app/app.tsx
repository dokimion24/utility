import FilePage from '@/file/pages/file-page';
import { QueryProvider } from '@/shared/lib/providers/query-provider';
import { OverlayProvider } from '@/shared/lib/providers/overlay-provider';

function App() {
  return (
    <QueryProvider>
      <OverlayProvider>
        <FilePage />
      </OverlayProvider>
    </QueryProvider>
  );
}

export default App;
