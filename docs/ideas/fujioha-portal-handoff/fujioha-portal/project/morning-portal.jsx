// morning-portal.jsx — fujioha.com root, hi-fi prototype
// Concept B (morning greeting) as the spine, with concept D's noren
// absorbed as a wayfinding strip ("ふじおはの通り").
//
// Re-visit engines built in:
//   1. Time-of-day greeting + ambient tint
//   2. 72-micro-season (七十二候) almanac line, auto-cycles every ~5 days
//   3. Visit counter via localStorage
//   4. "Today's 十八番" picks randomly from a curated catalog each visit
//   5. Recent-updates feed (placeholder, would auto-pull from subdomains)

// ─── 72 Micro-seasons ──────────────────────────────────────────────────────
const KOU72 = [
  [1,1, '冬至','雪下出麦','ゆきわたりてむぎのびる','Wheat sprouts beneath the snow'],
  [1,6, '小寒','芹乃栄','せりすなわちさかう','Parsley thrives'],
  [1,11,'小寒','水泉動','しみずあたたかをふくむ','Underground springs begin to stir'],
  [1,16,'小寒','雉始雊','きじはじめてなく','Pheasants first call'],
  [1,21,'大寒','款冬華','ふきのはなさく','Butterbur blooms'],
  [1,26,'大寒','水沢腹堅','さわみずこおりつめる','Mountain streams freeze solid'],
  [1,31,'大寒','鶏始乳','にわとりはじめてとやにつく','Hens begin to lay'],
  [2,4, '立春','東風解凍','はるかぜこおりをとく','East wind thaws the ice'],
  [2,9, '立春','黄鶯睍睆','うぐいすなく','The bush warbler sings'],
  [2,14,'立春','魚上氷','うおこおりをいずる','Fish emerge through the ice'],
  [2,19,'雨水','土脉潤起','つちのしょううるおいおこる','Rain moistens the soil'],
  [2,24,'雨水','霞始靆','かすみはじめてたなびく','Mist begins to linger'],
  [3,1, '雨水','草木萌動','そうもくめばえいずる','Grass and trees send up shoots'],
  [3,6, '啓蟄','蟄虫啓戸','すごもりむしとをひらく','Hibernating creatures open their doors'],
  [3,11,'啓蟄','桃始笑','ももはじめてさく','Peach blossoms first smile'],
  [3,16,'啓蟄','菜虫化蝶','なむしちょうとなる','Caterpillars turn into butterflies'],
  [3,21,'春分','雀始巣','すずめはじめてすくう','Sparrows start to nest'],
  [3,26,'春分','桜始開','さくらはじめてひらく','Cherry blossoms begin to open'],
  [3,31,'春分','雷乃発声','かみなりすなわちこえをはっす','Thunder begins to sound'],
  [4,5, '清明','玄鳥至','つばめきたる','Swallows return'],
  [4,10,'清明','鴻雁北','こうがんかえる','Wild geese fly north'],
  [4,15,'清明','虹始見','にじはじめてあらわる','Rainbows first appear'],
  [4,20,'穀雨','葭始生','あしはじめてしょうず','Reeds begin to sprout'],
  [4,25,'穀雨','霜止出苗','しもやみてなえいずる','Last frost; rice seedlings rise'],
  [4,30,'穀雨','牡丹華','ぼたんはなさく','Peonies bloom'],
  [5,5, '立夏','蛙始鳴','かわずはじめてなく','Frogs begin to sing'],
  [5,10,'立夏','蚯蚓出','みみずいずる','Earthworms surface'],
  [5,15,'立夏','竹笋生','たけのこしょうず','Bamboo shoots sprout'],
  [5,21,'小満','蚕起食桑','かいこおきてくわをはむ','Silkworms wake and feed on mulberry'],
  [5,26,'小満','紅花栄','べにばなさかう','Safflowers flourish'],
  [5,31,'小満','麦秋至','むぎのときいたる','Wheat ripens and is harvested'],
  [6,6, '芒種','螳螂生','かまきりしょうず','Praying mantises hatch'],
  [6,11,'芒種','腐草為螢','くされたるくさほたるとなる','Rotten grass becomes fireflies'],
  [6,16,'芒種','梅子黄','うめのみきばむ','Plums turn yellow'],
  [6,21,'夏至','乃東枯','なつかれくさかるる','Self-heal withers'],
  [6,27,'夏至','菖蒲華','あやめはなさく','Irises bloom'],
  [7,2, '夏至','半夏生','はんげしょうず','Crow-dipper sprouts'],
  [7,7, '小暑','温風至','あつかぜいたる','Warm winds arrive'],
  [7,12,'小暑','蓮始開','はすはじめてひらく','Lotuses first open'],
  [7,18,'小暑','鷹乃学習','たかすなわちわざをなす','Young hawks learn to fly'],
  [7,23,'大暑','桐始結花','きりはじめてはなをむすぶ','Paulownia trees bear fruit'],
  [7,29,'大暑','土潤溽暑','つちうるおうてむしあつし','Earth is damp; air is humid'],
  [8,3, '大暑','大雨時行','たいうときどきにふる','Heavy rain falls in spells'],
  [8,8, '立秋','涼風至','すずかぜいたる','Cool winds blow'],
  [8,13,'立秋','寒蝉鳴','ひぐらしなく','Evening cicadas sing'],
  [8,18,'立秋','蒙霧升降','ふかききりまとう','Thick fog drifts'],
  [8,23,'処暑','綿柎開','わたのはなしべひらく','Cotton flowers open'],
  [8,28,'処暑','天地始粛','てんちはじめてさむし','Heaven and earth begin to chill'],
  [9,2, '処暑','禾乃登','こくものすなわちみのる','Grains begin to ripen'],
  [9,8, '白露','草露白','くさのつゆしろし','Dew on grass turns white'],
  [9,13,'白露','鶺鴒鳴','せきれいなく','Wagtails sing'],
  [9,18,'白露','玄鳥去','つばめさる','Swallows depart'],
  [9,23,'秋分','雷乃収声','かみなりすなわちこえをおさむ','Thunder ceases'],
  [9,28,'秋分','蟄虫坏戸','むしかくれてとをふさぐ','Insects retreat underground'],
  [10,3,'秋分','水始涸','みずはじめてかる','Waters begin to dry up'],
  [10,8,'寒露','鴻雁来','こうがんきたる','Wild geese return'],
  [10,13,'寒露','菊花開','きくのはなひらく','Chrysanthemums bloom'],
  [10,18,'寒露','蟋蟀在戸','きりぎりすとにあり','Crickets gather at doors'],
  [10,23,'霜降','霜始降','しもはじめてふる','First frost falls'],
  [10,28,'霜降','霎時施','こさめときどきふる','Light rain comes and goes'],
  [11,2,'霜降','楓蔦黄','もみじつたきばむ','Maples and ivy turn yellow'],
  [11,7,'立冬','山茶始開','つばきはじめてひらく','Camellias first open'],
  [11,12,'立冬','地始凍','ちはじめてこおる','Earth begins to freeze'],
  [11,17,'立冬','金盞香','きんせんかさく','Daffodils bloom'],
  [11,22,'小雪','虹蔵不見','にじかくれてみえず','Rainbows hide from view'],
  [11,27,'小雪','朔風払葉','きたかぜこのはをはらう','North wind sweeps the leaves'],
  [12,2,'小雪','橘始黄','たちばなはじめてきばむ','Tachibana citrus turn yellow'],
  [12,7,'大雪','閉塞成冬','そらさむくふゆとなる','Sky cold; winter sets in'],
  [12,12,'大雪','熊蟄穴','くまあなにこもる','Bears retreat to caves'],
  [12,17,'大雪','鱖魚群','さけのうおむらがる','Salmon gather upstream'],
  [12,22,'冬至','乃東生','なつかれくさしょうず','Self-heal sprouts'],
  [12,27,'冬至','麋角解','さわしかつのおる','Elk shed antlers'],
];

