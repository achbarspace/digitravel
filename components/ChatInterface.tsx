import React, { useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType, Source } from '../types';
import ChatMessage from './ChatMessage';
import { Icons, SAMPLE_QUERIES } from '../constants';
import { queryGeminiWithSearch } from '../services/geminiService';

interface ChatInterfaceProps {
  initialQuery?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialQuery }) => {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call API
      const response = await queryGeminiWithSearch(text);
      
      const botMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        sources: response.sources,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting to the satellite uplink (network error). Please try again.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle initial query from Hero
  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  return (
    <div className="flex flex-col h-full bg-[#FDFBF7]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && !initialQuery && (
            <div className="text-center py-12 text-gray-500">
              <div className="inline-block p-4 rounded-full bg-stone-100 text-marrakech-teal mb-4">
                <Icons.Sparkles />
              </div>
              <h3 className="text-xl font-serif font-semibold text-gray-800 mb-2">Start Exploring</h3>
              <p className="mb-8">Select a popular topic or type your own question.</p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {SAMPLE_QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="bg-white border border-stone-200 hover:border-marrakech-gold hover:text-marrakech-red text-gray-600 px-4 py-2 rounded-full text-sm transition-all shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isLoading && (
            <div className="flex justify-start mb-6 w-full animate-pulse">
               <div className="max-w-[75%] rounded-2xl rounded-bl-none p-6 bg-white border border-stone-100 shadow-sm">
                 <div className="flex items-center gap-2 text-marrakech-red mb-3">
                   <Icons.Sparkles />
                   <span className="text-xs font-bold uppercase tracking-wider">Searching...</span>
                 </div>
                 <div className="h-4 bg-stone-200 rounded w-3/4 mb-2"></div>
                 <div className="h-4 bg-stone-200 rounded w-1/2"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-stone-200 bg-white p-4 sticky bottom-0 z-20">
        <div className="max-w-4xl mx-auto relative">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
            className="relative flex items-center shadow-lg rounded-2xl bg-[#FDFBF7] border border-stone-200 focus-within:ring-2 focus-within:ring-marrakech-teal/30 overflow-hidden"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="flex-1 bg-transparent px-6 py-4 text-gray-800 placeholder-gray-400 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-4 text-marrakech-red hover:bg-stone-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <Icons.Send />
            </button>
          </form>
          <div className="text-center mt-2">
             <span className="text-[10px] text-gray-400 uppercase tracking-widest">Powered by Gemini 2.5 & Google Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;