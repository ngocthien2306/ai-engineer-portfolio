// src/App.tsx
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { QueryProvider } from '@/store/providers/QueryProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Loading } from '@/components/ui/Loading';
import { useUIStore } from '@/store';

function App() {
  const { isLoading } = useUIStore();
  
  return (
    <HelmetProvider>
      <QueryProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors">
            {isLoading && <Loading fullScreen />}
            <Header />
            <main>
              <Hero />
              <About />
              {/* Add other sections here */}
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </QueryProvider>
    </HelmetProvider>
  );
}

export default App;