const DAYS_BEFORE_M = [0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const doy = (m, d) => DAYS_BEFORE_M[m] + d;

function todayKou(date = new Date()) {
  const t = doy(date.getMonth() + 1, date.getDate());
  let best = KOU72[KOU72.length - 1], bestDoy = -1;
  for (const k of KOU72) {
    const kd = doy(k[0], k[1]);
    if (kd <= t && kd > bestDoy) { best = k; bestDoy = kd; }
  }
  return best;
}

// ─── Today's 十八番 catalog ────────────────────────────────────────────────
// Rotates per visit. No new content required to keep root feeling fresh.
const OHAKO_PICKS = [
  {
    src: 'hokkaido.fujioha.com',
    srcLabel: '北海道の歩き方',
    jp: '函館の朝市、地元の人の歩き方',
    en: 'How a local actually does Hakodate\'s morning market',
    blurb: '観光客の動線とはまったく違う、地元の朝の三軒。',
    blurbEn: 'Three stalls that show up on no map but mine.',
    meta: '6 min read · 旅・北海道',
    cta: '記事を読む',
    img: 'gradient1'
  },
  {
    src: 'hokkaido.fujioha.com',
    srcLabel: '北海道の歩き方',
    jp: '雨の札幌で行きたいラーメン10軒',
    en: '10 ramen shops for Sapporo\'s rainy days',
    blurb: '雨の日にこそ価値が出る、湯気と窓の風景。',
    blurbEn: 'The kind of bowls that earn their keep on grey afternoons.',
    meta: '4 min read · 旅・北海道',
    cta: '記事を読む',
    img: 'gradient2'
  },
  {
    src: 'game.fujioha.com',
    srcLabel: 'Web ゲーム',
    jp: 'Kanji Drop — 落ちてくる漢字を組む',
    en: 'Kanji Drop — falling kanji puzzle',
    blurb: 'Tetris と漢字の偏旁を組み合わせた小品。1分で遊べます。',
    blurbEn: 'Half tetromino, half kanji radical. Plays in about a minute.',
    meta: 'Browser game · ~1 min',
    cta: '今すぐ遊ぶ',
    img: 'gradient3'
  },
  {
    src: 'hokkaido.fujioha.com',
    srcLabel: '北海道の歩き方',
    jp: '知床の朝、ヒグマに会わない歩き方',
    en: 'Shiretoko mornings without bumping into a bear',
    blurb: '出会わないための時間帯と、道の選び方。',
    blurbEn: 'Which hours, which trails, and what to carry.',
    meta: '5 min read · 旅・北海道',
    cta: '記事を読む',
    img: 'gradient4'
  },
  {
    src: 'game.fujioha.com',
    srcLabel: 'Web ゲーム',
    jp: '札幌時計台 1分タイマー',
    en: '60-second clock-tower mini',
    blurb: '一分だけ、画面の前で深呼吸するためのゲーム。',
    blurbEn: 'A one-minute thing for catching your breath.',
    meta: 'Browser game · 1 min',
    cta: '今すぐ遊ぶ',
    img: 'gradient5'
  },
];

// Stable per-visit pick: rotates with each page load, also seeded by date so
// even within a refresh-burst the answer is steady.
function pickOhako() {
  const seed = Math.floor(Date.now() / 1000); // refresh = new pick
  return OHAKO_PICKS[seed % OHAKO_PICKS.length];
}

// ─── Greeting / mood by time-of-day ────────────────────────────────────────
const MOODS = {
  morning:   { jp: 'おはよう',         en: 'Good morning',     hours: [5, 11],  ink: '#1f1a14' },
  afternoon: { jp: 'こんにちは',       en: 'Good afternoon',   hours: [11, 17], ink: '#1f1a14' },
  evening:   { jp: 'こんばんは',       en: 'Good evening',     hours: [17, 21], ink: '#1f1a14' },
  night:     { jp: 'おそくまで、おつかれさま', en: 'Late, but welcome', hours: [21, 5],  ink: '#fbf8f3' },
};
function moodFromHour(h) {
  if (h >= 5 && h < 11)  return 'morning';
  if (h >= 11 && h < 17) return 'afternoon';
  if (h >= 17 && h < 21) return 'evening';
  return 'night';
}

// ─── Visit counter ─────────────────────────────────────────────────────────
function useVisitCount() {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('fujioha_visits');
      const data = raw ? JSON.parse(raw) : { count: 0, last: null };
      const today = new Date().toISOString().slice(0, 10);
      const next = data.last === today ? data : { count: data.count + 1, last: today };
      localStorage.setItem('fujioha_visits', JSON.stringify(next));
      setN(next.count);
    } catch (e) { setN(1); }
  }, []);
  return n;
}

