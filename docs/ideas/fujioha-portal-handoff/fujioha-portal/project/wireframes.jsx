// wireframes.jsx — 5 wireframe concepts for fujioha.com root
// Each concept is a self-contained component sized to fill its artboard.
// All concepts share the same low-fi visual language: thin grey strokes,
// hatched image placeholders, real bilingual copy.

const wfCss = `
  .wf{position:relative;width:100%;height:100%;box-sizing:border-box;
    background:#fdfcfa;color:#2a251f;overflow:hidden;
    font-family:'Inter','Hiragino Kaku Gothic ProN','Yu Gothic',system-ui,sans-serif;
    font-size:13px;line-height:1.55;letter-spacing:.005em}
  .wf *{box-sizing:border-box}
  .wf-en{font-family:'Inter',system-ui,sans-serif}
  .wf-jp{font-family:'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif}
  .wf-mono{font-family:'JetBrains Mono','SFMono-Regular',ui-monospace,monospace}
  .wf-mute{color:#8a8377}
  .wf-faint{color:#b8b3aa}
  .wf-rule{border-top:1px solid #d8d4cc}
  .wf-rule-d{border-top:1px dashed #c9c5be}
  .wf-box{border:1px solid #c9c5be;background:#fff;border-radius:2px}
  .wf-box-d{border:1px dashed #c9c5be;background:#fbfaf7;border-radius:2px}
  .wf-fill{background:repeating-linear-gradient(135deg,
    rgba(0,0,0,.045) 0 1px,transparent 1px 7px)}
  .wf-imgph{position:relative;border:1px solid #d8d4cc;background:#f4f1ec;
    color:#a39d92;font-size:10px;letter-spacing:.08em;text-transform:uppercase;
    display:flex;align-items:center;justify-content:center;overflow:hidden}
  .wf-imgph::before,.wf-imgph::after{
    content:"";position:absolute;inset:0;pointer-events:none}
  .wf-imgph::before{background:linear-gradient(135deg,transparent 49.6%,#d8d4cc 49.6% 50.4%,transparent 50.4%)}
  .wf-imgph::after{background:linear-gradient(45deg,transparent 49.6%,#d8d4cc 49.6% 50.4%,transparent 50.4%)}
  .wf-imgph>*{position:relative;z-index:1;background:#f4f1ec;padding:1px 6px}
  .wf-pill{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;
    border:1px solid #c9c5be;border-radius:999px;background:#fff;font-size:10.5px}
  .wf-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;
    border:1px solid #2a251f;background:#fff;font-size:11.5px;font-weight:500;color:#2a251f;
    border-radius:1px}
  .wf-btn-pri{background:var(--wf-accent,#2a251f);color:#fdfcfa;border-color:var(--wf-accent,#2a251f)}
  .wf-anno{position:absolute;font-size:10px;color:var(--wf-accent,#c96442);
    font-family:'JetBrains Mono','SFMono-Regular',ui-monospace,monospace;
    letter-spacing:.02em;line-height:1.35;pointer-events:none}
  .wf-anno::before{content:"";position:absolute;border:1px dashed var(--wf-accent,#c96442);opacity:.6}
  .wf-tag{display:inline-block;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;
    color:#8a8377;padding:1px 6px;border:1px solid #d8d4cc;border-radius:2px;background:#fff}
  .wf-nav{display:flex;align-items:center;gap:18px;font-size:11.5px;color:#5a544b}
  .wf-nav a{color:inherit;text-decoration:none}
  .wf-h-stack{display:flex;flex-direction:column;gap:6px}
  .wf-card{border:1px solid #c9c5be;background:#fff;padding:18px;border-radius:2px;
    display:flex;flex-direction:column;gap:10px}
  .wf-mark{display:inline-flex;align-items:center;gap:8px;font-weight:600;letter-spacing:.02em}
  .wf-mark-dot{width:18px;height:18px;border-radius:50%;background:var(--wf-accent,#2a251f)}
  .wf-grid-bg{
    background-image:linear-gradient(rgba(0,0,0,.025) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,0,0,.025) 1px,transparent 1px);
    background-size:32px 32px}
`;

