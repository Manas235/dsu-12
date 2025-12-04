import React from 'react';
import Hero from '../components/Home/Hero';
import AdmissionsInfo from '../components/Home/AdmissionsInfo';
import Features from '../components/Home/Features';
import Stats from '../components/Home/Stats';
import NewsEvents from '../components/Home/NewsEvents';
import Accreditations from '../components/Home/Accreditations';
import Facilities from '../components/Home/Facilities';
import { DetailsPageData } from '../types';

interface HomeProps {
  onApplyNow: () => void;
  onLearnMore: (data: DetailsPageData) => void;
}

const Home: React.FC<HomeProps> = ({ onApplyNow, onLearnMore }) => {
  return (
    <main className="flex-grow">
      <Hero onApplyNow={onApplyNow} />
      <Accreditations />
      <AdmissionsInfo onLearnMore={onLearnMore} />
      <Features onLearnMore={onLearnMore} />
      <Facilities onLearnMore={onLearnMore} />
      <Stats />
      <NewsEvents onLearnMore={onLearnMore} />
    </main>
  );
};

export default Home;