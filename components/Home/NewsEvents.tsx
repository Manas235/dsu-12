import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { NewsItem, DetailsPageData } from '../../types';
import Button from '../UI/Button';
import { Calendar } from 'lucide-react';

interface NewsEventsProps {
  onLearnMore: (data: DetailsPageData) => void;
}

const NewsEvents: React.FC<NewsEventsProps> = ({ onLearnMore }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getNews();
        setNewsItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleNewsClick = (e: React.MouseEvent, news: NewsItem) => {
    e.preventDefault();
    onLearnMore({
      title: news.title,
      category: news.category,
      image: news.image,
      date: news.date,
      content: `${news.excerpt}\n\n(Full article content would go here...)\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    });
  };

  const handleViewAll = () => {
    onLearnMore({
        title: "News & Events Archive",
        category: "Archive",
        content: "Access the complete archive of university news, press releases, and event highlights here.\n\n(A full list or grid of news items would typically appear here in a production scenario.)",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1920&auto=format&fit=crop"
    });
  }

  return (
    <section id="news" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-dsu-blue mb-2">News & Events</h2>
            <div className="w-16 h-1 bg-dsu-gold"></div>
          </div>
          <Button onClick={handleViewAll} variant="outline" className="hidden md:flex">View All News</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading 
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl shadow-sm h-80 animate-pulse flex flex-col">
                   <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                   <div className="p-5 flex-grow space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-5 bg-gray-200 rounded w-full"></div>
                      <div className="h-12 bg-gray-200 rounded w-full"></div>
                   </div>
                </div>
              ))
            : newsItems.map((news) => (
              <div key={news.id} className="group flex flex-col h-full bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden rounded-t-xl relative">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-dsu-gold text-dsu-blue text-xs font-bold px-2 py-1 rounded uppercase">
                    {news.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center text-gray-400 text-xs mb-3">
                    <Calendar size={12} className="mr-1" />
                    {news.date}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug group-hover:text-dsu-lightBlue transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {news.excerpt}
                  </p>
                  <button 
                    onClick={(e) => handleNewsClick(e, news)} 
                    className="text-dsu-blue font-semibold text-sm hover:text-dsu-gold transition-colors mt-auto text-left"
                  >
                    Read Full Story &rarr;
                  </button>
                </div>
              </div>
            ))
          }
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <Button onClick={handleViewAll} variant="outline">View All News</Button>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;