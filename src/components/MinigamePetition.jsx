import React, { useState, useEffect } from 'react';
import { Share2, Users, FileText, CheckCircle2, Award } from 'lucide-react';

const PETITION_DRAFT = {
  subject: {
    label: "聯署主旨 (Subject)",
    options: [
      { text: "【不合適】叫車子開慢一點，不然我們要抗議，還我們行路權力！", isCorrect: false },
      { text: "【合適】建請於本市陽光國中校門口增設行人專用號誌與人行道，以保障學生通學安全。", isCorrect: true },
      { text: "【不合適】請鎮長來學校門口站崗指揮交通，每天上下學都要看著。", isCorrect: false }
    ]
  },
  description: {
    label: "狀況說明 (Problem Description)",
    options: [
      { text: "【合適】陽光國中校門口路段車流量龐大，因缺乏實體人行道，致使每日放學千名師生被迫人車爭道，屢生險象。", isCorrect: true },
      { text: "【不合適】馬路非常窄，而且車子開得很快，有很多討厭的司機根本不禮讓行人，我們都很生氣。", isCorrect: false }
    ]
  },
  solution: {
    label: "具體建議 (Proposed Solutions)",
    options: [
      { text: "【不合適】要求禁止一切車輛開進陽光街，全部改成徒步區。", isCorrect: false },
      { text: "【合適】1. 劃設實體人行道；2. 增設行人專用號誌；3. 增設校園周邊減速慢行警示牌。", isCorrect: true }
    ]
  }
};

const MinigamePetition = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1: Draft, 2: Mobilize, 3: Success
  const [draft, setDraft] = useState({ subject: null, description: null, solution: null });
  const [signatures, setSignatures] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [shake, setShake] = useState(false);

  // Mobilize Stage Countdown
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === 2 && timeLeft === 0) {
      if (signatures >= 500) {
        setStep(3);
      } else {
        // Reset mobilization
        alert(`時間到！你收集了 ${signatures} 個連署，還差一點點才能達到 500 人門檻。再試一次吧！`);
        setSignatures(0);
        setTimeLeft(10);
      }
    }
  }, [step, timeLeft, signatures]);

  const handleSelect = (category, index) => {
    setDraft({ ...draft, [category]: index });
  };

  const handleDraftSubmit = () => {
    const isSubjectCorrect = PETITION_DRAFT.subject.options[draft.subject]?.isCorrect;
    const isDescCorrect = PETITION_DRAFT.description.options[draft.description]?.isCorrect;
    const isSolCorrect = PETITION_DRAFT.solution.options[draft.solution]?.isCorrect;

    if (isSubjectCorrect && isDescCorrect && isSolCorrect) {
      setStep(2);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      alert("部分填寫的內容不夠客觀或格式不合適，請調整成更理性的陳情文字！");
    }
  };

  const handleShare = (increment) => {
    setSignatures((prev) => Math.min(prev + increment, 500));
  };

  useEffect(() => {
    if (signatures >= 500 && step === 2) {
      setTimeout(() => setStep(3), 500);
    }
  }, [signatures, step]);

  return (
    <div className={`glass-panel p-6 border-cyan-500/20 glow-cyan animate-fade ${shake ? 'animate-shake' : ''}`}>
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div>
          <h3 className="text-xl font-black text-cyan-300 flex items-center gap-2">
            <FileText size={20} />
            任務：發起公民連署
          </h3>
          <p className="text-slate-400 text-xs mt-1">請利用合適的文字起草倡議書，並動員社區居民聯署！</p>
        </div>
        <div className="text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20 font-bold">
          第一階段：請願準備
        </div>
      </div>

      {/* STEP 1: Drafting the Petition */}
      {step === 1 && (
        <div className="flex flex-col gap-5">
          {Object.entries(PETITION_DRAFT).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300">{value.label}</label>
              <div className="flex flex-col gap-2">
                {value.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(key, idx)}
                    className={`btn text-left justify-start p-3 text-sm rounded-lg transition-all ${
                      draft[key] === idx
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-slate-950/40 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleDraftSubmit}
            disabled={draft.subject === null || draft.description === null || draft.solution === null}
            className={`btn btn-accent w-full mt-4 ${
              (draft.subject === null || draft.description === null || draft.solution === null) ? 'btn-disabled' : ''
            }`}
          >
            完成草擬，開始號召連署
          </button>
        </div>
      )}

      {/* STEP 2: Mobilizing (Clicking Game) */}
      {step === 2 && (
        <div className="flex flex-col items-center gap-6 py-4 animate-scale">
          <div className="text-center">
            <h4 className="text-lg font-bold text-slate-200">網路宣傳大動員！</h4>
            <p className="text-xs text-slate-400 mt-1">點擊下方按鈕，將連署分享到不同管道，收集 500 份同意書！</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 text-center">
              <span className="text-xs text-slate-400 block font-bold">剩餘時間</span>
              <span className="text-3xl font-black text-rose-400">{timeLeft} 秒</span>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 text-center">
              <span className="text-xs text-slate-400 block font-bold">已收集聯署</span>
              <span className="text-3xl font-black text-cyan-300">{signatures} / 500</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden border border-white/5">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
              style={{ width: `${(signatures / 500) * 100}%` }}
            />
          </div>

          {/* Action Sharing Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-sm mt-2">
            <button
              onClick={() => handleShare(15)}
              className="btn btn-secondary justify-between w-full hover:border-cyan-400/50 hover:bg-cyan-500/10 text-slate-200"
            >
              <span className="flex items-center gap-2">
                <Users size={16} className="text-indigo-400" />
                分享到「班級與學生會群組」
              </span>
              <span className="text-xs font-bold text-cyan-400">+15 聯署</span>
            </button>

            <button
              onClick={() => handleShare(35)}
              className="btn btn-secondary justify-between w-full hover:border-cyan-400/50 hover:bg-cyan-500/10 text-slate-200"
            >
              <span className="flex items-center gap-2">
                <Share2 size={16} className="text-pink-400" />
                轉發到「陽光社區家長後援會」
              </span>
              <span className="text-xs font-bold text-cyan-400">+35 聯署</span>
            </button>

            <button
              onClick={() => handleShare(60)}
              className="btn btn-secondary justify-between w-full hover:border-cyan-400/50 hover:bg-cyan-500/10 text-slate-200"
            >
              <span className="flex items-center gap-2">
                <Share2 size={16} className="text-yellow-400" />
                張貼在「地方爆料公社論壇」
              </span>
              <span className="text-xs font-bold text-cyan-400">+60 聯署</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Success Screen */}
      {step === 3 && (
        <div className="flex flex-col items-center gap-6 py-6 text-center animate-scale">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center animate-bounce">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <h4 className="text-2xl font-black text-emerald-400">連署成功達標！</h4>
            <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
              你成功起草了合格的倡議書，並動員了 500 位熱心市民簽署！鎮公所已經收到請願，表示將會進入預算評估階段。
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-center gap-4 max-w-sm mt-2">
            <span className="text-4xl">✍️</span>
            <div className="text-left">
              <div className="text-xs text-yellow-400 font-extrabold uppercase tracking-wider">獲得勳章</div>
              <h5 className="font-bold text-white text-base">公民行動先鋒</h5>
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

export default MinigamePetition;