// Japanese ordinal-like phrase for visit count
function visitPhrase(n) {
  if (n <= 1) return { jp: 'はじめまして。', en: 'First time here — welcome.' };
  if (n === 2) return { jp: '二度目のおはよう、ありがとう。', en: 'A second visit — thank you.' };
  if (n <= 9)  return { jp: `今日が ${n} 度目のおはよう。`, en: `${n} mornings now.` };
  if (n <= 30) return { jp: `${n} 度目。常連です。`, en: `${n} visits. A regular.` };
  return { jp: `${n} 度目。ほんとうにありがとう。`, en: `${n} visits. Truly, thank you.` };
}

// ─── Page ─────────────────────────────────────────────────────────────────

function MorningPortal({ tweaks }) {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  const mood = tweaks.timeOverride === 'auto'
    ? moodFromHour(now.getHours())
    : tweaks.timeOverride;
  const greeting = MOODS[mood];
  const visits = useVisitCount();
  const vp = visitPhrase(visits);
  const kou = todayKou(now);
  const [pick, setPick] = React.useState(() => pickOhako());

  return (
    <div className={`fp fp-${mood}`} data-mood={mood}>
      <TopBar now={now} mood={mood} />
      <Hero greeting={greeting} mood={mood} visitPhrase={vp} now={now} kou={kou} />
      <SitesSection />
      <FeaturedSection pick={pick} onShuffle={() => setPick(pickOhako())} />
      {tweaks.showAlley && <AlleySection />}
      {tweaks.showFeed && <RecentSection />}
      <SiteFooter />
    </div>
  );
}

