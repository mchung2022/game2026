import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const DialogBox = ({ speaker, text, onNext, choices, onChoiceSelect }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25); // Typing speed

    return () => clearInterval(interval);
  }, [text]);

  const handleBoxClick = () => {
    if (isTyping) {
      // Instantly finish typing
      setDisplayedText(text);
      setIsTyping(false);
    } else if (!choices && onNext) {
      onNext();
    }
  };

  const showChoices = choices && !isTyping;

  return (
    <div className="flex flex-col gap-6 animate-fade">
      {/* Speaker Tag & Avatar Info */}
      <div className="flex items-center gap-4">
        <span className="text-4xl filter drop-shadow-md animate-float">{speaker.avatar}</span>
        <div>
          <h4 className="text-lg font-bold text-slate-100">{speaker.name}</h4>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {speaker.role}
          </span>
        </div>
      </div>

      {/* Main Dialogue Box */}
      <div 
        onClick={handleBoxClick}
        className="glass-panel p-6 md:p-8 cursor-pointer relative overflow-hidden border-indigo-500/25 border-l-4 min-h-[140px] flex flex-col justify-between"
      >
        <p className="text-lg text-slate-200 font-medium leading-relaxed select-none">
          {displayedText}
          {isTyping && <span className="inline-block w-2 h-5 ml-1 bg-cyan-400 animate-pulse">|</span>}
        </p>

        {/* Click Indicator (Only when not showing choices and not typing) */}
        {!showChoices && !isTyping && onNext && (
          <div className="flex justify-end items-center gap-1 text-xs text-indigo-400 font-semibold mt-4 animate-pulse">
            <span>點擊對話框繼續</span>
            <ArrowRight size={14} />
          </div>
        )}
      </div>

      {/* Choice Buttons */}
      {showChoices && (
        <div className="flex flex-col gap-3 mt-2 animate-scale">
          {choices.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onChoiceSelect(option)}
              className="btn btn-secondary text-left justify-start p-4 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200 transition-all text-base md:text-lg w-full flex items-start gap-3"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-sm shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DialogBox;
