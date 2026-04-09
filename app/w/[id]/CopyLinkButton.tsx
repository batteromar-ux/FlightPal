"use client";

import { useState } from "react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      onClick={handleCopy}
      disabled={copied}
      className="w-full max-w-md mt-4 bg-zinc-800 text-white text-sm rounded-lg py-2 hover:bg-zinc-700 transition-colors disabled:opacity-50"
    >
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}
