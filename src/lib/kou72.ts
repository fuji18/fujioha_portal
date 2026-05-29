// 72 micro-seasons (七十二候) — each entry: [month, day, sekki, kou kanji, reading, English].
// Ported verbatim from morning-portal.jsx.

export type Kou = readonly [number, number, string, string, string, string];

export const KOU72: readonly Kou[] = [
  [1, 1, '冬至', '雪下出麦', 'ゆきわたりてむぎのびる', 'Wheat sprouts beneath the snow'],
  [1, 6, '小寒', '芹乃栄', 'せりすなわちさかう', 'Parsley thrives'],
  [1, 11, '小寒', '水泉動', 'しみずあたたかをふくむ', 'Underground springs begin to stir'],
  [1, 16, '小寒', '雉始雊', 'きじはじめてなく', 'Pheasants first call'],
  [1, 21, '大寒', '款冬華', 'ふきのはなさく', 'Butterbur blooms'],
  [1, 26, '大寒', '水沢腹堅', 'さわみずこおりつめる', 'Mountain streams freeze solid'],
  [1, 31, '大寒', '鶏始乳', 'にわとりはじめてとやにつく', 'Hens begin to lay'],
  [2, 4, '立春', '東風解凍', 'はるかぜこおりをとく', 'East wind thaws the ice'],
  [2, 9, '立春', '黄鶯睍睆', 'うぐいすなく', 'The bush warbler sings'],
  [2, 14, '立春', '魚上氷', 'うおこおりをいずる', 'Fish emerge through the ice'],
  [2, 19, '雨水', '土脉潤起', 'つちのしょううるおいおこる', 'Rain moistens the soil'],
  [2, 24, '雨水', '霞始靆', 'かすみはじめてたなびく', 'Mist begins to linger'],
  [3, 1, '雨水', '草木萌動', 'そうもくめばえいずる', 'Grass and trees send up shoots'],
  [3, 6, '啓蟄', '蟄虫啓戸', 'すごもりむしとをひらく', 'Hibernating creatures open their doors'],
  [3, 11, '啓蟄', '桃始笑', 'ももはじめてさく', 'Peach blossoms first smile'],
  [3, 16, '啓蟄', '菜虫化蝶', 'なむしちょうとなる', 'Caterpillars turn into butterflies'],
  [3, 21, '春分', '雀始巣', 'すずめはじめてすくう', 'Sparrows start to nest'],
  [3, 26, '春分', '桜始開', 'さくらはじめてひらく', 'Cherry blossoms begin to open'],
  [3, 31, '春分', '雷乃発声', 'かみなりすなわちこえをはっす', 'Thunder begins to sound'],
  [4, 5, '清明', '玄鳥至', 'つばめきたる', 'Swallows return'],
  [4, 10, '清明', '鴻雁北', 'こうがんかえる', 'Wild geese fly north'],
  [4, 15, '清明', '虹始見', 'にじはじめてあらわる', 'Rainbows first appear'],
  [4, 20, '穀雨', '葭始生', 'あしはじめてしょうず', 'Reeds begin to sprout'],
  [4, 25, '穀雨', '霜止出苗', 'しもやみてなえいずる', 'Last frost; rice seedlings rise'],
  [4, 30, '穀雨', '牡丹華', 'ぼたんはなさく', 'Peonies bloom'],
  [5, 5, '立夏', '蛙始鳴', 'かわずはじめてなく', 'Frogs begin to sing'],
  [5, 10, '立夏', '蚯蚓出', 'みみずいずる', 'Earthworms surface'],
  [5, 15, '立夏', '竹笋生', 'たけのこしょうず', 'Bamboo shoots sprout'],
  [5, 21, '小満', '蚕起食桑', 'かいこおきてくわをはむ', 'Silkworms wake and feed on mulberry'],
  [5, 26, '小満', '紅花栄', 'べにばなさかう', 'Safflowers flourish'],
  [5, 31, '小満', '麦秋至', 'むぎのときいたる', 'Wheat ripens and is harvested'],
  [6, 6, '芒種', '螳螂生', 'かまきりしょうず', 'Praying mantises hatch'],
  [6, 11, '芒種', '腐草為螢', 'くされたるくさほたるとなる', 'Rotten grass becomes fireflies'],
  [6, 16, '芒種', '梅子黄', 'うめのみきばむ', 'Plums turn yellow'],
  [6, 21, '夏至', '乃東枯', 'なつかれくさかるる', 'Self-heal withers'],
  [6, 27, '夏至', '菖蒲華', 'あやめはなさく', 'Irises bloom'],
  [7, 2, '夏至', '半夏生', 'はんげしょうず', 'Crow-dipper sprouts'],
  [7, 7, '小暑', '温風至', 'あつかぜいたる', 'Warm winds arrive'],
  [7, 12, '小暑', '蓮始開', 'はすはじめてひらく', 'Lotuses first open'],
  [7, 18, '小暑', '鷹乃学習', 'たかすなわちわざをなす', 'Young hawks learn to fly'],
  [7, 23, '大暑', '桐始結花', 'きりはじめてはなをむすぶ', 'Paulownia trees bear fruit'],
  [7, 29, '大暑', '土潤溽暑', 'つちうるおうてむしあつし', 'Earth is damp; air is humid'],
  [8, 3, '大暑', '大雨時行', 'たいうときどきにふる', 'Heavy rain falls in spells'],
  [8, 8, '立秋', '涼風至', 'すずかぜいたる', 'Cool winds blow'],
  [8, 13, '立秋', '寒蝉鳴', 'ひぐらしなく', 'Evening cicadas sing'],
  [8, 18, '立秋', '蒙霧升降', 'ふかききりまとう', 'Thick fog drifts'],
  [8, 23, '処暑', '綿柎開', 'わたのはなしべひらく', 'Cotton flowers open'],
  [8, 28, '処暑', '天地始粛', 'てんちはじめてさむし', 'Heaven and earth begin to chill'],
  [9, 2, '処暑', '禾乃登', 'こくものすなわちみのる', 'Grains begin to ripen'],
  [9, 8, '白露', '草露白', 'くさのつゆしろし', 'Dew on grass turns white'],
  [9, 13, '白露', '鶺鴒鳴', 'せきれいなく', 'Wagtails sing'],
  [9, 18, '白露', '玄鳥去', 'つばめさる', 'Swallows depart'],
  [9, 23, '秋分', '雷乃収声', 'かみなりすなわちこえをおさむ', 'Thunder ceases'],
  [9, 28, '秋分', '蟄虫坏戸', 'むしかくれてとをふさぐ', 'Insects retreat underground'],
  [10, 3, '秋分', '水始涸', 'みずはじめてかる', 'Waters begin to dry up'],
  [10, 8, '寒露', '鴻雁来', 'こうがんきたる', 'Wild geese return'],
  [10, 13, '寒露', '菊花開', 'きくのはなひらく', 'Chrysanthemums bloom'],
  [10, 18, '寒露', '蟋蟀在戸', 'きりぎりすとにあり', 'Crickets gather at doors'],
  [10, 23, '霜降', '霜始降', 'しもはじめてふる', 'First frost falls'],
  [10, 28, '霜降', '霎時施', 'こさめときどきふる', 'Light rain comes and goes'],
  [11, 2, '霜降', '楓蔦黄', 'もみじつたきばむ', 'Maples and ivy turn yellow'],
  [11, 7, '立冬', '山茶始開', 'つばきはじめてひらく', 'Camellias first open'],
  [11, 12, '立冬', '地始凍', 'ちはじめてこおる', 'Earth begins to freeze'],
  [11, 17, '立冬', '金盞香', 'きんせんかさく', 'Daffodils bloom'],
  [11, 22, '小雪', '虹蔵不見', 'にじかくれてみえず', 'Rainbows hide from view'],
  [11, 27, '小雪', '朔風払葉', 'きたかぜこのはをはらう', 'North wind sweeps the leaves'],
  [12, 2, '小雪', '橘始黄', 'たちばなはじめてきばむ', 'Tachibana citrus turn yellow'],
  [12, 7, '大雪', '閉塞成冬', 'そらさむくふゆとなる', 'Sky cold; winter sets in'],
  [12, 12, '大雪', '熊蟄穴', 'くまあなにこもる', 'Bears retreat to caves'],
  [12, 17, '大雪', '鱖魚群', 'さけのうおむらがる', 'Salmon gather upstream'],
  [12, 22, '冬至', '乃東生', 'なつかれくさしょうず', 'Self-heal sprouts'],
  [12, 27, '冬至', '麋角解', 'さわしかつのおる', 'Elk shed antlers'],
];

const DAYS_BEFORE_M = [0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

function doy(month: number, day: number): number {
  return DAYS_BEFORE_M[month] + day;
}

export function todayKou(date: Date = new Date()): Kou {
  const t = doy(date.getMonth() + 1, date.getDate());
  let best: Kou = KOU72[KOU72.length - 1];
  let bestDoy = -1;
  for (const k of KOU72) {
    const kd = doy(k[0], k[1]);
    if (kd <= t && kd > bestDoy) {
      best = k;
      bestDoy = kd;
    }
  }
  return best;
}
