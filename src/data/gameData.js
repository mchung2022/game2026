export const CHARACTERS = {
  player: {
    name: "你（小明）",
    role: "陽光國中學生",
    avatar: "🎒"
  },
  teacher: {
    name: "張老師",
    role: "公民老師",
    avatar: "👩‍🏫"
  },
  mayor: {
    name: "陽光鎮鎮長",
    role: "地方首長",
    avatar: "👔"
  },
  candidateA: {
    name: "陳大同",
    role: "鎮議員候選人（著重車流與開發）",
    avatar: "👨‍💼"
  },
  candidateB: {
    name: "林小青",
    role: "鎮議員候選人（著重行人安全與社區）",
    avatar: "👩‍💼"
  },
  shopkeeper: {
    name: "王老闆",
    role: "校門口商家代表",
    avatar: "🍳"
  }
};

export const BADGES = {
  petition: {
    id: "petition",
    title: "公民行動先鋒",
    description: "學會利用聯署與政府信箱反映民意，成功啟動公共議題討論！",
    icon: "✍️",
    color: "cyan"
  },
  voter: {
    id: "voter",
    title: "理性神聖選民",
    description: "了解投票資格與正確選舉流程，並能理性分析政見投下神聖一票！",
    icon: "🗳️",
    color: "indigo"
  },
  factcheck: {
    id: "factcheck",
    title: "媒體識讀達人",
    description: "在假訊息滿天飛的時代，能冷靜查證，不隨意散播不實謠言！",
    icon: "🔍",
    color: "pink"
  },
  consensus: {
    id: "consensus",
    title: "民主審議大使",
    description: "在公聽會中包容不同聲音，尋求最大共識，體現協商民主精神！",
    icon: "🤝",
    color: "emerald"
  }
};

export const CHAPTERS = [
  {
    id: 1,
    title: "第一章：公民發聲的起點",
    subtitle: "市長信箱與連署行動",
    description: "校門口發生了驚險的交通事故！面對危險的通學路，國中生該如何發聲？",
    badgeId: "petition"
  },
  {
    id: 2,
    title: "第二章：神聖的一票",
    subtitle: "地方選舉與投票挑戰",
    description: "議員選舉來臨，不同的候選人政見大不相同！誰能為我們爭取安全通學路？",
    badgeId: "voter"
  },
  {
    id: 3,
    title: "第三章：資訊迷霧戰",
    subtitle: "輿論力量與媒體識讀",
    description: "網路上出現了抹黑新政見的假訊息！身為聰明的公民，你該如何識破？",
    badgeId: "factcheck"
  },
  {
    id: 4,
    title: "第四章：民主公聽會",
    subtitle: "溝通協調與共識凝聚",
    description: "店家擔心設立人行道會影響生意。在利益衝突下，我們如何達成雙贏？",
    badgeId: "consensus"
  }
];

