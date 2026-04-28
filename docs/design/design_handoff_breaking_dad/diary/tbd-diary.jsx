/* global React, SiteHeader, MobMasthead, SiteFooter, FooterMobile */
// Direction A v2 — Diary section (Index + Entry, Desktop + Mobile)
// More personal than Posts: handwritten/journal feel, narrower column,
// dated entries, less chrome. Date-stamp signature replaces Field Note tag.

const Diary = (() => {

// ─── shared bits ─────────────────────────────────────
function Crumbs({ crumbs }) {
  return (
    <div className="meta" style={{ fontSize: 12 }}>
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ margin: "0 6px", color: "var(--ink-4)" }}>·</span>}
          {c.href
            ? <a href="#" style={{ color: "var(--ink-3)" }}>{c.label}</a>
            : <span style={{ color: "var(--ink)" }}>{c.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// Date stamp — the diary signature
function DateStamp({ day, date, month, year, size = "lg" }) {
  const sizes = {
    lg: { dayF: 11, num: 56, mon: 13 },
    md: { dayF: 10, num: 36, mon: 12 },
    sm: { dayF: 10, num: 22, mon: 11 },
  };
  const s = sizes[size];
  return (
    <div style={{ display: "inline-flex", alignItems: "baseline", gap: 14 }}>
      <div style={{ textAlign: "center", borderLeft: "1px solid var(--rule)", borderRight: "1px solid var(--rule)", padding: "6px 14px" }}>
        <div style={{ fontFamily: "var(--sans)", fontSize: s.dayF, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600, marginBottom: 4 }}>{day}</div>
        <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: s.num, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--ink)" }}>{date}</div>
        <div style={{ fontFamily: "var(--sans)", fontSize: s.mon, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-3)", fontWeight: 500, marginTop: 4 }}>{month} {year}</div>
      </div>
    </div>
  );
}

// Photo placeholders — soft, dusky, snapshot-feel gradients keyed by entry tag
const PEEK_BGS = {
  kids: "linear-gradient(135deg, #d9b8a3 0%, #b87a6a 40%, #8e4a4a 100%)",
  travel: "linear-gradient(160deg, #c9d1c1 0%, #8aa18b 50%, #5a6b58 100%)",
  frame: "linear-gradient(140deg, #e8d4c0 0%, #b89878 50%, #7a5a3e 100%)",
  review: "linear-gradient(150deg, #d6c5b8 0%, #a08572 50%, #5e4a3e 100%)",
  notes: "linear-gradient(170deg, #e0d4c0 0%, #a89478 60%, #6a5642 100%)",
  sofa: "linear-gradient(135deg, #d4b8a8 0%, #9a7868 50%, #604a40 100%)",
  kitchen: "linear-gradient(160deg, #e4d2c0 0%, #b08878 60%, #704838 100%)",
  pram: "linear-gradient(150deg, #c8c0b8 0%, #908578 50%, #4a4238 100%)",
};

// Hover-over peek: a small polaroid that fades in beside the row
function DiaryPeek({ tag = "kids", caption }) {
  return (
    <div className="diary-peek" aria-hidden="true">
      <div className="diary-peek-frame">
        <div className="diary-peek-img" style={{ background: PEEK_BGS[tag] || PEEK_BGS.kids }} />
        {caption && <div className="diary-peek-cap">{caption}</div>}
      </div>
    </div>
  );
}

// Tiny inline date stamp for index rows
function IndexDate({ day, date, month, year }) {
  return (
    <div style={{ textAlign: "center", paddingRight: 24, borderRight: "1px solid var(--rule)", minWidth: 90 }}>
      <div style={{ fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600, marginBottom: 4 }}>{day}</div>
      <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 32, lineHeight: 1, letterSpacing: "-0.018em", color: "var(--ink)" }}>{date}</div>
      <div style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-3)", fontWeight: 500, marginTop: 4 }}>{month}</div>
      <div style={{ fontFamily: "var(--sans)", fontSize: 10, color: "var(--ink-4)", fontWeight: 500, marginTop: 2 }}>{year}</div>
    </div>
  );
}

