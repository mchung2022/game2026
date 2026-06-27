import React, { useState } from 'react';
import { Sparkles, HelpCircle, RotateCcw, Award, BookOpen, Map, MapPin } from 'lucide-react';
import { CHAPTERS, STORY_DATA, CHARACTERS } from './data/gameData';
import DialogBox from './components/DialogBox';
import ChapterMap from './components/ChapterMap';
import BadgeCollector from './components/BadgeCollector';
import MinigamePetition from './components/MinigamePetition';
import MinigameVoting from './components/MinigameVoting';
import MinigameFactCheck from './components/MinigameFactCheck';

const App = () => {
  const [screen, setScreen] = useState('start'); // start, map, story, minigame, victory
  const [currentChapterId, setCurrentChapterId] = useState(1);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [badgesEarned, setBadgesEarned] = useState([]);
  
  // Story Engine States
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [activeBranch, setActiveBranch] = useState(null);
  const [branchIndex, setBranchIndex] = useState(0);
  const [platformViewed, setPlatformViewed] = useState(false);
  const [showPlatformScreen, setShowPlatformScreen] = useState(false);
  const [isIncorrectChoice, setIsIncorrectChoice] = useState(false);

  // Restart the game
  const resetGame = () => {
    if (window.confirm("確定要重置所有進度、重新開始遊戲嗎？")) {
      setScreen('start');
      setCurrentChapterId(1);
      setCompletedChapters([]);
      setBadgesEarned([]);
      setDialogueIndex(0);
      setActiveBranch(null);
      setBranchIndex(0);
      setPlatformViewed(false);
      setShowPlatformScreen(false);
      setIsIncorrectChoice(false);
    }
  };

  // Start a chapter
  const handleStartChapter = (chapterId) => {
    setCurrentChapterId(chapterId);
    setDialogueIndex(0);
    setActiveBranch(null);
    setBranchIndex(0);
    setPlatformViewed(false);
    setShowPlatformScreen(false);
    setScreen('story');
  };

  const currentChapter = STORY_DATA[currentChapterId];
  const activeChapterData = CHAPTERS.find(c => c.id === currentChapterId);

  // Dialogue processing
  const handleNextDialogue = () => {
    // If we are in a branching dialogue
    if (activeBranch) {
      if (branchIndex < activeBranch.length - 1) {
        setBranchIndex(prev => prev + 1);
      } else {
        // Branching dialog finished, proceed to mini-game/next phase
        setActiveBranch(null);
        if (isIncorrectChoice) {
          setIsIncorrectChoice(false);
          alert("協商失敗！王老闆拂袖而去，居民與學生也無法認同。請重新商討一個更具包容性的折衷方案！");
        } else {
          startNextPhase();
        }
      }
    } else {
      // Main branch dialogues
      const dialogs = currentChapter.dialogues;
      if (dialogueIndex < dialogs.length - 1) {
        setDialogueIndex(prev => prev + 1);
      } else {
        // Main dialogue finished. Check if we need to show platforms (Chapter 2)
        if (currentChapterId === 2 && !platformViewed) {
          setShowPlatformScreen(true);
        } else if (currentChapter.choice) {
          // Keep showing last dialogue index but choices will be unlocked
        } else {
          startNextPhase();
        }
      }
    }
  };

  // Branching Choice Selection
  const handleChoiceSelect = (option) => {
    if (option.isIncorrect) {
      setIsIncorrectChoice(true);
    } else {
      setIsIncorrectChoice(false);
    }
    setActiveBranch(option.nextDialog);
    setBranchIndex(0);
  };

  // Move from Dialogs to Mini-game or next action
  const startNextPhase = () => {
    if (currentChapterId === 1) {
      setScreen('minigame');
    } else if (currentChapterId === 2) {
      setScreen('minigame');
    } else if (currentChapterId === 3) {
      setScreen('minigame');
    } else if (currentChapterId === 4) {
      // Chapter 4 doesn't have a clicking mini-game; it completes after consensus dialogue
      handleChapterComplete();
    }
  };

  // Complete a chapter & award badge
  const handleChapterComplete = () => {
    const nextCompleted = [...completedChapters];
    if (!nextCompleted.includes(currentChapterId)) {
      nextCompleted.push(currentChapterId);
      setCompletedChapters(nextCompleted);
    }

    const badgeId = activeChapterData.badgeId;
    const nextBadges = [...badgesEarned];
    if (!nextBadges.includes(badgeId)) {
      nextBadges.push(badgeId);
      setBadgesEarned(nextBadges);
    }

    if (currentChapterId < 4) {
      setCurrentChapterId(currentChapterId + 1);
      setScreen('map');
    } else {
      setScreen('victory');
    }
  };

  const getActiveSpeakerAndText = () => {
    if (activeBranch) {
      return {
        speaker: activeBranch[branchIndex].speaker,
        text: activeBranch[branchIndex].text
      };
    }
    
    const dialogues = currentChapter.dialogues;
    return {
      speaker: dialogues[dialogueIndex].speaker,
      text: dialogues[dialogueIndex].text
    };
  };

  const isDialogueFinished = () => {
    if (activeBranch) return false;
    return dialogueIndex === currentChapter.dialogues.length - 1;
  };

  const activeSpeakerText = getActiveSpeakerAndText();

  return (
    <div className="game-container">
      {/* Top Navbar */}
      <header className="flex justify-between items-center py-4 mb-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Sparkles className="text-cyan-400 animate-pulse" size={24} />
          <h1 className="text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
            民主冒險家：陽光鎮交通大作戰
          </h1>
        </div>

        {screen !== 'start' && (
          <button 
            onClick={resetGame}
            className="btn btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5 hover:text-red-400 hover:border-red-500/30"
          >
            <RotateCcw size={12} />
            <span>重置遊戲</span>
          </button>
        )}
      </header>

      {/* 1. START SCREEN */}
      {screen === 'start' && (
        <main className="flex flex-col items-center justify-center text-center py-10 md:py-16 max-w-2xl mx-auto gap-8 animate-scale">
          <div className="relative">
            <span className="text-7xl filter drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-float inline-block">🚦</span>
            <span className="text-4xl absolute -top-2 -right-2 animate-bounce">🚶</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black gradient-text tracking-tight leading-tight">
              開創你我的安全通學路！
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              學校門口馬路好危險，還沒有行人紅綠燈！身為不能投票的國中生，我們能做些什麼？
              加入「陽光國中」公民行動小組，運用民主國家的政治參與管道，為社區帶來實質的改變！
            </p>
          </div>

          {/* Quick Learning Outline */}
          <div className="glass-panel p-5 w-full border-indigo-500/10 text-left bg-indigo-950/10 space-y-3">
            <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-2">
              <BookOpen size={16} />
              你會在這場民主冒險中學到：
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">🛡️ 如何發起合格的聯署與陳情</li>
              <li className="flex items-center gap-1.5">🗳️ 投開票所的正確法定程序</li>
              <li className="flex items-center gap-1.5">🔍 對抗政治假訊息的媒體識讀</li>
              <li className="flex items-center gap-1.5">🤝 公聽會上的審議溝通精神</li>
            </ul>
          </div>

          <button 
            onClick={() => setScreen('map')} 
            className="btn btn-primary px-10 py-4 text-lg w-full md:w-auto shadow-lg shadow-indigo-500/20"
          >
            開啟民主冒險
          </button>
        </main>
      )}

      {/* 2. MAP SCREEN */}
      {screen === 'map' && (
        <main className="flex flex-col gap-6">
          {/* Active Chapter Card */}
          <div className="glass-panel p-6 border-indigo-500/20 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                目前進行中
              </span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <MapPin className="text-cyan-400" size={18} />
                {activeChapterData.title}
              </h3>
              <p className="text-slate-400 text-xs md:text-sm max-w-xl">
                {activeChapterData.description}
              </p>
            </div>
            
            <button
              onClick={() => handleStartChapter(currentChapterId)}
              className="btn btn-accent px-6 py-3 w-full md:w-auto shrink-0 shadow-lg shadow-cyan-500/25"
            >
              進入章節冒險
            </button>
          </div>

          {/* Chapter Timeline Map */}
          <ChapterMap 
            currentChapterId={currentChapterId}
            completedChapters={completedChapters}
            onSelectChapter={handleStartChapter}
            badgesEarned={badgesEarned}
          />

          {/* Badges Shelf */}
          <BadgeCollector badgesEarned={badgesEarned} />
        </main>
      )}

      {/* 3. STORY SCREEN */}
      {screen === 'story' && (
        <main className="flex flex-col gap-6 max-w-2xl mx-auto my-auto py-6 animate-scale">
          {/* Chapter header */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold border-b border-white/5 pb-2 mb-2">
            <div className="flex items-center gap-1">
              <Map size={14} className="text-indigo-400" />
              <span>{activeChapterData.title}：{activeChapterData.subtitle}</span>
            </div>
            <span>進度：故事對話</span>
          </div>

          {/* Intro description (only before dialogues start) */}
          {dialogueIndex === 0 && !activeBranch && !showPlatformScreen && (
            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/10 text-slate-300 text-sm md:text-base leading-relaxed text-center shadow-inner mb-2 animate-fade">
              {currentChapter.intro}
            </div>
          )}

          {/* Platform Screen (Chapter 2 specific candidate comparison) */}
          {showPlatformScreen ? (
            <div className="flex flex-col gap-6 animate-fade">
              <div className="text-center bg-slate-900/60 p-4 rounded-xl border border-white/5">
                <h3 className="font-bold text-lg text-white">📖 閱讀候選人選舉公報政見</h3>
                <p className="text-xs text-slate-400 mt-1">身為理性公民，讓我們詳細研究兩位候選人的方案優缺點：</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentChapter.platforms.map((platform, idx) => (
                  <div key={idx} className="glass-panel p-5 border-slate-700 bg-slate-900/40 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-2xl">{platform.icon}</span>
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-white/5">
                          議員候選人
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-indigo-300 mb-3">{platform.title}</h4>
                      <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                        {platform.details.map((detail, dIdx) => (
                          <li key={dIdx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowPlatformScreen(false);
                  setPlatformViewed(true);
                }}
                className="btn btn-primary w-full mt-2"
              >
                研讀完畢，進行決策投票
              </button>
            </div>
          ) : (
            /* Dialogue Box & Choices */
            <DialogBox
              speaker={activeSpeakerText.speaker}
              text={activeSpeakerText.text}
              onNext={handleNextDialogue}
              choices={isDialogueFinished() && (currentChapterId !== 2 || platformViewed) ? currentChapter.choice : null}
              onChoiceSelect={handleChoiceSelect}
            />
          )}
        </main>
      )}

      {/* 4. MINIGAME SCREEN */}
      {screen === 'minigame' && (
        <main className="max-w-2xl mx-auto my-auto py-6 animate-scale w-full">
          {currentChapterId === 1 && (
            <MinigamePetition onComplete={handleChapterComplete} />
          )}
          {currentChapterId === 2 && (
            <MinigameVoting onComplete={handleChapterComplete} />
          )}
          {currentChapterId === 3 && (
            <MinigameFactCheck onComplete={handleChapterComplete} />
          )}
        </main>
      )}

      {/* 5. VICTORY SCREEN */}
      {screen === 'victory' && (
        <main className="flex flex-col items-center justify-center text-center py-10 max-w-2xl mx-auto gap-8 animate-scale">
          <div className="relative">
            <span className="text-8xl filter drop-shadow-[0_0_20px_rgba(234,179,8,0.5)] animate-float inline-block">🏆</span>
            <span className="text-3xl absolute -bottom-1 -right-1">🚦✨</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-black text-yellow-400 tracking-tight">
              陽光鎮的交通大勝利！
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              在你的公民參與行動下，從發起聯署、推薦合適候選人、澄清網路抹黑謠言，到公聽會協調商家共識，
              市府交通局與工程處終於完工了！「行人專用號誌」亮起了綠燈，安全的人行道也正式鋪設完畢！
              陽光國中的同學們再也不用害怕放學人車爭道了。
            </p>
          </div>

          {/* Complete Badges Display */}
          <div className="w-full">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-4">
              你所收集的公民學習勳章牆
            </h3>
            <div className="grid grid-cols-4 gap-3 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
              {CHAPTERS.map(ch => {
                const badge = Object.values(CHAPTERS).find(c => c.badgeId === ch.badgeId);
                // find corresponding badge object in BADGES
                const badgeDetail = Object.values(badgesEarned).includes(ch.badgeId) ? 
                  Object.values(BADGES).find(b => b.id === ch.badgeId) : null;

                return (
                  <div key={ch.id} className="flex flex-col items-center gap-1.5">
                    <span className="text-3xl filter drop-shadow-md">{badgeDetail?.icon || '🔒'}</span>
                    <span className="text-[10px] font-bold text-yellow-500">{badgeDetail?.title || '未解鎖'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-indigo-950/30 p-5 rounded-2xl border border-indigo-500/10 text-left space-y-2 text-xs md:text-sm text-slate-400">
            <p className="font-bold text-indigo-300">🎓 公民知識複習重點：</p>
            <p>1. <strong>政治參與管道</strong>：不只是投票。聯署、向首長信箱陳情、出席公聽會發表意見，都是民主體制下重要的發聲管道。</p>
            <p>2. <strong>理性選民</strong>：投票前應詳細研讀選舉公報政見，根據政策合理性、永續性進行評估，而非僅憑人情或口號投票。</p>
            <p>3. <strong>媒體識讀</strong>：社群軟體充斥著不實謠言，傳播前應冷靜查證（如對比政府官方發言、查證事實中心），以免被假民意綁架。</p>
            <p>4. <strong>民主審議</strong>：不同團體間常有權益衝突（如學生的路權與商家的臨停需求），應透過對話、傾聽與相互妥協，尋求雙贏共識。</p>
          </div>

          <button 
            onClick={() => {
              setScreen('start');
              setCompletedChapters([]);
              setBadgesEarned([]);
              setCurrentChapterId(1);
            }} 
            className="btn btn-primary px-8 py-3 text-sm font-bold flex items-center gap-2"
          >
            <RotateCcw size={16} />
            <span>重新挑戰</span>
          </button>
        </main>
      )}
    </div>
  );
};

export default App;
