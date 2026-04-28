/* global React, SiteHeader, MobMasthead, SiteFooter, FooterMobile */
// Direction A v2 — Category / Hub page (Desktop + Mobile)
// Built on the live site's DNA but pushed editorial:
//   - "Start here" lead pack (1 hero + 2 supporting) replacing live's grid
//   - Topic pillar table-of-contents (numbered, scannable)
//   - Per-pillar grouped sections with strong section heads
//   - Hub-level newsletter prompt + about-the-hub chip
//   - Cleaner archive/pagination footer (live page just stops)

const Cat = (() => {

// ─── shared bits ──────────────────────────────────────
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

// Topic pillar list — numbered TOC of subtopics
function PillarTOC({ items }) {
  return (
    <div style={{ borderTop: "1px solid var(--rule)" }}>
      {items.map((it, i) => (
        <a key={i} href="#" className="pillar-row">
          <div className="num">{String(i + 1).padStart(2, "0")}</div>
          <div className="body">
            <div className="title">{it.title}</div>
            <div className="dek">{it.dek}</div>
          </div>
          <div className="count">{it.count} {it.count === 1 ? "piece" : "pieces"}</div>
          <div className="arrow">→</div>
        </a>
      ))}
    </div>
  );
}

// Lead pack: one big hero + two stacked side
function LeadPack({ hero, side }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 28 }}>
      <a href="#" className="hero-card illus toys" style={{ display: "block", aspectRatio: "5/4" }}>
        <div className="overlay" />
        <div className="text">
          <div className="eyebrow">{hero.eyebrow}</div>
          <div className="title" style={{ fontSize: 32 }}>{hero.title}</div>
          <div className="meta" style={{ marginTop: 10 }}>{hero.meta}</div>
        </div>
      </a>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {side.map((s, i) => (
          <a key={i} href="#" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0, flex: 1 }}>
            <div className={"illus " + s.img} style={{ aspectRatio: "5/3", borderRadius: 8, marginBottom: 12 }} />
            <div className="eyebrow eyebrow-accent" style={{ marginBottom: 6 }}>{s.eyebrow}</div>
            <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 19, lineHeight: 1.25, letterSpacing: "-0.012em", color: "var(--ink)", marginBottom: 6 }}>{s.title}</div>
            <div className="meta">{s.meta}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Pillar group: section head + 3-up cards
