/**
 * サイト全体の運営メタ情報。法務ページ（免責・プライバシー・利用規約・問い合わせ）で参照する。
 * 文面や連絡先を変えるときはここを直す。
 */

/** 運営者の表示名。 */
export const OPERATOR = '@fuji18';

/** 準拠法。 */
export const GOVERNING_LAW = '日本法';

/** 法務ページの最終更新日（制定日）。改定したら更新する。 */
export const LEGAL_UPDATED = '2026年6月7日';

/**
 * お問い合わせ用 Google フォームの URL。
 * フォーム作成後にこの 1 行を実際の `https://forms.gle/...` に差し替える。
 * プレースホルダのままだと contact ページは「準備中」を表示する（リンク切れを出さない）。
 */
export const CONTACT_FORM_PLACEHOLDER = 'https://forms.gle/REPLACE_ME';
// 実 URL 設定後もプレースホルダとの比較を型エラー(ts2367)にしないため string 型に広げる。
export const CONTACT_FORM_URL: string = 'https://forms.gle/RVAStKY72cxtfoVCA';

/** フォーム URL が実設定済みか（プレースホルダでないか）。 */
export const CONTACT_FORM_READY = CONTACT_FORM_URL !== CONTACT_FORM_PLACEHOLDER;