export const STORY_DATA = {
  1: {
    intro: "放學鐘聲響起，你正要走出陽光國中校門口，突然一聲尖銳的剎車聲傳來！一位同學差點被疾駛而過的轉彎車輛撞倒，現場驚魂未定...這裡沒有行人號誌，也沒有安全人行道，大家每天放學都走得提心吊膽。這時，公民張老師走了過來。",
    dialogues: [
      {
        speaker: CHARACTERS.teacher,
        text: "小明，剛剛真的太危險了！這條馬路車流量大，卻一直沒有安裝「行人專用號誌」和鋪設「人行道」。"
      },
      {
        speaker: CHARACTERS.player,
        text: "老師，我們國中生還沒有投票權，是不是就沒辦法改變這一切了？"
      },
      {
        speaker: CHARACTERS.teacher,
        text: "當然不是！憲法保障公民有「請願」與「訴願」的權利。雖然我們沒有投票權，但我們依然是「公民」，可以透過許多合法的管道來向政府反映民意！"
      },
      {
        speaker: CHARACTERS.player,
        text: "那我們該怎麼做呢？"
      },
      {
        speaker: CHARACTERS.teacher,
        text: "首先，我們可以寄信到「市長信箱」反映，或者在「公共政策網路參與平台」發起連署，讓更多市民關注這個問題。來，我們一起試試看！"
      }
    ],
    choice: {
      question: "你要選擇哪種方式開始你的政治參與第一步？",
      options: [
        {
          text: "寫信給市長信箱（直接向行政機關反映）",
          nextDialog: [
            {
              speaker: CHARACTERS.player,
              text: "我決定撰寫一封詳細的陳情信寄到市長信箱，說明校門口的危險狀況！"
            },
            {
              speaker: CHARACTERS.teacher,
              text: "太棒了！寫信給市長信箱屬於向行政機關提出陳情。我們要清楚說明：人流量、危險時間點以及具體訴求（例如：增設行人號誌）。"
            }
          ]
        },
        {
          text: "發起網路聯署（集結大眾民意向政府施壓）",
          nextDialog: [
            {
              speaker: CHARACTERS.player,
              text: "我想發起網路連署！讓全校同學、家長和社區居民一起簽名，用群眾的力量讓政府重視！"
            },
            {
              speaker: CHARACTERS.teacher,
              text: "很好的選擇！發起連署是凝聚社會民意的重要方式，也是直接民主精神的體現。當達到一定人數門檻時，政府就必須正式回應我們！"
            }
          ]
        }
      ]
    },
    transition: "無論是寄信還是發起連署，都需要一份強有力的「倡議書」。現在，請你完成這份連署書的填空，讓訴求更清晰！"
  },
  2: {
    intro: "在大家的努力下，連署達到了500人！然而，鎮公所回覆：「增設號誌與改建人行道需要預算編列，必須經由鎮民代表會或議員審查通過。」此時，正好迎來陽光鎮的議員選舉！張老師告訴你，這正是發揮選舉影響力的好時機。",
    dialogues: [
      {
        speaker: CHARACTERS.teacher,
        text: "小明，你看！這次參選鎮議員的候選人中，有兩位的政見和我們密切相關。"
      },
      {
        speaker: CHARACTERS.player,
        text: "老師，雖然我還不能投票，但我可以叫我爸爸媽媽投票！但我該支持誰呢？"
      },
      {
        speaker: CHARACTERS.teacher,
        text: "這就要看他們的「選舉公報」和政見發表了。一個理性的選民，應該根據自己的價值觀和候選人的可行方案來做決定。我們來看看他們的政見！"
      }
    ],
    platforms: [
      {
        candidate: CHARACTERS.candidateA,
        title: "1號 陳大同：「拚經濟、大開發，道路順暢不塞車！」",
        details: [
          "主張拓寬車道，增加校門口路段限速，讓上下班車流快速通過。",
          "認為鋪設人行道會縮減車道、導致塞車，反對盲目增設行人號誌。",
          "主張在校門口興建天橋或地下道，讓行人避開車流（但對行動不便者及長者較不友善）。"
        ],
        icon: "🚗"
      },
      {
        candidate: CHARACTERS.candidateB,
        title: "2號 林小青：「人本交通、安全通學，打造宜居社區！」",
        details: [
          "主張在學校周邊劃設「行人友善空間」，鋪設實體人行道並設置行人專用號誌。",
          "推動通學路段上下學時間實施車輛限速與管制，保障學生安全。",
          "主張編列「綠色交通預算」，落實人本交通政策。"
        ],
        icon: "🚶"
      }
    ],
    choice: {
      question: "看完兩位候選人的政見，你會建議父母支持哪一位？",
      options: [
        {
          text: "推薦1號陳大同（著重車流快速通過）",
          nextDialog: [
            {
              speaker: CHARACTERS.player,
              text: "我覺得陳大同說的有道理，如果塞車，爸爸媽媽開車送我上學也會很困擾。"
            },
            {
              speaker: CHARACTERS.teacher,
              text: "這是一種考量。不過拓寬車道可能會讓車速更快，且天橋對坐輪椅的同學並不方便。我們需要更全面評估人本交通的價值喔！"
            }
          ]
        },
        {
          text: "推薦2號林小青（著重學生安全與人行道）",
          nextDialog: [
            {
              speaker: CHARACTERS.player,
              text: "我絕對推薦林小青！她的政見直接解決了我們每天放學差點被撞的恐懼，行人安全應該高於車流速度！"
            },
            {
              speaker: CHARACTERS.teacher,
              text: "非常棒的理性分析！你重視的是「行人路權」與「生命安全」，這正是人本交通的核心價值。"
            }
          ]
        }
      ]
    },
    transition: "投票日當天，你陪著爸爸媽媽來到投開票所。雖然你不能親自投票，但你必須知道民主國家神聖的「投票流程」。請完成以下投票所關卡！"
  },
  3: {
    intro: "選舉結果揭曉！林小青議員順利當選！她上任後，立刻提案「陽光國中周邊通學步道改善計畫」。然而，這個提案卻引來了部分反對聲音。網路上突然開始流傳許多關於此政策的負面傳聞...",
    dialogues: [
      {
        speaker: CHARACTERS.player,
        text: "老師！我在社區的LINE群組看到有人傳一篇文章，說『林小青推行的人行道會導致附近店家倒閉，而且暗中圖利特定工程商』，是真的嗎？"
      },
      {
        speaker: CHARACTERS.teacher,
        text: "這就是民主社會中常見的「假訊息」或「惡意輿論」。在數位時代，政治參與很重要的部分是「媒體識讀」。"
      },
      {
        speaker: CHARACTERS.player,
        text: "如果大家都被騙了，這個安全政策可能就會被迫取消了！我們該怎麼辦？"
      },
      {
        speaker: CHARACTERS.teacher,
        text: "我們要扮演資訊的守門員！透過「查證事實」，並把正確的資訊分享出去，來對抗惡意的謠言。讓我們來進行「假訊息篩選挑戰」！"
      }
    ],
    transition: "畫面上會出現數條關於「通學步道計畫」的新聞或社群訊息。請判斷哪些是「經查證的真實資訊」，哪些是「未經證實的假訊息或謠言」！"
  },
  4: {
    intro: "多虧了你的媒體識讀行動，謠言被澄清了！但為了解決店家的疑慮，市政府決定在學校大禮堂召開「公聽會」，邀請學校代表、議員、市府交通局官員以及校門口商家的王老闆，一起當面進行民主協商。",
    dialogues: [
      {
        speaker: CHARACTERS.shopkeeper,
        text: "我是校門口開早餐店的王老闆。我反對做實體人行道！這樣客人的機車就沒辦法停在門口買早餐，我的生意一定會一落千丈！而且貨車早上送貨也沒地方停！"
      },
      {
        speaker: CHARACTERS.player,
        text: "王老闆，但是沒有人行道，我們上下學都必須走到馬路上和車子擠，真的好危險..."
      },
      {
        speaker: CHARACTERS.candidateB,
        text: "大家請冷靜。民主的本質是溝通與協調。我們要在「保障學生安全」與「維持店家生計」之間找到平衡點。小明，身為學生代表，你覺得怎麼提案比較好？"
      }
    ],
    choice: {
      question: "請提出一個兼顧「行人安全」與「店家權益」的民主協商方案：",
      options: [
        {
          text: "方案 A：堅持全段鋪設人行道，禁止所有車輛臨時停車，店家必須自行克服困難。",
          nextDialog: [
            {
              speaker: CHARACTERS.shopkeeper,
              text: "（憤怒）這樣太不講理了！我們在這裡做生意十幾年，你們這是要逼我們關門嗎？"
            },
            {
              speaker: CHARACTERS.teacher,
              text: "只顧一方利益而忽略另一方的生存權，容易造成社會對立，難以達成民主共識。"
            }
          ]
        },
        {
          text: "方案 B：在人行道旁增設「家長接送暨商家裝卸貨臨停專區」，並於非上下學時段開放黃線臨停。",
          nextDialog: [
            {
              speaker: CHARACTERS.shopkeeper,
              text: "嗯...如果有專門的裝卸貨區，客人在特定時間也能臨停買東西，雖然不比以前隨便停方便，但為了學生的安全，我可以接受這個折衷方案。"
            },
            {
              speaker: CHARACTERS.teacher,
              text: "太棒了！這就是協商民主（Deliberative Democracy）的精髓：彼此傾聽、互相讓步，尋找公共利益的最大公約數！"
            }
          ]
        }
      ]
    },
    transition: "在公聽會上，大家一致通過了方案 B。幾個月後，工程順利完工！"
  }
};

