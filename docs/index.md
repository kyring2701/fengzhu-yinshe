---
layout: home
---

<div class="gbc-layout">

  <!-- 左侧：Logo + 简介 -->
  <aside class="gbc-sidebar">
    <div class="gbc-logo-wrap">
      <img class="gbc-logo" src="/logo.png" alt="枫竹音社 Logo" />
    </div>
    <h1 class="gbc-site-name">枫竹音社</h1>
    <p class="gbc-site-name-en">Sound of Maple & Bamboo</p>
    <p class="gbc-tagline">用爱发电的线上乐团</p>
    <p class="gbc-desc">不论技术，平等交流<br>一起演奏快乐的乐章</p>
    <div class="gbc-actions">
      <a class="gbc-btn gbc-btn-primary" href="/about/">加入我们</a>
      <a class="gbc-btn gbc-btn-alt" href="/works/">欣赏作品</a>
    </div>
  </aside>

  <!-- 右侧：功能卡片 -->
  <main class="gbc-cards">
    <a class="gbc-card" href="/about/">
      <div class="gbc-card-icon">🍁</div>
      <h3>关于社团</h3>
      <p>纯粹用爱发电的线上音乐社团，不论技术水平，专业与业余同台分享经验、传授技术。曲风覆盖ACG、吹奏乐、管弦乐、摇滚与爵士。</p>
      <span class="gbc-card-link">了解详情 →</span>
    </a>
    <a class="gbc-card" href="https://space.bilibili.com/3546946262272192" target="_blank">
      <div class="gbc-card-icon">🎬</div>
      <h3>最新力作</h3>
      <p>前往B站主页观看我们的最新合奏作品！每期用心制作，用音乐传递快乐与感动。</p>
      <span class="gbc-card-link">B站主页 →</span>
    </a>
    <a class="gbc-card" href="/recommend/">
      <div class="gbc-card-icon">🎹</div>
      <h3>曲目推荐</h3>
      <p>有想演奏的曲子？来这里推荐你心仪的曲目，让大家一起合奏！ACG、吹奏乐、管弦乐、爵士…什么风格都欢迎。</p>
      <span class="gbc-card-link">推荐曲目 →</span>
    </a>
    <a class="gbc-card" href="/guide/">
      <div class="gbc-card-icon">📋</div>
      <h3>云合奏指南</h3>
      <p>从报名、练习、录制到交稿的全流程说明，确保每位参与者的心血都能完美呈现。</p>
      <span class="gbc-card-link">阅读指南 →</span>
    </a>
    <a class="gbc-card" href="/members/">
      <div class="gbc-card-icon">👥</div>
      <h3>主要成员</h3>
      <p>认识我们社团的核心成员们，每一位都是热爱音乐的演奏者与创作者。</p>
      <span class="gbc-card-link">查看成员 →</span>
    </a>
    <a class="gbc-card" href="/contact/">
      <div class="gbc-card-icon">📬</div>
      <h3>联系我们</h3>
      <p>社团刚刚启航，欢迎热爱音乐的你加入。有建议或合作意向？随时联系我们。</p>
      <span class="gbc-card-link">取得联系 →</span>
    </a>
  </main>

</div>

<style>
/* ========== 全局主题色 ========== */
:root {
  --vp-c-brand-1: #ff6b35;
  --vp-c-brand-2: #ff8c52;
  --vp-c-brand-3: #e55a2b;
  --vp-c-brand-soft: rgba(255, 107, 53, 0.12);
}

/* ========== 整体布局 ========== */
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

/* ========== 左侧边栏 ========== */
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

/* 社团名称 - 中文（呼吸渐变） */
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
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 社团名称 - 英文 */
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

/* ========== 按钮样式 ========== */
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
  0% {
    background-position: 0% 50%;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  }
  25% {
    background-position: 100% 0%;
    box-shadow: 0 4px 20px rgba(255, 140, 82, 0.45);
  }
  50% {
    background-position: 100% 100%;
    box-shadow: 0 4px 25px rgba(229, 90, 43, 0.5);
  }
  75% {
    background-position: 0% 100%;
    box-shadow: 0 4px 20px rgba(255, 200, 50, 0.45);
  }
  100% {
    background-position: 0% 50%;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  }
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
  0%, 100% {
    border-color: #ff6b35;
    color: #ff6b35;
    box-shadow: 0 0 8px rgba(255, 107, 53, 0.1);
  }
  33% {
    border-color: #ff8c52;
    color: #ff8c52;
    box-shadow: 0 0 14px rgba(255, 140, 82, 0.2);
  }
  66% {
    border-color: #e55a2b;
    color: #e55a2b;
    box-shadow: 0 0 10px rgba(229, 90, 43, 0.15);
  }
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

/* ========== 右侧卡片网格 ========== */
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

/* ========== 响应式：平板端 ========== */
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

  .gbc-logo-wrap {
    width: 110px;
    height: 110px;
  }

  .gbc-site-name {
    font-size: 2rem;
  }

  .gbc-site-name-en {
    font-size: 0.8rem;
  }

  .gbc-cards {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }
}

/* ========== 响应式：手机端 ========== */
@media (max-width: 600px) {
  .gbc-layout {
    padding: 20px 16px 50px;
    gap: 28px;
  }

  .gbc-sidebar {
    max-width: 100%;
  }

  .gbc-logo-wrap {
    width: 100px;
    height: 100px;
  }

  .gbc-site-name {
    font-size: 1.8rem;
  }

  .gbc-site-name-en {
    font-size: 0.75rem;
    margin-bottom: 10px;
  }

  .gbc-tagline {
    font-size: 0.95rem;
  }

  .gbc-desc {
    font-size: 0.85rem;
    margin-bottom: 20px;
  }

  .gbc-btn {
    width: 160px;
    padding: 10px 0;
    font-size: 14px;
  }

  .gbc-cards {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .gbc-card {
    padding: 20px 16px;
  }

  .gbc-card h3 {
    font-size: 16px;
  }

  .gbc-card p {
    font-size: 12px;
  }
}
</style>