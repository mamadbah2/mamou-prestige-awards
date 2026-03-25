"use client";

import { useState, useEffect } from "react";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  hasStarted: boolean;
}

export function useCountdown(
  startDate: string | null,
  endDate: string | null
): CountdownResult {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  const hasStarted = !start || now >= start;
  const isExpired = !!end && now > end;

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (hasStarted && !isExpired && end) {
    const diff = end.getTime() - now.getTime();
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((diff % (1000 * 60)) / 1000);
  }

  return { days, hours, minutes, seconds, isExpired, hasStarted };
}
