import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { Icons } from '../constants';
import ShareButton from './ShareButton';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`
          max-w-[85%] md:max-w-[75%] rounded-2xl p-6 shadow-sm relative group
          ${isUser 
            ? 'bg-marrakech-red text-white rounded-br-none' 
            : 'bg-white border border-stone-100 rounded-bl-none'
          }
        `}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3 opacity-80 text-xs uppercase tracking-wider font-semibold">
            {isUser ? (
              <span>You</span>
            ) : (
              <>
                <Icons.Sparkles />
                <span>DigiTravel Guide</span>
              </>
            )}
          </div>
          <ShareButton 
            text={message.text} 
            className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${isUser ? 'text-white/70 hover:text-white' : 'text-gray-400 hover:text-marrakech-red'}`} 
            label="Share message"
          />
        </div>

        {/* Message Content */}
        <div className={`text-base leading-relaxed whitespace-pre-wrap ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {message.text}
        </div>

        {/* Sources Section (Only for model) */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Icons.Info /> Verified Sources
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {message.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200 group/link"
                >
                  <div className="mt-1 text-marrakech-teal group-hover/link:text-marrakech-red transition-colors">
                    <Icons.ExternalLink />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-800 truncate" title={source.title}>
                      {source.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {new URL(source.uri).hostname.replace('www.', '')}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;