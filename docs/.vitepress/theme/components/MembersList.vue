<template>
  <div class="members-container">
    <div v-if="loading" class="status-message">🔄 成员信息加载中...</div>
    <div v-else class="members-grid">
      <div v-for="member in activeMembers" :key="member.uid" class="member-card">
        <img 
          :src="member.face || '/logo.png'" 
          :alt="member.name"
          class="member-avatar"
          @error="e => e.target.src = '/logo.png'"
        />
        <h3>{{ member.name }}</h3>
        <p class="member-role">{{ member.custom_role }}</p>
        <p class="member-bio" v-if="member.sign">{{ member.sign }}</p>
        <div class="member-stats" v-if="member.follower">
          <span>粉丝 {{ formatFollower(member.follower) }}</span>
          <span v-if="member.level">Lv.{{ member.level }}</span>
        </div>
        <a :href="`https://space.bilibili.com/${member.uid}`" target="_blank" class="bilibili-link">
          前往B站主页 →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeMembers = ref([])
const loading = ref(true)

const formatFollower = (num) => {
  if (num >= 10000) return (num / 10000).toFixed(1) + '万'
  return num
}

// 从本地 JSON 文件加载数据
const loadMembers = async () => {
  try {
    const response = await fetch('/members-data.json')
    if (!response.ok) throw new Error('加载成员数据失败')
    const data = await response.json()
    activeMembers.value = data
  } catch (err) {
    console.error('加载成员数据出错:', err)
    // 如果 JSON 文件不存在，使用空数组
    activeMembers.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadMembers)
</script>

<style scoped>
.members-container {
  max-width: 1100px;
  margin: 2rem auto;
}

.status-message {
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.member-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 24px 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.member-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
  border: 2px solid var(--vp-c-brand-soft);
}

.member-card h3 {
  font-size: 1.1rem;
  margin: 0 0 4px;
  color: var(--vp-c-text-1);
}

.member-role {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 0.85rem;
  margin: 0 0 6px;
}

.member-bio {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  line-height: 1.5;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.member-stats {
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}

.bilibili-link {
  display: inline-block;
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.bilibili-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}
</style>