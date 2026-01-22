"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubCalendarProps {
  username: string;
}

// Generate contribution data for last 6 months
const generateContributionData = (): ContributionDay[] => {
  const data: ContributionDay[] = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 6);

  const getLevel = (date: Date): 0 | 1 | 2 | 3 | 4 => {
    const dayOfWeek = date.getDay();
    const random = Math.random();
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

    const daysAgo = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    const recentBoost = daysAgo < 30 ? 0.25 : daysAgo < 60 ? 0.15 : 0.05;

    const baseChance = isWeekday ? 0.45 : 0.25;
    const chance = baseChance + recentBoost;

    if (random > chance) return 0;
    if (random > chance * 0.7) return 1;
    if (random > chance * 0.4) return 2;
    if (random > chance * 0.2) return 3;
    return 4;
  };

  const getCount = (level: number): number => {
    switch (level) {
      case 0: return 0;
      case 1: return Math.floor(Math.random() * 3) + 1;
      case 2: return Math.floor(Math.random() * 5) + 4;
      case 3: return Math.floor(Math.random() * 7) + 9;
      case 4: return Math.floor(Math.random() * 10) + 16;
      default: return 0;
    }
  };

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const level = getLevel(d);
    data.push({
      date: d.toISOString().split("T")[0],
      count: getCount(level),
      level,
    });
  }

  return data;
};

const levelColors = {
  0: "bg-[#161b22]",
  1: "bg-[#0e4429]",
  2: "bg-[#006d32]",
  3: "bg-[#26a641]",
  4: "bg-[#39d353]",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function GitHubCalendar({ username }: GitHubCalendarProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);

  useEffect(() => {
    const data = generateContributionData();
    setContributions(data);

    const sixMonthTotal = data.reduce((sum, day) => sum + day.count, 0);
    setTotalContributions(Math.floor(sixMonthTotal * 1.8));

    // Group by weeks
    const weeksArr: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    data.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();

      if (index === 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: "", count: 0, level: 0 });
        }
      }

      currentWeek.push(day);

      if (dayOfWeek === 6 || index === data.length - 1) {
        // Pad last week if incomplete
        while (currentWeek.length < 7) {
          currentWeek.push({ date: "", count: 0, level: 0 });
        }
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    });

    setWeeks(weeksArr);
  }, []);

  // Get month labels with week positions
  const getMonthLabels = () => {
    const labels: { month: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      // Find the first valid day in this week
      const validDay = week.find((d) => d.date);
      if (validDay && validDay.date) {
        const month = new Date(validDay.date).getMonth();
        if (month !== lastMonth) {
          labels.push({ month: months[month], weekIndex });
          lastMonth = month;
        }
      }
    });

    return labels;
  };

  const monthLabels = getMonthLabels();
  const squareSize = 10; // px
  const gap = 3; // px
  const weekWidth = squareSize + gap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-6 w-full max-w-[420px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-medium">@{username}</span>
        </a>
        <span className="text-[10px] text-gray-500">
          {totalContributions}+ contributions
        </span>
      </div>

      {/* Calendar Container */}
      <div className="bg-[#0d1117]/50 rounded-lg p-4 border border-[#30363d]/50">
        {/* Month labels - positioned absolutely relative to grid */}
        <div
          className="relative h-4 mb-2"
          style={{ width: `${weeks.length * weekWidth}px` }}
        >
          {monthLabels.map((label, index) => (
            <span
              key={index}
              className="absolute text-[10px] text-gray-500"
              style={{
                left: `${label.weekIndex * weekWidth}px`,
              }}
            >
              {label.month}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div
          className="flex"
          style={{ gap: `${gap}px` }}
        >
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="flex flex-col"
              style={{ gap: `${gap}px` }}
            >
              {week.map((day, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.15,
                    delay: weekIndex * 0.008,
                  }}
                  style={{
                    width: `${squareSize}px`,
                    height: `${squareSize}px`
                  }}
                  className={`rounded-sm ${
                    day.date ? levelColors[day.level] : "bg-transparent"
                  } ${day.date ? "hover:ring-1 hover:ring-purple-400/50 cursor-pointer" : ""}`}
                  title={day.date ? `${day.count} contributions on ${day.date}` : ""}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-gray-500">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              style={{ width: `${squareSize}px`, height: `${squareSize}px` }}
              className={`rounded-sm ${levelColors[level as 0 | 1 | 2 | 3 | 4]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}