export const QUIZ_DATA = {
  // Chapter 1: Petition writing fill-in-the-blank / choice
  1: [
    {
      question: "在中華民國憲法中，人民向行政機關或立法機關表達希望增設紅綠燈的權利，稱為什麼？",
      options: ["訴願權", "請願權", "參政權", "訴訟權"],
      answer: 1, // 0-indexed: 請願權
      explanation: "「請願」是人民對國家政策、公共利益或個人權益，向主管機關表示其願望；而「訴願」則是人民因行政機關的違法或不當行政處分致損害權利時，請求上級機關撤銷或變更處分。"
    },
    {
      question: "如果要在「公共政策網路參與平台」成功讓政府回應，提案需要經過什麼階段？",
      options: ["法院審判", "民意代表審查", "民眾附議（連署）達到門檻", "鎮長直接蓋章"],
      answer: 2,
      explanation: "公共政策網路參與平台採用「眾包」與「附議」機制，提案必須在規定時間內獲得足夠數量的公民聯署附議，主管機關才必須正式出面回應。"
    }
  ],
  // Chapter 2: Voting steps (this is handled inside the minigame component)
  2: [
    {
      question: "在台灣，參與中華民國地方公職人員選舉（如鎮長、議員），最基本的投票年齡門檻是幾歲？",
      options: ["18 歲", "20 歲", "23 歲", "25 歲"],
      answer: 1, // 2022年憲法修正案公投未過，但選罷法中選舉權已於後續法律或憲法規定為20歲，公投為18歲。注意：台灣目前選舉權依然是20歲（憲法第130條），公投權是18歲。
      options_display: ["18 歲 (公投年齡)", "20 歲 (選舉權年齡)", "23 歲 (參選議員年齡)", "25 歲"],
      answer: 1, // 20歲
      explanation: "根據中華民國憲法規定，中華民國國民年滿 20 歲，有依法選舉之權。而公民投票法規定，年滿 18 歲有公民投票權。"
    },
    {
      question: "投票當天，以下哪一項物品是進入投票所時『非必須』攜帶，但有帶會加快流程的？",
      options: ["國民身分證", "投票通知單", "個人印章", "健保卡"],
      answer: 1, // 投票通知單 (身分證必須，印章可用簽名代替，健保卡不能代替身分證)
      explanation: "「國民身分證」是唯一法定的身分證明文件，沒帶絕對不能投票；印章可用手印或簽名代替；投票通知單非必須，但能幫助選務人員快速找到你的名冊序號。"
    }
  ],
  // Chapter 3: Fact checks
  3: [
    {
      text: "「震驚！林小青議員提案鋪設人行道，暗地裡將工程發包給自己親戚開的營造廠，圖利金額高達五千萬！」",
      isFake: true,
      checkResult: "【假訊息！】經查證，該工程尚在規劃階段，連招標程序都還沒啟動，且林小青議員名下親屬並無任何人從事營造業。這是選舉對手的抹黑謠言。"
    },
    {
      text: "「陽光國中通學步道規劃案已於昨日通過交通局初審，預計將編列新台幣 300 萬元進行規劃與施工。」",
      isFake: false,
      checkResult: "【真實資訊！】此為市政府交通局官方網站發布的公文與新聞稿內容，資訊真實可靠。"
    },
    {
      text: "「人行道是陰謀！政府想要縮減車道，逼大家都不能開車，以後出門都要走路，這是在剝奪人民的遷徙自由！」",
      isFake: true,
      checkResult: "【假訊息！】鋪設人行道是為了「人車分流」保障行人生命安全，並非禁止開車。將人本交通扭曲為「剝奪遷徙自由」屬於偏激的煽動言論。"
    },
    {
      text: "「根據交通部統計，設有實體人行道與行人專用號誌的路段，行人交通事故率可降低達 30% 以上。」",
      isFake: false,
      checkResult: "【真實資訊！】此數據引自交通部安全督導委員會的官方統計報告，有客觀數據支持。"
    }
  ]
};
