/* global React, SiteHeader, MobMasthead, SiteFooter, FooterMobile */
// Direction A v2 — Post template (Desktop + Mobile)

// Reading-progress bar — listens to the nearest scrolling ancestor
function ReadingProgress({ targetId }) {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    // Find nearest scroll container by walking up
    let scroller = el.parentElement;
    while (scroller && scroller !== document.body) {
      const s = getComputedStyle(scroller).overflowY;
      if (s === "auto" || s === "scroll") break;
      scroller = scroller.parentElement;
    }
    scroller = scroller || window;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const containerH = scroller === window ? window.innerHeight : scroller.clientHeight;
      const total = rect.height - containerH;
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / Math.max(1, total)));
      setW(pct * 100);
    };
    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [targetId]);
  return <div className="read-progress" style={{ width: w + "%" }} />;
}

// Tiny leaf SVG used on the field-note stamp
function Leaf({ size = 16 }) {
  return (
    <svg className="leaf" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c0-7 5-13 14-14-1 9-7 14-14 14z" />
      <path d="M5 19c3-3 6-5 10-7" />
    </svg>
  );
}

function FieldNoteTag({ number = 47 }) {
  return (
    <div className="field-note-tag">
      <Leaf size={14} />
      Field Note
      <span className="num">№ {number}</span>
    </div>
  );
}

