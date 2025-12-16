import React, { useState, useEffect } from 'react';

const PHRASES = [
  "בוקר טוב",
  "אני לומד מחשבים",
  "העתק הדבק זה קל",
  "שבת שלום",
  "ישראל יפה"
];

export const PracticeArea: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState(PHRASES[0]);
  const [inputValue, setInputValue] = useState('');
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue === currentPhrase) {
      setSuccess(true);
      setShowConfetti(true);
      const audio = new Audio('https://codeskulptor-demos.commondatastorage.googleapis.com/pang/potted_plant.mp3');
      audio.volume = 0.2;
      audio.play().catch(() => {}); // Simple success sound
    } else {
      setSuccess(false);
      setShowConfetti(false);
    }
  }, [inputValue, currentPhrase]);

  const handleNext = () => {
    const currentIndex = PHRASES.indexOf(currentPhrase);
    const nextIndex = (currentIndex + 1) % PHRASES.length;
    setCurrentPhrase(PHRASES[nextIndex]);
    setInputValue('');
    setSuccess(false);
    setShowConfetti(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10 flex justify-center items-center">
            <div className="absolute text-6xl animate-bounce">🎉</div>
            <div className="absolute text-6xl animate-pulse delay-75 right-10 top-10">✨</div>
            <div className="absolute text-6xl animate-pulse delay-150 left-10 bottom-10">🌟</div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-3xl">✍️</span>
        עכשיו תורכם לתרגל
      </h2>

      <div className="space-y-8">
        {/* Step 1: Source */}
        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">1. העתיקו את הטקסט הזה:</label>
          <div className="relative">
             <input 
              readOnly 
              value={currentPhrase}
              className="w-full text-xl p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-blue-900 focus:outline-none cursor-text select-all"
              onClick={(e) => e.currentTarget.select()} // Helper for easy selection
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-blue-400 pointer-events-none">
              (קליק ימני - העתק)
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center text-gray-300">
           <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>

        {/* Step 2: Target */}
        <div className="space-y-2">
          <label className="block text-gray-600 font-medium">2. הדביקו את הטקסט כאן:</label>
          <input 
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="לחצו קליק ימני ואז 'הדבק'..."
            className={`w-full text-xl p-4 border-2 rounded-xl focus:outline-none transition-all ${
              success 
                ? 'border-green-500 bg-green-50 text-green-900' 
                : 'border-gray-300 focus:border-blue-400 bg-white'
            }`}
          />
        </div>

        {/* Feedback Area */}
        <div className="h-20 flex items-center justify-center">
          {success ? (
            <div className="text-center animate-fade-in">
              <p className="text-2xl font-bold text-green-600 mb-2">כל הכבוד! הצלחתם!</p>
              <button 
                onClick={handleNext}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                נסה משפט אחר
              </button>
            </div>
          ) : (
            <p className="text-gray-400">ההצלחה תופיע כאן כשתסיימו...</p>
          )}
        </div>
      </div>
    </div>
  );
};