// ─── DIARY INDEX (DESKTOP) ───────────────────────────
function DiaryIndexDesktop() {
  const entries = [
    { day: "Tue", date: "23", month: "Apr", year: "2026", title: "The thing about Tuesday pickups", dek: "I picked Eve up from school today for the first time since Christmas. Her timetable hadn't worked out for me to do it. We walked the long way home and she told me about a girl in her class who…", read: "6 min", img: "kids", cap: "The long way home" },
    { day: "Sun", date: "21", month: "Apr", year: "2026", title: "Sunday at Roundhay", dek: "Kite weather. Three of them, no string, predictably. Got a coffee from the kiosk and watched a dad lose his temper at a kid who'd done nothing wrong, and felt the familiar mix of…", read: "4 min", img: "travel", cap: "Roundhay, kite weather" },
    { day: "Wed", date: "17", month: "Apr", year: "2026", title: "On giving up on the Easter holiday plan", dek: "We had it all sketched out — three days at Center Parcs, two at Rosie's mum's, one for me to catch up on work. By Tuesday morning we'd binned every column of the spreadsheet and were…", read: "8 min", img: "frame", cap: "The binned spreadsheet" },
    { day: "Sat", date: "13", month: "Apr", year: "2026", title: "What the Hoppstar lasted: ten days, four batteries", dek: "Quick follow-up to the review. I said the camera was a 'creative tool'. She used it as a hammer for nine of the ten days. The plastic survived. I'm impressed.", read: "3 min", img: "review", cap: "Day nine, still going" },
    { day: "Mon", date: "08", month: "Apr", year: "2026", title: "The conversation about phones, take three", dek: "Year 6. Everyone has one. Or so the story goes. We sat at the kitchen table and I tried to listen more than I talked, which is a thing I'm bad at. Wrote down what she said afterwards…", read: "9 min", img: "kitchen", cap: "Kitchen table notes" },
    { day: "Thu", date: "04", month: "Apr", year: "2026", title: "A small win at the supermarket", dek: "Nothing happened. That's the whole entry. We did the weekly shop and nothing happened, and on the way home I noticed how much I'd been bracing for something to.", read: "2 min", img: "sofa", cap: "Trolley, full" },
  ];

  return (
    <div className="page">
      <SiteHeader active="Parenthood" />

      {/* Breadcrumb */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 40px", borderBottom: "1px solid var(--rule-soft)", maxWidth: 1180, margin: "0 auto", width: "100%" }}>
        <Crumbs crumbs={[{ label: "Home", href: "#" }, { label: "Diary" }]} />
        <div className="meta" style={{ fontSize: 12 }}>
          <a href="#" style={{ color: "var(--ink)", fontWeight: 600 }}>Latest</a>
          <span style={{ color: "var(--ink-4)", margin: "0 8px" }}>·</span>
          <a href="#">By month</a>
          <span style={{ color: "var(--ink-4)", margin: "0 8px" }}>·</span>
          <a href="#">By year</a>
        </div>
      </div>

      {/* Masthead */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "56px 40px 40px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600, marginBottom: 16 }}>The Diary</div>
        <h1 className="display-1" style={{ fontSize: 72, margin: "0 0 18px", letterSpacing: "-0.03em" }}>
          <em style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500 }}>Field notes,</em> dated.
        </h1>
        <p className="lede" style={{ fontSize: 19, maxWidth: 560, margin: "0 auto 22px" }}>
          Shorter, more personal pieces. Less guide, more journal — what the week actually looked like, the things I noticed, the bits I'm still working out.
        </p>
        <div className="meta" style={{ fontSize: 12 }}>
          <strong style={{ color: "var(--ink)", fontWeight: 600 }}>142</strong> entries · Since November 2022 · New entry most weeks
        </div>
      </section>

      {/* Year filter rail */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 40px 12px", display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        {[
          { y: "All", n: 142 },
          { y: "2026", n: 31, on: true },
          { y: "2025", n: 48 },
          { y: "2024", n: 41 },
          { y: "2023", n: 18 },
          { y: "2022", n: 4 },
        ].map(({ y, n, on }) => (
          <a key={y} href="#" style={{
            display: "inline-flex", alignItems: "baseline", gap: 6,
            padding: "8px 14px", borderRadius: 999,
            border: on ? "1px solid var(--accent)" : "1px solid var(--rule)",
            background: on ? "var(--accent-soft)" : "var(--paper)",
            color: on ? "var(--accent-deep)" : "var(--ink)",
            fontSize: 13, fontWeight: 500,
          }}>{y}<span style={{ fontSize: 11, color: on ? "var(--accent-deep)" : "var(--ink-3)" }}>({n})</span></a>
        ))}
      </div>

      {/* Timeline */}
      <section style={{ maxWidth: 880, margin: "0 auto", padding: "32px 40px 64px", position: "relative" }}>
        {/* Month label — April 2026 */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--rule)" }}>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.014em", margin: 0, color: "var(--ink)" }}>April 2026</h2>
          <span className="meta" style={{ fontSize: 12 }}>6 entries</span>
        </div>

        {entries.map((e, i) => (
          <a key={i} href="#" className="diary-row">
            <IndexDate day={e.day} date={e.date} month={e.month} year={e.year} />
            <div style={{ paddingLeft: 24, flex: 1 }}>
              <h3 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 24, lineHeight: 1.2, letterSpacing: "-0.014em", color: "var(--ink)", margin: "0 0 8px", textWrap: "balance" }}>{e.title}</h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 10px" }}>{e.dek}</p>
              <div className="meta" style={{ fontSize: 11.5 }}>
                <span style={{ color: "var(--accent)" }}>↗</span> {e.read} read
              </div>
            </div>
            <DiaryPeek tag={e.img} caption={e.cap} />
          </a>
        ))}

        {/* March label */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, margin: "44px 0 20px", paddingBottom: 12, borderBottom: "1px solid var(--rule)" }}>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.014em", margin: 0, color: "var(--ink)" }}>March 2026</h2>
          <span className="meta" style={{ fontSize: 12 }}>5 entries</span>
        </div>

        {[
          { day: "Sun", date: "30", month: "Mar", year: "2026", title: "Mother's Day, the year after", dek: "Rosie's first as a mum-of-our-baby. We didn't make a big thing of it, which I think was the right call. Toast in bed and a card Eve had drawn that…", read: "4 min", img: "pram", cap: "Toast in bed" },
          { day: "Wed", date: "26", month: "Mar", year: "2026", title: "On the school WhatsApp group", dek: "I left it. Six weeks of parental brain-noise, condensed into one tap. The sky did not fall in.", read: "3 min", img: "notes", cap: "One tap" },
        ].map((e, i) => (
          <a key={i} href="#" className="diary-row">
            <IndexDate day={e.day} date={e.date} month={e.month} year={e.year} />
            <div style={{ paddingLeft: 24, flex: 1 }}>
              <h3 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 24, lineHeight: 1.2, letterSpacing: "-0.014em", color: "var(--ink)", margin: "0 0 8px", textWrap: "balance" }}>{e.title}</h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 0 10px" }}>{e.dek}</p>
              <div className="meta" style={{ fontSize: 11.5 }}>
                <span style={{ color: "var(--accent)" }}>↗</span> {e.read} read
              </div>
            </div>
            <DiaryPeek tag={e.img} caption={e.cap} />
          </a>
        ))}

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--rule)" }}>
          <a href="#" className="btn ghost" style={{ fontSize: 12 }}>← Older entries</a>
          <a href="#" className="btn ghost" style={{ fontSize: 12 }}>Browse the full archive</a>
        </div>
      </section>

      {/* Newsletter band */}
      <section className="section-pink">
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow eyebrow-accent" style={{ marginBottom: 10, justifyContent: "center" }}>Get diary entries by email</div>
          <h2 style={{ fontSize: 28, marginBottom: 12, textAlign: "center" }}>The Field Notes letter</h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 auto 22px", maxWidth: 480 }}>
            One honest dispatch a fortnight. Diary entries, what we used this week, what worked, what didn't.
          </p>
          <div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto" }}>
            <input className="input" placeholder="Email address" style={{ background: "#fff", flex: 1 }} />
            <button className="btn" style={{ whiteSpace: "nowrap" }}>Subscribe</button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

