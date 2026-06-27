import React, { useState } from 'react';
import { Award, X, BookOpen } from 'lucide-react';
import { BADGES } from '../data/gameData';

const BadgeCollector = ({ badgesEarned }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  return (
    <div className="glass-panel p-6 border-indigo-500/20">
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
        <Award className="text-yellow-400" size={20} />
        <h3 className="font-bold text-lg">我的公民勳章牆 ({badgesEarned.length}/4)</h3>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-2 gap-4">
        {Object.values(BADGES).map((badge) => {
          const isEarned = badgesEarned.includes(badge.id);
          
          return (
            <div
              key={badge.id}
              onClick={() => isEarned && setSelectedBadge(badge)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all ${
                isEarned 
                  ? 'border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 cursor-pointer shadow-[0_0_15px_rgba(234,179,8,0.05)] hover:scale-105' 
                  : 'border-white/5 bg-slate-900/20 opacity-40 cursor-not-allowed select-none'
              }`}
            >
              <span className={`text-3xl ${isEarned ? 'filter drop-shadow-[0_0_8px_rgba(234,179,8,0.5)] animate-float' : ''}`}>
                {badge.icon}
              </span>
              <span className={`text-xs font-bold ${isEarned ? 'text-yellow-400' : 'text-slate-500'}`}>
                {badge.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Badge Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade">
          <div className="glass-panel max-w-md w-full p-6 border-yellow-500/40 shadow-[0_0_40px_rgba(234,179,8,0.15)] relative animate-scale">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <span className="text-6xl filter drop-shadow-[0_0_12px_rgba(234,179,8,0.6)] animate-float">
                {selectedBadge.icon}
              </span>
              
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-yellow-400 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                  解鎖榮譽
                </span>
                <h4 className="text-2xl font-black mt-2 text-white">{selectedBadge.title}</h4>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5 w-full text-slate-300 text-sm leading-relaxed">
                {selectedBadge.description}
              </div>

              <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold mt-2">
                <BookOpen size={14} />
                <span>公民知識已納入你的學習歷程！</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeCollector;
