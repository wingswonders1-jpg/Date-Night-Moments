
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { DateQuestion, CardTheme } from '../types';
import { INITIAL_QUESTIONS, THEME_COLORS } from '../constants';
import { Heart, ChevronLeft, ChevronRight, Shuffle, Star, Sparkles, BookHeart } from 'lucide-react';

export const CardDeck: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<CardTheme | 'All'>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showShuffleEffect, setShowShuffleEffect] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('elysian_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredQuestions = useMemo(() => {
    let qs = selectedTheme === 'All' 
      ? [...INITIAL_QUESTIONS] 
      : INITIAL_QUESTIONS.filter(q => q.theme === selectedTheme);
    return qs;
  }, [selectedTheme]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('elysian_favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const shuffleDeck = () => {
    setShowShuffleEffect(true);
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
      setCurrentIndex(randomIndex);
      setShowShuffleEffect(false);
      setIsAnimating(false);
    }, 400);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedTheme]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev < filteredQuestions.length - 1 ? prev + 1 : 0));
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : filteredQuestions.length - 1));
      setIsAnimating(false);
    }, 300);
  };

  const currentQuestion = filteredQuestions[currentIndex];
  const isFav = favorites.includes(currentQuestion?.id);

  const themes: (CardTheme | 'All')[] = [
    'All',
    'Deep Conversation Starters',
    'Fun & Silly Questions',
    'Dream Vacation Plans',
    'Relationship Reflections'
  ];

  return (
    <div className="flex flex-col items-center justify-between h-full w-full max-w-lg mx-auto px-6 py-2 overflow-hidden">
      
      {/* Theme Selector - Enhanced with active shadows and smoother scroll */}
      <div 
        ref={scrollContainerRef}
        className="w-full overflow-x-auto pb-4 shrink-0 custom-scrollbar scroll-smooth"
      >
        <div className="flex space-x-3 min-w-max px-2 pt-2">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTheme(t)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-bold border transition-all duration-500 whitespace-nowrap ${
                selectedTheme === t 
                  ? 'bg-rose-500 text-white border-rose-400 shadow-[0_4px_20px_rgba(244,63,94,0.4)] scale-105' 
                  : 'glass text-gray-500 border-gray-100 hover:border-rose-200 hover:text-rose-400 hover:bg-white/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Card Section */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-0 py-4">
        {/* Glow behind the card */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[70%] bg-rose-200/20 rounded-full blur-[100px] -z-10 transition-opacity duration-1000 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}></div>
        
        {filteredQuestions.length > 0 ? (
          <div 
            onClick={handleNext}
            className={`relative h-full max-h-[500px] w-full aspect-[3/4.6] glass rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-white/80 p-8 md:p-12 flex flex-col justify-between items-center text-center overflow-hidden transition-all duration-500 cursor-pointer group active:scale-[0.97] ${isAnimating ? 'opacity-0 translate-y-6 rotate-1 scale-95 blur-sm' : 'opacity-100 translate-y-0 rotate-0 scale-100 blur-0'} ${showShuffleEffect ? 'blur-xl' : ''}`}
          >
            {/* Top Bar: Theme & Card Index */}
            <div className="w-full flex justify-between items-start shrink-0">
               <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border transition-colors duration-500 ${THEME_COLORS[currentQuestion.theme] || 'bg-gray-100'}`}>
                 {currentQuestion.theme}
               </span>
               <div className="flex flex-col items-end">
                 <span className="text-gray-400 text-[10px] font-bold tracking-[0.2em] mb-1">
                   {currentIndex + 1} OF {filteredQuestions.length}
                 </span>
                 <div className="w-16 h-1 bg-gray-100/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rose-400 transition-all duration-700 ease-out" 
                      style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
                    />
                 </div>
               </div>
            </div>

            {/* Question Text - Elegant Typography */}
            <div className="flex-1 flex items-center justify-center w-full px-2 py-4">
              <h2 className="text-2xl md:text-4xl font-serif text-gray-800 leading-[1.35] italic font-medium tracking-tight">
                "{currentQuestion.text}"
              </h2>
            </div>

            {/* Bottom Actions: Interaction & Branding */}
            <div className="w-full flex justify-between items-center shrink-0">
               <div className="relative">
                 <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(currentQuestion.id); }}
                  className={`p-3.5 rounded-full transition-all duration-300 active:scale-75 ${isFav ? 'bg-rose-50 text-rose-500 shadow-inner' : 'text-gray-300 hover:text-rose-300 hover:bg-rose-50/30'}`}
                 >
                   <Star className={`w-5 h-5 transition-transform duration-500 ${isFav ? 'fill-current scale-110' : 'scale-100'}`} />
                 </button>
                 {favorites.length > 0 && (
                   <div className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                     {favorites.length}
                   </div>
                 )}
               </div>
               
               <div className="flex flex-col items-center opacity-30 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110">
                 <Sparkles className="w-5 h-5 text-rose-300 mb-1" />
                 <span className="text-[7px] font-bold text-rose-400 uppercase tracking-widest">Connect</span>
               </div>

               <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
                 ELYSIAN
               </div>
            </div>
            
            {/* Visual feedback for next card */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-60 transition-all duration-500 text-[8px] font-black uppercase tracking-[0.3em] text-rose-400 translate-y-2 group-hover:translate-y-0">
              Tap to continue
            </div>
          </div>
        ) : (
          <div className="glass h-full w-full rounded-[2.5rem] flex flex-col items-center justify-center border border-white/50 p-12 text-center">
            <BookHeart className="w-12 h-12 text-rose-200 mb-4" />
            <p className="text-gray-400 font-serif italic text-lg">Your deck is currently empty.</p>
            <button onClick={() => setSelectedTheme('All')} className="mt-4 text-rose-500 font-bold text-xs uppercase tracking-widest">Reset View</button>
          </div>
        )}
      </div>

      {/* Floating Control Hub */}
      <div className="w-full flex items-center justify-between px-2 shrink-0 py-4 max-w-sm">
        <button 
          onClick={handlePrev}
          className="w-14 h-14 rounded-full glass shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-90 border border-white/90 text-rose-500 hover:bg-white"
          aria-label="Previous Card"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button 
          onClick={shuffleDeck}
          className="group relative flex items-center space-x-3 px-10 py-4 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 text-white font-bold shadow-[0_15px_35px_rgba(244,63,94,0.35)] hover:shadow-[0_20px_45px_rgba(244,63,94,0.45)] transition-all duration-500 hover:-translate-y-1 active:scale-95 active:translate-y-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <Shuffle className={`w-4 h-4 transition-transform duration-700 ${showShuffleEffect ? 'rotate-180' : 'group-hover:rotate-12'}`} />
          <span className="text-[11px] uppercase tracking-[0.2em] relative z-10">Shuffle</span>
        </button>

        <button 
          onClick={handleNext}
          className="w-14 h-14 rounded-full glass shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-90 border border-white/90 text-rose-500 hover:bg-white"
          aria-label="Next Card"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Aesthetic Branding Footer */}
      <div className="shrink-0 pt-1 pb-2">
        <p className="text-rose-400/30 text-[9px] font-black uppercase tracking-[0.5em] animate-pulse">
          Elysian Moments • Edition I
        </p>
      </div>
    </div>
  );
};
