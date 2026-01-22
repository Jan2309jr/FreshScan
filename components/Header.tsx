
import React from 'react';
import { AppState } from '../types';

interface HeaderProps {
  onViewChange: (view: AppState['view']) => void;
  activeView: AppState['view'];
}

export const Header: React.FC<HeaderProps> = ({ onViewChange, activeView }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 lg:px-40 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#dbe6df]">
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => onViewChange('home')}
      >
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined font-bold text-black">eco</span>
        </div>
        <h2 className="text-lg font-bold tracking-tight">FreshScan AI</h2>
      </div>
      
      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-9">
          <button 
            onClick={() => onViewChange('home')}
            className={`text-sm font-medium hover:text-primary transition-colors ${activeView === 'home' ? 'text-primary' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => onViewChange('history')}
            className={`text-sm font-medium hover:text-primary transition-colors ${activeView === 'history' ? 'text-primary' : ''}`}
          >
            History
          </button>
        </nav>
        
        <button 
          onClick={() => onViewChange('scanner')}
          className="bg-primary text-black px-6 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 active:scale-95 neubrutalism"
        >
          Scan Fruit
        </button>
        
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20 cursor-pointer" style={{backgroundImage: 'url("https://picsum.photos/seed/user/100/100")'}}></div>
      </div>
    </header>
  );
};
