"use client";

import { useState } from "react";
import { Vote } from "lucide-react";
import { VotingDialog, type NomineeInfo } from "./VotingDialog";

interface VoteButtonProps {
  nominee: NomineeInfo;
}

export function VoteButton({ nominee }: VoteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 rounded-md bg-lepi-gold px-4 py-2 text-sm font-semibold text-lepi-indigo transition-colors hover:bg-lepi-gold-dark"
      >
        <span className="inline-flex items-center justify-center gap-1.5">
          <Vote className="h-4 w-4" />
          Voter
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
