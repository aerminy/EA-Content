
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";

const sampleIdeas = [
  {
    day: "Monday",
    type: "Instagram Reel",
    title: "3 Signs You're Overtrading",
    script: "Are you making too many trades per day? Here's how to tell...",
    caption: "Less is more. Focus on quality setups. #TradingTips #Discipline",
    youtube: "Expand this topic into a 5-min video: include chart examples and journal tips."
  },
  {
    day: "Tuesday",
    type: "Instagram Reel",
    title: "How to Set a TP That Actually Gets Hit",
    script: "Most traders set TPs based on dreams. Here's how to use market structure...",
    caption: "TPs that hit are TPs that make sense. Structure matters. #TakeProfit #SmartTrading",
    youtube: "Break this into a video tutorial with step-by-step trade review."
  },
  {
    day: "Wednesday",
    type: "Skits",
    title: "Trader Seeing Price Hit TP by 0.01 and Reverse",
    script: "Dramatic reenactment — trader cheers, then watches price pull back 99%.",
    caption: "Every trader has felt this pain 😭 #tradinghumor #relatable",
    youtube: "Skit series idea: 'Trader Life' — Episode 1."
  },
  {
    day: "Thursday",
    type: "Instagram Reel",
    title: "Why Most Traders Lose Money",
    script: "Here's the number one mindset mistake every beginner makes...",
    caption: "Fix the mindset, fix the account. #MindsetMatters #TradingJourney",
    youtube: "Full 10-minute deep dive into trading psychology."
  },
  {
    day: "Friday",
    type: "Instagram Reel",
    title: "The 2 Candle Rule You Shouldn't Break",
    script: "If these two candles form back-to-back, step away from the trade...",
    caption: "Don't force it. Let the chart talk. #PriceAction #SmartEntries",
    youtube: "Show 3 examples of this in real market conditions."
  },
  {
    day: "Saturday",
    type: "YouTube Short",
    title: "Biggest Mistake in Risk Management",
    script: "Let me show you why a $100 loss shouldn't break your account...",
    caption: "Risk small, trade long. #RiskManagement",
    youtube: "Turn this into a risk vs reward breakdown on the whiteboard."
  },
  {
    day: "Sunday",
    type: "Skits",
    title: "When You Switch From Demo to Real Money",
    script: "Trader enters trade calmly on demo. Switches to real and starts sweating bullets.",
    caption: "Demo and real are two different sports 😂 #TraderLife #Skits",
    youtube: "Skit idea: 'The Mental Shift in Trading' with dramatic music."
  },
  {
    day: "Monday",
    type: "Instagram Reel",
    title: "This Indicator is Lying to You",
    script: "Why RSI overbought doesn't always mean reversal...",
    caption: "RSI + context = accuracy. Don't use it alone. #Indicators #TradingTips",
    youtube: "Compare RSI fakeouts on 3 different timeframes."
  },
  {
    day: "Tuesday",
    type: "Instagram Reel",
    title: "Stop Chasing Green Candles",
    script: "It feels good... until it reverses. Here's what to do instead.",
    caption: "Confirmation > FOMO. #Discipline #EntryTips",
    youtube: "Expand this into a trade breakdown with entries and exits."
  },
  {
    day: "Wednesday",
    type: "Skits",
    title: "When You Open Your Phone After a Swing Trade",
    script: "You either feel like a genius or need therapy 😂",
    caption: "Every swing trader knows this. #relatable #traderhumor",
    youtube: "Skit compilation idea: ‘Swing Trade Emotions Day 1–5’"
  },
  // 🔁 Repeat up to 30+ with new variations
];

const WeeklyContentPlanner = () => {
  const [ideas, setIdeas] = useState(sampleIdeas);
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
    setIdeas(shuffled);
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
                  <button onClick={() => rateIdea(index, "good" )} title="Mark as good">
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
