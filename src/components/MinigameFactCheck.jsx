import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertOctagon, HelpCircle, ArrowRight } from 'lucide-react';
import { QUIZ_DATA } from '../data/gameData';

const MinigameFactCheck = ({ onComplete }) => {
  const factChecks = QUIZ_DATA[3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userChoice, setUserChoice] = useState(null); // 'fact' or 'fake'
  const [gameFinished, setGameFinished] = useState(false);

  const handleChoice = (choice) => {
    if (isFlipped) return;

    setUserChoice(choice);
    setIsFlipped(true);

    const currentCard = factChecks[currentIndex];
    const isChoiceFake = choice === 'fake';
    const isCorrect = isChoiceFake === currentCard.isFake;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setUserChoice(null);
    if (currentIndex < factChecks.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGameFinished(true);
    }
  };

  const currentCard = factChecks[currentIndex];
  const isCorrect = userChoice && ((userChoice === 'fake') === currentCard.isFake);

  return (
    <div className="glass-panel p-6 border-pink-500/20 glow-pink animate-fade">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div>
          <h3 className="text-xl font-black text-pink-400 flex items-center gap-2">
            <ShieldCheck size={22} />
            任務：假訊息防線挑戰
          </h3>
          <p className="text-slate-400 text-xs mt-1">請利用媒體識讀技巧，過濾不實謠言，傳遞正確資訊！</p>
        </div>
        <div className="text-xs bg-pink-500/10 text-pink-300 px-3 py-1 rounded-full border border-pink-500/20 font-bold">
          進度 {currentIndex + 1} / {factChecks.length}
        </div>
      </div>

      {/* Main Game Area */}
      {!gameFinished ? (
        <div className="flex flex-col items-center gap-6">
          <div className="text-center bg-slate-900/60 p-4 rounded-xl border border-white/5 w-full">
            <span className="text-xs text-slate-400 block font-bold mb-1">社群論壇與 LINE 群組傳聞</span>
            <p className="text-sm font-semibold text-slate-300">「閱讀下方訊息，點擊按鈕判斷它是『查證屬實的事實』還是『刻意煽動的假訊息』。」</p>
          </div>

          {/* Fact Card (Flippable Container) */}
          <div className={`fact-card ${isFlipped ? 'flipped' : ''}`}>
            <div className="fact-card-inner">
              
              {/* FRONT OF THE CARD */}
              <div className="fact-card-front">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded">
                    熱門分享訊息 💬
                  </span>
                  <HelpCircle size={18} className="text-slate-500" />
                </div>
                <div className="my-auto py-4 text-center">
                  <p className="text-base md:text-lg font-bold text-slate-200 leading-relaxed">
                    {currentCard.text}
                  </p>
                </div>
                <div className="text-center text-xs text-slate-500 font-bold">
                  點擊下方按鈕進行評估
                </div>
              </div>

              {/* BACK OF THE CARD */}
              <div className="fact-card-back">
                <div className="flex items-center gap-2">
                  {currentCard.isFake ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
                      <AlertOctagon size={12} /> 謠言 / 假訊息
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      <CheckCircle2 size={12} /> 真實資訊
                    </span>
                  )}
                </div>
                
                <div className="my-auto py-2 text-left">
                  <h4 className={`text-base font-black ${isCorrect ? 'text-emerald-400' : 'text-rose-400'} mb-1`}>
                    {isCorrect ? "答對了！" : "答錯了！"}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                    {currentCard.checkResult}
                  </p>
                </div>

                <div className="text-right">
                  <button 
                    onClick={handleNext}
                    className="btn btn-primary btn-accent py-2 px-4 text-xs font-bold gap-1"
                  >
                    <span>下一題</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons (Disabled when card is flipped) */}
          <div className="flex gap-4 w-full max-w-[400px]">
            <button
              onClick={() => handleChoice('fact')}
              disabled={isFlipped}
              className={`btn btn-success flex-1 py-4 font-bold text-sm ${isFlipped ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <CheckCircle2 size={18} />
              這是事實
            </button>
            <button
              onClick={() => handleChoice('fake')}
              disabled={isFlipped}
              className={`btn btn-danger flex-1 py-4 font-bold text-sm ${isFlipped ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <AlertOctagon size={18} />
              這是假訊息
            </button>
          </div>
        </div>
      ) : (
        /* GAME OVER / RESULTS */
        <div className="flex flex-col items-center gap-6 py-6 text-center animate-scale">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center animate-bounce">
            <ShieldCheck size={36} />
          </div>

          <div>
            <h4 className="text-2xl font-black text-emerald-400">媒體識讀挑戰完成！</h4>
            <p className="text-slate-300 text-sm mt-2 max-w-sm mx-auto">
              你一共判斷對了 <strong className="text-pink-400 text-lg font-black">{score} / {factChecks.length}</strong> 道資訊！
            </p>
            
            <div className="text-slate-400 text-xs mt-4 max-w-md mx-auto space-y-2 text-left bg-slate-950/40 p-4 rounded-xl border border-white/5">
              <p className="font-bold text-slate-300">💡 媒體識讀「查證三部曲」：</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-slate-300">多方查證</strong>：不要只看標題，比對主流媒體與官方公告。</li>
                <li><strong className="text-slate-300">理智思考</strong>：注意訊息是否過於偏激、刻意激發情緒。</li>
                <li><strong className="text-slate-300">拒絕轉發</strong>：未經證實的訊息，絕不轉傳給親友。</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-center gap-4 max-w-sm mt-2">
            <span className="text-4xl">🔍</span>
            <div className="text-left">
              <div className="text-xs text-yellow-400 font-extrabold uppercase tracking-wider">獲得勳章</div>
              <h5 className="font-bold text-white text-base">媒體識讀達人</h5>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="btn btn-primary w-full max-w-xs mt-4"
          >
            完成本章，返回地圖
          </button>
        </div>
      )}
    </div>
  );
};

export default MinigameFactCheck;
