---
layout: home
---

<div class="gbc-layout">

  <!-- 左：ロゴ＋紹介 -->
  <aside class="gbc-sidebar">
    <div class="gbc-logo-wrap">
      <img class="gbc-logo" src="/logo.png" alt="楓竹音社 ロゴ" />
    </div>
    <h1 class="gbc-site-name">楓竹音社</h1>
    <p class="gbc-site-name-en">Sound of Maple & Bamboo</p>
    <p class="gbc-tagline">情熱で紡ぐオンラインオーケストラ</p>
    <p class="gbc-desc">技術レベルを問わず、対等に交流<br>一緒に楽しい楽章を奏でよう</p>
    <div class="gbc-actions">
      <a class="gbc-btn gbc-btn-primary" href="/ja/contact/">参加する</a>
      <a class="gbc-btn gbc-btn-alt" href="https://space.bilibili.com/3546946262272192" target="_blank">作品を見る</a>
    </div>
  </aside>

  <!-- 右：機能カード -->
  <main class="gbc-cards">
    <a class="gbc-card" href="/ja/about/">
      <div class="gbc-card-icon">🍁</div>
      <h3>社团概要</h3>
      <p>純粋に情熱で運営されるオンライン音楽コミュニティ。技術レベルを問わず、プロとアマチュアが共に経験を共有し、技術を伝授。ACG、吹奏楽、管弦楽、ロック、ジャズまで幅広い曲風をカバー。</p>
      <span class="gbc-card-link">詳細を見る →</span>
    </a>
    <a class="gbc-card" href="https://space.bilibili.com/3546946262272192" target="_blank">
      <div class="gbc-card-icon">🎬</div>
      <h3>最新作品</h3>
      <p>Bilibiliチャンネルで最新のアンサンブル作品をチェック！毎回心を込めて制作し、音楽で喜びと感動をお届けします。</p>
      <span class="gbc-card-link">Bilibili →</span>
    </a>
    <a class="gbc-card" href="https://sheet.somb.xyz" target="_blank">
      <div class="gbc-card-icon">🎼</div>
      <h3>楽譜</h3>
      <p>厳選された楽譜ライブラリを探索。ACG、クラシック、ポップスなど、さまざまなスタイルをカバーし、演奏のインスピレーションとサポートを提供します。</p>
      <span class="gbc-card-link">楽譜を見る →</span>
    </a>
    <a class="gbc-card" href="/ja/recommend/">
      <div class="gbc-card-icon">🎹</div>
      <h3>曲の推薦</h3>
      <p>演奏したい曲がありますか？お気に入りの曲を推薦して、みんなで合奏しましょう！ACG、吹奏楽、管弦楽、ジャズ…どんなスタイルも大歓迎。</p>
      <span class="gbc-card-link">推薦する →</span>
    </a>
    <a class="gbc-card" href="/ja/guide/">
      <div class="gbc-card-icon">📋</div>
      <h3>参加ガイド</h3>
      <p>参加申し込みから練習、録音、提出までの全プロセスを説明。参加者一人ひとりの努力が完璧に表現されるようサポートします。</p>
      <span class="gbc-card-link">ガイドを読む →</span>
    </a>
    <a class="gbc-card" href="/ja/members/">
      <div class="gbc-card-icon">👥</div>
      <h3>メンバー</h3>
      <p>コミュニティのコアメンバーをご紹介。全員が音楽を愛する演奏者でありクリエイターです。</p>
      <span class="gbc-card-link">メンバーを見る →</span>
    </a>
    <a class="gbc-card" href="/ja/contact/">
      <div class="gbc-card-icon">📬</div>
      <h3>参加する</h3>
      <p>コミュニティはまだ始まったばかり。音楽を愛するあなたの参加をお待ちしています。ご提案やコラボのご相談も随時受付中。</p>
      <span class="gbc-card-link">連絡する →</span>
    </a>
  </main>

</div>

<style>
/* ========== グローバルテーマカラー ========== */
:root {
  --vp-c-brand-1: #ff6b35;
  --vp-c-brand-2: #ff8c52;
  --vp-c-brand-3: #e55a2b;
  --vp-c-brand-soft: rgba(255, 107, 53, 0.12);
}

/* ========== 全体レイアウト ========== */
.gbc-layout {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  gap: 48px;
  align-items: flex-start;
  justify-content: center;
}

/* ========== 左サイドバー ========== */
.gbc-sidebar {
  flex: 0 0 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gbc-logo-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
}

.gbc-logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  animation: logoSpin 20s linear infinite;
  transition: box-shadow 0.5s ease, animation-duration 0.5s ease;
}

.gbc-logo-wrap:hover .gbc-logo {
  animation-duration: 3s;
  box-shadow: 
    0 0 20px rgba(255, 107, 53, 0.6),
    0 0 40px rgba(255, 140, 82, 0.4),
    0 0 60px rgba(255, 107, 53, 0.2);
}

