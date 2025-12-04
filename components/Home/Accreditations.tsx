import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Accreditation } from '../../types';

const Accreditations: React.FC = () => {
  const [accreditations, setAccreditations] = useState<Accreditation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getAccreditations();
        setAccreditations(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <section id="accreditations" className="py-12 bg-gray-50 border-t border-gray-200 min-h-[180px]">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-500 uppercase tracking-widest text-sm font-semibold mb-8">
          Recognized by Premier Institutions
        </p>
        
        {loading ? (
          <div className="flex justify-center gap-8 opacity-50 animate-pulse">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="h-16 w-32 bg-gray-200 rounded-lg"></div>
             ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-80 hover:opacity-100 transition-opacity">
            {accreditations.map((acc) => (
              <div key={acc.id} className="flex flex-col items-center group cursor-default">
                <div className="h-16 w-32 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-dsu-blue/30 transition-all">
                   <span className="font-bold text-gray-700 text-lg group-hover:text-dsu-blue">{acc.name}</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-2 uppercase font-medium tracking-wider">{acc.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Accreditations;