// 自己破壊型 Service Worker。
//
// 背景: 以前このオリジンに置かれていた別アプリ(PWA)が登録した
// Service Worker がブラウザに残存し、新しいサイトを開いても古いアプリの
// キャッシュ済みシェルが返され続ける問題がある。
//
// 仕組み: ブラウザはナビゲーション時に登録済み SW スクリプトの更新を
// (HTTP キャッシュをバイパスして)チェックする。旧 SW と同じパスに本ファイルを
// 配置することで旧 SW が本ファイルに置換され、以下の自己破壊が走る。
//
//   install : 直ちに有効化する
//   activate: 全 Cache を削除 → 自身を unregister → 制御下の窓を再読込
//
// 結果として SW が外れ、ページはネットワークから新サイトを取得する。
// 新サイトは今後 SW を持たない方針のため、本 SW は二度と登録されない。

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Cache Storage を全削除(失敗しても unregister は続行する)。
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch {
        // 削除できないキャッシュがあっても致命ではない。
      }

      // 自身の登録を解除する。
      await self.registration.unregister();

      // 現在この SW に制御されている窓を、ネットワークから読み直させる。
      // 本 SW は fetch ハンドラを持たないため、再読込は必ずネットワークから
      // 新しい HTML を取得する(=無限リロードにはならない)。新 HTML 側の
      // 解除スクリプトは SW 不在時に no-op となり、ループは発生しない。
      const clients = await self.clients.matchAll({ type: 'window' });
      await Promise.allSettled(
        clients.map((client) => client.navigate(client.url))
      );
    })()
  );
});
