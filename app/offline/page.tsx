import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="grid size-16 place-items-center rounded-full border-2 border-line bg-surface">
        <WifiOff className="size-7" aria-hidden />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">Lagi offline</h1>
      <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
        Koneksi lo lagi putus. Progress yang udah kesimpen tetep aman kok — coba lagi kalau udah
        online.
      </p>
    </div>
  );
}
