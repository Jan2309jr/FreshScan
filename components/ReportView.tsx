
import React from 'react';
import { PredictionResult, FreshnessState } from '../types';

interface ReportViewProps {
  result: PredictionResult;
  onNewScan: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ result, onNewScan }) => {
  const getStatusColor = (state: FreshnessState) => {
    switch (state) {
      case FreshnessState.FRESH: return 'bg-primary';
      case FreshnessState.RIPE: return 'bg-yellow-400';
      case FreshnessState.OVERRIPE: return 'bg-orange-500';
      case FreshnessState.ROTTEN: return 'bg-red-500';
      default: return 'bg-primary';
    }
  };

  const getPercentage = (state: FreshnessState) => {
    switch (state) {
      case FreshnessState.FRESH: return 95;
      case FreshnessState.RIPE: return 70;
      case FreshnessState.OVERRIPE: return 30;
      case FreshnessState.ROTTEN: return 5;
      default: return 90;
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-6 lg:px-40 max-w-[1000px] mx-auto">
      <div className="w-full space-y-4 mb-8">
        <span className="px-3 py-1 bg-primary/20 text-[#0a6e29] text-xs font-bold rounded-full uppercase tracking-widest">
          Scan Complete
        </span>
        <h1 className="text-5xl font-black leading-tight tracking-tighter">Produce Freshness Report</h1>
        <p className="text-[#608a6e] text-lg">Real-time AI analysis results for your {result.label}</p>
      </div>

      <div className="w-full bg-white rounded-[2rem] overflow-hidden neubrutalism grid lg:grid-cols-2">
        <div className="p-12 bg-[#f8faf9] flex items-center justify-center relative border-b lg:border-b-0 lg:border-r-2 border-[#111813]">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#111813 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <img 
            src={`https://picsum.photos/seed/${result.label}/600/600`} 
            className="w-4/5 aspect-square object-cover rounded-3xl drop-shadow-2xl neubrutalism rotate-3"
            alt={result.label}
          />
          <div className="absolute bottom-6 left-6 px-3 py-1 bg-black text-white text-[10px] rounded-full font-bold">
            ID: {result.id}
          </div>
        </div>

        <div className="p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest mb-2">Current Status</p>
                <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full font-black text-2xl neubrutalism ${getStatusColor(result.freshness)}`}>
                  {result.freshness} <span className="material-symbols-outlined">check_circle</span>
                </div>
              </div>
              <button className="size-12 rounded-full neubrutalism bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>

            <p className="text-2xl font-bold italic leading-tight">
              "This {result.label.toLowerCase()} is looking {result.freshness.toLowerCase()}! {result.daysRemaining > 0 ? `Eat within ${result.daysRemaining} days.` : 'Consume immediately.'} 🍏"
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="font-bold">Freshness Level</p>
                <p className="text-2xl font-black">{getPercentage(result.freshness)}%</p>
              </div>
              <div className="h-6 rounded-full border-2 border-[#111813] p-1 bg-white relative">
                 <div className={`h-full rounded-full transition-all duration-1000 ${getStatusColor(result.freshness)}`} style={{ width: `${getPercentage(result.freshness)}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] font-black opacity-40 uppercase">
                <span>Rotten</span>
                <span>Perfect</span>
                <span>Fresh</span>
              </div>
            </div>
          </div>

          <button 
            onClick={onNewScan}
            className="w-full h-16 bg-primary text-black font-black text-xl rounded-2xl neubrutalism transition-transform hover:scale-[1.02]"
          >
            Scan Another Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 w-full">
        <div className="p-8 bg-white rounded-[2rem] neubrutalism space-y-4">
          <div className="size-12 bg-primary/20 text-[#0a6e29] rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">calendar_today</span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest">Estimated Life</p>
            <p className="text-4xl font-black">{result.daysRemaining} Days</p>
          </div>
          <p className="text-sm text-[#608a6e]">Maintain current temperature for optimal results and to prevent fast ripening.</p>
        </div>

        <div className="p-8 bg-[#fffde7] rounded-[2rem] neubrutalism space-y-4">
          <div className="size-12 bg-yellow-400/20 text-yellow-700 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">light_mode</span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest">Storage Tip</p>
            <p className="text-3xl font-black">Keep in a cool, dry place</p>
          </div>
          <p className="text-sm text-[#608a6e]">Avoiding direct sunlight reduces ethylene production, extending freshness by up to 2 days.</p>
        </div>
      </div>
    </div>
  );
};
