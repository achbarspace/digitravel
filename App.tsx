import React, { useState } from 'react';
import Hero from './components/Hero';
import ChatInterface from './components/ChatInterface';
import ShareButton from './components/ShareButton';
import POIDetailModal from './components/POIDetailModal';
import PremiumModal from './components/PremiumModal';
import { Icons } from './constants';
import content from './content';

const App: React.FC = () => {
  // Simple state-based routing/view switching
  const [activeQuery, setActiveQuery] = useState<string | undefined>(undefined);
  const [view, setView] = useState<'home' | 'chat'>('home');
  const [selectedPoi, setSelectedPoi] = useState<any>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleHeroSearch = (query: string) => {
    setActiveQuery(query);
    setView('chat');
  };

  const handleReset = () => {
    setView('home');
    setActiveQuery(undefined);
  };

  const poiExamples = content.poi_examples || [];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#FDFBF7]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={handleReset} className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-marrakech-red rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl group-hover:bg-marrakech-clay transition-colors">
                D
              </div>
              <span className="font-serif font-bold text-xl text-gray-800 tracking-tight">
                Digi<span className="text-marrakech-red">Travel</span>
              </span>
            </button>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <button onClick={handleReset} className="hover:text-marrakech-red transition-colors">Home</button>
              <button onClick={() => { setActiveQuery(undefined); setView('chat'); }} className="hover:text-marrakech-red transition-colors">Digital Guide</button>
              <a href="#" className="hover:text-marrakech-red transition-colors">Map</a>
              <button 
                onClick={() => setShowPremiumModal(true)}
                className="bg-marrakech-teal text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md"
              >
                Plan Trip
              </button>
            </div>

            <div className="md:hidden text-gray-600">
               <Icons.Menu />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {view === 'home' ? (
          <>
            <Hero onSearch={handleHeroSearch} />
            
            {/* Featured Locations Section (From Content Pack) */}
            <section className="py-16 px-4 max-w-7xl mx-auto w-full">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-800">Featured Destinations</h2>
                <button onClick={() => setView('chat')} className="text-marrakech-red hover:underline text-sm font-medium">Ask AI for more</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {poiExamples.map((poi: any) => (
                  <div 
                    key={poi.id} 
                    onClick={() => setSelectedPoi(poi)}
                    className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer group"
                  >
                    {/* Placeholder image since external images might break, using color block or fallback */}
                    <div className="h-48 w-full bg-stone-200 relative overflow-hidden">
                       {poi.image_url && !poi.image_url.includes('example.com') ? (
                         <img 
                           src={poi.image_url} 
                           alt={poi.name.en} 
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                         />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center bg-marrakech-sand/30 text-marrakech-clay">
                            <span className="font-serif italic text-lg opacity-50">{poi.name.en}</span>
                         </div>
                       )}
                       <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 text-xs font-bold text-marrakech-clay uppercase tracking-wider shadow-sm">
                         {poi.type}
                       </div>
                       {poi.price_from && (
                         <div className="absolute bottom-4 left-4 bg-marrakech-gold text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                           From {poi.price_from}
                         </div>
                       )}
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-marrakech-red transition-colors">{poi.name.en}</h3>
                        <ShareButton 
                           title={poi.name.en}
                           text={`${poi.short_description.en}\n\nOpening Hours: ${poi.opening_hours.en}`}
                           className="text-gray-400 hover:text-marrakech-red"
                        />
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                        {poi.short_description.en}
                      </p>
                      
                      <div className="pt-4 border-t border-stone-100 text-sm">
                         <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <span className="w-4"><Icons.MapPin /></span>
                            <span className="truncate">{poi.location}</span>
                         </div>
                         <div className="flex items-center gap-2 text-gray-500">
                            <span className="w-4 text-center">🕒</span>
                            <span>{poi.opening_hours.en}</span>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Original Features Grid */}
              <h3 className="text-xl font-bold text-center text-gray-400 uppercase tracking-widest mb-8">Why DigiTravel?</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center">
                    <div className="w-12 h-12 bg-marrakech-sand rounded-full flex items-center justify-center text-marrakech-gold mx-auto mb-6">
                      <Icons.Search />
                    </div>
                    <h3 className="text-lg font-bold mb-2 font-serif">Global Search</h3>
                    <p className="text-gray-600 text-sm">
                      Powered by Google Search, get the absolute latest info on entry fees, weather, and events worldwide.
                    </p>
                 </div>
                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center">
                    <div className="w-12 h-12 bg-marrakech-sand rounded-full flex items-center justify-center text-marrakech-red mx-auto mb-6">
                      <Icons.MapPin />
                    </div>
                    <h3 className="text-lg font-bold mb-2 font-serif">Hidden Gems</h3>
                    <p className="text-gray-600 text-sm">
                      Discover secret spots, authentic eateries, and local favorites in any city you visit.
                    </p>
                 </div>
                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center">
                    <div className="w-12 h-12 bg-marrakech-sand rounded-full flex items-center justify-center text-marrakech-teal mx-auto mb-6">
                      <Icons.Sparkles />
                    </div>
                    <h3 className="text-lg font-bold mb-2 font-serif">AI Curator</h3>
                    <p className="text-gray-600 text-sm">
                      Our Gemini-powered guide understands context, helping you plan the perfect trip anywhere.
                    </p>
                 </div>
               </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-stone-100 py-12 mt-auto">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-marrakech-red rounded-md flex items-center justify-center text-white font-serif font-bold text-sm">
                    D
                  </div>
                  <span className="font-serif font-bold text-lg text-gray-800">
                    Digi<span className="text-marrakech-red">Travel</span>
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                  Your intelligent, real-time digital companion for exploring the world.
                </p>
                <div className="flex justify-center gap-6 mb-8 text-sm text-gray-500">
                   <a href="#" className="hover:text-marrakech-red">Privacy</a>
                   <a href="#" className="hover:text-marrakech-red">Terms</a>
                   <a href="#" className="hover:text-marrakech-red">About</a>
                </div>
                <div className="text-xs text-gray-300">
                  © {new Date().getFullYear()} DigiTravel AI. All rights reserved.
                </div>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 h-[calc(100vh-64px)]">
            <ChatInterface initialQuery={activeQuery} />
          </div>
        )}

        {/* POI Detail Modal */}
        {selectedPoi && (
          <POIDetailModal 
            poi={selectedPoi} 
            onClose={() => setSelectedPoi(null)} 
          />
        )}

        {/* Premium Booking Modal */}
        {showPremiumModal && (
          <PremiumModal onClose={() => setShowPremiumModal(false)} />
        )}
      </main>
    </div>
  );
};

export default App;