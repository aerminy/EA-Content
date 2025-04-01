import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import html2pdf from "html2pdf.js";

const sampleIdeas = [
  { day: "Monday", type: "Reel", title: "Best Risk Management Hack", script: "How I size my positions based on volatility.", caption: "Control your risk. Scale your edge. #RiskGame", youtube: "Live breakdown of a trade using volatility-based sizing." },
  { day: "Tuesday", type: "Skit", title: "Trader's Reaction to CPI News", script: "Market spikes. Me: ‘Why didn't I wait?’", caption: "CPI strikes again 💥 #NewsMoves", youtube: "Skit series: trading around high-impact events." },
  { day: "Wednesday", type: "Reel", title: "How to Build a Watchlist in 5 Min", script: "Find 3 clean setups by filtering junk charts.", caption: "Speed + precision = profits. #WatchlistFlow", youtube: "Live scan of 10 pairs into 3 setups." },
  { day: "Thursday", type: "Reel", title: "My Morning Trading Routine", script: "Coffee. Meditation. Chart scan. Execute.", caption: "Mindset + Prep = Consistency ☕🧠", youtube: "Walk through full pre-market prep live." },
  { day: "Friday", type: "Skit", title: "When a Funded Challenge Goes Wrong", script: "Me: Just one more win. Market: LOL.", caption: "RIP to all my evaluations 💀 #PropPain", youtube: "Skit: funding fails and what we learn." },
  { day: "Saturday", type: "Reel", title: "What Is Smart Money?", script: "SMC isn’t magic — it’s structure + patience.", caption: "Forget the hype. Focus on logic. #SmartMoneyConcepts", youtube: "Break down a clean SMC trade example." },
  { day: "Sunday", type: "YouTube", title: "Trading Q&A With My Students", script: "Answering the most common beginner mistakes.", caption: "Grow as a group 📈 #CommunityTrading", youtube: "Live Q&A replay with timestamps." },
  { day: "Monday", type: "Reel", title: "Why Most Traders Fail", script: "They change systems weekly.", caption: "Pick one. Master it. Eat. #ConsistencyWins", youtube: "Deep dive: system hopping vs committed growth." },
  { day: "Tuesday", type: "Skit", title: "When the Market Misses TP By 1 Pip", script: "Me: It’s gonna go. Market: Goes other way.", caption: "TP trauma is real 😭 #OnePipAway", youtube: "Mini skit: 3 variations of this pain." },
  { day: "Wednesday", type: "Reel", title: "Backtesting vs Forward Testing", script: "What you learn from each — and how I use both.", caption: "Test smarter 💡 #DataDriven", youtube: "Backtest session + live example split screen." },
  { day: "Thursday", type: "Reel", title: "How I Use Alerts to Stay Off Charts", script: "No more screen staring — just alerts + react.", caption: "Trade less. Win more. #AlertFlow", youtube: "Set alerts in TradingView + show results." },
  { day: "Friday", type: "Skit", title: "Trader Talking to The Chart", script: "Me: Just go up bro. Market: sideways.", caption: "We’ve all been there 💬 #ChartTalk", youtube: "Skit: 5 types of trader emotional breakdowns." },
  { day: "Saturday", type: "Reel", title: "How to Avoid Breakout Traps", script: "Wait for the retest — always.", caption: "Confirmation beats guessing 🔍 #BreakoutTrap", youtube: "Live example: breakout vs fakeout trade." },
  { day: "Sunday", type: "YouTube", title: "Weekly Market Outlook & Setup Planning", script: "These are the zones I’ll be watching.", caption: "Plan ahead 🧭 #SundaySetup", youtube: "Zoom session replay: setup review and levels." },
  { day: "Monday", type: "Reel", title: "The 80/20 Rule of Trading", script: "80% of my results come from 20% of my trades.", caption: "Focus on your A+ setups. #ParetoTrading", youtube: "How to filter noise and stay focused." },
  { day: "Tuesday", type: "Skit", title: "Me After One Green Trade", script: "Buys Rolex on demo profits.", caption: "Demo wins don’t count 😂 #TraderDelusion", youtube: "Comedy skit: the overconfident rookie." },
  { day: "Wednesday", type: "Reel", title: "What Trading Has Taught Me About Life", script: "Discipline, patience, and self-awareness.", caption: "Trading = personal growth machine 🌱", youtube: "Podcast: trading lessons that transfer to life." },
  { day: "Thursday", type: "Reel", title: "How to Trade Ranges Effectively", script: "Entry at extremes, exit midrange.", caption: "Think in zones. Win in consolidation. #RangePlay", youtube: "Live range trading example: key setups." },
  { day: "Friday", type: "Skit", title: "That Trader Friend Who Always Overlevers", script: "100 lot on a $100 account? Why not?", caption: "RIP risk management 💥 #LotSizeLunatic", youtube: "5 trader personalities in one skit." },
  { day: "Saturday", type: "Reel", title: "The Real Reason You’re Overtrading", script: "You’re bored, not strategic.", caption: "Discipline = no forced setups #OvertraderHelp", youtube: "Mindset shift: boredom vs quality trades." },
  { day: "Sunday", type: "YouTube", title: "Monthly Review & Goal Setting", script: "Here’s what I learned and where I’m focused.", caption: "Level up each month 🔄 #MonthlyReview", youtube: "End-of-month breakdown and target reset." },
  { day: "Monday", type: "Reel", title: "The Power of One Setup", script: "I only trade this — and here’s why.", caption: "Simplicity = profitability 🧠 #OneSetupOnly", youtube: "My one setup, broken down on charts." },
  { day: "Tuesday", type: "Skit", title: "When I Try to Be a Signal Provider", script: "My signal: Loss. Their entry: Win.", caption: "Why I don’t sell signals 😅 #SignalPain", youtube: "Mini skit: the problem with copying trades." },
  { day: "Wednesday", type: "Reel", title: "Why I Use a Trading Checklist", script: "Checklist = fewer dumb trades.", caption: "Follow rules. Keep profits. #ChecklistTrader", youtube: "Live walk-through of my personal checklist." },
  { day: "Thursday", type: "Reel", title: "How I Use Higher Timeframes", script: "HTF gives the story. LTF gives the sniper entry.", caption: "Top-down clarity 🔍 #HTFAnalysis", youtube: "Multi-timeframe analysis in action." },
  { day: "Friday", type: "Skit", title: "When You Exit Too Early", script: "TP hit — then keeps going for 300 pips.", caption: "The pain of leaving profits 💸 #EarlyExit", youtube: "Comedy skit: the TP exit regret series." },
  { day: "Saturday", type: "Reel", title: "Why I Don’t Trade Mondays", script: "Monday is for watching, not trading.", caption: "Let Monday show its hand. #NoTradeMonday", youtube: "Chart review: why Monday setups are tricky." },
  { day: "Sunday", type: "YouTube", title: "Deep Dive: Trade Review & Lessons", script: "Let’s analyze 3 trades and pull out key takeaways.", caption: "Review → improve 📈 #TradeLessons", youtube: "Detailed trade breakdown with psychology focus." },
  { day: "Tuesday", type: "Skit", title: "Trader When Price Hits SL by 0.1 Pip", script: "*violently throws mouse*
Me: 'That was planned.'", caption: "Too real 😤 #SLPain", youtube: "Skit series: small losses that ruin your day." }
];

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeeklyContentPlanner = () => {
  const [ideas, setIdeas] = useState([]);
  const [showYouTube, setShowYouTube] = useState(false);
  const [usedIdeas, setUsedIdeas] = useState({});
  const [ratings, setRatings] = useState({});
  const plannerRef = useRef();

  useEffect(() => {
    const storedUsed = localStorage.getItem("usedIdeas");
    const storedRatings = localStorage.getItem("ratings");
    if (storedUsed) setUsedIdeas(JSON.parse(storedUsed));
    if (storedRatings) setRatings(JSON.parse(storedRatings));
    shuffleIdeas();
  }, []);

  useEffect(() => {
    localStorage.setItem("usedIdeas", JSON.stringify(usedIdeas));
  }, [usedIdeas]);

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  const shuffleIdeas = () => {
    const shuffled = [...sampleIdeas].sort(() => 0.5 - Math.random());
    const selected = [];
    const usedDays = new Set();

    for (let idea of shuffled) {
      if (!usedDays.has(idea.day) && selected.length < 7) {
        usedDays.add(idea.day);
        selected.push(idea);
      }
    }

    const sorted = selected.sort(
      (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    );

    setIdeas(sorted);
    setUsedIdeas({});
    setRatings({});
  };

  const toggleUsed = (index) => {
    setUsedIdeas({ ...usedIdeas, [index]: !usedIdeas[index] });
  };

  const rateIdea = (index, value) => {
    setRatings({ ...ratings, [index]: value });
  };

  const downloadPDF = () => {
    const element = plannerRef.current;
    html2pdf().from(element).save("EA-Weekly-Content.pdf");
  };

  return (
    <div
      ref={plannerRef}
      className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4 space-y-4"
    >
      <h1 className="text-2xl font-bold">📆 EA Content Planner</h1>
      <div className="flex flex-wrap gap-4 items-center">
        <Button onClick={shuffleIdeas}>🔄 Generate New Week</Button>
        <Button onClick={downloadPDF}>📥 Download as PDF</Button>
        <div className="flex items-center gap-2">
          <span>🎥 Show YouTube Ideas</span>
          <Switch checked={showYouTube} onCheckedChange={setShowYouTube} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea, index) => (
          <Card key={index} className="relative">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{idea.day} - {idea.type}</h2>
                <div className="flex gap-2 items-center">
                  <label className="text-sm flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={usedIdeas[index] || false}
                      onChange={() => toggleUsed(index)}
                    />
                    Used
                  </label>
                  <button onClick={() => rateIdea(index, "good")} title="Mark as good">
                    ✅
                  </button>
                  <button onClick={() => rateIdea(index, "bad")} title="Mark as bad">
                    ❌
                  </button>
                </div>
              </div>
              <p className="mt-2 font-bold">🎬 {idea.title}</p>
              <p className="mt-2 whitespace-pre-line">📝 Script: {idea.script}</p>
              <p className="mt-2 italic">📲 Caption: {idea.caption}</p>
              {showYouTube && (
                <div className="mt-4 p-2 border rounded-md bg-gray-100">
                  <p className="font-semibold">🎥 YouTube Version</p>
                  <p className="whitespace-pre-line">{idea.youtube}</p>
                </div>
              )}
              {ratings[index] && (
                <p className="mt-2 text-sm text-gray-600">
                  Feedback saved: {ratings[index] === "good" ? "✅ Good idea" : "❌ Didn’t perform well"}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <footer className="pt-6 text-center text-sm text-gray-400">
        Created by Aquiles Erminy · EA Content Planner
      </footer>
    </div>
  );
};

export default WeeklyContentPlanner;
