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
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Skills } from './components/sections/Skills';
import { Blog } from './components/sections/Blog';
// import { Projects } from './components/sections/Projects';
// import { Contact } from './components/sections/Contact';

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
              <Education />
              <Experience />
              <Skills />
              <Blog />
              {/* <Projects /> */}
              {/* <Contact /> */}
              
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