"use client";

import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaWidgetProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function CaptchaWidget({ onVerify, onExpire }: CaptchaWidgetProps) {
  return (
    <div className="flex justify-center">
      <ReCAPTCHA
        sitekey={SITE_KEY}
        onChange={(token) => {
          if (token) onVerify(token);
        }}
        onExpired={onExpire}
        theme="light"
      />
    </div>
  );
}