if (typeof document !== 'undefined' && !document.getElementById('wf-styles')) {
  const s = document.createElement('style');
  s.id = 'wf-styles';
  s.textContent = wfCss;
  document.head.appendChild(s);
}

// ─── Shared bits ────────────────────────────────────────────────────────────

function Mark({ size = 18 }) {
  return (
    <span className="wf-mark">
      <span className="wf-mark-dot" style={{ width: size, height: size }}></span>
      <span style={{ fontSize: size * 0.85, letterSpacing: '.02em' }}>fujioha</span>
    </span>
  );
}

function Bilingual({ jp, en, jpSize = 13, enSize = 11, color = '#8a8377', gap = 2, align = 'left' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, textAlign: align }}>
      <div className="wf-jp" style={{ fontSize: jpSize }}>{jp}</div>
      <div className="wf-en" style={{ fontSize: enSize, color }}>{en}</div>
    </div>
  );
}

function ImgPh({ label = 'image', style }) {
  return <div className="wf-imgph" style={style}><span>{label}</span></div>;
}

// ─── A · Portal Grid ────────────────────────────────────────────────────────
// The safe baseline. Header, identity blurb, grid of project cards.
// "Sites" as the primary affordance.

function ConceptA() {
  return (
    <div className="wf" style={{ padding: '32px 56px 24px' }}>
      {/* Top nav */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingBottom: 16, borderBottom: '1px solid #e6e2da' }}>
        <Mark size={20} />
        <nav className="wf-nav">
          <a>Sites</a><a>About</a><a>Journal</a>
          <span className="wf-pill">JP / EN</span>
        </nav>
      </header>

      {/* Hero / identity */}
      <section style={{ paddingTop: 44, paddingBottom: 36, display: 'grid',
        gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end' }}>
        <div>
          <div className="wf-tag" style={{ marginBottom: 16 }}>fujioha · ふじおは</div>
          <div className="wf-jp" style={{ fontSize: 38, lineHeight: 1.2, letterSpacing: '.01em' }}>
            十八番を、毎朝ひとつ。
          </div>
          <div className="wf-en" style={{ fontSize: 18, color: '#5a544b', marginTop: 8 }}>
            One signature thing, every morning.
          </div>
          <p style={{ marginTop: 22, maxWidth: 460, color: '#5a544b', fontSize: 12.5 }}>
            ふじおは（fujioha）は、いくつかの小さなウェブを集めた個人の遊び場です。
            旅行ガイドや、思いつきで作ったゲームを、サブドメインで公開しています。
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 4 }}>
          <div className="wf-mute" style={{ fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Currently
          </div>
          <div style={{ fontSize: 12 }}>2 sites · last updated 2 days ago</div>
          <div style={{ fontSize: 12 }}>by <u>@fuji</u> · since 2024</div>
        </div>
      </section>

      <div className="wf-rule"></div>

      {/* Sites grid */}
      <section style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <Bilingual jp="サイト一覧" en="Sites" jpSize={14} enSize={11} />
          <span className="wf-mute" style={{ fontSize: 11 }}>02</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18 }}>
          {/* card 1 */}
          <div className="wf-card">
            <ImgPh label="hero" style={{ height: 110 }} />
            <div className="wf-mono wf-mute" style={{ fontSize: 11 }}>hokkaido.fujioha.com</div>
            <Bilingual jp="北海道の歩き方" en="A local-led Hokkaido travel guide"
              jpSize={16} enSize={11} gap={4} />
            <div className="wf-mute" style={{ fontSize: 11.5 }}>
              地元の人が解説する、観光ガイドにない北海道。
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span className="wf-tag">travel</span>
              <span className="wf-tag">guide</span>
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 8 }}>
              <span className="wf-btn">Visit →</span>
            </div>
          </div>
          {/* card 2 */}
          <div className="wf-card">
            <ImgPh label="hero" style={{ height: 110 }} />
            <div className="wf-mono wf-mute" style={{ fontSize: 11 }}>game.fujioha.com</div>
            <Bilingual jp="思いつきの Web ゲーム" en="Small web games from the ether"
              jpSize={16} enSize={11} gap={4} />
            <div className="wf-mute" style={{ fontSize: 11.5 }}>
              ジャンルは様々。ブラウザですぐ遊べる小品集。
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span className="wf-tag">games</span>
              <span className="wf-tag">web</span>
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 8 }}>
              <span className="wf-btn">Play →</span>
            </div>
          </div>
          {/* card 3 placeholder */}
          <div className="wf-card wf-box-d" style={{ background: '#fbfaf7' }}>
            <ImgPh label="(future)" style={{ height: 110, opacity: .6 }} />
            <div className="wf-mono wf-faint" style={{ fontSize: 11 }}>?.fujioha.com</div>
            <div className="wf-faint wf-jp" style={{ fontSize: 16 }}>(次の十八番)</div>
            <div className="wf-faint" style={{ fontSize: 11.5 }}>
              Next project, sometime soon.
            </div>
          </div>
        </div>
      </section>

      {/* Annotation */}
      <div className="wf-anno" style={{ right: 56, top: 38 }}>
        ↑ minimal nav, identity-light<br/>
        bilingual toggle as pill
      </div>
    </div>
  );
}

