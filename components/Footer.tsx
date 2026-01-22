
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 lg:px-40 border-t border-[#dbe6df] bg-white">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined font-bold text-black">eco</span>
          </div>
          <h2 className="text-lg font-bold tracking-tight">FreshScan AI</h2>
        </div>
        
        <div className="flex gap-8 text-sm font-bold opacity-60">
          <a href="#" className="hover:text-primary transition-colors">TikTok</a>
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-primary transition-colors">Discord</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        </div>
        
        <p className="text-xs font-medium opacity-40">
          © 2024 FreshScan AI. Built for the planet.
        </p>
      </div>
    </footer>
  );
};
