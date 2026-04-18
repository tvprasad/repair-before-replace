export function Footer() {
  return (
    <footer className="mt-16 pb-10 flex flex-col items-center gap-3" aria-label="Site footer">
      <a
        href="https://www.w3.org/WAI/WCAG2AA-Conformance"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WCAG 2.1 Level AA conformance — opens W3C conformance page"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle bg-surface text-xs font-semibold text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded bg-[#005A9C] text-white font-black text-[10px] shrink-0" aria-hidden="true">W3C</span>
        WCAG 2.1 Level AA
      </a>
      <p className="text-xs text-slate-600">Built for the DEV Weekend Challenge · April 2026</p>
    </footer>
  );
}
