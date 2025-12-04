import React, { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { TOP_BAR_LINKS, MAIN_NAV_LINKS } from '../../constants';
import Button from '../UI/Button';

interface HeaderProps {
  onApplyNow: () => void;
  onGoHome?: () => void;
  onNavigate?: (pageId?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onApplyNow, onGoHome, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileExpand = (e: React.MouseEvent, label: string) => {
    e.stopPropagation();
    if (mobileExpanded === label) {
      setMobileExpanded(null);
    } else {
      setMobileExpanded(label);
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent, pageId?: string, href?: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (onNavigate && pageId) {
      onNavigate(pageId);
    } else if (href === '/' || href === '#') {
      if (onGoHome) onGoHome();
    } else if (href?.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (onGoHome) {
         onGoHome();
         setTimeout(() => {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
         }, 100);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGoHome) onGoHome();
    window.scrollTo(0, 0);
  };

  return (
    <header className="w-full z-50 font-sans relative bg-white">
      
      {/* Top Row: Logo & Quick Links */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-4 mb-4 lg:mb-0 cursor-pointer" onClick={handleLogoClick}>
             <img 
                src="https://upload.wikimedia.org/wikipedia/en/4/4c/Dayananda_Sagar_University_logo.png" 
                alt="DSU Logo" 
                className="h-20 lg:h-24 w-auto object-contain shrink-0"
              />
          </div>

          {/* Right Side Content */}
          <div className="flex flex-col items-end space-y-2">
            
            {/* Search Bar Row */}
            <div className="hidden lg:flex w-full justify-end mb-1">
              <div className="flex bg-dsu-cyan rounded-sm overflow-hidden">
                <input 
                  type="text" 
                  placeholder="Search ..." 
                  className="bg-dsu-cyan text-white placeholder-blue-100 px-3 py-1 text-sm outline-none w-48"
                />
                <button className="bg-dsu-lightBlue text-white px-3 py-1 text-xs font-bold uppercase border-l border-blue-400">Search</button>
              </div>
            </div>

            {/* Top Links Row */}
            <div className="hidden lg:flex flex-wrap justify-end items-center gap-1 text-[11px] lg:text-[12px] font-medium text-gray-600">
              {TOP_BAR_LINKS.map((link, idx) => (
                <React.Fragment key={link.label}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavLinkClick(e, link.pageId, link.href)}
                    className={`
                      px-2 py-1 transition-colors uppercase cursor-pointer
                      ${link.isHighlight 
                        ? 'bg-dsu-gold text-black font-bold hover:bg-yellow-400' 
                        : 'hover:text-dsu-blue'
                      }
                    `}
                  >
                    {link.label}
                  </a>
                  {!link.isHighlight && idx < TOP_BAR_LINKS.length - 1 && (
                    <span className="text-gray-300">|</span>
                  )}
                </React.Fragment>
              ))}
              <div className="ml-2 border border-gray-300 rounded px-1 py-0.5 text-xs flex items-center">
                English <ChevronDown size={10} className="ml-1" />
              </div>
            </div>
          </div>
          
          {/* Mobile Toggle */}
          <div className="absolute right-4 top-8 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-dsu-blue">
              <Menu size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Cyan) */}
      <div className={`bg-dsu-cyan w-full ${isScrolled ? 'fixed top-0 left-0 shadow-xl z-50' : 'relative z-40'}`}>
        <div className="container mx-auto px-4">
          <nav className="hidden xl:flex items-center justify-between">
            {MAIN_NAV_LINKS.map((link) => (
              <div key={link.label} className="relative group">
                <a 
                  href={link.href} 
                  onClick={(e) => handleNavLinkClick(e, link.pageId, link.href)}
                  className="block px-3 py-4 text-[13px] font-bold text-white hover:bg-dsu-blue/20 transition-colors uppercase tracking-wide whitespace-nowrap cursor-pointer"
                >
                  {link.label}
                </a>
                
                {/* Desktop Dropdown */}
                {link.children && (
                  <div className="absolute left-0 top-full pt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                    <div className="bg-white shadow-xl border-t-4 border-dsu-gold py-1">
                      {link.children.map((child) => (
                        <a 
                          key={child.label} 
                          href={child.href}
                          onClick={(e) => handleNavLinkClick(e, child.pageId, child.href)}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-dsu-cyan border-b border-gray-50 last:border-0 cursor-pointer"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="p-4 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white z-10">
            <div className="flex items-center space-x-2">
               <span className="text-dsu-blue font-bold text-lg">Menu</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 space-y-1 pb-20">
             {/* Mobile Search */}
             <div className="mb-6 relative">
               <input type="text" placeholder="Search..." className="w-full border border-gray-300 rounded px-3 py-2" />
               <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
             </div>

            {MAIN_NAV_LINKS.map((link) => (
              <div key={link.label} className="border-b border-gray-50 last:border-0">
                {link.children ? (
                  <div className="flex flex-col">
                    {/* Parent Row */}
                    <div className="flex justify-between items-center w-full">
                      <a 
                        href={link.href}
                        onClick={(e) => handleNavLinkClick(e, link.pageId, link.href)}
                        className="flex-grow py-3 text-dsu-blue font-bold text-sm uppercase"
                      >
                        {link.label}
                      </a>
                      <button 
                        onClick={(e) => toggleMobileExpand(e, link.label)}
                        className="p-3 text-gray-400 hover:text-dsu-gold"
                      >
                         <ChevronRight 
                          size={16} 
                          className={`transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-90 text-dsu-gold' : 'text-gray-400'}`}
                        />
                      </button>
                    </div>
                    
                    {/* Children Row */}
                    <div className={`overflow-hidden transition-all duration-300 bg-gray-50 rounded-lg ${mobileExpanded === link.label ? 'max-h-96 mb-2' : 'max-h-0'}`}>
                      {link.children.map((child) => (
                        <a 
                          key={child.label}
                          href={child.href}
                          onClick={(e) => handleNavLinkClick(e, child.pageId, child.href)}
                          className="block px-4 py-3 text-sm text-gray-600 hover:text-dsu-blue"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a 
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.pageId, link.href)}
                    className="block py-3 text-dsu-blue font-bold text-sm uppercase"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
            
            <div className="pt-6 grid grid-cols-2 gap-2">
               {TOP_BAR_LINKS.map((link) => (
                 <a 
                  key={link.label} 
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.pageId, link.href)}
                  className={`text-[10px] font-bold p-2 rounded text-center uppercase ${link.isHighlight ? 'bg-dsu-gold text-black' : 'bg-gray-100 text-gray-600'}`}
                 >
                   {link.label}
                 </a>
               ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;