// ─── TopBar ────────────────────────────────────────────────────────────────
function TopBar({ now, mood }) {
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return (
    <header className="fp-topbar">
      <div className="fp-mark">
        <span className="fp-mark-dot" />
        <span className="fp-mark-name">fujioha</span>
      </div>
      <div className="fp-topbar-right">
        <span className="fp-mono fp-faint">{hh}:{mm} JST</span>
        <span className="fp-faint">·</span>
        <span className="fp-mono fp-faint">{mood}</span>
        <span className="fp-faint">·</span>
        <a className="fp-link">Journal</a>
        <a className="fp-link">About</a>
      </div>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero({ greeting, mood, visitPhrase, now, kou }) {
  const dateStr = now.toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
  });
  const dateEn = now.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <section className="fp-hero">
      <Sun mood={mood} />
      <div className="fp-hero-inner">
        <div className="fp-hero-date">
          <span className="fp-jp">{dateStr}</span>
          <span className="fp-faint">·</span>
          <span className="fp-en fp-faint">{dateEn}</span>
        </div>
        <h1 className="fp-greeting">
          <span className="fp-jp">{greeting.jp}<span className="fp-greeting-dot">。</span></span>
        </h1>
        <p className="fp-greeting-en fp-en">{greeting.en} from <em>fujioha</em>.</p>
        <p className="fp-intro">
          <span className="fp-jp">小さなウェブを集めた個人の場所。今のところ、北海道の歩き方と、思いついた Web ゲームが住んでいます。</span>
          <span className="fp-en fp-mute">
            A small home for two sites — a Hokkaido travel guide and a shelf of little web games — by <u>@fuji</u>.
          </span>
        </p>
        <div className="fp-hero-meta">
          <span className="fp-pill fp-pill-warm">
            <span className="fp-dot" />
            <span className="fp-jp">{visitPhrase.jp}</span>
            <span className="fp-en fp-mute">· {visitPhrase.en}</span>
          </span>
          <span className="fp-kou-inline">
            <span className="fp-faint fp-mono">七十二候 / {kou[2]}・{kou[3]}</span>
            <span className="fp-jp">{kou[4]}</span>
            <span className="fp-en fp-mute">— {kou[5]}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

// Soft horizon/sun SVG that shifts hue with mood
function Sun({ mood }) {
  const palettes = {
    morning:   ['#fde6c8', '#f0b27a', '#c96442'],
    afternoon: ['#fff6e1', '#f6d472', '#c98b42'],
    evening:   ['#f7c98a', '#d97757', '#6b3a2e'],
    night:     ['#2a3340', '#3d4a5e', '#8a9bbf'],
  };
  const [a, b, c] = palettes[mood];
  return (
    <svg className="fp-sun" viewBox="0 0 600 600" aria-hidden="true">
      <defs>
        <radialGradient id="sg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={a} stopOpacity="1" />
          <stop offset="55%" stopColor={b} stopOpacity=".55" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="290" fill="url(#sg)" />
      <circle cx="300" cy="300" r="170" fill="none" stroke={c} strokeOpacity=".25" strokeWidth="1" />
      <circle cx="300" cy="300" r="120" fill="none" stroke={c} strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 5" />
    </svg>
  );
}

// ─── Sites — the two primary entrances ────────────────────────────────────
function SitesSection() {
  return (
    <section className="fp-section fp-sites">
      <div className="fp-section-head">
        <div>
          <div className="fp-eyebrow">入口 · The two sites</div>
          <h2 className="fp-h2 fp-jp">今、ふじおはにあるもの</h2>
          <p className="fp-h2-en fp-en fp-mute">Where fujioha actually lives, right now.</p>
        </div>
        <div className="fp-section-count fp-mono fp-faint">02</div>
      </div>

      <div className="fp-sites-grid">
        <SiteCard
          subdomain="hokkaido"
          jp="北海道の歩き方"
          en="Hokkaido, by a local"
          tagline="地元の人が解説する、観光ガイドにない北海道。"
          taglineEn="A travel guide written by someone who actually lives there — not by an algorithm."
          stats={[
            { n: '12', jp: '記事', en: 'posts' },
            { n: '7',  jp: '都市', en: 'cities' },
            { n: '今週', jp: '最終更新', en: 'last update' }
          ]}
          tone="warm"
          accent="var(--accent)"
          cta="サイトへ"
          ctaEn="Visit guide"
        />
        <SiteCard
          subdomain="game"
          jp="思いつきの Web ゲーム"
          en="Small web games, made by hand"
          tagline="ジャンルは様々。ブラウザですぐ遊べる小品集。"
          taglineEn="Different shapes, different rules. Each one playable in a single minute."
          stats={[
            { n: '4', jp: 'ゲーム', en: 'games' },
            { n: '~1m', jp: '平均プレイ時間', en: 'avg play' },
            { n: '今月', jp: '最終更新', en: 'last update' }
          ]}
          tone="cool"
          accent="#2a4a6b"
          cta="ゲームへ"
          ctaEn="Play games"
        />
      </div>
    </section>
  );
}

function SiteCard({ subdomain, jp, en, tagline, taglineEn, stats, accent, cta, ctaEn, tone }) {
  return (
    <a className={`fp-site fp-site-${tone}`} style={{ '--card-accent': accent }}>
      <div className="fp-site-art">
        <SiteIllustration subdomain={subdomain} accent={accent} />
      </div>
      <div className="fp-site-body">
        <div className="fp-site-url fp-mono">{subdomain}<span className="fp-faint">.fujioha.com</span></div>
        <h3 className="fp-site-jp fp-jp">{jp}</h3>
        <div className="fp-site-en fp-en">{en}</div>
        <p className="fp-site-tagline fp-jp">{tagline}</p>
        <p className="fp-site-tagline-en fp-en fp-mute">{taglineEn}</p>
        <div className="fp-site-stats">
          {stats.map((s, i) => (
            <div key={i} className="fp-stat">
              <span className="fp-stat-n">{s.n}</span>
              <span className="fp-stat-l">
                <span className="fp-jp">{s.jp}</span>
                <span className="fp-en fp-stat-en">{s.en}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="fp-site-cta">
          <span className="fp-cta-jp fp-jp">{cta}</span>
          <span className="fp-cta-arrow">→</span>
          <span className="fp-cta-en fp-en fp-mute">{ctaEn}</span>
        </div>
      </div>
    </a>
  );
}

// Custom illustrations per site — no clip-art emoji, no stock photos.
// Hokkaido: stylized snowy mountain horizon. Game: pixel-grid composition.
function SiteIllustration({ subdomain, accent }) {
  if (subdomain === 'hokkaido') {
    return (
      <svg viewBox="0 0 400 240" className="fp-illus" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky-h" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fde6c8" />
            <stop offset="100%" stopColor="#f5e9d8" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#sky-h)" />
        <circle cx="310" cy="80" r="36" fill={accent} opacity=".8" />
        <path d="M0 200 L60 150 L110 175 L160 130 L220 165 L290 110 L340 160 L400 140 L400 240 L0 240 Z"
          fill="#fff" opacity=".85" stroke="#1f1a14" strokeWidth=".5" />
        <path d="M0 220 L80 200 L160 215 L240 195 L320 220 L400 200 L400 240 L0 240 Z"
          fill="#1f1a14" opacity=".15" />
        {/* tiny pines */}
        {[40, 140, 250, 340].map((x, i) => (
          <g key={i} transform={`translate(${x},${200 - (i%2)*8})`}>
            <path d="M0 0 L-4 8 L-2 8 L-5 14 L-2 14 L-6 22 L6 22 L2 14 L5 14 L2 8 L4 8 Z"
              fill="#1f1a14" opacity=".6" />
          </g>
        ))}
      </svg>
    );
  }
  // Game: arcade-style composition — gridded pixels falling
  return (
    <svg viewBox="0 0 400 240" className="fp-illus" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="240" fill="#0e1422" />
      {/* faint dot grid */}
      {Array.from({ length: 14 }).map((_, r) =>
        Array.from({ length: 24 }).map((_, c) => (
          <rect key={`${r}-${c}`} x={c * 17 + 8} y={r * 17 + 8} width="1" height="1" fill="#fff" opacity=".15" />
        ))
      )}
      {/* falling block clusters */}
      <g>
        <rect x="80"  y="40"  width="20" height="20" fill="#c96442" />
        <rect x="100" y="40"  width="20" height="20" fill="#c96442" />
        <rect x="100" y="60"  width="20" height="20" fill="#c96442" />
        <rect x="220" y="80"  width="20" height="20" fill="#f6d472" />
        <rect x="220" y="100" width="20" height="20" fill="#f6d472" />
        <rect x="240" y="100" width="20" height="20" fill="#f6d472" />
        <rect x="260" y="100" width="20" height="20" fill="#f6d472" />
        <rect x="160" y="130" width="20" height="20" fill="#5aa37a" />
        <rect x="160" y="150" width="20" height="20" fill="#5aa37a" />
        <rect x="180" y="150" width="20" height="20" fill="#5aa37a" />
        <rect x="180" y="170" width="20" height="20" fill="#5aa37a" />
        <rect x="300" y="160" width="20" height="20" fill="#8a9bbf" />
        <rect x="320" y="160" width="20" height="20" fill="#8a9bbf" />
      </g>
      {/* ground line */}
      <rect x="0" y="210" width="400" height="2" fill="#fff" opacity=".3" />
    </svg>
  );
}

// ─── Featured (Today's 十八番) ────────────────────────────────────────────
function FeaturedSection({ pick, onShuffle }) {
  return (
    <section className="fp-section fp-featured">
      <div className="fp-section-head">
        <div>
          <div className="fp-eyebrow">今日の十八番 · Today's signature pick</div>
          <h2 className="fp-h2 fp-jp">訪れるたび、ちがう一本を。</h2>
          <p className="fp-h2-en fp-en fp-mute">
            A different favourite every time you stop by — picked from fujioha's shelf.
          </p>
        </div>
        <button className="fp-shuffle" onClick={onShuffle} aria-label="shuffle pick">
          <span className="fp-shuffle-icon">↻</span>
          <span>もう一本 / shuffle</span>
        </button>
      </div>

      <article className="fp-pick">
        <div className={`fp-pick-art fp-grad-${pick.img}`} />
        <div className="fp-pick-body">
          <div className="fp-pick-src">
            <span className="fp-mono fp-faint">{pick.src}</span>
            <span className="fp-faint">·</span>
            <span className="fp-jp fp-mute">{pick.srcLabel}</span>
          </div>
          <h3 className="fp-pick-jp fp-jp">{pick.jp}</h3>
          <p className="fp-pick-en fp-en">{pick.en}</p>
          <p className="fp-pick-blurb fp-jp">{pick.blurb}</p>
          <p className="fp-pick-blurb-en fp-en fp-mute">{pick.blurbEn}</p>
          <div className="fp-pick-foot">
            <span className="fp-pick-meta fp-mono fp-faint">{pick.meta}</span>
            <span className="fp-pick-cta">
              <span className="fp-jp">{pick.cta}</span>
              <span className="fp-en">{pick.cta === '今すぐ遊ぶ' ? 'Play now' : 'Read'}</span>
              <span className="fp-cta-arrow">→</span>
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}

// ─── Alley (D's noren, absorbed as wayfinding) ────────────────────────────
function AlleySection() {
  const shops = [
    { jp: '北海道', en: 'Hokkaido',  sub: 'hokkaido', tag: 'travel · guide', color: 'var(--accent)' },
    { jp: 'ゲーム', en: 'Games',     sub: 'game',     tag: 'play · web',    color: '#2a4a6b' },
    { jp: '準備中', en: 'Coming',    sub: '?',        tag: 'coming soon',     color: '#8a8377', dashed: true },
    { jp: '店主',   en: 'Shopkeeper', sub: 'about',    tag: '@fuji',     color: '#3e3a32' },
    { jp: '日誌',   en: 'Journal',    sub: 'journal',  tag: 'notes',          color: '#5a6b4a', dashed: true },
  ];
  return (
    <section className="fp-section fp-alley">
      <div className="fp-section-head">
        <div>
          <div className="fp-eyebrow">ふじおはの通り · The little alley</div>
          <h2 className="fp-h2 fp-jp">奥には、まだ準備中の店も。</h2>
          <p className="fp-h2-en fp-en fp-mute">
            A few more curtains, some still hanging blank — for the things to come.
          </p>
        </div>
      </div>

      <div className="fp-alley-row">
        <div className="fp-alley-beam" />
        {shops.map((s, i) => (
          <Noren key={i} {...s} />
        ))}
      </div>
    </section>
  );
}

function Noren({ jp, en, sub, tag, color, dashed }) {
  return (
    <div className={`fp-noren ${dashed ? 'is-dashed' : ''}`}>
      <div className="fp-noren-window">
        <div className="fp-noren-window-inner" />
      </div>
      <div className="fp-noren-cloth" style={{ background: color }}>
        <div className="fp-noren-label fp-jp">{jp}</div>
        <div className="fp-noren-label-en fp-en">{en}</div>
        <div className="fp-noren-slits">
          {[0, 1, 2, 3].map(i => <div key={i} className="fp-noren-slit" />)}
        </div>
      </div>
        <div className="fp-noren-plate">
          <div className="fp-noren-name">
            <span className="fp-jp">{jp}</span>
            <span className="fp-en fp-noren-name-en">{en}</span>
          </div>
          <div className="fp-mono">{sub}.fujioha.com</div>
          <div className="fp-noren-tag fp-faint">{tag}</div>
        </div>
    </div>
  );
}

// ─── Recent (auto-feed placeholder) ───────────────────────────────────────
function RecentSection() {
  const items = [
    { date: '2d', src: 'hokkaido', srcJp: '北海道の歩き方',
      jp: '函館朝市、地元民の歩き方', en: 'Hakodate morning market, the local way', kind: 'post' },
    { date: '3d', src: 'game', srcJp: 'Web ゲーム',
      jp: '新作 · Kanji Drop を公開しました', en: 'New release · Kanji Drop is live', kind: 'release' },
    { date: '1w', src: 'hokkaido', srcJp: '北海道の歩き方',
      jp: '雨の札幌で行きたいラーメン10軒', en: 'Sapporo ramen for rainy days', kind: 'post' },
    { date: '2w', src: 'hokkaido', srcJp: '北海道の歩き方',
      jp: '知床の朝、ヒグマに会わない歩き方', en: 'Shiretoko mornings, bear-free', kind: 'post' },
    { date: '3w', src: 'game', srcJp: 'Web ゲーム',
      jp: 'ミニ · 札幌時計台 1分タイマー', en: '60-second clock-tower mini', kind: 'release' },
  ];
  return (
    <section className="fp-section fp-recent">
      <div className="fp-section-head">
        <div>
          <div className="fp-eyebrow">最近の更新 · Recent across fujioha</div>
          <h2 className="fp-h2 fp-jp">サブドメインで起きていること。</h2>
          <p className="fp-h2-en fp-en fp-mute">
            Whenever a site updates, it lands here automatically.
          </p>
        </div>
        <a className="fp-link">RSS / Atom →</a>
      </div>
      <ol className="fp-feed">
        {items.map((it, i) => (
          <li key={i} className="fp-feed-item">
            <span className="fp-feed-date fp-mono fp-faint">{it.date}</span>
            <span className={`fp-feed-kind fp-feed-kind-${it.kind}`}>
              <span className="fp-jp">{it.kind === 'post' ? '記事' : '公開'}</span>
              <span className="fp-en">{it.kind === 'post' ? 'post' : 'live'}</span>
            </span>
            <span className="fp-feed-src fp-mono fp-faint">{it.src}.</span>
            <span className="fp-feed-title fp-jp">{it.jp}</span>
            <span className="fp-feed-title-en fp-en fp-mute">{it.en}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────
function SiteFooter() {
  const [hover, setHover] = React.useState(false);
  return (
    <footer className="fp-footer">
      <div className="fp-footer-row">
        <div className="fp-footer-mark">
          <span className="fp-mark-dot" />
          <span className="fp-mark-name">fujioha</span>
        </div>
        <div className="fp-footer-meta fp-mono fp-faint">
          © 2024–{new Date().getFullYear()} · by @fuji
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { MorningPortal });