function PostDesktop() {
  return (
    <div className="page" id="post-desktop-root">
      <ReadingProgress targetId="post-desktop-root" />
      <SiteHeader active="Separated Parents" />

      {/* Breadcrumb */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 40px", borderBottom: "1px solid var(--rule-soft)", maxWidth: 1180, margin: "0 auto", width: "100%" }}>
        <div className="meta">
          <a href="#" style={{ color: "var(--ink-3)" }}>Home</a> ·{" "}
          <a href="#" style={{ color: "var(--ink-3)" }}>Separated Parents</a> ·{" "}
          <span style={{ color: "var(--ink)" }}>Universal Credit, resident parent</span>
        </div>
        <div className="flex gap-3 meta">
          <a href="#">Save</a><span>·</span><a href="#">Share</a><span>·</span><a href="#">Print</a>
        </div>
      </div>

      {/* Headline */}
      <article style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 40px 0" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 18 }}><FieldNoteTag number={47} /></div>
          <div className="eyebrow eyebrow-accent" style={{ marginBottom: 16 }}>Separated Parents · Long Read</div>
          <h1 className="display-1" style={{ fontSize: 56, margin: "0 0 20px" }}>
            Universal Credit when you're the resident parent
          </h1>
          <p className="lede" style={{ fontSize: 21, marginBottom: 22 }}>
            The assessment period nobody explains, the line on the form that changes everything, and what to do when the system doesn't fit your custody arrangement.
          </p>
          <div className="flex gap-3 center" style={{ marginBottom: 28 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), var(--accent-deep))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--display)", fontWeight: 700, fontSize: 16 }}>D</div>
            <div className="meta">By <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Daniel Betts</strong> · 8 min read · 23 April 2026</div>
          </div>
        </div>

        <div className="hero-illus illus" style={{ aspectRatio: "16/7", borderRadius: 12, marginBottom: 12 }} />
        <div className="meta text-c" style={{ marginBottom: 36 }}>The DWP guidance, the kitchen table, and a calculator that can't quite hold both at once.</div>
      </article>

      {/* Body + sidebar */}
      <article style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "200px 1fr 260px", gap: 40 }}>
        {/* Left rail — TOC */}
        <aside style={{ position: "sticky", top: 24, alignSelf: "start" }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>In this piece</div>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", fontFamily: "var(--sans)", fontSize: 13, lineHeight: 1.5 }}>
            {[
              "What 'resident parent' actually means",
              "The assessment period",
              "The form line that catches people",
              "What changed when our split changed",
              "If your ex also claims",
              "What I'd do again",
            ].map((t, i) => (
              <li key={i} style={{ padding: "10px 0", borderBottom: "1px solid var(--rule-soft)" }}>
                <a href="#" style={{ color: i === 1 ? "var(--accent)" : "var(--ink-2)", display: "block" }}>
                  <span style={{ color: "var(--ink-4)", marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>{t}
                </a>
              </li>
            ))}
          </ol>
          <div className="meta" style={{ marginTop: 16, fontSize: 12 }}>Reading: <strong style={{ color: "var(--ink)" }}>2 of 8 min</strong></div>
        </aside>

        {/* Body */}
        <div className="prose" style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="ymyl" style={{ marginBottom: 28 }}>
            <div className="icon">!</div>
            <div className="text">
              <strong>This is one parent's experience, not legal or financial advice.</strong> Universal Credit rules change. Always check on GOV.UK and, where money is at stake, ring the helpline (0800 328 5644) or talk to <a href="#">Citizens Advice</a> before you act.
            </div>
          </div>

          <p>
            The first thing nobody tells you about Universal Credit when you're newly the resident parent is that the system thinks in months, and your life now thinks in fortnights. You will spend a year and a half reconciling those two clocks, and the reconciliation will mostly happen at 11pm on a Tuesday, on a kitchen table that still smells faintly of fish fingers.
          </p>
          <p>
            What follows is what I learned the slow way. The headlines are simple — what counts as "having the children", how the assessment period bites, and the one line on the form that I got wrong twice. The detail is fiddly. I've tried to be honest about the bits where my situation isn't yours.
          </p>

          <h2>What 'resident parent' actually means</h2>
          <p>
            For Universal Credit, a child "lives with" the person who has them <em>most</em> of the time across a given period — not the person on the birth certificate, not the person who pays the most for school shoes. If you have the children even slightly more than half — say, a 6/8 split over a fortnight — that's you.
          </p>
          <p>
            <a href="#">DWP's own guidance</a> uses the phrase "main responsibility", which is helpful in spirit and useless on a form. In practice, your job is to be able to point to a calendar and say, with a straight face, "I have them on these days."
          </p>

          <div className="pullquote">
            "The system thinks in months, and your life now thinks in fortnights."
          </div>

          <h2>The assessment period</h2>
          <p>
            Your assessment period starts on the day your claim begins, and ends a calendar month later. Everything that arrives in your bank account between those two dates — wages, child benefit, that tax rebate you forgot about — counts as that month's income. This sounds reasonable until your payslip lands on the wrong side of the date and you're "earning" twice in one month and nothing in the next.
          </p>
          <p>
            There is a workaround for this if you're salaried and paid monthly: ring up, explain, and ask them to apply the <em>regular payment cycle</em> rule. They can, but they often won't until you push.
          </p>

          <div className="newsletter-inline">
            <div>
              <div className="title">If this is helping, the newsletter goes out monthly.</div>
              <div className="small">One field note from me, plus what's worth reading. No filler. Unsubscribe whenever.</div>
            </div>
            <button className="btn">Subscribe →</button>
          </div>

          <h3>What I'd recommend keeping</h3>
          <ul>
            <li>A simple month-by-month log of who had the children which nights — date, child, location.</li>
            <li>Every letter from DWP, scanned, in a single folder named the same way every time.</li>
            <li>A note of every phone call: date, time, name of advisor, what they told you.</li>
          </ul>

          <h2>The form line that catches people</h2>
          <p>
            "Does anyone else share responsibility for these children?" The honest answer, for most separated parents, is yes — and ticking yes opens a different journey through the form than ticking no does…
          </p>

          {/* experience-note */}
          <div className="experience-note" style={{ marginTop: 44 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div className="label" style={{ marginBottom: 0 }}>Why I wrote this</div>
              <Leaf size={20} />
            </div>
            <h4>I got this wrong, twice, in 2024.</h4>
            <p>
              The first time, I didn't realise the assessment period was fixed to the day I'd claimed — I was a week off, and that week cost me £312. The second time was sloppier: I ticked "no" to shared responsibility because, technically, that month I had them every night. It triggered a review.
            </p>
            <p>
              I'm writing this so that the next dad who sits down at his kitchen table with a printout and a calculator finds at least one page that <em>doesn't</em> assume he's a hypothetical. None of this is advice. All of it is what I'd tell a friend over a pint.
            </p>
            <div className="signoff">— Daniel</div>
            <div className="author-row">
              <div className="avatar">D</div>
              <div>
                <div className="name">Daniel Betts</div>
                <div className="bio">Separated 2024 · Two kids, 8 & 11 · Writing from Leeds since March 2025</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <a href="#" className="btn ghost" style={{ fontSize: 11, padding: "8px 14px" }}>More about Daniel</a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 36, paddingTop: 20, borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="meta">Filed under: <a href="#" style={{ color: "var(--accent)" }}>Separated Parents</a> · <a href="#" style={{ color: "var(--accent)" }}>Universal Credit</a></div>
            <div className="flex gap-2">
              <button className="btn ghost" style={{ fontSize: 11, padding: "8px 14px" }}>Save</button>
              <button className="btn ghost" style={{ fontSize: 11, padding: "8px 14px" }}>Share</button>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <aside style={{ position: "sticky", top: 24, alignSelf: "start" }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>More on this</div>
          <div className="flex col gap-4">
            {[
              { t: "Child Benefit when you share custody", k: "Money", img: "notes" },
              { t: "Council Tax single-person discount", k: "Money", img: "frame" },
              { t: "What a parenting plan should cover", k: "Law", img: "sofa" },
            ].map((p, i) => (
              <a key={i} href="#" className="card">
                <div className={"img wide illus " + p.img} />
                <div className="card-eyebrow eyebrow eyebrow-accent" style={{ fontSize: 10 }}>{p.k}</div>
                <h3 className="card-title sm" style={{ fontSize: 14, marginTop: 4 }}>{p.t}</h3>
              </a>
            ))}
          </div>

          <div className="newsletter" style={{ marginTop: 28, padding: 20 }}>
            <div className="ico" style={{ width: 32, height: 32, marginBottom: 10 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
            </div>
            <h3 className="h2" style={{ fontSize: 16, margin: "0 0 6px" }}>Subscribe</h3>
            <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "0 0 10px", lineHeight: 1.5 }}>Latest content straight to your inbox.</p>
            <input className="input" placeholder="Email address" style={{ marginBottom: 6, fontSize: 12, padding: "9px 10px" }} />
            <button className="btn" style={{ width: "100%", fontSize: 11, padding: "9px 12px" }}>Subscribe</button>
          </div>
        </aside>
      </article>

      {/* Next */}
      <section className="section-pink" style={{ marginTop: 56 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <h2>Keep reading</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {[
              { t: "The 50/50 schedule that actually worked (after two that didn't)", img: "sofa" },
              { t: "Child Benefit when you share custody, properly explained", img: "notes" },
              { t: "Our Family Wizard, after a year — what it actually does", img: "car" },
            ].map((c, i) => (
              <a key={i} href="#" className="tile">
                <div className={"illus " + c.img} style={{ position: "absolute", inset: 0 }} />
                <div className="ov" />
                <div className="t">{c.t}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function PostMobile({ onMenu }) {
  return (
    <div className="page" id="post-mobile-root" style={{ fontSize: 16 }}>
      <ReadingProgress targetId="post-mobile-root" />
      <MobMasthead onMenu={onMenu} />

      <div className="meta" style={{ padding: "10px 22px", borderBottom: "1px solid var(--rule-soft)", fontSize: 12 }}>
        <a href="#" style={{ color: "var(--ink-3)" }}>Separated Parents</a> ·{" "}
        <span>UC, resident parent</span>
      </div>

      <article style={{ padding: "22px 22px 0" }}>
        <div style={{ marginBottom: 14 }}><FieldNoteTag number={47} /></div>
        <div className="eyebrow eyebrow-accent" style={{ marginBottom: 10 }}>Separated Parents · Long Read</div>
        <h1 className="display-2" style={{ fontSize: 32, margin: "0 0 14px" }}>
          Universal Credit when you're the resident parent
        </h1>
        <p className="lede" style={{ fontSize: 17, marginBottom: 16 }}>
          The assessment period nobody explains, the form line that catches people, and what to do when the system doesn't fit your custody arrangement.
        </p>
        <div className="flex gap-3 center" style={{ marginBottom: 18 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), var(--accent-deep))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--display)", fontWeight: 700, fontSize: 14 }}>D</div>
          <div className="meta" style={{ fontSize: 12 }}>By <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Daniel Betts</strong> · 8 min · 23 Apr 2026</div>
        </div>
        <div className="hero-illus illus" style={{ aspectRatio: "4/3", borderRadius: 10 }} />
      </article>

      <div className="prose" style={{ padding: "26px 22px 0", fontSize: 17, lineHeight: 1.65 }}>
        <div className="ymyl" style={{ marginBottom: 22 }}>
          <div className="icon">!</div>
          <div className="text" style={{ fontSize: 13 }}>
            <strong>One parent's experience, not advice.</strong> UC rules change. Check GOV.UK and, where money is at stake, ring 0800 328 5644.
          </div>
        </div>

        <p>
          The first thing nobody tells you about Universal Credit when you're newly the resident parent is that the system thinks in months, and your life now thinks in fortnights.
        </p>
        <p>
          What follows is what I learned the slow way. The headlines are simple. The detail is fiddly.
        </p>

        <h2 style={{ fontSize: 22 }}>What 'resident parent' actually means</h2>
        <p>
          For UC, a child "lives with" the person who has them <em>most</em> of the time. If you have them even slightly more than half, that's you.
        </p>

        <div className="pullquote" style={{ fontSize: 22, padding: "4px 0 4px 16px", margin: "22px 0" }}>
          "The system thinks in months, and your life now thinks in fortnights."
        </div>

        <h2 style={{ fontSize: 22 }}>The assessment period</h2>
        <p>
          Your assessment period starts on the day your claim begins, and ends a calendar month later. Everything that lands in your bank between those dates counts as that month's income.
        </p>
      </div>

      <div style={{ padding: "0 22px" }}>
        <div className="experience-note" style={{ marginTop: 28 }}>
          <div className="label">Why I wrote this</div>
          <h4 style={{ fontSize: 20 }}>I got this wrong, twice, in 2024.</h4>
          <p style={{ fontSize: 14.5 }}>
            The first time, I didn't realise the assessment period was fixed to the day I'd claimed — that week cost me £312. The second time was sloppier: I ticked "no" to shared responsibility because, technically, that month I had them every night.
          </p>
          <p style={{ fontSize: 14.5 }}>
            I'm writing this so the next dad who sits down at his kitchen table finds at least one page that doesn't assume he's a hypothetical.
          </p>
          <div className="signoff" style={{ fontSize: 16 }}>— Daniel</div>
          <div className="author-row">
            <div className="avatar">D</div>
            <div>
              <div className="name">Daniel Betts</div>
              <div className="bio">Separated 2024 · Two kids · Leeds</div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-pink" style={{ padding: "32px 18px", marginTop: 28 }}>
        <h2 style={{ fontSize: 20, marginBottom: 18 }}>Keep reading</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { t: "The 50/50 schedule that worked", img: "sofa" },
            { t: "Child Benefit when shared", img: "notes" },
          ].map((c, i) => (
            <a key={i} href="#" className="tile" style={{ aspectRatio: "1/1" }}>
              <div className={"illus " + c.img} style={{ position: "absolute", inset: 0 }} />
              <div className="ov" />
              <div className="t" style={{ fontSize: 14, left: 12, right: 12, bottom: 12 }}>{c.t}</div>
            </a>
          ))}
        </div>
      </section>

      <FooterMobile />
    </div>
  );
}

window.PostDesktop = PostDesktop;
window.PostMobile = PostMobile;
