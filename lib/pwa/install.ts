"use client";

import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Platform = "prompt" | "manual" | "installed" | "unavailable";

const DISMISS_KEY = "anak-kamar:install-dismissed";

export function useInstall() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [platform, setPlatform] = useState<Platform>("unavailable");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(window.localStorage.getItem(DISMISS_KEY) === "1");

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (standalone) {
      setPlatform("installed");
      return;
    }

    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    if (isIOS) {
      setPlatform("manual");
      return;
    }

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
      setPlatform("prompt");
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const onInstalled = () => setPlatform("installed");
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }, [deferred]);

  const dismiss = useCallback(() => {
    window.localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }, []);

  return { platform, dismissed, install, dismiss };
}
