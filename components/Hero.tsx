import React from 'react';
import { Icons } from '../constants';

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Background Image - Global Travel Theme */}
      <div className="absolute inset-0 bg-marrakech-clay">
        <img 
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80" 
          alt="World Travel" 
          className="w-full h-full object-cover opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-marrakech-red/90 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl text-white font-bold mb-4 drop-shadow-md">
          DigiTravel
        </h1>
        <p className="text-marrakech-sand text-lg md:text-xl mb-8 max-w-2xl">
          Your real-time, AI-powered companion for exploring the world. 
          Discover hidden gems, check live flights, and navigate any city with confidence.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-xl relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-marrakech-clay">
            <Icons.Search />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about Paris, Tokyo, or New York..."
            className="w-full pl-12 pr-4 py-4 rounded-full shadow-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-marrakech-gold/50 transition-all text-lg"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-marrakech-red hover:bg-marrakech-clay text-white px-6 rounded-full font-medium transition-colors flex items-center gap-2"
          >
            Explore
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;