// ─── DIARY ENTRY (DESKTOP) ───────────────────────────
function DiaryEntryDesktop() {
  return (
    <div className="page">
      <SiteHeader active="Parenthood" />

      {/* Breadcrumb */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 40px", borderBottom: "1px solid var(--rule-soft)", maxWidth: 880, margin: "0 auto", width: "100%" }}>
        <Crumbs crumbs={[{ label: "Home", href: "#" }, { label: "Diary", href: "#" }, { label: "Tuesday pickups" }]} />
        <div className="meta" style={{ fontSize: 12 }}>
          <a href="#">← Sun, 21 Apr</a>
          <span style={{ color: "var(--ink-4)", margin: "0 10px" }}>·</span>
          <a href="#">Wed, 17 Apr →</a>
        </div>
      </div>

      {/* Masthead — narrow column, date-stamp first */}
      <article style={{ maxWidth: 680, margin: "0 auto", padding: "64px 40px 0" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <DateStamp day="Tuesday" date="23" month="April" year="2026" />
        </div>

        <h1 className="display-1" style={{ fontSize: 48, margin: "0 0 22px", textAlign: "center", letterSpacing: "-0.022em", textWrap: "balance" }}>
          The thing about Tuesday pickups
        </h1>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="meta" style={{ fontSize: 12 }}>
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Daniel Betts</strong>
            <span style={{ color: "var(--ink-4)", margin: "0 8px" }}>·</span>
            6 min read
            <span style={{ color: "var(--ink-4)", margin: "0 8px" }}>·</span>
            Diary No. 142
          </span>
        </div>

        {/* Hero image */}
        <div className="diary-hero" style={{ background: PEEK_BGS.kids }} />
        <div className="diary-hero-cap">The long way home, Tuesday afternoon.</div>

        {/* Body — narrow, journal-feel, slight serif notes */}
        <div className="prose diary-prose">
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 19, lineHeight: 1.55, color: "var(--ink)", margin: "0 0 24px" }}>
            I picked Eve up from school today for the first time since Christmas. Her timetable hadn't worked out for me to do it. We walked the long way home.
          </p>
          <p>
            There is a particular flavour of quiet that happens between a parent and a ten-year-old on a long walk home from school, and I had forgotten it. Not silence — there was plenty of talking — but the shape of how the talking comes. It arrives in unannounced bursts. A fact about a girl in her class. A question about whether trees have feelings. A complaint about a sandwich. Then a long stretch of nothing, where the only sound is the bag-strap on her shoulder.
          </p>
          <p>
            I'd been bracing for a particular conversation. Ever since the school called last week I'd had it half-rehearsed in my head, and the longer the walk went on the more I realised she wasn't going to start it, and the more I realised <em>I</em> probably shouldn't either, not on a Tuesday afternoon on the way home, not with the bag-strap and the sandwich and the trees having feelings.
          </p>
          <p>
            We stopped at the corner shop and she chose a Twirl. The man behind the counter said something kind and she said thank you in the small voice she uses with strangers, and as we left she looked up at me and said <em>I'm glad you came today</em>, which was the only line of the afternoon I wrote down.
          </p>
          <h2>What I'd forgotten</h2>
          <p>
            How much of co-parenting is logistics, and how little of it is this. The diary entries from 2023 are mostly about timetables — who has them when, who's doing the swap, whether the grandparents can step in. There's barely a Twirl in the whole year.
          </p>
          <p>
            I think about this often: the practical side of separation eats the emotional side, and you can go years working hard at the practical bit and tell yourself you're doing well, and then a Tuesday walk home reminds you that the practical was always in service of the emotional, never the other way round.
          </p>
          <h2>What I'm taking from it</h2>
          <p>
            One: I'm doing more Tuesdays from now on. Easier said than done — Rosie and I will need to renegotiate a couple of the shared-care days — but I think it's right.
          </p>
          <p>
            Two: I'm not going to start the conversation I'd rehearsed. I think she'll start it when she's ready, and the best thing I can do is be on the long walk home, every Tuesday, until she does.
          </p>
        </div>

        {/* Inline link to relevant guide — internal link weight */}
        <div style={{ background: "var(--paper-2)", border: "1px solid var(--rule)", borderRadius: 12, padding: "18px 22px", margin: "40px 0 0", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16, alignItems: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--accent-soft)", color: "var(--accent-deep)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--display)", fontWeight: 700, fontSize: 15 }}>↗</div>
          <div>
            <div className="eyebrow eyebrow-accent" style={{ marginBottom: 4 }}>Related, properly</div>
            <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>If you're working out shared care: a guide to building a workable schedule</div>
          </div>
          <a href="#" style={{ color: "var(--accent)", fontSize: 12, fontWeight: 600, letterSpacing: "0.02em" }}>Read →</a>
        </div>

        {/* End-frame: postcard-style closing image */}
        <div className="diary-endframe">
          <div className="diary-endframe-img" style={{ background: PEEK_BGS.frame }} />
          <div className="diary-endframe-cap">Twirl wrapper, kitchen counter, 4:42pm.</div>
        </div>

        {/* Signoff */}
        <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid var(--rule)", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, color: "var(--accent)", marginBottom: 8 }}>— Daniel</div>
          <div className="meta" style={{ fontSize: 12, marginBottom: 24 }}>Written at the kitchen table, Leeds. Tuesday evening.</div>
          <a href="mailto:dan@thebreakingdad.co.uk" className="btn ghost" style={{ fontSize: 12 }}>Reply by email</a>
        </div>

        {/* Prev / next */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, margin: "56px 0 0" }}>
          {[
            { dir: "← Previous", day: "Sun", date: "21", month: "Apr", title: "Sunday at Roundhay" },
            { dir: "Next →",     day: "Wed", date: "17", month: "Apr", title: "On giving up on the Easter holiday plan" },
          ].map((p, i) => (
            <a key={i} href="#" style={{ background: "var(--paper-2)", border: "1px solid var(--rule)", borderRadius: 12, padding: "18px 20px", textAlign: i === 0 ? "left" : "right" }}>
              <div className="eyebrow eyebrow-accent" style={{ marginBottom: 6 }}>{p.dir}</div>
              <div className="meta" style={{ fontSize: 11, marginBottom: 4 }}>{p.day} · {p.date} {p.month}</div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 16, color: "var(--ink)", lineHeight: 1.3 }}>{p.title}</div>
            </a>
          ))}
        </div>
      </article>

      {/* Newsletter inline */}
      <section style={{ maxWidth: 680, margin: "0 auto", padding: "56px 40px" }}>
        <div className="newsletter-inline">
          <div>
            <div className="title">If this is helping, the diary goes out by email.</div>
            <div className="small">A fortnight at a time, no filler.</div>
          </div>
          <button className="btn">Subscribe →</button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

