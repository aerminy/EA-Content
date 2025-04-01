
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";

const sampleIdeas = [
  { day: "Monday", type: "Reel", title: "How to Read Price Action Like a Pro", script: "Learn to understand candlestick behavior in trending vs ranging markets.", caption: "Price action is king 👑 #PriceAction #Forex", youtube: "Go deeper into structure breaks and reaction zones." },
  { day: "Tuesday", type: "Skit", title: "Trader After News Drop", script: "Me: I'll avoid news. Also me: trades NFP blindly.", caption: "We've all been there 😂 #traderhumor", youtube: "Create a 3-part skit on news trader personalities." },
  { day: "Wednesday", type: "Reel", title: "Why You Keep Getting Stopped Out", script: "It’s not your SL, it’s your entry timing.", caption: "Timing > size. Let the market come to you. #SmartStops", youtube: "Demo different SL placements live on charts." },
  { day: "Thursday", type: "Reel", title: "How to Catch Breakouts Without FOMO", script: "Use a pending order strategy instead of chasing.", caption: "Chase less, win more 💡 #BreakoutTrading", youtube: "Build out this strategy from a live example." },
  { day: "Friday", type: "Skit", title: "The Trader Who Enters Before Confirmation", script: "‘I know it’ll go up now.’ — Market dumps 5 minutes later.", caption: "Patience saves accounts 💀 #FOMOtrader", youtube: "Dramatize 3 classic FOMO trade entries." },
  { day: "Saturday", type: "Reel", title: "The Truth About Risk to Reward Ratios", script: "Most people look for 3R. But what matters more is win rate + RR.", caption: "Do the math. Know your edge. #RiskReward", youtube: "Explain how to find your break-even win rate." },
  { day: "Sunday", type: "YouTube", title: "Weekly Market Prep (Live)", script: "Here’s what I’m looking at going into the week.", caption: "Get ready for the markets 🧠 #SundayPrep", youtube: "Full 10-min forecast + trading ideas." },

  { day: "Monday", type: "Reel", title: "The Best Time to Trade NY Open", script: "Here’s the 1-hour window I look at most.", caption: "Timing = everything. #NYSession", youtube: "Trade review with timestamps and volatility zones." },
  { day: "Tuesday", type: "Skit", title: "Trader Refreshing MetaTrader Every 3 Seconds", script: "No patience. No chill. Just anxiety.", caption: "We all know that one friend 😅 #ChartRefresh", youtube: "Behind-the-scenes comedy skit on overmonitoring." },
  { day: "Wednesday", type: "Reel", title: "Are Indicators Worthless?", script: "Not if you use them as confirmation—not signals.", caption: "Tools, not crutches. #IndicatorTruth", youtube: "Compare 3 trades: raw price vs indicator-based." },
  { day: "Thursday", type: "Reel", title: "How I Journal My Trades (Template)", script: "Here’s the format that changed my trading.", caption: "Journaling = growth. #TradeJournal", youtube: "Full journal walk-through using Notion." },
  { day: "Friday", type: "Skit", title: "That Trader Who Blames the Market for Everything", script: "‘The market's manipulated.’ Sure, bro.", caption: "It’s never your fault 😭 #BlameGame", youtube: "Sketch: the 5 types of delusional traders." },
  { day: "Saturday", type: "Reel", title: "The Power of Waiting for the Retest", script: "Don’t enter on breakout—wait for the pullback.", caption: "Let price prove itself. #SmartEntry", youtube: "Chart tutorial: breakout, retest, confirmation." },
  { day: "Sunday", type: "YouTube", title: "Weekly Recap + Community Trade Review", script: "Let’s learn from what worked... and what didn’t.", caption: "Improve every week 💪 #TradeReview", youtube: "Replay trades + shout out community wins." },

  { day: "Monday", type: "Reel", title: "Why You Need a Trading Routine", script: "Structure builds consistency and reduces FOMO.", caption: "Systems > Emotion. #TraderRoutine", youtube: "Day-in-the-life of a prepared trader." },
  { day: "Tuesday", type: "Skit", title: "Trader When Price Hits SL by 0.1 Pip", script: "*violently throws mouse*\nMe: ‘That was planned.’",

    caption: "Too real 😤 #SLPain", youtube: "Skit series: small losses that ruin your day." },
  { day: "Wednesday", type: "Reel", title: "The 3 Types of Market Structure You Must Know", script: "Consolidation, Expansion, Reversal.", caption: "Read the market. Trade smarter. #Structure", youtube: "Overlay chart examples of each structure type." },
  { day: "Thursday", type: "Reel", title: "When to Walk Away From the Charts", script: "Overtrading kills profits. Here’s my 3-rule system.", caption: "Trade less, keep more. #NoChasing", youtube: "Discussion: trader psychology & burnout." },
  { day: "Friday", type: "Skit", title: "When You're 1 Trade Away From Funded...", script: "Me: ‘Just one more.’ — Market: 💥",
    caption: "Funded pain is real 🥲 #propfirmlife", youtube: "Mini short film: 'The Final Trade'." },
  { day: "Saturday", type: "Reel", title: "How to Use Session Times to Your Advantage", script: "Tokyo = low volatility, NY = aggressive breakouts.", caption: "Know your session. Know your edge. #ForexSessions", youtube: "Chart overlay with session examples and tips." },
  { day: "Sunday", type: "YouTube", title: "Trader Q&A: Live Advice Session", script: "Answering your DMs and questions on setup selection.", caption: "Let’s grow together. #AskMeAnything", youtube: "Livestream: reply to 10 community DMs with chart reviews." },

  { day: "Monday", type: "Reel", title: "What Trading Has Taught Me About Life", script: "Discipline, patience, and taking losses with grace.", caption: "Trading = life coach in disguise. #LifeLessons", youtube: "Podcast-style breakdown with real experiences." },
  { day: "Tuesday", type: "Skit", title: "When You Try to Trade While on Vacation", script: "Laptop in the sand. Wi-Fi drops mid-trade.", caption: "Just don’t 😂 #VacationTradingFail", youtube: "Skit: trading vs vacationing expectations vs reality." },
  { day: "Wednesday", type: "Reel", title: "One Mindset Shift That Made Me Profitable", script: "Stop trying to be right. Start managing risk.", caption: "Mindset > predictions. #TradingShift", youtube: "Whiteboard breakdown of expectations vs planning." },
  { day: "Thursday", type: "Reel", title: "How to Trade Ranges Without Getting Burned", script: "Here’s where most breakout traps happen.", caption: "Wait for the edge. Don’t force the move. #RangeTrap", youtube: "Chart side-by-side: breakouts vs fakeouts." },
  { day: "Friday", type: "Skit", title: "When Price Misses Your TP by 1 Pip", script: "Me: 'Close enough?' — Market: reverses hard.", caption: "Every trader's trauma 😭 #TPFail", youtube: "Sketch: The Almost TP Series - Ep.1" },
  { day: "Saturday", type: "Reel", title: "The 80/20 Rule of Trading", script: "80% of results come from 20% of setups.", caption: "Focus on your A+ setups. #ParetoPrinciple", youtube: "Demo: how I filter 5 good trades from 20 meh ones." },
  { day: "Sunday", type: "YouTube", title: "Monthly Goals + Trading Mindset Reset", script: "Here’s how I plan, journal, and reset monthly.", caption: "New month, new level. #MonthlyPrep", youtube: "30-minute strategy reflection & goal setting session." }
];

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeeklyContentPlanner = () => {
  const [ideas, setIdeas] = useState([]);
  const [showYouTube, setShowYouTube] = useState(false);
  const [usedIdeas, setUsedIdeas] = useState({});
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const storedUsed = localStorage.getItem("usedIdeas");
    const storedRatings = localStorage.getItem("ratings");
    if (storedUsed) setUsedIdeas(JSON.parse(storedUsed));
    if (storedRatings) setRatings(JSON.parse(storedRatings));
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

    // Sort selected 7 by real weekday order
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

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">📆 EA Content Planner</h1>
      <div className="flex items-center gap-4">
        <Button onClick={shuffleIdeas}>🔄 Generate New Week</Button>
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
