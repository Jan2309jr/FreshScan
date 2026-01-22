
import React, { useState, useEffect } from 'react';
import { HomeView } from './components/HomeView';
import { ScannerView } from './components/ScannerView';
import { ReportView } from './components/ReportView';
import { HistoryView } from './components/HistoryView';
import { AppState, PredictionResult } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'home',
    history: [],
  });

  const navigate = (view: AppState['view'], scan?: PredictionResult) => {
    setState(prev => ({ 
      ...prev, 
      view, 
      currentScan: scan || prev.currentScan 
    }));
  };

  const addToHistory = (scan: PredictionResult) => {
    setState(prev => ({
      ...prev,
      history: [scan, ...prev.history].slice(0, 20)
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onViewChange={(v) => navigate(v)} activeView={state.view} />
      
      <main className="flex-grow">
        {state.view === 'home' && (
          <HomeView onStartScan={() => navigate('scanner')} />
        )}
        
        {state.view === 'scanner' && (
          <ScannerView 
            onScanComplete={(result) => {
              addToHistory(result);
              navigate('report', result);
            }} 
          />
        )}
        
        {state.view === 'report' && state.currentScan && (
          <ReportView 
            result={state.currentScan} 
            onNewScan={() => navigate('scanner')} 
          />
        )}

        {state.view === 'history' && (
          <HistoryView 
            history={state.history} 
            onNewScan={() => navigate('scanner')} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
