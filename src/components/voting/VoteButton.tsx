"use client";

import { useState } from "react";
import { Vote } from "lucide-react";
import { VotingDialog, type NomineeInfo } from "./VotingDialog";

interface VoteButtonProps {
  nominee: NomineeInfo;
  disabled?: boolean;
}

export function VoteButton({ nominee, disabled }: VoteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
          disabled
            ? "cursor-not-allowed bg-gray-200 text-gray-400 opacity-50"
            : "bg-lepi-gold text-lepi-indigo hover:bg-lepi-gold-dark"
        }`}
      >
        <span className="inline-flex items-center justify-center gap-1.5">
          <Vote className="h-4 w-4" />
          {disabled ? "Vote fermé" : "Voter"}
        </span>
      </button>

      <VotingDialog
        nominee={nominee}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
