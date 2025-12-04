import React, { useEffect } from 'react';
import Button from '../components/UI/Button';
import { ArrowLeft, Calendar, Tag, Share2, Printer } from 'lucide-react';
import { DetailsPageData } from '../types';

interface DetailsProps {
  data: DetailsPageData;
  onBack: () => void;
  onApplyNow: () => void;
}

const Details: React.FC<DetailsProps> = ({ data, onBack, onApplyNow }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <main className="flex-grow bg-white min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden">
        <img 
          src={data.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop"} 
          alt={data.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dsu-blue/90 via-dsu-blue/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 z-10">
          <div className="container mx-auto">
            <Button 
              onClick={onBack} 
              variant="ghost" 
              className="text-white hover:bg-white/20 mb-6 pl-0 hover:pl-4 transition-all"
            >
              <ArrowLeft className="mr-2" size={20} /> Back to Home
            </Button>
            
            <div className="flex items-center space-x-4 mb-4 text-white/80 text-sm font-medium uppercase tracking-wider">
              <span className="bg-dsu-gold text-dsu-blue px-3 py-1 rounded font-bold">{data.category}</span>
              {data.date && (
                <span className="flex items-center">
                  <Calendar size={14} className="mr-2" /> {data.date}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
              {data.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Article */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed">
              {data.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6">{paragraph}</p>
              ))}
              
              {/* Boilerplate extra content for demo purposes */}
              <h3 className="text-2xl font-bold text-dsu-blue mt-8 mb-4">Overview</h3>
              <p className="mb-6">
                Dayananda Sagar University is committed to providing exceptional opportunities for students. 
                This initiative reflects our ongoing dedication to academic excellence, research innovation, and 
                student success. We invite you to explore the possibilities and become part of our vibrant community.
              </p>
              
              <h3 className="text-2xl font-bold text-dsu-blue mt-8 mb-4">Key Highlights</h3>
              <ul className="list-disc pl-6 space-y-2 mb-8">
                <li>State-of-the-art infrastructure and facilities.</li>
                <li>Expert faculty with industry experience.</li>
                <li>Focus on holistic development and practical learning.</li>
                <li>Global partnerships and placement opportunities.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-dsu-blue mb-6 border-b border-gray-200 pb-4">Actions</h3>
              <div className="space-y-4">
                <Button onClick={onApplyNow} variant="primary" fullWidth className="shadow-lg shadow-yellow-400/20">
                  Apply Now for 2026
                </Button>
                <Button variant="outline" fullWidth className="justify-center">
                  <Share2 size={18} className="mr-2" /> Share this Page
                </Button>
                <Button variant="ghost" fullWidth className="justify-center text-gray-500 hover:text-dsu-blue">
                  <Printer size={18} className="mr-2" /> Print Details
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-700 mb-2">Have Questions?</h4>
                <p className="text-sm text-gray-500 mb-4">Contact our admissions office for more information.</p>
                <a href="tel:+918042161759" className="text-dsu-lightBlue font-semibold hover:underline block mb-1">
                  +91 80 4216 1759
                </a>
                <a href="mailto:admissions@dsu.edu.in" className="text-dsu-lightBlue font-semibold hover:underline block">
                  admissions@dsu.edu.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Details;