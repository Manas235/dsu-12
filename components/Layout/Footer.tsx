import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = ["About DSU", "Careers", "Privacy Policy", "Terms of Use", "Campus Life", "Student Portal", "Research"];
  const schools = ["School of Engineering", "School of Commerce", "School of Basic & Applied Sciences", "School of Health Sciences", "School of Arts & Humanities", "School of Law"];

  return (
    <footer id="contact" className="bg-dsu-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* About Column */}
          <div>
             <div className="mb-6 bg-white p-2 rounded-lg inline-block">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/4/4c/Dayananda_Sagar_University_logo.png" 
                  alt="DSU Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Empowering students with innovation, research, and excellence. Join us to shape the future.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center hover:bg-dsu-gold hover:text-dsu-blue transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-dsu-gold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all text-sm flex items-center group">
                    <ChevronRight size={14} className="mr-2 text-dsu-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Schools */}
          <div>
            <h3 className="text-xl font-bold text-dsu-gold mb-6">Our Schools</h3>
            <ul className="space-y-3">
              {schools.map((school) => (
                <li key={school}>
                  <a href="#" className="text-gray-300 hover:text-white hover:pl-2 transition-all text-sm flex items-center group">
                    <ChevronRight size={14} className="mr-2 text-dsu-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    {school}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-dsu-gold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-dsu-gold shrink-0 mt-1" />
                <span>
                  Devarakaggalahalli, Harohalli,<br/>
                  Kanakapura Road, Ramanagara Dt.,<br/>
                  Bengaluru - 562 112
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-dsu-gold shrink-0" />
                <span>+91 80 4216 1759</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-dsu-gold shrink-0" />
                <span>admissions@dsu.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dayananda Sagar University. All Rights Reserved. Design Concept.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;