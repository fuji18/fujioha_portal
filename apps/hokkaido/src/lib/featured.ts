export interface FeaturedArticle {
  readonly jp: string;
  readonly en: string;
  readonly lead: string;
  readonly leadEn: string;
  readonly city: string;
  readonly read: string;
  readonly date: string;
}

// 仮の特集記事は削除済み。実際の特集記事ができたらここに設定する（null で非表示）。
export const HOK_FEATURED: FeaturedArticle | null = null;
