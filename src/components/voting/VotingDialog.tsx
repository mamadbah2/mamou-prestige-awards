"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneInput } from "./PhoneInput";
import { CaptchaWidget } from "./CaptchaWidget";
import { getInitials, getAvatarColor } from "@/lib/utils";
import { VOTE_PRICE } from "@/lib/services/payment";
import {
  Minus,
  Plus,
  ArrowLeft,
  ShieldCheck,
  Smartphone,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Vote,
} from "lucide-react";

/* ───────────────────────────── Types ───────────────────────────── */

export interface NomineeInfo {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  imageUrl?: string;
}

interface VotingDialogProps {
  nominee: NomineeInfo;
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4 | 5;

/* ───────────────────────────── Helpers ──────────────────────────── */

function formatGNF(amount: number): string {
  return amount.toLocaleString("fr-GN") + " GNF";
}

const STEP_LABELS: Record<Step, string> = {
  1: "Votes",
  2: "Telephone",
  3: "Verification",
  4: "Paiement",
  5: "Confirme",
};

/* ───────────────────────────── Component ────────────────────────── */

export function VotingDialog({ nominee, isOpen, onClose }: VotingDialogProps) {
  const [step, setStep] = useState<Step>(1);
  const [voteCount, setVoteCount] = useState(1);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactionRef, setTransactionRef] = useState("");

  const totalAmount = voteCount * VOTE_PRICE;

  /* ── Reset on close ── */
  const handleClose = useCallback(() => {
    setStep(1);
    setVoteCount(1);
    setPhone("");
    setPhoneError("");
    setCaptchaToken("");
    setIsLoading(false);
    setError("");
    setTransactionRef("");
    onClose();
  }, [onClose]);

  /* ── Step navigation ── */
  const goBack = () => {
    setError("");
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
  };

  /* ── Step 1 → 2 ── */
  const handleConfirmVotes = () => {
    setError("");
    setStep(2);
  };

  /* ── Step 2 → 3 ── */
  const handleConfirmPhone = () => {
    setError("");
    if (!/^6\d{8}$/.test(phone)) {
      setPhoneError("Numero invalide. Format : 6XXXXXXXX (9 chiffres).");
      return;
    }
    setPhoneError("");
    setStep(3);
  };

