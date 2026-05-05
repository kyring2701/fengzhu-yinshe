<template>
  <div class="music-player" v-if="currentTrack">
    <div class="player-toggle" @click="togglePlayer" :class="{ active: isPlayerVisible }">
      <div class="toggle-icon">
        <span v-if="!isPlayerVisible" class="icon music-icon">🎵</span>
        <span v-else class="icon close-icon">✕</span>
      </div>
      <div class="toggle-ripple"></div>
    </div>
    
    <transition name="player-fade">
      <div class="player-body" v-show="isPlayerVisible">
        <div class="track-info">
          <p class="track-name">{{ currentTrack.name }}</p>
          <p class="track-artist">{{ currentTrack.artist }}</p>
        </div>
        <audio 
          ref="audioPlayer" 
          :src="currentTrack.url" 
          controls 
          @loadedmetadata="setVolume"
        ></audio>
        <div class="playlist">
          <p class="playlist-title">🎶 社团精选</p>
          <div
            v-for="(track, index) in playlist"
            :key="track.id"
            class="playlist-item"
            :class="{ active: currentTrack.id === track.id }"
            @click="switchTrack(track)"
          >
            <span class="playlist-index">{{ index + 1 }}.</span>
            <span class="playlist-name">{{ track.name }}</span>
            <span class="playlist-artist"> - {{ track.artist }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 从独立配置文件引入歌曲ID列表
import { trackIds } from '../playlist.js';

const apiBase = 'https://api.somb.xyz';
const playlist = ref([]);
const currentTrack = ref(null);
const audioPlayer = ref(null);
const isPlayerVisible = ref(false);

// 设置音量为40%
function setVolume() {
  if (audioPlayer.value) {
    audioPlayer.value.volume = 0.4;
  }
}

async function fetchTrackDetails(id) {
  try {
    const detailRes = await fetch(`${apiBase}/song/detail?ids=${id}`);
    const detailData = await detailRes.json();
    if (detailData.code !== 200 || !detailData.songs[0]) return null;

    const song = detailData.songs[0];
    const urlRes = await fetch(`${apiBase}/song/url?id=${id}`);
    const urlData = await urlRes.json();
    const url = urlData.code === 200 ? urlData.data[0]?.url : null;

    return {
      id: song.id,
      name: song.name,
      artist: song.ar.map(a => a.name).join('/'),
      url: url,
    };
  } catch (error) {
    console.error(`获取歌曲 ${id} 失败:`, error);
    return null;
  }
}

onMounted(async () => {
  const tracks = await Promise.all(trackIds.map(fetchTrackDetails));
  playlist.value = tracks.filter(t => t && t.url);
  if (playlist.value.length > 0) {
    currentTrack.value = playlist.value[0];
  }
});

function togglePlayer() {
  isPlayerVisible.value = !isPlayerVisible.value;
  
  // 如果展开播放器
  if (isPlayerVisible.value) {
    // 如果还没加载过歌曲，默认选第一首
    if (!currentTrack.value && playlist.value.length > 0) {
      currentTrack.value = playlist.value[0];
    }
    // 自动播放
    if (audioPlayer.value && currentTrack.value) {
      audioPlayer.value.volume = 0.4;
      audioPlayer.value.play().catch(err => {
        console.log('自动播放被阻止，请手动点击播放:', err);
      });
    }
  }
  // 关闭面板时不再暂停，保持播放
}

function switchTrack(track) {
  currentTrack.value = track;
  setTimeout(() => {
    if (audioPlayer.value) {
      audioPlayer.value.load();
      // 确保切换歌曲后音量保持40%
      audioPlayer.value.addEventListener('loadedmetadata', setVolume, { once: true });
      audioPlayer.value.play();
    }
  }, 0);
}
</script>

<style scoped>
/* 播放器容器 */
.music-player {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #1a1a1a;
}

/* 按钮基础样式 */
.player-toggle {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(15px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s ease,
              background 0.3s ease;
}

.player-toggle:hover {
  transform: scale(1.08) translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.95);
}

.player-toggle:active {
  transform: scale(0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 激活状态 */
.player-toggle.active {
  background: #1890ff;
  color: white;
  box-shadow: 0 4px 15px rgba(24, 144, 255, 0.3);
}

.player-toggle.active:hover {
  background: #40a9ff;
}

/* 图标动画 */
.toggle-icon {
  position: relative;
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.player-toggle:hover .toggle-icon {
  transform: rotate(15deg);
}

.player-toggle.active .toggle-icon {
  transform: rotate(90deg);
}

/* 波纹效果 */
.toggle-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(24, 144, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.player-toggle:active .toggle-ripple {
  width: 200%;
  height: 200%;
}

/* 播放器面板动画 */
.player-fade-enter-active,
.player-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.player-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.player-fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

/* 面板样式 */
.player-body {
  position: absolute;
  bottom: 70px;
  left: 0;
  width: 280px;
  max-height: 380px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 16px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.track-info {
  margin-bottom: 12px;
}

.track-name {
  font-weight: 600;
  margin: 0 0 4px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artist {
  margin: 0;
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

audio {
  width: 100%;
  margin-bottom: 14px;
  border-radius: 8px;
}

audio::-webkit-media-controls-play-button,
audio::-webkit-media-controls-panel {
  background-color: rgba(245, 245, 245, 0.8);
}

.playlist-title {
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin: 0 0 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f0f0f0;
}

.playlist-item {
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.25s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}

.playlist-item:hover {
  background-color: #f5f8ff;
  transform: translateX(4px);
}

.playlist-item.active {
  background-color: #e6f4ff;
  color: #1890ff;
  font-weight: 500;
}

.playlist-index {
  color: #bbb;
  margin-right: 6px;
  font-size: 11px;
}

.playlist-artist {
  color: #bbb;
  font-size: 11px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .music-player {
    bottom: 10px;
    left: 10px;
  }
  .player-body {
    width: 260px;
    max-height: 340px;
  }
}
</style>