// ─── B · Asaichi (Morning Greeting) ─────────────────────────────────────────
// Embraces the "おはよう" root. Time-aware greeting, sun motif, daily 十八番.

function ConceptB() {
  return (
    <div className="wf" style={{ padding: '28px 56px 24px' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Mark size={18} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: '#8a8377' }}>
          <span className="wf-mono">06:42 JST · 札幌 5°/晴</span>
          <span className="wf-pill">JP / EN</span>
        </div>
      </header>

      {/* Hero greeting */}
      <section style={{ paddingTop: 56, paddingBottom: 36, position: 'relative' }}>
        {/* sun */}
        <div style={{ position: 'absolute', right: 80, top: 28, width: 140, height: 140,
          borderRadius: '50%', border: '1px solid #d8d4cc',
          background: 'radial-gradient(circle, #fff 60%, transparent 62%)' }}>
          <div style={{ position: 'absolute', inset: 14, borderRadius: '50%',
            border: '1px dashed #c9c5be' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#a39d92' }}>
            sun · 日の出
          </div>
        </div>

        <div className="wf-jp" style={{ fontSize: 56, lineHeight: 1.1, letterSpacing: '.005em' }}>
          おはよう。
        </div>
        <div className="wf-en" style={{ fontSize: 22, color: '#5a544b', marginTop: 4 }}>
          Good morning from fujioha.
        </div>
        <p style={{ marginTop: 18, maxWidth: 440, color: '#5a544b', fontSize: 12.5 }}>
          毎朝、誰かの十八番をひとつ。
          A small portal that shows one signature thing each day,
          and points you to the rest of fujioha's worlds.
        </p>
      </section>

      <div className="wf-rule"></div>

      {/* Today's 十八番 — featured rotating */}
      <section style={{ paddingTop: 22, paddingBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
          <span className="wf-tag" style={{ borderColor: 'var(--wf-accent,#c96442)', color: 'var(--wf-accent,#c96442)' }}>
            今日の十八番 · today's signature
          </span>
          <span className="wf-mute wf-mono" style={{ fontSize: 10.5 }}>2026-05-23 fri</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24,
          border: '1px solid #c9c5be', padding: 18 }}>
          <ImgPh label="featured image" style={{ height: 200 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="wf-mono wf-mute" style={{ fontSize: 10.5 }}>from hokkaido.fujioha.com</div>
            <div className="wf-jp" style={{ fontSize: 22, lineHeight: 1.3 }}>
              函館朝市、地元民の歩き方
            </div>
            <div className="wf-en" style={{ fontSize: 13, color: '#5a544b' }}>
              How a local actually does Hakodate's morning market.
            </div>
            <div className="wf-mute" style={{ fontSize: 11.5, marginTop: 6 }}>
              観光客の動線とはまったく違う、地元の朝の回り方を案内します。
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
              <span className="wf-btn wf-btn-pri">Read →</span>
              <span className="wf-btn">All from hokkaido</span>
            </div>
          </div>
        </div>
      </section>

      {/* Subdomain strip */}
      <section style={{ paddingTop: 4 }}>
        <div className="wf-mute" style={{ fontSize: 10.5, letterSpacing: '.1em',
          textTransform: 'uppercase', marginBottom: 8 }}>also at fujioha</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <div className="wf-box" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="wf-mono wf-mute" style={{ fontSize: 10.5 }}>hokkaido.</span>
            <span className="wf-jp" style={{ fontSize: 13 }}>北海道の歩き方</span>
          </div>
          <div className="wf-box" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="wf-mono wf-mute" style={{ fontSize: 10.5 }}>game.</span>
            <span className="wf-jp" style={{ fontSize: 13 }}>Web ゲーム</span>
          </div>
          <div className="wf-box-d" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="wf-mono wf-faint" style={{ fontSize: 10.5 }}>?.</span>
            <span className="wf-jp wf-faint" style={{ fontSize: 13 }}>(future)</span>
          </div>
        </div>
      </section>

      <div className="wf-anno" style={{ left: 56, top: 270, paddingLeft: 14 }}>
        ↘ greeting shifts by time-of-day<br/>
        ↘ "今日の十八番" rotates daily<br/>
        ↘ etymology lives in the copy itself
      </div>
    </div>
  );
}

// ─── C · Index (Devjournal / Minimal Text) ──────────────────────────────────
// Like a researcher's homepage. All type, numbered list, no images. Strong for
// dev/creator audiences and search.

function ConceptC() {
  return (
    <div className="wf wf-mono" style={{ padding: '40px 64px', fontSize: 13 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>fujioha</div>
        </div>
        <div className="wf-mute" style={{ fontSize: 11 }}>
          updated 2026-05-23
        </div>
      </header>

      <div className="wf-rule" style={{ marginTop: 18, marginBottom: 22 }}></div>

      <section style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, marginBottom: 28 }}>
        <div className="wf-mute" style={{ fontSize: 11, paddingTop: 3 }}>about</div>
        <div style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 560 }}>
          A small index of things I make on the web.
          ウェブで作ったもののささやかな目次。
          Run by <u>@fuji</u> — tokyo &amp; hokkaido. Mostly tinkering after work.
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, marginBottom: 28 }}>
        <div className="wf-mute" style={{ fontSize: 11, paddingTop: 3 }}>
          sites<br/>
          <span className="wf-faint">02</span>
        </div>
        <div className="wf-h-stack" style={{ gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 1fr 90px 70px',
            gap: 10, alignItems: 'baseline', fontSize: 12.5 }}>
            <span className="wf-mute">01</span>
            <a style={{ color: 'var(--wf-accent,#c96442)', textDecoration: 'underline' }}>
              hokkaido.fujioha.com
            </a>
            <span>北海道の歩き方 / Hokkaido travel guide</span>
            <span className="wf-mute">2024 →</span>
            <span className="wf-tag">travel</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 1fr 90px 70px',
            gap: 10, alignItems: 'baseline', fontSize: 12.5 }}>
            <span className="wf-mute">02</span>
            <a style={{ color: 'var(--wf-accent,#c96442)', textDecoration: 'underline' }}>
              game.fujioha.com
            </a>
            <span>思いつきのWebゲーム / small web games</span>
            <span className="wf-mute">2024 →</span>
            <span className="wf-tag">games</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 1fr 90px 70px',
            gap: 10, alignItems: 'baseline', fontSize: 12.5, color: '#b8b3aa' }}>
            <span>03</span>
            <span>—</span>
            <span>(planned)</span>
            <span>—</span>
            <span></span>
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, marginBottom: 28 }}>
        <div className="wf-mute" style={{ fontSize: 11, paddingTop: 3 }}>
          journal<br/>
          <span className="wf-faint">03</span>
        </div>
        <div className="wf-h-stack" style={{ gap: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 60px',
            gap: 10, fontSize: 12.5 }}>
            <span className="wf-mute">2026-05-12</span>
            <a style={{ textDecoration: 'underline' }}>Why I bought fujioha.com</a>
            <span className="wf-tag">notes</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 60px',
            gap: 10, fontSize: 12.5 }}>
            <span className="wf-mute">2026-04-28</span>
            <a style={{ textDecoration: 'underline' }}>Cloudflare subdomain setup notes</a>
            <span className="wf-tag">tech</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 60px',
            gap: 10, fontSize: 12.5 }}>
            <span className="wf-mute">2026-04-05</span>
            <a style={{ textDecoration: 'underline' }}>三月、ふじおはを思いついた朝</a>
            <span className="wf-tag">jp</span>
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24 }}>
        <div className="wf-mute" style={{ fontSize: 11, paddingTop: 3 }}>contact</div>
        <div style={{ fontSize: 12.5 }}>
          <span className="wf-mute">[at]</span> fuji<span className="wf-mute">@fujioha.com</span> ·{' '}
          <span className="wf-mute">[bsky]</span> @fuji.bsky.social ·{' '}
          <span className="wf-mute">[gh]</span> fuji
        </div>
      </section>

      <div className="wf-anno" style={{ right: 64, bottom: 36, textAlign: 'right' }}>
        ↑ all type · no images<br/>
        good for HN/Reddit traffic<br/>
        and for SEO crawlers
      </div>
    </div>
  );
}