@keyframes logoSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 社团名 - 日本語（呼吸グラデーション） */
.gbc-site-name {
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin: 0 0 2px;
  background: linear-gradient(135deg, #ff6b35, #ff8c52, #e55a2b, #ff6b35);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: nameBreathe 4s ease-in-out infinite;
}

@keyframes nameBreathe {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}

/* 社团名 - 英語 */
.gbc-site-name-en {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--vp-c-text-3);
  margin: 0 0 14px;
  letter-spacing: 1px;
  font-style: italic;
  opacity: 0.7;
}

.gbc-tagline {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  margin: 0 0 10px;
}

.gbc-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 24px;
}

.gbc-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

/* ========== ボタンスタイル ========== */
.gbc-btn {
  display: inline-block;
  width: 180px;
  padding: 12px 0;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.gbc-btn-primary {
  background: linear-gradient(135deg, #ff6b35, #e55a2b, #ff6b35);
  background-size: 300% 300%;
  color: #ffffff !important;
  border: none;
  animation: btnBreathe 4s ease-in-out infinite;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

@keyframes btnBreathe {
  0% { background-position: 0% 50%; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3); }
  25% { background-position: 100% 0%; box-shadow: 0 4px 20px rgba(255, 140, 82, 0.45); }
  50% { background-position: 100% 100%; box-shadow: 0 4px 25px rgba(229, 90, 43, 0.5); }
  75% { background-position: 0% 100%; box-shadow: 0 4px 20px rgba(255, 200, 50, 0.45); }
  100% { background-position: 0% 50%; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3); }
}

.gbc-btn-primary:hover {
  animation: btnBreatheFast 1.5s ease-in-out infinite;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.5);
}

@keyframes btnBreatheFast {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}

.gbc-btn-alt {
  background: transparent;
  color: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-brand-1);
  animation: btnBorderBreathe 4s ease-in-out infinite;
}

@keyframes btnBorderBreathe {
  0%, 100% { border-color: #ff6b35; color: #ff6b35; box-shadow: 0 0 8px rgba(255, 107, 53, 0.1); }
  33% { border-color: #ff8c52; color: #ff8c52; box-shadow: 0 0 14px rgba(255, 140, 82, 0.2); }
  66% { border-color: #e55a2b; color: #e55a2b; box-shadow: 0 0 10px rgba(229, 90, 43, 0.15); }
}

.gbc-btn-alt:hover {
  color: #ffffff !important;
  border-color: transparent;
  background: linear-gradient(135deg, #ff6b35, #e55a2b);
  background-size: 200% 200%;
  animation: btnBreatheFast 1.5s ease-in-out infinite;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

/* ========== 右カードグリッド ========== */
.gbc-cards {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  min-width: 0;
}

.gbc-card {
  display: block;
  padding: 24px 20px;
  border: 1px solid transparent;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.gbc-card:hover {
  border-color: rgba(255, 107, 53, 0.2);
  background: var(--vp-c-bg);
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
  transform: translateY(-4px);
}

.gbc-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: var(--vp-c-brand-1);
  border-radius: 0 3px 3px 0;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.gbc-card:hover::before {
  height: 40%;
}

.gbc-card h3 {
  margin: 10px 0 6px;
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: color 0.3s;
}

.gbc-card:hover h3 {
  color: var(--vp-c-brand-1);
}

.gbc-card p {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.gbc-card-icon {
  font-size: 30px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.gbc-card:hover .gbc-card-icon {
  transform: scale(1.15);
}

.gbc-card-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none !important;
  transition: transform 0.3s;
}

.gbc-card:hover .gbc-card-link {
  transform: translateX(4px);
}

/* ========== レスポンシブ：タブレット ========== */
@media (max-width: 900px) {
  .gbc-layout {
    flex-direction: column;
    align-items: center;
    padding: 30px 20px 60px;
    gap: 36px;
  }
  .gbc-sidebar {
    flex: none;
    width: 100%;
    max-width: 400px;
  }
  .gbc-logo-wrap { width: 110px; height: 110px; }
  .gbc-site-name { font-size: 2rem; }
  .gbc-site-name-en { font-size: 0.8rem; }
  .gbc-cards { grid-template-columns: repeat(2, 1fr); width: 100%; }
}

/* ========== レスポンシブ：モバイル ========== */
@media (max-width: 600px) {
  .gbc-layout { padding: 20px 16px 50px; gap: 28px; }
  .gbc-sidebar { max-width: 100%; }
  .gbc-logo-wrap { width: 100px; height: 100px; }
  .gbc-site-name { font-size: 1.8rem; }
  .gbc-site-name-en { font-size: 0.75rem; margin-bottom: 10px; }
  .gbc-tagline { font-size: 0.95rem; }
  .gbc-desc { font-size: 0.85rem; margin-bottom: 20px; }
  .gbc-btn { width: 160px; padding: 10px 0; font-size: 14px; }
  .gbc-cards { grid-template-columns: 1fr; width: 100%; }
  .gbc-card { padding: 20px 16px; }
  .gbc-card h3 { font-size: 16px; }
  .gbc-card p { font-size: 12px; }
}
</style>