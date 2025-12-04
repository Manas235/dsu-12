import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FloatingActions from './components/Layout/FloatingActions';
import Home from './pages/Home';
import Details from './pages/Details';
import ApplyModal from './components/Admissions/ApplyModal';
import { DetailsPageData } from './types';
import { PAGE_CONTENT } from './constants';

function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [view, setView] = useState<'home' | 'details'>('home');
  const [detailsData, setDetailsData] = useState<DetailsPageData | null>(null);

  const handleApplyNow = () => {
    setIsApplyModalOpen(true);
  };

  const handleLearnMore = (data: DetailsPageData) => {
    setDetailsData(data);
    setView('details');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setView('home');
    window.scrollTo(0, 0);
  };

  const handlePageNavigation = (pageId?: string) => {
    if (!pageId) {
      handleGoHome();
      return;
    }

    const content = PAGE_CONTENT[pageId];
    if (content) {
      setDetailsData(content);
      setView('details');
      window.scrollTo(0, 0);
    } else {
      // Fallback for IDs that might be sections on home page or unrecognized
      if (pageId === 'home') {
        handleGoHome();
      } else {
        console.warn(`No content found for pageId: ${pageId}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 antialiased bg-white selection:bg-dsu-gold selection:text-dsu-blue">
      <Header 
        onApplyNow={handleApplyNow} 
        onGoHome={handleGoHome} 
        onNavigate={handlePageNavigation}
      />
      <FloatingActions 
        onApplyNow={handleApplyNow} 
        onNavigate={handlePageNavigation}
      />
      
      {view === 'home' ? (
        <Home onApplyNow={handleApplyNow} onLearnMore={handleLearnMore} />
      ) : (
        detailsData && (
          <Details 
            data={detailsData} 
            onBack={handleGoHome} 
            onApplyNow={handleApplyNow} 
          />
        )
      )}
      
      <Footer />
      <ApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />
    </div>
  );
}

export default App;