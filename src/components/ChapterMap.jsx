import React from 'react';
import { Lock, Check, Award, Play } from 'lucide-react';
import { CHAPTERS } from '../data/gameData';

const ChapterMap = ({ currentChapterId, completedChapters, onSelectChapter, badgesEarned }) => {
  return (
    <div className="w-full flex flex-col gap-6 animate-fade">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-black gradient-text">陽光鎮民主探險地圖</h2>
          <p className="text-slate-400 text-sm mt-1">完成各章的政治參與挑戰，收集小公民勳章！</p>
        </div>
        <div className="flex items-center gap-4 bg-indigo-950/40 px-4 py-2 rounded-xl border border-indigo-500/20">
          <div className="text-left">
            <div className="text-xs text-indigo-300 font-bold">學習進度</div>
            <div className="text-lg font-black text-white">
              {Math.round((completedChapters.length / CHAPTERS.length) * 100)}%
            </div>
          </div>
          <div className="w-20 bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-cyan-400 h-full transition-all duration-500" 
              style={{ width: `${(completedChapters.length / CHAPTERS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chapter List / Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative py-4">
        {CHAPTERS.map((ch, idx) => {
          const isCompleted = completedChapters.includes(ch.id);
          const isCurrent = currentChapterId === ch.id;
          const isLocked = ch.id > currentChapterId && !isCompleted;
          const hasBadge = badgesEarned.includes(ch.badgeId);

          let borderClass = "border-white/5";
          let bgClass = "bg-slate-900/40 text-slate-500";
          let iconContainerClass = "bg-slate-800 text-slate-600";

          if (isCompleted) {
            borderClass = "border-emerald-500/30 hover:border-emerald-500/50";
            bgClass = "bg-emerald-950/20 text-slate-300";
            iconContainerClass = "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]";
          } else if (isCurrent) {
            borderClass = "border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]";
            bgClass = "bg-cyan-950/30 text-white ring-1 ring-cyan-500/20";
            iconContainerClass = "bg-cyan-500 text-slate-900 font-bold animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.4)]";
          }

          return (
            <div 
              key={ch.id}
              onClick={() => !isLocked && onSelectChapter(ch.id)}
              className={`glass-panel p-5 flex flex-col justify-between min-h-[180px] border ${borderClass} ${bgClass} ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer transform hover:-translate-y-1'}`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Chapter 0{ch.id}
                  </span>
                  
                  {/* Status Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconContainerClass}`}>
                    {isCompleted ? (
                      <Check size={16} strokeWidth={3} />
                    ) : isCurrent ? (
                      <Play size={14} fill="currentColor" />
                    ) : (
                      <Lock size={14} />
                    )}
                  </div>
                </div>

                <h3 className={`font-bold text-base mb-1 ${isCurrent ? 'text-cyan-300' : 'text-slate-200'}`}>
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-3">
                  {ch.subtitle}
                </p>
              </div>

              {/* Bottom badge placeholder / info */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">通關勳章</span>
                <span className={`font-bold flex items-center gap-1 ${hasBadge ? 'text-yellow-400' : 'text-slate-600'}`}>
                  <Award size={14} />
                  {hasBadge ? "已獲得" : "未解鎖"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterMap;
