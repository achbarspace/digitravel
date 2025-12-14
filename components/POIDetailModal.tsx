import React from 'react';
import { Icons } from '../constants';
import ShareButton from './ShareButton';

interface POIDetailModalProps {
  poi: any; // Using dynamic type based on content.json structure
  onClose: () => void;
}

const POIDetailModal: React.FC<POIDetailModalProps> = ({ poi, onClose }) => {
  if (!poi) return null;

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${poi.lat},${poi.lng}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur rounded-full text-gray-800 hover:bg-white hover:text-marrakech-red shadow-sm transition-colors"
          aria-label="Close"
        >
          <Icons.X />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 shrink-0">
          <img 
            src={poi.image_url} 
            alt={poi.name.en} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
             <span className="inline-block px-3 py-1 bg-marrakech-teal/90 backdrop-blur text-xs font-bold uppercase tracking-wider rounded-full mb-3 shadow-sm">
               {poi.type}
             </span>
             <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight drop-shadow-md">
               {poi.name.en}
             </h2>
             {poi.price_from && (
               <div className="mt-2 inline-flex items-center bg-marrakech-gold text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                 Tickets from {poi.price_from}
               </div>
             )}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
           {/* Actions Bar */}
           <div className="flex flex-col sm:flex-row gap-3 mb-2">
             {poi.booking_url && (
                <a 
                  href={poi.booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-marrakech-gold text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-500 hover:scale-[1.02] transition-all shadow-md"
                >
                  <Icons.Ticket />
                  Book Tickets
                </a>
             )}
             <a 
               href={googleMapsUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="flex-1 bg-stone-100 text-gray-800 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors shadow-sm"
             >
               <Icons.MapPin />
               Directions
             </a>
             {poi.website && (
               <a 
                 href={poi.website}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex-1 bg-white border border-stone-200 text-gray-800 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-50 hover:border-marrakech-teal hover:text-marrakech-teal transition-all shadow-sm"
               >
                 <Icons.Globe />
                 Website
               </a>
             )}
           </div>

           {/* Affiliate Disclosure */}
           {poi.booking_url && (
             <div className="text-center mb-8">
               <p className="text-[10px] text-gray-400 uppercase tracking-wide">
                 * Prices are estimates. We may earn a commission from booking links.
               </p>
             </div>
           )}

           {/* Info Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-sm">
             <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <Icons.MapPin /> Location
                </h4>
                <p className="text-gray-600 pl-6">{poi.location}</p>
             </div>
             <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <span className="text-lg leading-none">🕒</span> Opening Hours
                </h4>
                <p className="text-gray-600 pl-6">{poi.opening_hours.en}</p>
             </div>
           </div>

           {/* Description */}
           <div className="prose prose-stone max-w-none">
             <div className="flex justify-between items-center mb-3">
               <h3 className="font-serif text-2xl font-bold text-gray-800 m-0">About</h3>
               <ShareButton 
                 title={poi.name.en}
                 text={`Check out ${poi.name.en} in ${poi.location}. \n\n${poi.short_description.en}`}
                 url={poi.website}
                 className="text-gray-600 hover:text-marrakech-red bg-stone-50 p-2 rounded-full"
               />
             </div>
             <p className="text-gray-600 text-lg leading-relaxed">
               {poi.short_description.en}
             </p>
           </div>

           {/* Tags */}
           <div className="mt-8 pt-8 border-t border-stone-100">
             <div className="flex flex-wrap gap-2">
               {poi.tags.map((tag: string) => (
                 <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-medium uppercase tracking-wider">
                   #{tag}
                 </span>
               ))}
             </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default POIDetailModal;