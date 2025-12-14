import React, { useState } from 'react';
import { Icons } from '../constants';

interface ShareButtonProps {
  title?: string;
  text: string;
  url?: string;
  className?: string;
  label?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  title = "DigiTravel", 
  text, 
  url, 
  className = "",
  label = "Share"
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const shareUrl = url || window.location.href;
    const shareData = {
      title,
      text,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed, fail silently
      }
    } else {
      // Fallback to clipboard
      const contentToCopy = `${title}\n\n${text}\n\n${shareUrl}`;
      try {
        await navigator.clipboard.writeText(contentToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className={`flex items-center gap-2 transition-colors ${className}`}
      title={copied ? "Copied to clipboard" : label}
      aria-label={label}
    >
      {copied ? <Icons.Check /> : <Icons.Share />}
      <span className="sr-only">{label}</span>
    </button>
  );
};

export default ShareButton;