// ─── DIARY INDEX (MOBILE) ────────────────────────────
function DiaryIndexMobile({ onMenu }) {
  return (
    <div className="page">
      <MobMasthead onMenu={onMenu} />

      <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--rule-soft)" }}>
        <Crumbs crumbs={[{ label: "Home", href: "#" }, { label: "Diary" }]} />
      </div>

      <section style={{ padding: "32px 18px 20px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600, marginBottom: 12 }}>The Diary</div>
        <h1 className="display-1" style={{ fontSize: 38, margin: "0 0 14px" }}>
          <em style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500 }}>Field notes,</em> dated.
        </h1>
        <p className="lede" style={{ fontSize: 16, marginBottom: 14 }}>
          Shorter, more personal pieces. Less guide, more journal.
        </p>
        <div className="meta" style={{ fontSize: 12 }}>142 entries · Since Nov 2022</div>
      </section>

      {/* Year chips */}
      <div style={{ padding: "0 18px 12px", display: "flex", gap: 8, overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none" }}>
        {["All", "2026", "2025", "2024", "2023", "2022"].map((y, i) => (
          <a key={y} href="#" style={{
            padding: "8px 14px", borderRadius: 999,
            border: i === 1 ? "1px solid var(--accent)" : "1px solid var(--rule)",
            background: i === 1 ? "var(--accent-soft)" : "var(--paper)",
            color: i === 1 ? "var(--accent-deep)" : "var(--ink)",
            fontSize: 13, fontWeight: 500,
          }}>{y}</a>
        ))}
      </div>

      {/* Timeline */}
      <section style={{ padding: "20px 18px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid var(--rule)" }}>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 19, margin: 0 }}>April 2026</h2>
          <span className="meta" style={{ fontSize: 11 }}>6 entries</span>
        </div>

        {[
          { day: "Tue", date: "23", month: "Apr", title: "The thing about Tuesday pickups", dek: "I picked Eve up from school today for the first time since Christmas…", read: "6 min" },
          { day: "Sun", date: "21", month: "Apr", title: "Sunday at Roundhay", dek: "Kite weather. Three of them, no string, predictably.", read: "4 min" },
          { day: "Wed", date: "17", month: "Apr", title: "On giving up on the Easter holiday plan", dek: "We had it all sketched out. By Tuesday morning we'd binned it.", read: "8 min" },
          { day: "Sat", date: "13", month: "Apr", title: "What the Hoppstar lasted: ten days, four batteries", dek: "She used it as a hammer for nine of the ten days.", read: "3 min" },
        ].map((e, i) => (
          <a key={i} href="#" style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 14, padding: "18px 0", borderBottom: "1px solid var(--rule-soft)" }}>
            <div style={{ textAlign: "center", paddingRight: 12, borderRight: "1px solid var(--rule)" }}>
              <div style={{ fontFamily: "var(--sans)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600 }}>{e.day}</div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 22, lineHeight: 1.05, letterSpacing: "-0.018em", color: "var(--ink)", margin: "2px 0" }}>{e.date}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-3)", fontWeight: 500 }}>{e.month}</div>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 17, lineHeight: 1.25, letterSpacing: "-0.012em", color: "var(--ink)", margin: "0 0 6px" }}>{e.title}</h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-2)", margin: "0 0 6px" }}>{e.dek}</p>
              <div className="meta" style={{ fontSize: 11 }}>{e.read} read</div>
            </div>
          </a>
        ))}

        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          <a href="#" className="btn ghost" style={{ fontSize: 12 }}>Older entries →</a>
        </div>
      </section>

      <FooterMobile />
    </div>
  );
}

