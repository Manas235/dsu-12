import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { FeatureItem, DetailsPageData } from '../../types';
import { ArrowRight, Lightbulb, Globe, Users } from 'lucide-react';

interface FeaturesProps {
  onLearnMore: (data: DetailsPageData) => void;
}

// Map backend string identifiers to React Components
const ICON_MAP: Record<string, React.ElementType> = {
  'Lightbulb': Lightbulb,
  'Globe': Globe,
  'Users': Users
};

const Features: React.FC<FeaturesProps> = ({ onLearnMore }) => {
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getFeatures();
        setFeatures(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLearnMoreClick = (e: React.MouseEvent, feature: FeatureItem) => {
    e.preventDefault();
    onLearnMore({
      title: feature.title,
      category: "Why DSU?",
      image: feature.image,
      content: `${feature.description}\n\nAt Dayananda Sagar University, we believe in fostering an environment where ${feature.title.toLowerCase()} thrives. Our commitment to this area includes dedicated resources, expert mentorship, and a curriculum designed to empower students. Whether you are looking to engage in groundbreaking research, connect with global peers, or experience a vibrant campus culture, DSU offers the platform you need to succeed.\n\nJoin us to experience world-class education that goes beyond the classroom.`
    });
  };

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-dsu-blue mb-4">Why Choose DSU?</h2>
           <div className="w-16 h-1 bg-dsu-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading 
            ? [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-4 animate-pulse h-96">
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))
            : features.map((feature, index) => {
              const IconComponent = ICON_MAP[feature.icon] || Lightbulb;
              return (
                <div key={index} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md text-dsu-blue">
                       <IconComponent size={24} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-dsu-blue mb-3 group-hover:text-dsu-lightBlue transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <button 
                      onClick={(e) => handleLearnMoreClick(e, feature)}
                      className="inline-flex items-center text-dsu-gold font-semibold text-sm hover:underline focus:outline-none"
                    >
                      Learn More <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </section>
  );
};

export default Features;