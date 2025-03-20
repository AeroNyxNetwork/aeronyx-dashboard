'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export function SecurityReminder() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentDomain, setCurrentDomain] = useState('');
  const expectedDomain = 'https://soon.aeronyx.network';
  
  useEffect(() => {
    // Get the current domain in client-side code
    if (typeof window !== 'undefined') {
      setCurrentDomain(window.location.origin);
    }
  }, []);
  
  const isDomainCorrect = currentDomain === expectedDomain;
  
  if (!isVisible) return null;
  
  return (
    <div className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 glass-card p-4 border ${
      isDomainCorrect ? 'border-success bg-success/10' : 'border-danger bg-danger/10'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${isDomainCorrect ? 'text-success' : 'text-danger'}`}>
          <ShieldCheck size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium mb-1">Security Reminder</h4>
          <p className="text-sm text-foreground-muted">
            Always verify you are visiting:{' '}
            <span className="font-mono text-foreground font-medium">
              {expectedDomain}
            </span>
          </p>
          
          {!isDomainCorrect && (
            <p className="text-sm text-danger mt-2 font-medium">
              Warning: You are currently on {currentDomain}
            </p>
          )}
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-foreground-muted hover:text-foreground"
          aria-label="Close security reminder"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
