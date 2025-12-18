
import React from 'react';
import { CardDeck } from './components/CardDeck';
import { Heart } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#fff5f7] selection:bg-rose-200 overflow-hidden relative">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-bg" style={{ top: '10%', left: '5%', animation: 'float 8s ease-in-out infinite' }}></div>
        <div className="floating-bg" style={{ bottom: '15%', right: '10%', animation: 'float 12s ease-in-out infinite 1s', background: 'radial-gradient(circle, rgba(244,114,182,0.1) 0%, rgba(244,114,182,0) 70%)' }}></div>
        <div className="floating-bg" style={{ top: '40%', right: '-5%', width: '400px', height: '400px', animation: 'float 15s ease-in-out infinite 2s' }}></div>
      </div>

      {/* Aesthetic Header */}
      <header className="relative z-10 pt-8 pb-2 px-6 text-center shrink-0">
        <div className="inline-flex items-center space-x-2 glass px-4 py-1.5 rounded-full shadow-sm mb-4">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em]">Elysian</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 font-bold tracking-tight leading-tight">
          Date Night <span className="text-rose-500 italic font-medium">Moments</span>
        </h1>
        <div className="h-1 w-12 bg-rose-200 mx-auto mt-4 rounded-full"></div>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col min-h-0">
        <CardDeck />
      </main>

      {/* Minimalistic Footer */}
      <footer className="relative z-10 py-4 text-center shrink-0">
        <p className="text-[9px] font-extrabold text-gray-300 uppercase tracking-[0.3em] flex items-center justify-center">
          Handcrafted for connection
        </p>
      </footer>
    </div>
  );
};

export default App;
