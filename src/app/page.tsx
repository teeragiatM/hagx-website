export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 select-none">
      <div className="text-center">
        <h1 className="text-3xl font-light tracking-[0.4em] uppercase text-slate-900 mb-4">
          HAGX
        </h1>
        <p className="text-xs tracking-[0.25em] uppercase text-slate-400 font-light">
          Architectural Glass Solution
        </p>
        <p className="mt-8 text-sm text-slate-400 font-light">
          กำลังเปิดตัวเร็วๆ นี้
        </p>
      </div>

      {/* Hidden backdoor — looks like a copyright line */}
      <a
        href="/preview"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-slate-200 font-light select-none"
        tabIndex={-1}
        aria-hidden="true"
      >
        © 2025
      </a>
    </main>
  );
}
