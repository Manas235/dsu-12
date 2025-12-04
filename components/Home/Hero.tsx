import React from 'react';
import Button from '../UI/Button';
import { ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onApplyNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onApplyNow }) => {
  const awards = [
    "https://images.collegedunia.com/public/college_data/images/logos/1559634550Logo.png", // Placeholder for KSURF
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR62L1w1z0gq9y5x8z1w1z0gq9y5x8z1w1z0g&s", // Placeholder for Excellence
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR62L1w1z0gq9y5x8z1w1z0gq9y5x8z1w1z0g&s", // Placeholder for Times
  ];

  return (
    <div className="flex flex-col">
      <section id="hero" className="relative bg-dsu-blue overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop" 
            alt="DSU Campus Night" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Side Content */}
            <div className="flex-1 max-w-2xl">
              <h1 className="leading-tight mb-2">
                <span className="block text-6xl lg:text-8xl font-extrabold text-dsu-gold">B.Tech</span>
                <span className="block text-4xl lg:text-6xl font-bold text-white">Admissions 2026 - 27</span>
              </h1>
              
              {/* Scholarship Banner */}
              <div className="bg-white transform -skew-x-12 inline-block px-6 py-3 mb-8 border-l-8 border-dsu-gold shadow-lg">
                <div className="transform skew-x-12 text-center">
                  <h3 className="text-dsu-blue font-extrabold text-xl lg:text-2xl">
                    Prestigious Merit Scholarship
                  </h3>
                  <p className="text-dsu-blue font-bold text-lg">Based on JEE Scores</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                 <button 
                   onClick={onApplyNow}
                   className="bg-dsu-lightBlue hover:bg-blue-600 text-white text-xl font-bold py-3 px-8 rounded-full flex items-center shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
                 >
                   Apply Now <ArrowUpRight className="ml-2 bg-white text-dsu-lightBlue rounded-full p-0.5" size={24} strokeWidth={3} />
                 </button>
              </div>
            </div>

            {/* Right Side Content - Exams & Image */}
            <div className="flex-1 w-full relative">
              <div className="flex flex-col items-end relative z-20">
                <div className="text-right mb-6">
                  <p className="text-dsu-gold text-xl lg:text-2xl font-bold max-w-md ml-auto leading-snug">
                    B.Tech Admissions for 2026 - 27 <br/>
                    <span className="text-white">are based on the key scores of below Entrance Exams</span>
                  </p>
                </div>

                {/* Exam List */}
                <div className="space-y-3 mb-8 w-full max-w-sm ml-auto">
                  {[
                    "IIT JEE",
                    "COMED-K",
                    "UNI-GAUGE",
                    "OTHER EXAMS"
                  ].map((exam) => (
                    <div key={exam} className="flex items-center justify-between bg-transparent border-2 border-white rounded-full px-4 py-2 group hover:bg-white/10 transition-colors cursor-default">
                      <span className="text-white font-black text-xl tracking-wider">{exam}</span>
                      <CheckCircle2 className="text-white fill-black" size={28} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Image (Absolute positioned for layout match) */}
              <div className="hidden lg:block absolute -bottom-20 -right-20 w-[500px] h-[600px] z-10 pointer-events-none">
                <img 
                  src="https://img.freepik.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-orange-wall_141793-46713.jpg?w=800&t=st=1709321000~exp=1709321600~hmac=..." 
                  alt="Happy Student" 
                  className="w-full h-full object-cover drop-shadow-2xl mask-image-gradient"
                  style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-right lg:mr-32 relative z-20">
            <p className="text-dsu-gold font-serif italic text-2xl">
              Your First Step Towards <br/>
              <span className="text-3xl not-italic font-bold text-white font-sans">Transformative Engineering!</span>
            </p>
          </div>
        </div>
      </section>

      {/* Awards Footer Strip */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mocking the logos with text blocks for stability, but visually arranged */}
             <div className="flex items-center gap-2 border-r border-gray-300 pr-6 last:border-0">
               <div className="bg-dsu-blue text-white p-1 text-xs font-bold">ICARE</div>
               <div className="text-xs font-bold leading-tight">RATINGS<br/>KSURF</div>
               <div className="text-yellow-500 text-xs">★★★★★</div>
             </div>
             <div className="flex items-center gap-2 border-r border-gray-300 pr-6 last:border-0">
               <div className="text-xs font-bold text-center leading-tight">EDUCATIONAL<br/>EXCELLENCE<br/>AWARDS</div>
             </div>
             <div className="flex items-center gap-2 border-r border-gray-300 pr-6 last:border-0">
               <div className="bg-red-600 text-white p-1 text-xs font-bold">TIMES</div>
               <div className="text-xs font-bold text-center leading-tight">BUSINESS<br/>AWARDS</div>
             </div>
             <div className="flex items-center gap-2 border-r border-gray-300 pr-6 last:border-0">
               <div className="text-xs font-bold text-red-600">siliconindia</div>
               <div className="text-xs font-bold">B SCHOOL SURVEY</div>
               <div className="bg-gray-200 px-1 text-xs font-bold">A+++</div>
             </div>
             <div className="flex items-center gap-2 border-r border-gray-300 pr-6 last:border-0">
                <div className="text-dsu-blue font-black text-lg">IIRF-2023</div>
                <div className="text-[10px] font-bold leading-tight">NATIONAL RANK-10<br/><span className="text-red-600">SOUTH ZONE RANK-4</span></div>
             </div>
             <div className="flex items-center gap-2">
                <div className="bg-dsu-blue text-white px-1 text-sm font-bold">CAREERS360</div>
                <div className="text-xs font-bold">AAA Ranking 2021</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;