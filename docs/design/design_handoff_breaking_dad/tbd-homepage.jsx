/* global React */
// Direction A v2 — Homepage components (Desktop + Mobile)
// Built on the live site's DNA: white paper, dusky-rose accent,
// soft-pink section blocks, all-sans modern type, photo-led cards.

const { useState, useEffect } = React;

// ─────────────────────────────────────────────────────
// Header / Footer / Mobile masthead
// ─────────────────────────────────────────────────────
function SiteHeader({ active = "Home" }) {
  const items = ["Parenthood", "Separated Parents", "Reviews", "Things To Do", "Work With Me"];
  return (
    <header className="site-header">
      <a href="#" aria-label="The Breaking Dad — home"><span className="wordmark">Breaking Dad</span></a>
      <nav className="nav">
        {items.map(i => (
          <a key={i} className={i === active ? "is-active" : ""} href="#">{i}</a>
        ))}
      </nav>
      <button className="search" aria-label="Search">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="7" cy="7" r="5" /><path d="m11 11 3 3" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  );
}

function MobMasthead({ onMenu }) {
  return (
    <div className="mob-masthead">
      <span className="wordmark sm">Breaking Dad</span>
      <div className="flex gap-3 center">
        <button className="search" aria-label="Search">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="7" cy="7" r="5" /><path d="m11 11 3 3" strokeLinecap="round" />
          </svg>
        </button>
        <button className="burger" onClick={onMenu} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <div className="wordmark lg" style={{ marginBottom: 14 }}>Breaking Dad</div>
            <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6, maxWidth: 320, margin: 0 }}>
              Honest stories from a UK dad navigating co-parenting, blended family life, and starting again.
            </p>
            <div className="socials">
              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="2" width="12" height="12" rx="3" /><circle cx="8" cy="8" r="2.5" /><circle cx="11.5" cy="4.5" r="0.6" fill="currentColor" /></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M9.5 14V8.5h1.8l.3-2.2H9.5V4.9c0-.6.2-1 1.1-1h1.2V1.9c-.2 0-.9-.1-1.7-.1-1.7 0-2.9 1-2.9 2.9v1.6H5.4v2.2h1.8V14h2.3z" /></svg>
              </a>
              <a href="#" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
              </a>
            </div>
          </div>
          <div>
            <div className="col-h">Sections</div>
            <div className="links">
              <a href="#">Parenthood</a>
              <a href="#">Separated parents</a>
              <a href="#">Blended family</a>
              <a href="#">Reviews</a>
              <a href="#">Things to do</a>
            </div>
          </div>
          <div>
            <div className="col-h">The Site</div>
            <div className="links">
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Work with me</a>
              <a href="#">Newsletter</a>
            </div>
          </div>
          <div>
            <div className="col-h">Legal</div>
            <div className="links">
              <a href="#">Affiliate disclosure</a>
              <a href="#">Privacy policy</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 36, paddingTop: 18, borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-3)" }}>
          <span>© 2026 The Breaking Dad. Written in Leeds, England.</span>
          <span>Some links are affiliate. Recommendations are honest.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterMobile() {
  return (
    <footer className="site-footer" style={{ padding: "36px 22px 24px" }}>
      <div className="wordmark lg" style={{ marginBottom: 12 }}>Breaking Dad</div>
      <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55, margin: "0 0 18px" }}>
        Honest stories from a UK dad navigating co-parenting, blended family life, and starting again.
      </p>
      <div className="socials" style={{ marginBottom: 24 }}>
        <a href="#" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="2" width="12" height="12" rx="3" /><circle cx="8" cy="8" r="2.5" /><circle cx="11.5" cy="4.5" r="0.6" fill="currentColor" /></svg></a>
        <a href="#" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M9.5 14V8.5h1.8l.3-2.2H9.5V4.9c0-.6.2-1 1.1-1h1.2V1.9c-.2 0-.9-.1-1.7-.1-1.7 0-2.9 1-2.9 2.9v1.6H5.4v2.2h1.8V14h2.3z" /></svg></a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        <div>
          <div className="col-h">Sections</div>
          <div className="links">
            <a href="#">Parenthood</a>
            <a href="#">Separated parents</a>
            <a href="#">Reviews</a>
            <a href="#">Things to do</a>
          </div>
        </div>
        <div>
          <div className="col-h">Site</div>
          <div className="links">
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Work with me</a>
            <a href="#">Disclosure</a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 14, borderTop: "1px solid var(--rule)", fontSize: 11, color: "var(--ink-3)" }}>
        © 2026 The Breaking Dad
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────
// Homepage — desktop
// ─────────────────────────────────────────────────────
function HomepageDesktop() {
  return (
    <div className="page">
      <SiteHeader active="Parenthood" />

      {/* Strap line under masthead */}
      <div style={{ borderBottom: "1px solid var(--rule-soft)", padding: "10px 40px", textAlign: "center" }}>
        <span className="meta" style={{ fontSize: 12, letterSpacing: "0.05em" }}>
          Honest field notes from a UK dad — co-parenting, blended family, starting again. <span style={{ color: "var(--accent)" }}>·</span> Issue 47 · April 2026
        </span>
      </div>

      {/* Lead row — hero card + categorised sidebar list */}
      <section style={{ padding: "32px 40px 28px", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 36, alignItems: "start" }}>
          <a className="hero-card illus review" href="#" style={{ display: "block" }}>
            <div className="overlay" />
            <div className="text">
              <div className="eyebrow">Reviews</div>
              <div className="title">Smol Review 2026: Are their eco-friendly laundry and dishwasher tablets still worth it?</div>
              <div className="meta">2 April 2026 · 7 min read</div>
            </div>
          </a>
          <div className="side-list">
            {[
              { eyebrow: "Separated Parents", title: "Child Maintenance Service (CMS) Changes 2026: What UK Parents Need to Know" },
              { eyebrow: "Featured Post", title: "Center Parcs Elveden Forest Review 2026: Our Honest Family Trip with a 7-Month-Old" },
              { eyebrow: "Reviews", title: "Simply Piano Review: Is This Piano App Worth It for Beginners (and your kids)?" },
              { eyebrow: "Reviews", title: "Vivobarefoot Motus Strength Review (2026): The Only Barefoot Shoe I Need as a Busy Parent" },
              { eyebrow: "Parenthood", title: "Must Haves for Newborns: The Ultimate Checklist for New Parents" },
            ].map((it, i) => (
              <a key={i} href="#" className="item" style={{ display: "block" }}>
                <div className="eyebrow eyebrow-accent">{it.eyebrow}</div>
                <div className="title">{it.title}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Article rows + sidebar */}
      <section style={{ padding: "8px 40px 56px", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 36, alignItems: "start" }}>
          <div className="flex col gap-8">
            {[
              { kind: "Featured Post", title: "Hoppstar Artist Digital Camera Review: The Perfect Creative Tool for Young Photographers", dek: "Looking for the perfect camera for your budding young photographer? The Hoppstar Artist is a fun, durable, and easy-to-use instant print camera designed especially for…", date: "10 June 2026", img: "kids" },
              { kind: "Parenthood", title: "Newbie Windsor Launch: A Swedish Slice of Sustainable Style", dek: "At a glance I visited the new Newbie Windsor store launch on 5th June with my fiancée Rosie and our…", date: "9 June 2026", img: "frame" },
              { kind: "Parenthood", title: "Top Toys for 10-Year-Olds: Fun and Engaging Picks for Every Interest", dek: "Looking for the best toys for 10-year-olds in 2026? This guide rounds up the top-rated toys for 10-year-old boys and girls — from STEM kits…", date: "4 June 2026", img: "toys" },
              { kind: "Things To Do", title: "Center Parcs Elveden Forest with a 7-Month-Old: What's Worth Booking", dek: "From the Aqua Sana entry-level treatments to which lodge tier is genuinely worth the upgrade — what we'd book again, and what we wouldn't.", date: "30 May 2026", img: "travel" },
            ].map((r, i) => (
              <a key={i} href="#" className="article-row">
                <div className={"img illus " + r.img} />
                <div>
                  <div className="eyebrow eyebrow-accent" style={{ marginBottom: 8 }}>{r.kind}</div>
                  <h3>{r.title}</h3>
                  <p className="dek">{r.dek}</p>
                  <div className="meta">{r.date}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="flex col gap-6">
            <div className="newsletter">
              <div className="ico">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
              </div>
              <h3 className="h2" style={{ fontSize: 22, margin: "0 0 8px" }}>Subscribe to our Newsletter</h3>
              <p className="small" style={{ marginBottom: 16, fontSize: 14 }}>
                Join our mailing list for the latest content straight to your inbox.
              </p>
              <input className="input" placeholder="Email address" style={{ marginBottom: 10 }} />
              <button className="btn" style={{ width: "100%" }}>Subscribe</button>
            </div>

            <div>
              <h3 className="h2" style={{ fontSize: 18, margin: "0 0 14px", letterSpacing: "-0.012em" }}>Stay Connected</h3>
              <div className="flex col gap-3">
                <a href="#" className="flex gap-3 center" style={{ fontSize: 14 }}>
                  <span style={{ width: 32, height: 32, background: "var(--accent)", color: "#fff", borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="2" width="12" height="12" rx="3" /><circle cx="8" cy="8" r="2.5" /><circle cx="11.5" cy="4.5" r="0.6" fill="currentColor" /></svg>
                  </span>
                  <span style={{ color: "var(--ink)", fontWeight: 500 }}>the_breaking_dad</span>
                </a>
                <a href="#" className="flex gap-3 center" style={{ fontSize: 14 }}>
                  <span style={{ width: 32, height: 32, background: "var(--accent)", color: "#fff", borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M9.5 14V8.5h1.8l.3-2.2H9.5V4.9c0-.6.2-1 1.1-1h1.2V1.9c-.2 0-.9-.1-1.7-.1-1.7 0-2.9 1-2.9 2.9v1.6H5.4v2.2h1.8V14h2.3z" /></svg>
                  </span>
                  <span style={{ color: "var(--ink)", fontWeight: 500 }}>The Breaking Dad</span>
                </a>
              </div>
              <a href="#" style={{ display: "block", marginTop: 14 }}>
                <div className="illus kids" style={{ aspectRatio: "1/1", borderRadius: 10 }} />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Soft-pink "Popular content" band */}
      <section className="section-pink">
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <h2>Popular content right now…</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {[
              { t: "Single Parent Benefits: A Complete Guide", img: "notes" },
              { t: "Grants for Single Parents in the UK: Financial Support & How to Apply", img: "frame" },
              { t: "Introducing a New Partner to Your Child: A Separated Parent's Guide", img: "kids" },
              { t: "The Best Travel-Friendly Toys for Toddlers", img: "toys" },
              { t: "Vivobarefoot Review: Are These Minimalist Shoes Worth Your Investment?", img: "review" },
              { t: "The 12 Best Parenting Books Every UK Parent Should Read in 2026", img: "book" },
            ].map((c, i) => (
              <a key={i} href="#" className="tile illus" style={{ background: undefined }}>
                <div className={"illus " + c.img} style={{ position: "absolute", inset: 0 }} />
                <div className="ov" />
                <div className="t">{c.t}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Separated Parents category section */}
      <section style={{ padding: "56px 40px", maxWidth: 1180, margin: "0 auto" }}>
        <div className="section-head">
          <h2>Separated Parents</h2>
          <a href="#" className="more">More in separated parents →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {[
            { t: "Child Maintenance Service (CMS) Changes 2026: What UK Parents Need to Know", a: "Daniel Betts", d: "29 June 2026", k: "Child maintenance is changing. From new enforcement rules to a 2% fee for all users, here's what separated parents in the UK need to know…", img: "window" },
            { t: "Primary Carer Rights UK: A Guide for Separated Parents", a: "Daniel Betts", d: "25 June 2026", k: "Navigating family law as a primary carer? Understand your rights and responsibilities regarding child arrangements, parental responsibility, and financial support in the UK.", img: "kids" },
            { t: "Dealing with High Conflict Co-Parenting: Strategies for Peaceful Communication", a: "Daniel Betts", d: "23 June 2026", k: "Navigating divorce or separation is undoubtedly one of life's toughest challenges, and …", img: "sofa" },
          ].map((c, i) => (
            <a key={i} href="#" className="card">
              <div className={"img wide illus " + c.img} />
              <div className="card-eyebrow eyebrow eyebrow-accent">Separated Parents</div>
              <h3 className="card-title">{c.t}</h3>
              <div className="meta" style={{ margin: "4px 0 8px" }}>{c.a} · {c.d}</div>
              <p className="card-dek">{c.k}</p>
            </a>
          ))}
        </div>
        <div className="flex center" style={{ justifyContent: "center", gap: 6, marginTop: 28 }}>
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === 1 ? "var(--accent)" : "var(--rule)" }} />
          ))}
        </div>
      </section>

      {/* Reviews category section */}
      <section style={{ padding: "0 40px 64px", maxWidth: 1180, margin: "0 auto" }}>
        <div className="section-head">
          <h2>Reviews</h2>
          <a href="#" className="more">More in reviews →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {[
            { t: "Center Parcs Elveden Forest Review 2026: Our Honest Family Trip with a 7-Month-Old", a: "Daniel Betts", d: "24 June 2026", k: "Planning your first holiday with a baby? Wondering whether Center Parcs Elveden Forest is worth it for families with young children? Here's our honest, in-depth …", img: "travel" },
            { t: "Simply Piano Review: Is This Piano App Worth It for Beginners (and your kids)?", a: "Daniel Betts", d: "20 June 2026", k: "Are you keen to learn piano but unsure where to start? In …", img: "review" },
            { t: "Vivobarefoot Motus Strength Review (2026): The Only Barefoot Shoe I Need as a Busy Parent", a: "Daniel Betts", d: "14 June 2026", k: "The Vivobarefoot Motus Strength is the ultimate versatile barefoot training shoe for active parents. Engineered for functional fitness, heavy lifting, and high-intensity workouts, it delivers …", img: "frame" },
          ].map((c, i) => (
            <a key={i} href="#" className="card">
              <div className={"img wide illus " + c.img} />
              <div className="card-eyebrow eyebrow eyebrow-accent">Reviews</div>
              <h3 className="card-title">{c.t}</h3>
              <div className="meta" style={{ margin: "4px 0 8px" }}>{c.a} · {c.d}</div>
              <p className="card-dek">{c.k}</p>
            </a>
          ))}
        </div>
      </section>

      {/* About section */}
      <section style={{ background: "var(--paper-2)", padding: "64px 40px", borderTop: "1px solid var(--rule)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "center" }}>
          <div>
            <h2 className="h1" style={{ margin: "0 0 18px" }}>About The Breaking Dad</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 14px" }}>
              Hi, I'm the dad behind The Breaking Dad — a blog about the real, sometimes chaotic, often rewarding adventure of modern family life.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 14px" }}>
              I'm a UK-based father navigating the ups and downs of parenting in a blended family. Here, I share honest stories from my own journey — from the challenges of co-parenting and building strong relationships with my kids and stepkids, to discovering the best family days out, useful parenting tips, and everything in between.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 14px" }}>
              The Breaking Dad is my space to share what I've learned, celebrate the good days, and keep it real about the tough ones. Whether you're looking for practical advice, honest reviews, or just a bit of reassurance that you're not alone in the madness, you're in the right place.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 18px" }}>
              Thanks for stopping by — I hope you find something here that helps or inspires you on your own parenting journey.
            </p>
            <a href="#" className="btn ghost">More about Daniel →</a>
          </div>
          <div className="illus kids" style={{ aspectRatio: "5/4", borderRadius: 12 }} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Homepage — mobile
// ─────────────────────────────────────────────────────
function HomepageMobile({ onMenu }) {
  return (
    <div className="page" style={{ fontSize: 16 }}>
      <MobMasthead onMenu={onMenu} />

      {/* Hero */}
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

      {/* Sidebar list of categorised features (above the fold replacement) */}
      <section style={{ padding: "0 18px 20px" }}>
        <div className="side-list" style={{ borderTop: "1px solid var(--rule)" }}>
          {[
            { eyebrow: "Separated Parents", title: "CMS Changes 2026: What UK Parents Need to Know" },
            { eyebrow: "Featured Post", title: "Center Parcs Elveden Forest Review 2026" },
            { eyebrow: "Reviews", title: "Simply Piano: Is This App Worth It for Beginners?" },
            { eyebrow: "Parenthood", title: "Must Haves for Newborns: The Ultimate Checklist" },
          ].map((it, i) => (
            <a key={i} href="#" className="item" style={{ display: "block" }}>
              <div className="eyebrow eyebrow-accent" style={{ fontSize: 10 }}>{it.eyebrow}</div>
              <div className="title" style={{ fontSize: 15 }}>{it.title}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Article list */}
      <section style={{ padding: "8px 18px 28px" }}>
        <div className="flex col gap-6">
          {[
            { kind: "Featured Post", title: "Hoppstar Artist Digital Camera Review", date: "10 June", img: "kids" },
            { kind: "Parenthood", title: "Newbie Windsor Launch: Swedish Sustainable Style", date: "9 June", img: "frame" },
            { kind: "Parenthood", title: "Top Toys for 10-Year-Olds: Picks for Every Interest", date: "4 June", img: "toys" },
            { kind: "Things To Do", title: "Center Parcs with a 7-Month-Old: What to Book", date: "30 May", img: "travel" },
          ].map((c, i) => (
            <a key={i} href="#" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 14 }}>
              <div className={"illus " + c.img} style={{ aspectRatio: "1/1", borderRadius: 8 }} />
              <div>
                <div className="eyebrow eyebrow-accent" style={{ fontSize: 10 }}>{c.kind}</div>
                <h3 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, lineHeight: 1.3, letterSpacing: "-0.012em", margin: "4px 0 6px" }}>{c.title}</h3>
                <div className="meta" style={{ fontSize: 11 }}>{c.date}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "0 18px 28px" }}>
        <div className="newsletter">
          <div className="ico">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
          </div>
          <h3 className="h2" style={{ fontSize: 20, margin: "0 0 6px" }}>Subscribe to our Newsletter</h3>
          <p className="small" style={{ marginBottom: 14, fontSize: 13.5 }}>
            Join our mailing list for the latest content straight to your inbox.
          </p>
          <input className="input" placeholder="Email address" style={{ marginBottom: 10 }} />
          <button className="btn" style={{ width: "100%" }}>Subscribe</button>
        </div>
      </section>

      {/* Soft-pink popular */}
      <section className="section-pink" style={{ padding: "32px 18px" }}>
        <h2 style={{ fontSize: 20, marginBottom: 18 }}>Popular content right now…</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { t: "Single Parent Benefits Guide", img: "notes" },
            { t: "Grants for Single Parents UK", img: "frame" },
            { t: "Introducing a New Partner", img: "kids" },
            { t: "Travel Toys for Toddlers", img: "toys" },
          ].map((c, i) => (
            <a key={i} href="#" className="tile" style={{ aspectRatio: "1/1" }}>
              <div className={"illus " + c.img} style={{ position: "absolute", inset: 0 }} />
              <div className="ov" />
              <div className="t" style={{ fontSize: 14, left: 12, right: 12, bottom: 12 }}>{c.t}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Separated parents */}
      <section style={{ padding: "32px 18px" }}>
        <div className="section-head">
          <h2 style={{ fontSize: 20 }}>Separated Parents</h2>
          <a href="#" className="more" style={{ fontSize: 11 }}>More →</a>
        </div>
        <div className="flex col gap-5">
          {[
            { t: "CMS Changes 2026: What UK Parents Need to Know", img: "window" },
            { t: "Primary Carer Rights UK: A Guide for Separated Parents", img: "kids" },
          ].map((c, i) => (
            <a key={i} href="#" className="card">
              <div className={"img wide illus " + c.img} />
              <div className="card-eyebrow eyebrow eyebrow-accent">Separated Parents</div>
              <h3 className="card-title" style={{ fontSize: 18 }}>{c.t}</h3>
              <div className="meta" style={{ marginTop: 4, fontSize: 11 }}>Daniel Betts · 29 June</div>
            </a>
          ))}
        </div>
      </section>

      {/* About */}
      <section style={{ background: "var(--paper-2)", padding: "32px 18px", borderTop: "1px solid var(--rule)" }}>
        <div className="illus kids" style={{ aspectRatio: "5/4", borderRadius: 10, marginBottom: 18 }} />
        <h2 className="h1" style={{ fontSize: 26, margin: "0 0 12px" }}>About The Breaking Dad</h2>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 12px" }}>
          Hi, I'm the dad behind The Breaking Dad — a blog about the real, sometimes chaotic, often rewarding adventure of modern family life.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 14px" }}>
          A UK-based father navigating parenting in a blended family. Honest stories — from co-parenting and building strong relationships with kids and stepkids, to family days out, parenting tips, and everything in between.
        </p>
        <a href="#" className="btn ghost">More about Daniel →</a>
      </section>

      <FooterMobile />
    </div>
  );
}

window.HomepageDesktop = HomepageDesktop;
window.HomepageMobile = HomepageMobile;
window.MobMasthead = MobMasthead;
window.SiteHeader = SiteHeader;
window.SiteFooter = SiteFooter;
window.FooterMobile = FooterMobile;
