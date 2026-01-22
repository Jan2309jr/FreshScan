
import React from 'react';

interface HomeViewProps {
  onStartScan: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartScan }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-16 px-6 lg:px-40 grid lg:grid-cols-2 gap-12 items-center bg-white">
        <div className="space-y-8">
          <span className="inline-block px-4 py-1 bg-primary/20 text-[#0a6e29] text-xs font-bold rounded-full uppercase tracking-widest">
            Now with AI 3.0 Engine
          </span>
          <h1 className="text-6xl font-black leading-tight tracking-tighter">
            Is your fruit still <span className="text-primary">vibing</span> or past its prime?
          </h1>
          <p className="text-[#608a6e] text-lg max-w-md">
            AI-powered freshness checks for the zero-waste generation. Save your snacks, save the planet, no cap.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={onStartScan}
              className="px-8 py-4 bg-primary text-black font-black rounded-full text-lg neubrutalism transition-all"
            >
              Scan your fruit
            </button>
            <button className="px-8 py-4 border-2 border-[#111813] font-bold rounded-full text-lg">
              How it works
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full aspect-[4/5] rounded-[3rem] overflow-hidden neubrutalism bg-[#f5f8f6] flex items-center justify-center p-12">
            <img 
              src="https://images.unsplash.com/photo-1571771894821-ad99024177c6?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-auto drop-shadow-2xl rotate-12" 
              alt="Fresh Banana"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass p-6 rounded-2xl neubrutalism w-64 space-y-4">
               <div className="flex items-center gap-3">
                 <div className="size-10 bg-primary rounded-lg flex items-center justify-center">
                   <span className="material-symbols-outlined text-black">photo_camera</span>
                 </div>
                 <div>
                   <p className="text-[10px] font-bold uppercase opacity-50 tracking-wider">Status Check</p>
                   <p className="font-bold">Vibe: Peak Fresh</p>
                 </div>
               </div>
               <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-4/5"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 px-6 lg:px-40 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Snacks Saved', val: '500K+', diff: '+12%' },
          { label: 'Happy Users', val: '25K', diff: '+5%' },
          { label: 'Carbon Offset', val: '120T', diff: '+8%' },
        ].map((stat, i) => (
          <div key={i} className="p-8 rounded-2xl bg-white border border-[#dbe6df] space-y-2">
             <p className="text-xs font-bold uppercase text-[#608a6e]">{stat.label}</p>
             <div className="flex items-baseline gap-2">
               <p className="text-4xl font-black">{stat.val}</p>
               <span className="text-primary text-xs font-bold">{stat.diff}</span>
             </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-6 lg:px-40 bg-primary/10">
        <div className="bg-primary p-12 lg:p-24 rounded-[3rem] text-center space-y-8 neubrutalism">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to vibe-check your fridge?
          </h2>
          <p className="text-xl font-bold opacity-70">
            Join 25,000+ humans already saving the planet one snack at a time.
          </p>
          <button 
            onClick={onStartScan}
            className="px-12 py-5 bg-black text-white text-xl font-black rounded-full hover:scale-105 transition-transform"
          >
            Scan your fruit now
          </button>
        </div>
      </section>
    </div>
  );
};
