"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PhoneInput({ value, onChange, error }: PhoneInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="phone" className="text-lepi-indigo">
        Numero de telephone
      </Label>
      <div className="flex items-center gap-2">
        <span className="flex h-9 items-center rounded-md border border-input bg-lepi-cream px-3 text-sm font-medium text-lepi-indigo">
          +224
        </span>
        <Input
          id="phone"
          type="tel"
          inputMode="numeric"
          placeholder="6XX XX XX XX"
          maxLength={9}
          value={value}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            onChange(digits);
          }}
          onFocus={(e) => {
            setTimeout(() => {
              e.target.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
          }}
          className={error ? "border-red-500 focus-visible:ring-red-500/50" : ""}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
