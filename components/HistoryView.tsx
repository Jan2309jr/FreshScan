
import React from 'react';
import { PredictionResult } from '../types';

interface HistoryViewProps {
  history: PredictionResult[];
  onNewScan: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, onNewScan }) => {
  return (
    <div className="flex flex-col py-12 px-6 lg:px-40 max-w-[1200px] mx-auto w-full space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter">Freshness History</h1>
          <p className="text-[#608a6e] text-lg">Tracking your sustainability journey with every scan.</p>
        </div>
        <button 
          onClick={onNewScan}
          className="px-8 py-4 bg-primary text-black font-black rounded-full neubrutalism flex items-center gap-2"
        >
          <span className="material-symbols-outlined">photo_camera</span>
          New Scan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'CO2 Offset', val: '4.2 kg', diff: '+12%' },
          { label: 'Money Saved', val: '$48.50', diff: '+15%' },
          { label: 'Waste Streak', val: '14 Days', diff: '🔥' },
          { label: 'Community Rank', val: '#1,240', diff: 'Global' },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-black/5 neubrutalism space-y-2">
             <p className="text-xs font-bold uppercase text-[#608a6e]">{stat.label}</p>
             <div className="flex items-baseline gap-2">
               <p className="text-3xl font-black">{stat.val}</p>
               <span className="text-primary text-xs font-bold">{stat.diff}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Recent Scans</h2>
        {history.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl neubrutalism border-dashed border-2">
            <p className="text-lg opacity-40 font-bold italic">No history yet. Start scanning your fridge!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {history.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden neubrutalism group cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="h-56 overflow-hidden relative">
                   <img 
                    src={`https://picsum.photos/seed/${item.label}/600/400`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={item.label}
                   />
                   <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase">
                     {item.freshness}
                   </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-xl">{item.label}</h4>
                      <p className="text-xs italic opacity-40">Scanned at {item.timestamp}</p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-sm font-bold">Est. Life: <span className="text-primary">{item.daysRemaining} days left</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-12 bg-black text-white rounded-[3rem] text-center space-y-4 neubrutalism">
        <h3 className="text-3xl font-black">You're making a difference!</h3>
        <p className="opacity-60 max-w-lg mx-auto">Every scan prevents waste and saves you roughly $2.50 per month on groceries.</p>
        <button className="px-8 py-3 bg-primary text-black font-black rounded-full hover:scale-105 transition-transform mt-4">
          Download Monthly Report
        </button>
      </div>
    </div>
  );
};
