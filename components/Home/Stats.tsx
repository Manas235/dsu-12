import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { StatItem } from '../../types';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';

// Map backend string identifiers to React Components
const ICON_MAP: Record<string, React.ElementType> = {
  'GraduationCap': GraduationCap,
  'Users': Users,
  'BookOpen': BookOpen,
  'Award': Award
};

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <section id="stats" className="py-16 bg-dsu-blue text-white relative overflow-hidden min-h-[200px]">
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-dsu-gold rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-white/10 rounded-full mb-4"></div>
                <div className="h-10 w-24 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-32 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-blue-800/50">
            {stats.map((stat) => {
              const IconComponent = ICON_MAP[stat.icon] || GraduationCap; // Fallback icon
              return (
                <div key={stat.id} className="flex flex-col items-center p-4 group">
                  <div className="mb-4 p-3 bg-blue-800/50 rounded-full group-hover:bg-dsu-gold group-hover:text-dsu-blue transition-colors duration-300">
                     <IconComponent size={32} />
                  </div>
                  <span className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm lg:text-base text-gray-300 uppercase tracking-wider font-medium">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Stats;