
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Switch } from "./components/ui/switch";
import { Checkbox } from "./components/ui/checkbox";

const sampleIdeas = [
  // ...same sample ideas as before
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
