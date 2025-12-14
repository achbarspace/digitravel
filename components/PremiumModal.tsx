import React, { useState } from 'react';
import { Icons } from '../constants';

interface PremiumModalProps {
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Prevent background scrolling
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-marrakech-blue/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 border border-white/20">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-800 transition-colors"
        >
          <Icons.X />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-marrakech-blue to-marrakech-teal p-8 text-white text-center">
           <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
             <Icons.Sparkles />
           </div>
           <h2 className="text-3xl font-serif font-bold mb-2">Premium Concierge</h2>
           <p className="text-white/80">Get a custom, human-verified itinerary for your next trip.</p>
        </div>

        {/* Body */}
        <div className="p-8">
          {step === 1 ? (
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Where are you going?</label>
                   <input type="text" required placeholder="e.g. Kyoto, Japan" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-marrakech-teal focus:border-transparent outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-marrakech-teal outline-none bg-white">
                      <option>3 Days</option>
                      <option>5 Days</option>
                      <option>7 Days</option>
                      <option>14+ Days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-marrakech-teal outline-none bg-white">
                      <option>$ Budget</option>
                      <option>$$ Standard</option>
                      <option>$$$ Luxury</option>
                    </select>
                  </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email for Itinerary</label>
                   <input type="email" required placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-marrakech-teal focus:border-transparent outline-none transition-all" />
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6">
                <div className="flex justify-between items-center mb-6">
                   <span className="font-medium text-gray-600">Total Service Fee</span>
                   <span className="text-2xl font-bold text-gray-900">$29.00</span>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-marrakech-gold hover:bg-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Icons.CreditCard />
                      Pay & Request Itinerary
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
                  Secure Payment • 100% Satisfaction Guarantee
                </p>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
               <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Icons.Check />
               </div>
               <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Request Received!</h3>
               <p className="text-gray-600 mb-8">
                 Our travel experts are reviewing your request. You will receive your custom itinerary via email within 24 hours.
               </p>
               <button 
                 onClick={onClose}
                 className="bg-stone-100 hover:bg-stone-200 text-gray-800 font-medium py-3 px-8 rounded-full transition-colors"
               >
                 Back to Guide
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;