// ─── DIARY ENTRY (MOBILE) ────────────────────────────
function DiaryEntryMobile({ onMenu }) {
  return (
    <div className="page">
      <MobMasthead onMenu={onMenu} />

      <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--rule-soft)" }}>
        <Crumbs crumbs={[{ label: "Diary", href: "#" }, { label: "Tuesday pickups" }]} />
      </div>

      <article style={{ padding: "32px 22px 0" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <DateStamp day="Tuesday" date="23" month="April" year="2026" size="md" />
        </div>

        <h1 className="display-1" style={{ fontSize: 32, margin: "0 0 16px", textAlign: "center", letterSpacing: "-0.018em" }}>The thing about Tuesday pickups</h1>

        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <span className="meta" style={{ fontSize: 11.5 }}>
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Daniel Betts</strong>
            <span style={{ color: "var(--ink-4)", margin: "0 6px" }}>·</span>
            6 min read · No. 142
          </span>
        </div>

        {/* Hero */}
        <div className="diary-hero" style={{ background: PEEK_BGS.kids, marginBottom: 10 }} />
        <div className="diary-hero-cap" style={{ fontSize: 12, marginBottom: 24 }}>The long way home.</div>

        <div className="prose diary-prose" style={{ fontSize: 17 }}>
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 17.5, lineHeight: 1.55, color: "var(--ink)", margin: "0 0 18px" }}>
            I picked Eve up from school today for the first time since Christmas. We walked the long way home.
          </p>
          <p>There is a particular flavour of quiet between a parent and a ten-year-old on a long walk home, and I had forgotten it. Not silence — plenty of talking — but the shape of how the talking comes. A fact about a girl in her class. A question about whether trees have feelings. A complaint about a sandwich.</p>
          <p>I'd been bracing for a particular conversation. The longer the walk went on, the more I realised she wasn't going to start it, and the more I realised <em>I</em> probably shouldn't either.</p>
          <h2>What I'm taking from it</h2>
          <p>I'm doing more Tuesdays from now on. Easier said than done — Rosie and I will need to renegotiate — but I think it's right.</p>
        </div>

        {/* End-frame */}
        <div className="diary-endframe" style={{ maxWidth: 280, marginTop: 36 }}>
          <div className="diary-endframe-img" style={{ background: PEEK_BGS.frame }} />
          <div className="diary-endframe-cap" style={{ fontSize: 11 }}>Twirl wrapper, 4:42pm.</div>
        </div>

        <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--rule)", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 19, color: "var(--accent)", marginBottom: 6 }}>— Daniel</div>
          <div className="meta" style={{ fontSize: 11.5, marginBottom: 16 }}>Kitchen table, Leeds. Tuesday evening.</div>
          <a href="mailto:dan@thebreakingdad.co.uk" className="btn ghost" style={{ fontSize: 12 }}>Reply by email</a>
        </div>

        {/* Prev/next */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "32px 0 0" }}>
          <a href="#" style={{ background: "var(--paper-2)", border: "1px solid var(--rule)", borderRadius: 10, padding: "12px 14px" }}>
            <div className="eyebrow eyebrow-accent" style={{ marginBottom: 4, fontSize: 9 }}>← Prev</div>
            <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 13, color: "var(--ink)", lineHeight: 1.3 }}>Sunday at Roundhay</div>
          </a>
          <a href="#" style={{ background: "var(--paper-2)", border: "1px solid var(--rule)", borderRadius: 10, padding: "12px 14px", textAlign: "right" }}>
            <div className="eyebrow eyebrow-accent" style={{ marginBottom: 4, fontSize: 9 }}>Next →</div>
            <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 13, color: "var(--ink)", lineHeight: 1.3 }}>Easter plan</div>
          </a>
        </div>
      </article>

      <section style={{ padding: "32px 18px" }}>
        <div className="newsletter">
          <div className="ico">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
          </div>
          <h3 className="h2" style={{ fontSize: 19, margin: "0 0 6px" }}>The Field Notes letter</h3>
          <p className="small" style={{ marginBottom: 14, fontSize: 13.5 }}>Diary entries by email, fortnightly.</p>
          <input className="input" placeholder="Email address" style={{ marginBottom: 10 }} />
          <button className="btn" style={{ width: "100%" }}>Subscribe</button>
        </div>
      </section>

      <FooterMobile />
    </div>
  );
}

return { DiaryIndexDesktop, DiaryEntryDesktop, DiaryIndexMobile, DiaryEntryMobile };
})();

window.DiaryIndexDesktop = Diary.DiaryIndexDesktop;
window.DiaryEntryDesktop = Diary.DiaryEntryDesktop;
window.DiaryIndexMobile  = Diary.DiaryIndexMobile;
window.DiaryEntryMobile  = Diary.DiaryEntryMobile;
