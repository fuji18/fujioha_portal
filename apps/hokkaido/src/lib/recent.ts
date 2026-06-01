export interface RecentArticle {
  readonly jp: string;
  readonly en: string;
  readonly city: string;
  readonly theme: string;
  readonly read: string;
  readonly date: string;
}

// 仮記事はすべて削除済み。実際の記事を書いたらここに追加する。
export const HOK_RECENT: readonly RecentArticle[] = [];
