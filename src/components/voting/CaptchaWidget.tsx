"use client";

import dynamic from "next/dynamic";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[78px] items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-lepi-indigo/20 border-t-lepi-indigo" />
    </div>
  ),
});

interface CaptchaWidgetProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function CaptchaWidget({ onVerify, onExpire }: CaptchaWidgetProps) {
  if (!SITE_KEY) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
        CAPTCHA non configuré. Contactez l&apos;administrateur.
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <ReCAPTCHA
        sitekey={SITE_KEY}
        onChange={(token: string | null) => {
          if (token) onVerify(token);
        }}
        onExpired={onExpire}
        theme="light"
      />
    </div>
  );
}