// ─── D · Shōtengai (Noren Shopfronts) ──────────────────────────────────────
// Visual JP-aesthetic. Each subdomain is a shop behind its own noren curtain.
// On hover the noren lifts. Atmosphere-forward.

function ConceptD() {
  return (
    <div className="wf" style={{ padding: '32px 56px 24px',
      background: 'linear-gradient(180deg,#fdfcfa 0%,#f6f3ec 100%)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Mark size={18} />
        <div className="wf-nav">
          <a>商店街 / Shops</a>
          <a>店主 / About</a>
          <span className="wf-pill">JP / EN</span>
        </div>
      </header>

      <section style={{ paddingTop: 36, paddingBottom: 28, textAlign: 'center' }}>
        <Bilingual
          jp="ふじおはの商店街へ、ようこそ。"
          en="Welcome to fujioha's little alley."
          jpSize={28} enSize={14} align="center" gap={6}
        />
        <p className="wf-mute" style={{ fontSize: 12, maxWidth: 460, margin: '14px auto 0' }}>
          いくつかの店が並んでいます。暖簾をくぐって、好きなところへどうぞ。
          A few small shops. Lift any noren and step inside.
        </p>
      </section>

      {/* Noren row */}
      <section style={{ position: 'relative', height: 280, display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, padding: '0 8px' }}>
        {/* shared crossbeam */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 14, height: 2,
          background: '#2a251f', opacity: .85 }} />

        {/* noren 1 — hokkaido */}
        <div style={{ position: 'relative', paddingTop: 16 }}>
          <NorenCurtain
            label="北海道"
            sub="hokkaido"
            tagline="travel · guide"
            color="var(--wf-accent,#c96442)"
          />
        </div>
        {/* noren 2 — game */}
        <div style={{ position: 'relative', paddingTop: 16 }}>
          <NorenCurtain
            label="ゲーム"
            sub="game"
            tagline="play · web"
            color="#2a4a6b"
            lifted
          />
        </div>
        {/* noren 3 — future / placeholder */}
        <div style={{ position: 'relative', paddingTop: 16, opacity: .5 }}>
          <NorenCurtain
            label="準備中"
            sub="?"
            tagline="coming"
            color="#8a8377"
            dashed
          />
        </div>
        {/* noren 4 — about/shopkeeper */}
        <div style={{ position: 'relative', paddingTop: 16 }}>
          <NorenCurtain
            label="店主"
            sub="about"
            tagline="@fuji"
            color="#3e3a32"
          />
        </div>
      </section>

      {/* Footer note */}
      <section style={{ paddingTop: 36, display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', borderTop: '1px solid #d8d4cc', marginTop: 16, paddingTop: 14 }}>
        <div className="wf-mute" style={{ fontSize: 11 }}>
          店主より — by @fuji · since 2024
        </div>
      </section>

      <div className="wf-anno" style={{ left: 56, top: 240 }}>
        ↘ hover lifts the noren<br/>
        ↘ second noren shown lifted<br/>
        ↘ etymology in footer (subtle)
      </div>
    </div>
  );
}

function NorenCurtain({ label, sub, tagline, color, lifted, dashed }) {
  return (
    <div style={{ position: 'relative', height: 240 }}>
      {/* Shop window (behind) */}
      <div className="wf-imgph" style={{
        position: 'absolute', inset: 0, borderColor: dashed ? '#d8d4cc' : '#c9c5be',
        background: '#fbfaf7', borderStyle: dashed ? 'dashed' : 'solid'
      }}>
        <span style={{ fontSize: 10 }}>shop window</span>
      </div>
      {/* Noren */}
      <div style={{
        position: 'absolute', left: -4, right: -4, top: -2,
        height: lifted ? 70 : 170,
        background: color, opacity: dashed ? 0.25 : 0.92,
        borderTop: '2px solid #2a251f',
        transition: 'height .3s',
        clipPath: 'polygon(0 0,100% 0,100% 100%,72% 100%,72% 30%,68% 30%,68% 100%,52% 100%,52% 30%,48% 30%,48% 100%,32% 100%,32% 30%,28% 30%,28% 100%,0 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        color: '#fdfcfa', padding: '14px 8px 0'
      }}>
        <div className="wf-jp" style={{ fontSize: lifted ? 12 : 22, fontWeight: 600, letterSpacing: '.05em',
          writingMode: lifted ? 'horizontal-tb' : 'vertical-rl', transition: 'all .3s' }}>
          {label}
        </div>
      </div>
      {/* Plate (sign) */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        bottom: -22, background: '#fdfcfa', border: '1px solid #2a251f',
        padding: '4px 10px', fontSize: 10.5, letterSpacing: '.05em',
        whiteSpace: 'nowrap', textAlign: 'center' }}>
        <div className="wf-mono">{sub}.fujioha.com</div>
        <div className="wf-mute" style={{ fontSize: 9.5 }}>{tagline}</div>
      </div>
    </div>
  );
}

// ─── E · Live Magazine (Feed) ───────────────────────────────────────────────
// Pulls latest from each subdomain. Functions as a destination unto itself.
// Strong for return visits and SNS.

function ConceptE() {
  return (
    <div className="wf" style={{ padding: '24px 48px' }}>
      {/* Masthead */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingBottom: 8, borderBottom: '2px solid #2a251f' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <div className="wf-jp" style={{ fontSize: 26, fontWeight: 700, letterSpacing: '.02em' }}>
            ふじおは新聞
          </div>
          <div className="wf-mute wf-mono" style={{ fontSize: 11 }}>
            FUJIOHA · Vol. 14 · 2026年5月23日(金)
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="wf-pill">JP / EN</span>
          <span className="wf-btn">Subscribe ✉</span>
        </div>
      </header>
      <div className="wf-rule" style={{ marginTop: 2 }}></div>

      {/* Main body */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, paddingTop: 18 }}>
        {/* Lead column */}
        <div>
          {/* Lead story */}
          <div style={{ display: 'flex', gap: 18, marginBottom: 22 }}>
            <ImgPh label="lead photo" style={{ flex: '0 0 280px', height: 200 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="wf-tag" style={{ borderColor: 'var(--wf-accent,#c96442)',
                  color: 'var(--wf-accent,#c96442)' }}>LEAD</span>
                <span className="wf-mute wf-mono" style={{ fontSize: 10.5 }}>hokkaido.fujioha.com</span>
              </div>
              <div className="wf-jp" style={{ fontSize: 20, lineHeight: 1.3, fontWeight: 600 }}>
                函館の朝市、地元民の歩き方
              </div>
              <div className="wf-en" style={{ fontSize: 12, color: '#5a544b' }}>
                How a local actually does Hakodate's morning market.
              </div>
              <div className="wf-mute" style={{ fontSize: 11.5, marginTop: 4 }}>
                観光客がまず行く店ではなく、地元の人が朝に立ち寄る3軒を案内。
                Skip the first stall everyone tells you about — these are the three I actually go to.
              </div>
              <div className="wf-mute wf-mono" style={{ fontSize: 10.5, marginTop: 'auto', paddingTop: 8 }}>
                · 6 min read · 2 days ago
              </div>
            </div>
          </div>

          <div className="wf-rule-d"></div>

          {/* Secondary stories */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, paddingTop: 16 }}>
            <FeedItem
              src="hokkaido.fujioha.com"
              jp="札幌、雨の日のラーメン10軒"
              en="10 ramen shops for Sapporo's rainy days"
              meta="· 4 min · 1 wk ago"
            />
            <FeedItem
              src="game.fujioha.com"
              jp="新作 · Kanji Drop"
              en="New release — falling-kanji puzzle"
              meta="· play in browser · 3 days ago"
              imgLabel="screenshot"
            />
            <FeedItem
              src="hokkaido.fujioha.com"
              jp="知床の朝、ヒグマに会わない歩き方"
              en="Shiretoko mornings without bumping into a bear"
              meta="· 5 min · 2 wks ago"
            />
            <FeedItem
              src="game.fujioha.com"
              jp="ミニゲーム · 札幌時計台 1分タイマー"
              en="60-second clock-tower mini"
              meta="· 1 min play · 3 wks ago"
              imgLabel="screenshot"
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside style={{ borderLeft: '1px solid #d8d4cc', paddingLeft: 22,
          display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div>
            <div className="wf-tag" style={{ marginBottom: 8 }}>About fujioha</div>
            <div className="wf-jp" style={{ fontSize: 13, lineHeight: 1.6 }}>
              ふじおは = 十八番 × おはよう。
              小さなウェブを集めた個人の場所。
            </div>
            <div className="wf-en" style={{ fontSize: 11.5, color: '#5a544b', marginTop: 6 }}>
              A small portal that collects whatever I'm working on.
            </div>
          </div>

          <div>
            <div className="wf-tag" style={{ marginBottom: 8 }}>The sites</div>
            <div className="wf-h-stack">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0',
                borderBottom: '1px dashed #d8d4cc' }}>
                <span className="wf-mono">hokkaido.</span>
                <span className="wf-mute">12 articles</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0',
                borderBottom: '1px dashed #d8d4cc' }}>
                <span className="wf-mono">game.</span>
                <span className="wf-mute">4 games</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0',
                color: '#b8b3aa' }}>
                <span className="wf-mono">(future)</span>
                <span>—</span>
              </div>
            </div>
          </div>

          <div>
            <div className="wf-tag" style={{ marginBottom: 8 }}>This week</div>
            <div className="wf-mute" style={{ fontSize: 11.5, lineHeight: 1.6 }}>
              2 new posts on hokkaido,
              1 game released,
              and a small redesign of this page.
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div className="wf-faint wf-mono" style={{ fontSize: 9.5 }}>
              by @fuji · since 2024
            </div>
          </div>
        </aside>
      </div>

      <div className="wf-anno" style={{ right: 48, top: 100, textAlign: 'right' }}>
        ↑ functions as a destination<br/>
        ↑ good for return visits / RSS
      </div>
    </div>
  );
}

function FeedItem({ src, jp, en, meta, imgLabel = 'thumb' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <ImgPh label={imgLabel} style={{ height: 90 }} />
      <div className="wf-mute wf-mono" style={{ fontSize: 10.5 }}>{src}</div>
      <div className="wf-jp" style={{ fontSize: 14, lineHeight: 1.35, fontWeight: 600 }}>{jp}</div>
      <div className="wf-en" style={{ fontSize: 11, color: '#5a544b' }}>{en}</div>
      <div className="wf-mute wf-mono" style={{ fontSize: 10 }}>{meta}</div>
    </div>
  );
}

// Expose to window so design canvas / app can mount them.
Object.assign(window, {
  ConceptA, ConceptB, ConceptC, ConceptD, ConceptE,
});