function PillarGroup({ id, eyebrow, title, dek, items, more }) {
  return (
    <section id={id} style={{ padding: "56px 40px 0", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 24, marginBottom: 24, paddingBottom: 18, borderBottom: "1px solid var(--rule)" }}>
        <div>
          <div className="eyebrow eyebrow-accent" style={{ marginBottom: 8 }}>{eyebrow}</div>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 30, letterSpacing: "-0.018em", lineHeight: 1.15, color: "var(--ink)", margin: "0 0 8px", maxWidth: 760, textWrap: "balance" }}>{title}</h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", margin: 0, maxWidth: 640 }}>{dek}</p>
        </div>
        <a href="#" className="more" style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{more} →</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
        {items.map((c, i) => (
          <a key={i} href="#" className="card">
            <div className={"img wide illus " + c.img} />
            <div className="card-eyebrow eyebrow eyebrow-accent">{eyebrow}</div>
            <h3 className="card-title" style={{ fontSize: 18 }}>{c.t}</h3>
            <div className="meta" style={{ margin: "4px 0 8px" }}>{c.d}</div>
            {c.k && <p className="card-dek">{c.k}</p>}
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── DESKTOP ──────────────────────────────────────────
function CategoryDesktop() {
  return (
    <div className="page">
      <SiteHeader active="Parenthood" />

      {/* Breadcrumb + tools */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 40px", borderBottom: "1px solid var(--rule-soft)", maxWidth: 1180, margin: "0 auto", width: "100%" }}>
        <Crumbs crumbs={[{ label: "Home", href: "#" }, { label: "Parenthood" }]} />
        <div className="flex gap-3 meta" style={{ alignItems: "center" }}>
          <span>Sort:</span>
          <a href="#" style={{ color: "var(--ink)", fontWeight: 600 }}>Newest</a>
          <span style={{ color: "var(--ink-4)" }}>·</span>
          <a href="#">Most read</a>
          <span style={{ color: "var(--ink-4)" }}>·</span>
          <a href="#">Editor's picks</a>
        </div>
      </div>

      {/* Category masthead */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "44px 40px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "end" }}>
          <div>
            <div className="field-note-tag" style={{ marginBottom: 18 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}>
                <path d="M5 19c0-7 5-13 14-14-1 9-7 14-14 14z" />
                <path d="M5 19c3-3 6-5 10-7" />
              </svg>
              Section
              <span className="num">№ 01</span>
            </div>
            <h1 className="display-1" style={{ fontSize: 76, margin: "0 0 18px", letterSpacing: "-0.03em" }}>Parenthood</h1>
            <p className="lede" style={{ fontSize: 21, maxWidth: 640, marginBottom: 22 }}>
              The skills, the philosophy, the bits nobody tells you. Field notes on raising kids, kit that earns its keep, and the family-life rhythms that actually hold.
            </p>
            <div className="flex gap-4 center" style={{ flexWrap: "wrap", rowGap: 8 }}>
              <span className="meta" style={{ fontSize: 13 }}><strong style={{ color: "var(--ink)", fontWeight: 600 }}>84</strong> pieces</span>
              <span style={{ color: "var(--ink-4)" }}>·</span>
              <span className="meta" style={{ fontSize: 13 }}>Updated weekly</span>
              <span style={{ color: "var(--ink-4)" }}>·</span>
              <span className="meta" style={{ fontSize: 13 }}>5 sub-topics</span>
            </div>
          </div>
          <div style={{ background: "var(--paper-tinted-2)", border: "1px solid var(--accent-soft)", borderRadius: 12, padding: "22px 24px" }}>
            <div className="eyebrow eyebrow-accent" style={{ marginBottom: 8 }}>Editor's note</div>
            <p style={{ fontFamily: "var(--sans)", fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2)", margin: 0 }}>
              <em style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>"Most parenting writing flatters the parent. I try to write the bits I actually needed at 2am — the second-hand kit, the awkward conversations, the thing that worked the third time."</em>
            </p>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--accent-soft)" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), var(--accent-deep))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--display)", fontWeight: 700, fontSize: 13 }}>D</div>
              <div>
                <div style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: 13, color: "var(--ink)" }}>Daniel Betts</div>
                <div className="meta" style={{ fontSize: 11 }}>Writer, The Breaking Dad</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start here — lead pack */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 40px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 22, paddingBottom: 16, borderBottom: "1px solid var(--rule)" }}>
          <div>
            <div className="eyebrow eyebrow-accent" style={{ marginBottom: 6 }}>Start here</div>
            <h2 className="h1" style={{ fontSize: 28 }}>The ones to read first</h2>
          </div>
          <span className="meta">A short starter set across the topics</span>
        </div>
        <LeadPack
          hero={{
            eyebrow: "Kit & Gear",
            title: "Must Haves for Newborn: The Ultimate Checklist for New Parents",
            meta: "Daniel Betts · 14 Jun 2026 · 9 min read",
          }}
          side={[
            { eyebrow: "Kit & Gear", title: "Top Toys for 10-Year-Olds: Fun and Engaging Picks for Every Interest", meta: "4 Jun 2026 · 7 min", img: "kids" },
            { eyebrow: "Kit & Gear", title: "10 Genius Toddler Travel Accessories That Make Family Trips Easier", meta: "21 May 2026 · 5 min", img: "travel" },
          ]}
        />
      </section>

      {/* Browse by topic — pillar TOC */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 40px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 22, paddingBottom: 16, borderBottom: "1px solid var(--rule)" }}>
          <div>
            <div className="eyebrow eyebrow-accent" style={{ marginBottom: 6 }}>Browse by topic</div>
            <h2 className="h1" style={{ fontSize: 28 }}>Five threads that run through everything here</h2>
          </div>
          <span className="meta">Jump to any section ↓</span>
        </div>
        <PillarTOC items={[
          { title: "Raising kids",       dek: "The skills, the philosophy, the bits nobody tells you.",                  count: 28 },
          { title: "Kit & gear",         dek: "Gift guides, newborn essentials, honest picks from people who own kids.", count: 21 },
          { title: "Family life",        dek: "Sustainability, crafts, rituals, and the weekend bits that hold it together.", count: 16 },
          { title: "Days out",           dek: "Family activities — local, occasional, and genuinely worth the trip.",     count: 12 },
          { title: "Digital parenting",  dek: "AI, screens, social, and the tech conversations modern parents can't avoid.", count: 7 },
        ]} />
      </section>

      {/* Pillar 1 — Raising kids */}
      <PillarGroup
        id="raising-kids"
        eyebrow="Raising kids"
        title="The skills, the philosophy, the bits nobody tells you."
        dek="Notes on the long game — discipline without shouting, the rules we live by, the parenting books that actually moved the needle."
        more="More in Raising kids"
        items={[
          { t: "The 12 Best Parenting Books Every UK Parent Should Read in 2026",          d: "Daniel Betts · 6 May 2026", k: "Twelve top parenting books for UK families in 2026 — science-backed, practical, and expert-recommended for every stage of raising children.", img: "book" },
          { t: "When a Tantrum Isn't a Tantrum",                                            d: "Daniel Betts · 18 Mar 2026", k: "I picked Eve up from school today for the first time since Christmas, based on her timetable works. I hadn't seen her since last Friday.", img: "kids" },
          { t: "My Top 10 Parenting Rules to Live By",                                      d: "Daniel Betts · 12 Oct 2025", k: "Updated FairyHealth — Nobody's perfect when it comes to parenting. I share my top 10 rules for parenting that can transform how you raise your kids.", img: "frame" },
        ]}
      />

      {/* Pillar 2 — Kit & gear */}
      <PillarGroup
        id="kit"
        eyebrow="Kit & gear"
        title="Gift guides, newborn essentials, honest picks from people who own kids."
        dek="If we still use it three months in, it makes the list. If it broke, you'll hear about that too."
        more="More in Kit & gear"
        items={[
          { t: "Must Haves for Newborn: The Ultimate Checklist for New Parents",   d: "Daniel Betts · 14 Jun 2026", k: "Expecting a baby? This guide from experienced parents Rosie and Dan shares essential baby items they genuinely used and loved in the first months with their newborn.", img: "kids" },
          { t: "Top Toys for 10-Year-Olds: Fun and Engaging Picks for Every Interest", d: "Daniel Betts · 4 Jun 2026", k: "Looking for the best toys for 10-year-olds in 2026? Discover top-rated creative, educational, and outdoor toys for boys and girls — all available on Amazon UK.", img: "toys" },
          { t: "10 Genius Toddler Travel Accessories That Make Family Trips Easier", d: "Daniel Betts · 21 May 2026", k: "Discover 10 genius toddler travel accessories that make family holidays easier. From snack trays to wins, here's what parents swear by in 2026.", img: "travel" },
          { t: "The Best Travel-Friendly Toys for Toddlers: Ultimate Guide 2026",   d: "Daniel Betts · 3 Mar 2026", k: "Discover the best travel-friendly toys for toddlers to keep them entertained on flights, road trips, and holidays. From screen-free audio players to mess-free creativity, this find the perfect…", img: "notes" },
        ]}
      />

      {/* Newsletter band — soft pink, full bleed */}
      <section className="section-pink" style={{ marginTop: 64 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div className="eyebrow eyebrow-accent" style={{ marginBottom: 10, justifyContent: "center" }}>The Field Notes letter</div>
          <h2 style={{ fontSize: 32, marginBottom: 12, textAlign: "center" }}>One honest dispatch a fortnight. No filler.</h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-2)", margin: "0 auto 22px", maxWidth: 560 }}>
            What we used this week, what worked, what didn't. Plus the new pieces in <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Parenthood</strong> before they go live anywhere else.
          </p>
          <div style={{ display: "flex", gap: 10, maxWidth: 460, margin: "0 auto" }}>
            <input className="input" placeholder="Email address" style={{ background: "#fff", flex: 1 }} />
            <button className="btn" style={{ whiteSpace: "nowrap" }}>Subscribe</button>
          </div>
          <div className="meta" style={{ fontSize: 12, marginTop: 12 }}>3,200+ UK parents · No spam · Unsubscribe in one click</div>
        </div>
      </section>

      {/* Pillar 3 — Family life */}
      <PillarGroup
        id="family-life"
        eyebrow="Family life"
        title="Sustainability, crafts, rituals, and the weekend bits that hold it together."
        dek="Smaller stories. The Sunday routines, the cardboard projects, the choices you make at the supermarket."
        more="More in Family life"
        items={[
          { t: "Sustainable Family: How We Plan to Live a More Sustainable Lifestyle", d: "Daniel Betts · 9 May 2026", k: "Sustainable living is about reducing your impact on the planet. Here are some ways we plan to choose a lifestyle that is more sustainable.", img: "travel" },
          { t: "Cardboard Crafts: Fish Tank",                                          d: "Daniel Betts · 1 May 2026", k: "Want a fun activity for kids? This cardboard fish tank is great for and children LOVE it! Read on to find out how.", img: "review" },
          { t: "Cardboard Crafts: Cardboard Laptop",                                   d: "Daniel Betts · 18 Apr 2026", k: "We love cardboard crafts and a cardboard laptop is super simple and great fun too. Just follow these straightforward guide.", img: "frame" },
        ]}
      />

      {/* Pillar 4 — Days out */}
      <PillarGroup
        id="days-out"
        eyebrow="Days out"
        title="Family activities — local, occasional, and genuinely worth the trip."
        dek="Picks for when 'shall we just stay in?' is winning the argument."
        more="More in Days out"
        items={[
          { t: "26 Things to do with Kids in Hampshire", d: "Daniel Betts · 22 Feb 2026", k: "Discover the top family-friendly attractions in Hampshire from Paultons Park (Peppa Pig World) to Marwell Zoo and Winchester Science Centre, explore the best things to do with kids in...", img: "kids" },
          { t: "Center Parcs Elveden Forest with a 7-Month-Old: What's Worth Booking", d: "Daniel Betts · 30 May 2026", k: "From Aqua Sana entry-level treatments to which lodge tier is genuinely worth the upgrade — what we'd book again, and what we wouldn't.", img: "travel" },
          { t: "A weekend in the New Forest with three under ten", d: "Daniel Betts · 4 Apr 2026", k: "Cycle paths, two pubs that actually welcome kids, the wild ponies, and the one thing we wouldn't do again.", img: "frame" },
        ]}
      />

      {/* Pillar 5 — Digital parenting */}
      <PillarGroup
        id="digital"
        eyebrow="Digital parenting"
        title="AI, screens, social, and the tech conversations modern parents can't avoid."
        dek="The newest pillar. Practical, calm takes on the conversations we'd rather not be having yet."
        more="More in Digital parenting"
        items={[
          { t: "AI for Parents: Practical Tips and Gen AI Tools for Modern Parenting", d: "Daniel Betts · 2 May 2026", k: "Discover how parents can safely use AI tools to support learning, create content and simplify family life. Practical tips for using generative AI with children.", img: "window" },
          { t: "Screen Time That Doesn't Wreck the Evening", d: "Daniel Betts · 14 Mar 2026", k: "What we landed on after a year of trying everything — including the rule that finally stuck.", img: "sofa" },
          { t: "The Talk About Group Chats: When and How",  d: "Daniel Betts · 28 Jan 2026", k: "Year 6 lands fast. Here's the conversation we wish we'd had earlier, and the one we'll have again at Year 8.", img: "notes" },
        ]}
      />

      {/* Archive / Pagination footer (replaces the live page's abrupt end) */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 40px 80px" }}>
        <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
          <div>
            <div className="eyebrow eyebrow-accent" style={{ marginBottom: 10 }}>Archive</div>
            <h3 className="h1" style={{ fontSize: 24, marginBottom: 8 }}>Looking for something specific?</h3>
            <p className="meta" style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 18, color: "var(--ink-2)" }}>
              All 84 Parenthood pieces, browsable by year or filterable by sub-topic.
            </p>
            <div className="flex gap-3" style={{ flexWrap: "wrap" }}>
              <a href="#" className="btn ghost" style={{ fontSize: 12 }}>Browse the full archive →</a>
              <a href="#" className="btn ghost" style={{ fontSize: 12 }}>Search Parenthood</a>
            </div>
          </div>
          <div>
            <div className="eyebrow eyebrow-accent" style={{ marginBottom: 10 }}>By year</div>
            <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
              {[
                { y: "2026", n: 18, on: true },
                { y: "2025", n: 32 },
                { y: "2024", n: 21 },
                { y: "2023", n: 9 },
                { y: "2022", n: 4 },
              ].map(({ y, n, on }) => (
                <a key={y} href="#" style={{
                  display: "inline-flex", alignItems: "baseline", gap: 6,
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: on ? "1px solid var(--accent)" : "1px solid var(--rule)",
                  background: on ? "var(--accent-soft)" : "var(--paper-2)",
                  color: on ? "var(--accent-deep)" : "var(--ink)",
                  fontSize: 13, fontWeight: 500,
                }}>
                  {y}
                  <span style={{ fontSize: 11, color: on ? "var(--accent-deep)" : "var(--ink-3)" }}>({n})</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

// ─── MOBILE ───────────────────────────────────────────
function CategoryMobile({ onMenu }) {
  return (
    <div className="page" style={{ fontSize: 16 }}>
      <MobMasthead onMenu={onMenu} />

      {/* Breadcrumb */}
      <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--rule-soft)" }}>
        <Crumbs crumbs={[{ label: "Home", href: "#" }, { label: "Parenthood" }]} />
      </div>

      {/* Masthead */}
      <section style={{ padding: "26px 18px 20px" }}>
        <div className="field-note-tag" style={{ marginBottom: 14 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}>
            <path d="M5 19c0-7 5-13 14-14-1 9-7 14-14 14z" />
            <path d="M5 19c3-3 6-5 10-7" />
          </svg>
          Section <span className="num">№ 01</span>
        </div>
        <h1 className="display-1" style={{ fontSize: 44, margin: "0 0 12px" }}>Parenthood</h1>
        <p className="lede" style={{ fontSize: 16.5, marginBottom: 14 }}>
          The skills, the philosophy, the bits nobody tells you.
        </p>
        <div className="meta" style={{ fontSize: 12 }}>
          <strong style={{ color: "var(--ink)", fontWeight: 600 }}>84</strong> pieces · 5 sub-topics · Updated weekly
        </div>
      </section>

      {/* Topic chips — sub-nav */}
      <div style={{ padding: "4px 18px 22px", display: "flex", gap: 8, overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none" }}>
        {["All", "Raising kids", "Kit & gear", "Family life", "Days out", "Digital parenting"].map((c, i) => (
          <a key={c} href="#" style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: i === 0 ? "1px solid var(--accent)" : "1px solid var(--rule)",
            background: i === 0 ? "var(--accent-soft)" : "var(--paper)",
            color: i === 0 ? "var(--accent-deep)" : "var(--ink)",
            fontSize: 13, fontWeight: 500,
          }}>{c}</a>
        ))}
      </div>

      {/* Start here */}
      <section style={{ padding: "0 18px 24px" }}>
        <div className="eyebrow eyebrow-accent" style={{ marginBottom: 6 }}>Start here</div>
        <h2 className="h1" style={{ fontSize: 22, marginBottom: 16 }}>The ones to read first</h2>
        <a href="#" className="hero-card illus toys" style={{ display: "block", aspectRatio: "5/4", marginBottom: 16 }}>
          <div className="overlay" />
          <div className="text" style={{ left: 18, right: 18, bottom: 18 }}>
            <div className="eyebrow" style={{ fontSize: 10 }}>Kit & Gear</div>
            <div className="title" style={{ fontSize: 22 }}>Must Haves for Newborn: The Ultimate Checklist</div>
            <div className="meta" style={{ fontSize: 11, marginTop: 6 }}>14 Jun 2026 · 9 min</div>
          </div>
        </a>
        {[
          { eyebrow: "Kit & Gear", t: "Top Toys for 10-Year-Olds: Picks for Every Interest",    img: "kids", d: "4 Jun · 7 min" },
          { eyebrow: "Kit & Gear", t: "10 Genius Toddler Travel Accessories That Make Trips Easier", img: "travel", d: "21 May · 5 min" },
        ].map((s, i) => (
          <a key={i} href="#" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 14, marginBottom: 16 }}>
            <div className={"illus " + s.img} style={{ aspectRatio: "1/1", borderRadius: 8 }} />
            <div>
              <div className="eyebrow eyebrow-accent" style={{ fontSize: 10 }}>{s.eyebrow}</div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, lineHeight: 1.3, letterSpacing: "-0.012em", margin: "4px 0 6px" }}>{s.t}</div>
              <div className="meta" style={{ fontSize: 11 }}>{s.d}</div>
            </div>
          </a>
        ))}
      </section>

      {/* Pillars TOC */}
      <section style={{ padding: "8px 18px 8px", background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="eyebrow eyebrow-accent" style={{ marginBottom: 6, marginTop: 22 }}>Browse by topic</div>
        <h2 className="h1" style={{ fontSize: 22, marginBottom: 14 }}>Five threads</h2>
        {[
          { t: "Raising kids",      d: "The bits nobody tells you.",            n: 28 },
          { t: "Kit & gear",        d: "Honest picks from people who own kids.", n: 21 },
          { t: "Family life",       d: "Crafts, rituals, weekend bits.",         n: 16 },
          { t: "Days out",          d: "Worth the trip — local & occasional.",  n: 12 },
          { t: "Digital parenting", d: "AI, screens, the tech conversations.",   n: 7 },
        ].map((p, i) => (
          <a key={i} href="#" style={{ display: "grid", gridTemplateColumns: "32px 1fr auto", gap: 14, padding: "16px 0", borderTop: i === 0 ? "1px solid var(--rule)" : "none", borderBottom: "1px solid var(--rule)", alignItems: "center" }}>
            <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, color: "var(--accent)", letterSpacing: "-0.005em" }}>{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 16, color: "var(--ink)", letterSpacing: "-0.012em", marginBottom: 2 }}>{p.t}</div>
              <div className="meta" style={{ fontSize: 12 }}>{p.d}</div>
            </div>
            <div className="meta" style={{ fontSize: 11 }}>{p.n}</div>
          </a>
        ))}
        <div style={{ height: 16 }} />
      </section>

      {/* Pillar example sections (compact) */}
      {[
        { eyebrow: "Raising kids", title: "The bits nobody tells you.",
          items: [
            { t: "The 12 Best Parenting Books Every UK Parent Should Read in 2026", d: "6 May", img: "book" },
            { t: "When a Tantrum Isn't a Tantrum",                                d: "18 Mar", img: "kids" },
            { t: "My Top 10 Parenting Rules to Live By",                          d: "12 Oct '25", img: "frame" },
          ]
        },
        { eyebrow: "Kit & gear", title: "Honest picks.",
          items: [
            { t: "Must Haves for Newborn: The Ultimate Checklist", d: "14 Jun", img: "kids" },
            { t: "10 Genius Toddler Travel Accessories",          d: "21 May", img: "travel" },
            { t: "The Best Travel-Friendly Toys for Toddlers",     d: "3 Mar",  img: "notes" },
          ]
        },
      ].map((g, gi) => (
        <section key={gi} style={{ padding: "28px 18px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 12, marginBottom: 14, borderBottom: "1px solid var(--rule)" }}>
            <div>
              <div className="eyebrow eyebrow-accent" style={{ marginBottom: 4 }}>{g.eyebrow}</div>
              <h2 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 19, letterSpacing: "-0.014em", margin: 0 }}>{g.title}</h2>
            </div>
            <a href="#" className="more" style={{ fontSize: 11 }}>More →</a>
          </div>
          {g.items.map((c, i) => (
            <a key={i} href="#" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 14, padding: "14px 0", borderBottom: i === g.items.length - 1 ? "none" : "1px solid var(--rule-soft)" }}>
              <div className={"illus " + c.img} style={{ aspectRatio: "1/1", borderRadius: 8 }} />
              <div>
                <div className="eyebrow eyebrow-accent" style={{ fontSize: 10 }}>{g.eyebrow}</div>
                <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: 15.5, lineHeight: 1.3, letterSpacing: "-0.012em", margin: "4px 0 6px" }}>{c.t}</div>
                <div className="meta" style={{ fontSize: 11 }}>{c.d}</div>
              </div>
            </a>
          ))}
        </section>
      ))}

      {/* Newsletter */}
      <section style={{ padding: "32px 18px" }}>
        <div className="newsletter">
          <div className="ico">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
          </div>
          <h3 className="h2" style={{ fontSize: 19, margin: "0 0 6px" }}>The Field Notes letter</h3>
          <p className="small" style={{ marginBottom: 14, fontSize: 13.5 }}>
            One honest dispatch a fortnight. New Parenthood pieces first.
          </p>
          <input className="input" placeholder="Email address" style={{ marginBottom: 10 }} />
          <button className="btn" style={{ width: "100%" }}>Subscribe</button>
        </div>
      </section>

      {/* Archive */}
      <section style={{ padding: "12px 18px 32px" }}>
        <div className="eyebrow eyebrow-accent" style={{ marginBottom: 8 }}>Archive</div>
        <h3 className="h1" style={{ fontSize: 20, marginBottom: 14 }}>By year</h3>
        <div className="flex gap-2" style={{ flexWrap: "wrap" }}>
          {[
            { y: "2026", n: 18, on: true },
            { y: "2025", n: 32 },
            { y: "2024", n: 21 },
            { y: "2023", n: 9 },
            { y: "2022", n: 4 },
          ].map(({ y, n, on }) => (
            <a key={y} href="#" style={{
              display: "inline-flex", alignItems: "baseline", gap: 6,
              padding: "8px 14px", borderRadius: 999,
              border: on ? "1px solid var(--accent)" : "1px solid var(--rule)",
              background: on ? "var(--accent-soft)" : "var(--paper-2)",
              color: on ? "var(--accent-deep)" : "var(--ink)",
              fontSize: 13, fontWeight: 500,
            }}>{y}<span style={{ fontSize: 11, color: on ? "var(--accent-deep)" : "var(--ink-3)" }}>({n})</span></a>
          ))}
        </div>
      </section>

      <FooterMobile />
    </div>
  );
}

return { CategoryDesktop, CategoryMobile };
})();

window.CategoryDesktop = Cat.CategoryDesktop;
window.CategoryMobile  = Cat.CategoryMobile;
