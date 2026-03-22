"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { Clock, Lock, Timer } from "lucide-react";

interface CountdownBadgeProps {
  startDate: string | null;
  endDate: string | null;
}

export function CountdownBadge({ startDate, endDate }: CountdownBadgeProps) {
  const { days, hours, minutes, isExpired, hasStarted } = useCountdown(
    startDate,
    endDate
  );

  if (!hasStarted) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
        <Clock className="h-3 w-3" />
        Vote bientôt disponible
      </span>
    );
  }

  if (isExpired) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-400">
        <Lock className="h-3 w-3" />
        Vote terminé
      </span>
    );
  }

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}j`);
  if (hours > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}min`);

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-lepi-indigo/10 px-2.5 py-0.5 text-xs font-medium text-lepi-indigo">
      <Timer className="h-3 w-3" />
      Ferme dans {parts.join(" ")}
    </span>
  );
}
