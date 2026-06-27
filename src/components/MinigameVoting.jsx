import React, { useState } from 'react';
import { Vote, FileSignature, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const MinigameVoting = ({ onComplete }) => {
  const [stage, setStage] = useState(1); // 1: ID Check, 2: Receipt, 3: Booth, 4: Ballot Box, 5: Result
  const [selectedItems, setSelectedItems] = useState([]);
  const [votingTool, setVotingTool] = useState(null);
  const [boxSelected, setBoxSelected] = useState(null);
  const [ballotMarked, setBallotMarked] = useState(false);
  const [isInvalidBallot, setIsInvalidBallot] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Stage 1: ID Check
  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleIDVerify = () => {
    if (!selectedItems.includes('身分證')) {
      setFeedback("選務人員說：『抱歉，國民身分證是法定的唯一身分證明文件，沒帶的話不能投票喔！』");
      return;
    }
    setFeedback("身分驗證成功！你出示了身分證，選務人員核對名冊中。");
    setTimeout(() => {
      setFeedback("");
      setStage(2);
    }, 1500);
  };

  // Stage 2: Receipt
  const handleReceipt = (type) => {
    setFeedback(type === 'stamp' ? "你使用個人印章蓋章領票。" : "你在選民名冊上親自簽名領票。");
    setTimeout(() => {
      setFeedback("");
      setStage(3);
    }, 1500);
  };

  // Stage 3: Booth
  const handleStampBallot = (tool) => {
    setVotingTool(tool);
    setBallotMarked(true);
    if (tool !== 'official') {
      setIsInvalidBallot(true);
      setFeedback("注意：在選票上使用「私章」或「原子筆」簽名標記，會使選票變成『無效票（廢票）』！");
    } else {
      setIsInvalidBallot(false);
      setFeedback("你使用選舉專用戳記在2號林小青的欄位蓋章。選票有效！");
    }
  };

  const handleLeaveBooth = () => {
    if (!ballotMarked) {
      alert("請先完成投票圈選！");
      return;
    }
    setFeedback("");
    setStage(4);
  };

  // Stage 4: Ballot Box
  const handleDropBallot = (box) => {
    setBoxSelected(box);
    if (box !== 'councillor') {
      setFeedback("哎呀！你投錯票箱了！這是一張「議員」選票，要投給議員票箱才對！");
      setTimeout(() => {
        setBoxSelected(null);
        setFeedback("");
      }, 2000);
      return;
    }
    
    setFeedback("投票完成！你把選票投入了議員票箱。");
    setTimeout(() => {
      setFeedback("");
      setStage(5);
    }, 1500);
  };

  return (
    <div className="glass-panel p-6 border-indigo-500/20 glow-indigo animate-fade">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <div>
          <h3 className="text-xl font-black text-indigo-400 flex items-center gap-2">
            <Vote size={22} />
            任務：神聖選票投開票所挑戰
          </h3>
          <p className="text-slate-400 text-xs mt-1">請幫助爸爸媽媽在現場依據正確法律程序完成投票！</p>
        </div>
        <div className="text-xs bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/20 font-bold">
          步驟 {stage} / 5
        </div>
      </div>

      {/* STAGE 1: Identity Verification */}
      {stage === 1 && (
        <div className="flex flex-col gap-4 animate-scale">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <h4 className="text-sm font-bold text-slate-200 mb-2">排隊進入投票所，請選擇要拿給選務人員驗證身分的物品（複選）：</h4>
            <p className="text-xs text-slate-400">提示：有些東西是法律規定必須要帶的，有些可以加快速度。</p>
          </div>

          <div className="grid grid-cols-2 gap-3 my-2">
            {[
              { id: '身分證', name: '🪪 國民身分證 (身分核對)', mandatory: true },
              { id: '印章', name: '🪵 個人印章 (領票登記)', mandatory: false },
              { id: '通知單', name: '✉️ 投票通知單 (查找名冊)', mandatory: false },
              { id: '健保卡', name: '🏥 健保卡 (第二身分證明)', mandatory: false },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`btn text-left justify-start p-4 rounded-xl border transition-all ${
                  selectedItems.includes(item.id)
                    ? 'border-indigo-400 bg-indigo-500/15 text-indigo-200 shadow-md'
                    : 'border-white/5 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {feedback && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg flex items-center gap-2">
              <AlertTriangle size={14} className="shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          <button onClick={handleIDVerify} className="btn btn-primary w-full mt-2">
            提交證件進行驗證
          </button>
        </div>
      )}

      {/* STAGE 2: Receipt & Registry Sign */}
      {stage === 2 && (
        <div className="flex flex-col gap-5 animate-scale">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <h4 className="text-sm font-bold text-slate-200">選務人員找到了你的名字。現在你必須「確認領票登記」：</h4>
            <p className="text-xs text-slate-400 mt-1">選民名冊是防止重複投票的重要紀錄，你可以選擇以下方式領取選票：</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 my-2">
            <button
              onClick={() => handleReceipt('stamp')}
              className="btn btn-secondary flex-1 py-6 flex flex-col gap-2 hover:border-indigo-400/50 hover:bg-indigo-500/5"
            >
              <span className="text-2xl">🪵</span>
              <span className="font-bold">蓋個人私章領取</span>
            </button>
            <button
              onClick={() => handleReceipt('sign')}
              className="btn btn-secondary flex-1 py-6 flex flex-col gap-2 hover:border-indigo-400/50 hover:bg-indigo-500/5"
            >
              <FileSignature size={28} className="text-indigo-400" />
              <span className="font-bold">在名冊上親自簽名領取</span>
            </button>
          </div>

          {feedback && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg">
              {feedback}
            </div>
          )}
        </div>
      )}

      {/* STAGE 3: Ballot Marking Booth */}
      {stage === 3 && (
        <div className="flex flex-col gap-4 animate-scale">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <h4 className="text-sm font-bold text-slate-200">進入「圈選處（遮屏式投票屏風）」，請圈選候選人：</h4>
            <p className="text-xs text-slate-400 mt-1">
              警告：圈選處為祕密投票設計，任何人不得窺視。請選擇正確的「圈選工具」蓋在選票上。
            </p>
          </div>

          {/* Simulated Ballot Paper */}
          <div className="border-2 border-slate-700 bg-amber-50/90 text-slate-900 p-4 rounded-xl flex flex-col gap-3 mx-auto w-full max-w-sm shadow-inner">
            <div className="text-center font-bold border-b border-slate-400 pb-1 text-sm text-slate-700">
              陽光鎮鎮議員選舉選票 (第二選區)
            </div>
            
            <div className="grid grid-cols-2 gap-4 divide-x divide-slate-400">
              {/* Candidate 1 */}
              <div className="flex flex-col items-center p-2">
                <span className="text-xs font-bold text-slate-500">1 號</span>
                <span className="text-base font-black">陳大同</span>
                <div className="w-14 h-14 rounded-full border-2 border-slate-400 mt-2 flex items-center justify-center bg-white text-slate-200">
                  印
                </div>
              </div>
              
              {/* Candidate 2 */}
              <div className="flex flex-col items-center p-2 relative">
                <span className="text-xs font-bold text-slate-500">2 號</span>
                <span className="text-base font-black text-indigo-900">林小青</span>
                <div className="w-14 h-14 rounded-full border-2 border-indigo-950 mt-2 flex items-center justify-center bg-white relative">
                  {ballotMarked && votingTool === 'official' && (
                    <span className="text-rose-600 font-extrabold text-3xl select-none absolute">卜</span>
                  )}
                  {ballotMarked && votingTool === 'personal' && (
                    <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-[8px] font-bold select-none absolute">林</div>
                  )}
                  {ballotMarked && votingTool === 'pen' && (
                    <span className="text-blue-700 font-bold text-lg select-none absolute">✓</span>
                  )}
                  {!ballotMarked && <span className="text-slate-200">印</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Voting tools options */}
          {!ballotMarked ? (
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-xs text-slate-400 font-bold">請選擇要使用的工具在「2號 林小青」的圓框中蓋印：</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleStampBallot('official')}
                  className="btn btn-secondary p-3 text-xs flex flex-col gap-1 hover:border-emerald-500 hover:bg-emerald-500/5 text-slate-200"
                >
                  <span className="text-lg">卜</span>
                  <span className="font-bold">選舉專用戳記</span>
                </button>
                <button
                  onClick={() => handleStampBallot('personal')}
                  className="btn btn-secondary p-3 text-xs flex flex-col gap-1 hover:border-red-500 hover:bg-red-500/5 text-slate-200"
                >
                  <span className="text-lg">🪵</span>
                  <span className="font-bold">攜帶的私章</span>
                </button>
                <button
                  onClick={() => handleStampBallot('pen')}
                  className="btn btn-secondary p-3 text-xs flex flex-col gap-1 hover:border-red-500 hover:bg-red-500/5 text-slate-200"
                >
                  <span className="text-lg">✒️</span>
                  <span className="font-bold">自備藍色原子筆</span>
                </button>
              </div>
            </div>
          ) : (
            <div className={`p-3 rounded-lg text-xs leading-relaxed ${isInvalidBallot ? 'bg-red-500/10 border border-red-500/30 text-red-400' : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'}`}>
              {feedback}
            </div>
          )}

          <button
            onClick={handleLeaveBooth}
            disabled={!ballotMarked}
            className={`btn btn-primary w-full mt-2 ${!ballotMarked ? 'btn-disabled' : ''}`}
          >
            走出圈選處，前往票箱區
          </button>
        </div>
      )}

      {/* STAGE 4: Casting Ballot */}
      {stage === 4 && (
        <div className="flex flex-col gap-4 animate-scale">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <h4 className="text-sm font-bold text-slate-200">折疊好選票，請將選票投入對應的投票箱中：</h4>
            <p className="text-xs text-slate-400 mt-1">選票投錯票箱可能導致開票時的爭議。請看清各個箱子！</p>
          </div>

          <div className="grid grid-cols-3 gap-3 my-2">
            {[
              { id: 'mayor', label: '👔 鎮長票箱' },
              { id: 'councillor', label: '🚶 議員票箱' },
              { id: 'referendum', label: '🗳️ 公投案票箱' },
            ].map(box => (
              <button
                key={box.id}
                onClick={() => handleDropBallot(box.id)}
                className={`btn py-8 rounded-xl border flex flex-col gap-3 justify-center items-center ${
                  boxSelected === box.id
                    ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300'
                    : 'border-white/5 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="w-12 h-14 border border-white/20 bg-slate-800 rounded flex items-center justify-center shadow-md">
                  <span className="w-8 h-1 bg-black rounded-full" />
                </div>
                <span className="font-bold text-xs">{box.label}</span>
              </button>
            ))}
          </div>

          {feedback && (
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs rounded-lg">
              {feedback}
            </div>
          )}
        </div>
      )}

      {/* STAGE 5: Voting Results & Summary */}
      {stage === 5 && (
        <div className="flex flex-col items-center gap-6 py-6 text-center animate-scale">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center animate-bounce">
            <CheckCircle size={36} />
          </div>

          <div>
            <h4 className="text-2xl font-black text-emerald-400">成功完成投票！</h4>
            <div className="text-slate-300 text-sm mt-3 max-w-md mx-auto space-y-2 text-left bg-slate-950/40 p-4 rounded-xl border border-white/5">
              <p>選民投票四大原則：</p>
              <ul className="list-disc pl-5 text-slate-400 text-xs space-y-1">
                <li><strong className="text-slate-300">普通原則</strong>：凡中華民國國民達法定年齡，除受監護宣告外，皆平等享有選舉權。</li>
                <li><strong className="text-slate-300">平等原則</strong>：每人票數相同，每票價值相等（一人一票，票票等值）。</li>
                <li><strong className="text-slate-300">直接原則</strong>：由選民直接投遞選票選出公職人員，不經代理人轉投。</li>
                <li><strong className="text-slate-300">無記名原則 (祕密投票)</strong>：選票不書寫姓名，亦不受他人窺視，充分保障投票自由。</li>
              </ul>
              {isInvalidBallot && (
                <p className="text-rose-400 text-xs font-bold mt-2">
                  ⚠️ 遺憾：你在圈選時使用了錯誤的私章或原子筆，在正式開票中，這張選票會被判定為『無效票』，無法對你的候選人提供實質支持喔！
                </p>
              )}
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-center gap-4 max-w-sm mt-2">
            <span className="text-4xl">🗳️</span>
            <div className="text-left">
              <div className="text-xs text-yellow-400 font-extrabold uppercase tracking-wider">獲得勳章</div>
              <h5 className="font-bold text-white text-base">理性神聖選民</h5>
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

export default MinigameVoting;