  /* ── Step 3 → 4 (auto via captcha) ── */
  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setError("");
    setStep(4);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken("");
    setError("La verification a expire. Veuillez recommencer.");
  };

  /* ── Step 4 → 5 (pay & submit) ── */
  const handlePay = async () => {
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomineeId: nominee.id,
          categoryId: nominee.categoryId,
          voterPhone: phone,
          captchaToken,
          voteCount,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? "Le paiement a echoue. Veuillez reessayer.");
        return;
      }

      setTransactionRef(data.transactionRef);
      setStep(5);
    } catch {
      setError("Une erreur reseau est survenue. Veuillez reessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Vote count helpers ── */
  const decrement = () => setVoteCount((v) => Math.max(1, v - 1));
  const increment = () => setVoteCount((v) => Math.min(100, v + 1));

  const handleVoteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    setVoteCount(Math.max(1, Math.min(100, val)));
  };

  /* ── Nominee avatar ── */
  const avatar = nominee.imageUrl ? (
    <Image
      src={nominee.imageUrl}
      alt={nominee.name}
      width={64}
      height={64}
      className="h-16 w-16 rounded-full object-cover ring-2 ring-lepi-gold/30"
    />
  ) : (
    <div
      className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-lepi-white ring-2 ring-lepi-gold/30 ${getAvatarColor(nominee.name)}`}
    >
      {getInitials(nominee.name)}
    </div>
  );

  /* ────────────────────────── Step progress ─────────────────────── */

  const stepProgress = (
    <div className="mb-6">
      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5">
        {([1, 2, 3, 4, 5] as Step[]).map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-6 bg-lepi-gold"
                  : s < step
                    ? "w-2 bg-lepi-gold/60"
                    : "w-2 bg-lepi-indigo/15"
              }`}
            />
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-xs tracking-wide text-lepi-indigo/50 uppercase">
        Etape {step}/5 — {STEP_LABELS[step]}
      </p>
    </div>
  );

  /* ────────────────────────── Error alert ────────────────────────── */

  const errorAlert = error ? (
    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{error}</span>
    </div>
  ) : null;

  /* ── Back button ── */
  const backButton = (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center gap-1 text-sm text-lepi-indigo/50 transition-colors hover:text-lepi-indigo"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Retour
    </button>
  );

  /* ─────────────────────────── Render steps ─────────────────────── */

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden border-lepi-indigo/10 p-0">
        {/* ── Decorative top bar ── */}
        <div className="h-1.5 w-full bg-gradient-to-r from-lepi-indigo via-lepi-gold to-lepi-indigo" />

        <div className="p-6">
          {stepProgress}

          {/* ══════════ STEP 1 — Vote Count ══════════ */}
          {step === 1 && (
            <div className="space-y-6">
              <DialogHeader className="items-center">
                <DialogTitle className="font-serif text-xl text-lepi-indigo">
                  Voter pour
                </DialogTitle>
              </DialogHeader>

              {/* Nominee card */}
              <div className="flex flex-col items-center gap-3 rounded-xl border border-lepi-gold/20 bg-lepi-cream p-5">
                {avatar}
                <div className="text-center">
                  <p className="font-serif text-lg font-semibold text-lepi-indigo">
                    {nominee.name}
                  </p>
                  <Badge className="mt-1 bg-lepi-gold/15 text-lepi-gold-dark">
                    {nominee.categoryName}
                  </Badge>
                </div>
              </div>

              {/* Vote counter */}
              <div className="space-y-3">
                <label className="block text-center text-sm font-medium text-lepi-indigo">
                  Nombre de votes
                </label>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={decrement}
                    disabled={voteCount <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-lepi-indigo/20 text-lepi-indigo transition-colors hover:bg-lepi-indigo/5 disabled:opacity-30"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={voteCount}
                    onChange={handleVoteInputChange}
                    onFocus={(e) => {
                      setTimeout(() => {
                        e.target.scrollIntoView({ behavior: "smooth", block: "center" });
                      }, 300);
                    }}
                    className="h-12 w-20 rounded-lg border border-lepi-gold/30 bg-lepi-white text-center font-serif text-2xl font-bold text-lepi-indigo outline-none focus:border-lepi-gold focus:ring-2 focus:ring-lepi-gold/30"
                  />
                  <button
                    type="button"
                    onClick={increment}
                    disabled={voteCount >= 100}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-lepi-indigo/20 text-lepi-indigo transition-colors hover:bg-lepi-indigo/5 disabled:opacity-30"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Amount display */}
                <div className="rounded-lg bg-lepi-indigo/5 p-3 text-center">
                  <p className="text-xs text-lepi-indigo/60">Montant total</p>
                  <p className="font-serif text-xl font-bold text-lepi-indigo">
                    {formatGNF(totalAmount)}
                  </p>
                  <p className="mt-0.5 text-xs text-lepi-indigo/40">
                    {voteCount} vote{voteCount > 1 ? "s" : ""} × {formatGNF(VOTE_PRICE)}
                  </p>
                </div>
              </div>

              {errorAlert}

              <Button
                onClick={handleConfirmVotes}
                className="w-full bg-lepi-gold font-semibold text-lepi-indigo hover:bg-lepi-gold-dark"
                size="lg"
              >
                <Vote className="h-4 w-4" />
                Continuer
              </Button>
            </div>
          )}

          {/* ══════════ STEP 2 — Phone ══════════ */}
          {step === 2 && (
            <div className="space-y-6">
              {backButton}

              <DialogHeader>
                <DialogTitle className="font-serif text-xl text-lepi-indigo">
                  Votre numero
                </DialogTitle>
                <DialogDescription>
                  Entrez votre numero Orange Money pour finaliser le paiement.
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-xl border border-lepi-indigo/10 bg-lepi-cream/50 p-4">
                <PhoneInput
                  value={phone}
                  onChange={(v) => {
                    setPhone(v);
                    setPhoneError("");
                  }}
                  error={phoneError}
                />
              </div>

              {errorAlert}

              <Button
                onClick={handleConfirmPhone}
                className="w-full bg-lepi-gold font-semibold text-lepi-indigo hover:bg-lepi-gold-dark"
                size="lg"
              >
                Continuer
              </Button>
            </div>
          )}

          {/* ══════════ STEP 3 — CAPTCHA ══════════ */}
          {step === 3 && (
            <div className="space-y-6">
              {backButton}

              <DialogHeader className="items-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lepi-indigo/5">
                  <ShieldCheck className="h-6 w-6 text-lepi-indigo" />
                </div>
                <DialogTitle className="font-serif text-xl text-lepi-indigo">
                  Verification
                </DialogTitle>
                <DialogDescription className="text-center">
                  Confirmez que vous n&apos;etes pas un robot.
                </DialogDescription>
              </DialogHeader>

              <CaptchaWidget
                onVerify={handleCaptchaVerify}
                onExpire={handleCaptchaExpire}
              />

              {errorAlert}
            </div>
          )}

          {/* ══════════ STEP 4 — Payment ══════════ */}
          {step === 4 && (
            <div className="space-y-6">
              {!isLoading && backButton}

              <DialogHeader className="items-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6600]/10">
                  <Smartphone className="h-6 w-6 text-[#FF6600]" />
                </div>
                <DialogTitle className="font-serif text-xl text-lepi-indigo">
                  Paiement Orange Money
                </DialogTitle>
              </DialogHeader>

              {/* Summary card */}
              <div className="space-y-3 rounded-xl border border-lepi-gold/20 bg-lepi-cream p-4">
                <div className="flex items-center gap-3">
                  {nominee.imageUrl ? (
                    <Image
                      src={nominee.imageUrl}
                      alt={nominee.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-lepi-gold/20"
                    />
                  ) : (
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-lepi-white ring-1 ring-lepi-gold/20 ${getAvatarColor(nominee.name)}`}
                    >
                      {getInitials(nominee.name)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-lepi-indigo">
                      {nominee.name}
                    </p>
                    <p className="text-xs text-lepi-indigo/50">
                      {nominee.categoryName}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-lepi-gold/15" />

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-lepi-indigo/60">Nombre de votes</span>
                    <span className="font-medium text-lepi-indigo">
                      {voteCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lepi-indigo/60">Prix unitaire</span>
                    <span className="text-lepi-indigo/60">
                      {formatGNF(VOTE_PRICE)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lepi-indigo/60">Telephone</span>
                    <span className="font-mono text-sm text-lepi-indigo">
                      +224 {phone}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-lepi-gold/15" />

                <div className="flex justify-between">
                  <span className="font-semibold text-lepi-indigo">Total</span>
                  <span className="font-serif text-lg font-bold text-lepi-gold-dark">
                    {formatGNF(totalAmount)}
                  </span>
                </div>
              </div>

              {errorAlert}

              <Button
                onClick={handlePay}
                disabled={isLoading}
                className="w-full bg-[#FF6600] font-semibold text-white hover:bg-[#E55C00] disabled:opacity-70"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <Smartphone className="h-4 w-4" />
                    Payer {formatGNF(totalAmount)} via Orange Money
                  </>
                )}
              </Button>
            </div>
          )}

          {/* ══════════ STEP 5 — Success ══════════ */}
          {step === 5 && (
            <div className="space-y-6 text-center">
              {/* Animated checkmark */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center">
                <div className="animate-[scaleIn_0.4s_ease-out] rounded-full bg-emerald-100 p-3">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-lepi-indigo">
                  Merci pour votre vote !
                </h3>
                <p className="mt-2 text-sm text-lepi-indigo/60">
                  Vous avez accorde{" "}
                  <span className="font-semibold text-lepi-gold-dark">
                    {voteCount} vote{voteCount > 1 ? "s" : ""}
                  </span>{" "}
                  a{" "}
                  <span className="font-semibold text-lepi-indigo">
                    {nominee.name}
                  </span>
                </p>
              </div>

              {/* Transaction receipt */}
              <div className="rounded-xl border border-lepi-gold/20 bg-lepi-cream p-4 text-left">
                <p className="mb-2 text-xs font-medium tracking-wide text-lepi-indigo/40 uppercase">
                  Recu de transaction
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-lepi-indigo/60">Reference</span>
                    <span className="font-mono text-xs text-lepi-indigo">
                      {transactionRef}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lepi-indigo/60">Montant paye</span>
                    <span className="font-semibold text-lepi-indigo">
                      {formatGNF(totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lepi-indigo/60">Votes accordes</span>
                    <span className="font-semibold text-lepi-indigo">
                      {voteCount}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleClose}
                className="w-full bg-lepi-indigo font-semibold text-lepi-white hover:bg-lepi-indigo-light"
                size="lg"
              >
                Fermer
              </Button>
            </div>
          )}
        </div>
      </DialogContent>

      {/* ── Keyframe for success animation ── */}
      <style jsx global>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Dialog>
  );
}
