import React from 'react';
import { MessageCircle, Phone, Globe } from 'lucide-react';

interface FloatingActionsProps {
  onApplyNow: () => void;
  onNavigate?: (pageId: string) => void;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({ onApplyNow, onNavigate }) => {
  
  const handleVirtualTour = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate('virtual-tour');
  };

  return (
    <div className="fixed right-0 top-1/3 z-50 hidden md:flex flex-col shadow-2xl">
      
      {/* Apply Now - Vertical Text */}
      <button 
        onClick={onApplyNow}
        className="bg-dsu-red text-white w-12 py-6 flex items-center justify-center hover:bg-red-700 transition-colors relative group"
      >
        <span className="writing-vertical-rl text-sm font-bold tracking-wider rotate-180 whitespace-nowrap">APPLY NOW</span>
        {/* Tooltip */}
        <div className="absolute right-full top-0 h-full bg-dsu-red text-white px-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Start Application
        </div>
      </button>

      {/* Enquire - Orange Phone */}
      <a 
        href="tel:+918042161759"
        className="bg-orange-500 text-white w-12 h-12 flex items-center justify-center hover:bg-orange-600 transition-colors relative group"
      >
        <Phone size={20} fill="currentColor" />
         <div className="absolute right-full top-0 h-full bg-orange-500 text-white px-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Call Us: +91 80 4216 1759
        </div>
      </a>

      {/* WhatsApp - Green */}
      <a 
        href="https://wa.me/918042161759"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white w-12 h-12 flex items-center justify-center hover:bg-green-600 transition-colors relative group"
      >
        <MessageCircle size={20} fill="currentColor" />
         <div className="absolute right-full top-0 h-full bg-green-500 text-white px-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp
        </div>
      </a>

      {/* Virtual Tour/Globe - Pinkish/Purple */}
      <a 
        href="#"
        onClick={handleVirtualTour}
        className="bg-pink-700 text-white w-12 h-12 flex items-center justify-center hover:bg-pink-800 transition-colors relative group"
      >
        <Globe size={20} />
         <div className="absolute right-full top-0 h-full bg-pink-700 text-white px-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Virtual Tour
        </div>
      </a>

      <style>{`
        .writing-vertical-rl {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
};

export default FloatingActions;