import { QueryProvider } from '@/shared/lib/providers/query-provider';
import ChatPage from '@/chat/pages/chat-page.ui';

function App() {
  return (
    <QueryProvider>
      <ChatPage />
    </QueryProvider>
  );
}

export default App;
