/* global React, MobMasthead */
// Direction A v2 — Mobile menu (closed + open states)

function MenuOverlay({ open, onClose }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: "var(--paper)",
      transform: open ? "translateY(0)" : "translateY(-100%)",
      transition: "transform .35s cubic-bezier(.6,.05,.2,1)",
      display: "flex", flexDirection: "column",
      zIndex: 50,
    }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="wordmark sm">Breaking Dad</span>
        <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: 0, fontSize: 26, lineHeight: 1, color: "var(--ink)", cursor: "pointer", padding: 4 }}>×</button>
      </div>

      <div style={{ overflow: "auto", flex: 1, padding: "26px 22px 30px" }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Sections</div>
        <div className="flex col" style={{ gap: 0, marginBottom: 28 }}>
          {[
            ["Home", "the front page"],
            ["Parenthood", "everyday parenting"],
            ["Separated Parents", "co-parenting & rights"],
            ["Reviews", "honest product reviews"],
            ["Things To Do", "days out & travel"],
            ["Work With Me", "collaborations"],
          ].map(([n, d], i, arr) => (
            <a key={n} href="#" style={{ padding: "16px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--rule-soft)" : "none", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <div>
                <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.018em", marginBottom: 2, color: "var(--ink)" }}>{n}</div>
                <div className="meta" style={{ fontSize: 12 }}>{d}</div>
              </div>
              <span style={{ color: "var(--accent)", fontFamily: "var(--sans)", fontSize: 16 }}>→</span>
            </a>
          ))}
        </div>

        <div className="newsletter" style={{ padding: 20 }}>
          <div className="ico" style={{ width: 32, height: 32, marginBottom: 10 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
          </div>
          <div className="h3" style={{ fontSize: 17, marginBottom: 6 }}>Subscribe to our newsletter</div>
          <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "0 0 10px" }}>Latest content straight to your inbox.</p>
          <input className="input" placeholder="Email address" style={{ marginBottom: 6, fontSize: 13, padding: "9px 10px" }} />
          <button className="btn" style={{ width: "100%", fontSize: 12 }}>Subscribe</button>
        </div>

        <div style={{ marginTop: 24 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>The Site</div>
          <div className="flex col gap-2">
            {["About Daniel", "Contact", "Affiliate disclosure", "Privacy"].map(l => (
              <a key={l} href="#" style={{ fontSize: 14, padding: "4px 0", color: "var(--ink-2)" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "14px 22px", borderTop: "1px solid var(--rule)", fontSize: 11, color: "var(--ink-3)", display: "flex", justifyContent: "space-between" }}>
        <span>© 2026 The Breaking Dad</span>
        <div className="flex gap-3">
          <a href="#" style={{ color: "var(--accent)" }}>Instagram</a>
          <a href="#" style={{ color: "var(--accent)" }}>Facebook</a>
        </div>
      </div>
    </div>
  );
}

function NavClosed({ onMenu }) {
  return (
    <div className="page" style={{ minHeight: 700 }}>
      <MobMasthead onMenu={onMenu} />
      <section style={{ padding: "20px 18px" }}>
        <a className="hero-card illus review" href="#" style={{ display: "block", aspectRatio: "4/5" }}>
          <div className="overlay" />
          <div className="text" style={{ left: 18, right: 18, bottom: 18 }}>
            <div className="eyebrow" style={{ fontSize: 10 }}>Reviews</div>
            <div className="title" style={{ fontSize: 22, maxWidth: "100%", marginTop: 6 }}>Smol Review 2026: Are their eco-friendly tablets still worth it?</div>
            <div className="meta" style={{ fontSize: 11, marginTop: 6 }}>2 April 2026 · 7 min</div>
          </div>
        </a>
      </section>
    </div>
  );
}

function NavOpen() {
  return (
    <div className="page" style={{ minHeight: 700, position: "relative", overflow: "hidden" }}>
      <MobMasthead onMenu={() => {}} />
      <section style={{ padding: "20px 18px", opacity: 0.3 }}>
        <div className="hero-card illus review" style={{ aspectRatio: "4/5" }}>
          <div className="overlay" />
        </div>
      </section>
      <MenuOverlay open={true} onClose={() => {}} />
    </div>
  );
}

window.NavClosed = NavClosed;
window.NavOpen = NavOpen;
window.MenuOverlay = MenuOverlay;
