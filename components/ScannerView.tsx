
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionResult, FreshnessState } from '../types';

interface ScannerViewProps {
  onScanComplete: (result: PredictionResult) => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({ onScanComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    async function setupCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' },
          audio: false 
        });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        setError('Camera access denied or not available');
      }
    }
    setupCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || isScanning) return;
    
    setIsScanning(true);
    setConfidence(0);

    // Simulate analysis loading
    const interval = setInterval(() => {
      setConfidence(prev => Math.min(prev + 5, 95));
    }, 100);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);

      const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
            { text: "Analyze the fruit or vegetable in this image. Detect its type, current freshness state (Fresh, Ripe, Overripe, or Rotten), and estimated days remaining before it becomes inedible. Provide the result in JSON format." }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              freshness: { type: Type.STRING, description: "One of: Fresh, Ripe, Overripe, Rotten" },
              daysRemaining: { type: Type.NUMBER },
              confidence: { type: Type.NUMBER }
            },
            required: ["label", "freshness", "daysRemaining", "confidence"]
          }
        }
      });

      const data = JSON.parse(response.text);
      
      clearInterval(interval);
      onScanComplete({
        id: `SCAN-${Math.floor(Math.random() * 9000) + 1000}`,
        label: data.label,
        confidence: data.confidence || 0.98,
        freshness: data.freshness as FreshnessState,
        daysRemaining: data.daysRemaining,
        timestamp: new Date().toLocaleTimeString(),
        bbox: { x: 20, y: 20, width: 60, height: 60 }
      });

    } catch (err) {
      console.error(err);
      setError('AI Analysis failed. Please try again.');
    } finally {
      setIsScanning(false);
      clearInterval(interval);
    }
  }, [isScanning, onScanComplete]);

  return (
    <div className="flex flex-col items-center py-6 px-4 lg:px-40 max-w-[1200px] mx-auto w-full">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black">AI Live Scanner</h2>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-xl neubrutalism text-xs">
            <p className="opacity-50 uppercase font-bold">Model Version</p>
            <p className="font-bold">v3.2.1-prod</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl neubrutalism text-xs">
            <p className="opacity-50 uppercase font-bold">Latency</p>
            <p className="font-bold">12ms</p>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black group neubrutalism">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Scan Overlay UI */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-[20%] left-[25%] w-[50%] h-[50%] border-4 border-primary rounded-3xl border-dashed opacity-50"></div>
           
           <div className="absolute top-4 right-4 flex items-center gap-2 glass px-3 py-1.5 rounded-full">
            <div className={`size-2 bg-primary rounded-full ${isScanning ? 'animate-ping' : 'animate-pulse'}`}></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black">Live AI Engine</span>
          </div>

          {isScanning && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm pointer-events-auto">
              <div className="text-center space-y-4">
                <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
                   <div className="h-full bg-primary transition-all duration-300" style={{ width: `${confidence}%` }}></div>
                </div>
                <p className="text-white font-black text-xl animate-pulse">Analyzing Vibe...</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
          <button className="size-14 rounded-full glass flex items-center justify-center transition-all hover:bg-white/40 border-2 border-black/10">
            <span className="material-symbols-outlined text-black">flip_camera_ios</span>
          </button>
          
          <button 
            onClick={captureAndAnalyze}
            disabled={isScanning}
            className="size-24 bg-primary text-black rounded-full flex items-center justify-center border-4 border-white shadow-xl transition-transform hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-4xl font-black">photo_camera</span>
          </button>

          <button className="size-14 rounded-full glass flex items-center justify-center transition-all hover:bg-white/40 border-2 border-black/10">
            <span className="material-symbols-outlined text-black">settings</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-100 border-2 border-red-500 rounded-xl text-red-700 font-bold">
          {error}
        </div>
      )}

      <div className="mt-12 w-full p-8 bg-white rounded-3xl neubrutalism space-y-4">
        <h4 className="font-bold text-xl">How to use</h4>
        <p className="text-[#608a6e] leading-relaxed">
          Position your produce clearly within the frame. Our AI automatically detects textures, color shifts, and blemish patterns to score freshness instantly. 
        </p>
        <div className="flex gap-6">
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="size-3 bg-primary rounded-full"></span> Fresh
          </div>
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="size-3 bg-yellow-400 rounded-full"></span> Ripe
          </div>
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="size-3 bg-red-500 rounded-full"></span> Overripe
          </div>
        </div>
      </div>
    </div>
  );
};
