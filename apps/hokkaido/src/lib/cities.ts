export interface City {
  readonly jp: string;
  readonly en: string;
  /** 公開済み記事数。0 のときは「準備中」として表示する。 */
  readonly n: number;
  readonly note: string;
}

// 当面は札幌・千歳を中心に書く。記事は準備中（公開 0 本）。
export const HOK_CITIES: readonly City[] = [
  { jp: '札幌', en: 'Sapporo', n: 0, note: '街と山が15分で行き来できる街' },
  { jp: '千歳', en: 'Chitose', n: 0, note: '新千歳空港のある、北海道の玄関口' },
];
