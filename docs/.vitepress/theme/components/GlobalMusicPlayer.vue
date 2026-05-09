<template>
  <div class="music-player">
    <!-- 主按钮 -->
    <div class="player-toggle" @click="togglePlayer" :class="{ active: isPlayerVisible }">
      <div class="toggle-icon">
        <span v-if="!isPlayerVisible" class="icon music-icon">🎵</span>
        <span v-else class="icon close-icon">✕</span>
      </div>
      <div class="toggle-ripple"></div>
    </div>
    
    <transition name="player-fade">
      <div class="player-body" v-show="isPlayerVisible">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="loading">
          <span class="loading-spinner"></span>
          <p>{{ loadingText }}</p>
        </div>

        <!-- 主界面 -->
        <div v-else class="player-content">
          <!-- 当前歌曲信息 -->
          <div v-if="currentTrack" class="track-info">
            <p class="track-name">{{ currentTrack.name }}</p>
            <p class="track-artist">{{ currentTrack.artist }}</p>
          </div>
          <div v-else class="empty-player">
            <p>点击下方按钮来选首歌吧 🎶</p>
          </div>

          <!-- 播放器控件 -->
          <audio 
            v-if="currentTrack"
            ref="audioPlayer" 
            :src="currentTrack.url" 
            controls 
            @loadedmetadata="setVolume"
          ></audio>

          <!-- 功能按钮组 -->
          <div class="action-buttons">
            <button @click="showSearch = !showSearch" class="action-btn">
              🔍 {{ showSearch ? '关闭搜索' : '搜索点歌' }}
            </button>
            <button @click="showPlaylist = !showPlaylist" class="action-btn">
              📋 {{ showPlaylist ? '关闭歌单' : '指定歌单' }}
            </button>
            <button @click="playRandomTrack" class="action-btn">
              🎲 随机一首
            </button>
          </div>

          <!-- 搜索面板 -->
          <div v-if="showSearch" class="search-panel">
            <div class="search-bar">
              <input 
                v-model="searchKeyword" 
                @keyup.enter="searchSongs" 
                placeholder="输入歌名、歌手..."
                class="search-input"
              />
              <button @click="searchSongs" class="search-btn">搜索</button>
            </div>
            <!-- 搜索结果列表 -->
            <div v-if="searchResults.length > 0" class="search-results">
              <div 
                v-for="song in searchResults" 
                :key="song.id" 
                class="search-item"
                @click="playSong(song)"
              >
                <span class="song-name">{{ song.name }}</span>
                <span class="song-artist"> - {{ song.artists }}</span>
              </div>
            </div>
            <div v-else-if="searched" class="no-result">未找到相关歌曲</div>
          </div>

          <!-- 指定歌单面板 -->
          <div v-if="showPlaylist" class="playlist-panel">
            <div 
              v-for="(track, index) in playlist" 
              :key="track.id" 
              class="playlist-item"
              :class="{ active: currentTrack?.id === track.id }"
              @click="playSong(track)"
            >
              <span class="playlist-index">{{ index + 1 }}.</span>
              <span class="playlist-name">{{ track.name }}</span>
              <span class="playlist-artist"> - {{ track.artist }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { trackIds } from '../playlist.js';

const apiBase = 'https://api.somb.xyz';
const currentTrack = ref(null);
const audioPlayer = ref(null);
const isPlayerVisible = ref(false);
const isLoading = ref(false);
const loadingText = ref('加载中...');

// 搜索相关
const showSearch = ref(false);
const searchKeyword = ref('');
const searchResults = ref([]);
const searched = ref(false);

// 指定歌单相关
const showPlaylist = ref(false);
const playlist = ref([]);

// 设置音量
function setVolume() {
  if (audioPlayer.value) audioPlayer.value.volume = 0.4;
}

// 获取单首歌曲详情和URL
async function fetchTrackDetails(id) {
  try {
    const [detailRes, urlRes] = await Promise.all([
      fetch(`${apiBase}/song/detail?ids=${id}`),
      fetch(`${apiBase}/song/url?id=${id}`)
    ]);
    const detailData = await detailRes.json();
    const urlData = await urlRes.json();
    if (detailData.code !== 200 || !detailData.songs[0]) return null;
    
    const song = detailData.songs[0];
    const url = urlData.code === 200 ? urlData.data[0]?.url : null;
    return {
      id: song.id,
      name: song.name,
      artist: song.ar.map(a => a.name).join('/'),
      url: url,
      artists: song.ar.map(a => a.name).join('/'),
    };
  } catch (e) {
    console.error('获取歌曲失败:', e);
    return null;
  }
}

// 搜索歌曲
async function searchSongs() {
  if (!searchKeyword.value.trim()) return;
  isLoading.value = true;
  loadingText.value = '搜索中...';
  showSearch.value = true;
  searched.value = true;
  
  try {
    const res = await fetch(`${apiBase}/search?keywords=${encodeURIComponent(searchKeyword.value)}`);
    const data = await res.json();
    if (data.code === 200 && data.result.songs) {
      searchResults.value = data.result.songs.map(s => ({
        id: s.id,
        name: s.name,
        artists: s.artists ? s.artists.map(a => a.name).join('/') : '未知歌手',
      }));
    } else {
      searchResults.value = [];
    }
  } catch (e) {
    console.error('搜索失败:', e);
  }
  isLoading.value = false;
}

// 播放指定歌曲
async function playSong(song) {
  isLoading.value = true;
  loadingText.value = '获取歌曲中...';
  const track = song.url ? song : await fetchTrackDetails(song.id);
  if (track && track.url) {
    currentTrack.value = track;
    await nextTick();
    // 等待 audio 元素渲染完成后再播放
    setTimeout(() => {
      if (audioPlayer.value) {
        audioPlayer.value.volume = 0.4;
        audioPlayer.value.play().catch(err => {
          // 如果还是被阻止，再试一次
          setTimeout(() => {
            if (audioPlayer.value) {
              audioPlayer.value.play().catch(() => {});
            }
          }, 200);
        });
      }
    }, 100);
  }
  isLoading.value = false;
}

// 随机播放
function getRandomTrackId() {
  return trackIds[Math.floor(Math.random() * trackIds.length)];
}
async function playRandomTrack() {
  isLoading.value = true;
  loadingText.value = '随机挑选中...';
  const track = await fetchTrackDetails(getRandomTrackId());
  if (track && track.url) {
    currentTrack.value = track;
    await nextTick();
    setTimeout(() => {
      if (audioPlayer.value) {
        audioPlayer.value.volume = 0.4;
        audioPlayer.value.play().catch(err => {
          setTimeout(() => {
            if (audioPlayer.value) {
              audioPlayer.value.play().catch(() => {});
            }
          }, 200);
        });
      }
    }, 100);
  }
  isLoading.value = false;
}

// 初始化指定歌单
async function initPlaylist() {
  const tracks = await Promise.all(trackIds.map(async (id) => {
    const detail = await fetchTrackDetails(id);
    return detail ? { id: detail.id, name: detail.name, artist: detail.artist } : null;
  }));
  playlist.value = tracks.filter(Boolean);
}
initPlaylist();

// 主按钮交互
function togglePlayer() {
  isPlayerVisible.value = !isPlayerVisible.value;
  if (isPlayerVisible.value && !currentTrack.value) {
    playRandomTrack();
  }
}
</script>

<style scoped>
.music-player {
  /* 不需要定位，由外层 wrapper 控制 */
}

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
}

.player-toggle.active {
  background: #1890ff;
  color: white;
  box-shadow: 0 4px 15px rgba(24, 144, 255, 0.3);
}

.player-toggle.active:hover {
  background: #40a9ff;
}

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

.player-body {
  position: absolute;
  bottom: 70px;
  left: 0;
  width: 260px;
  max-height: 380px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 14px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  color: #666;
  font-size: 13px;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #e0e0e0;
  border-top: 3px solid #1890ff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.player-content { }

.empty-player { text-align: center; padding: 20px; color: #888; font-size: 13px; }

.track-info {
  margin-bottom: 10px;
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
  margin-bottom: 10px;
  border-radius: 8px;
  height: 36px;
}

.action-buttons {
  display: flex;
  gap: 6px;
  margin: 10px 0;
  flex-wrap: wrap;
}
.action-btn {
  flex: 1;
  background: #f5f5f5;
  border: none;
  padding: 6px 0;
  border-radius: 15px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.action-btn:hover { background: #e6f4ff; color: #1890ff; }

.search-panel, .playlist-panel {
  max-height: 180px;
  overflow-y: auto;
  margin-top: 8px;
  border-top: 1px solid #f0f0f0;
  padding-top: 8px;
}
.search-bar { display: flex; gap: 6px; margin-bottom: 8px; }
.search-input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 12px;
  outline: none;
}
.search-input:focus { border-color: #1890ff; }
.search-btn {
  background: #1890ff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  cursor: pointer;
}
.search-results, .playlist-panel { }
.search-item, .playlist-item {
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-item:hover, .playlist-item:hover { background: #f5f8ff; }
.search-item { display: flex; }
.song-name { font-weight: 500; }
.song-artist { color: #999; margin-left: 4px; overflow: hidden; text-overflow: ellipsis; }
.playlist-item.active { background: #e6f4ff; color: #1890ff; }
.playlist-index { color: #bbb; margin-right: 6px; font-size: 11px; }
.playlist-artist { color: #bbb; font-size: 11px; }
.no-result { text-align: center; color: #999; font-size: 12px; padding: 10px; }

@media (max-width: 768px) {
  .player-body { width: 250px; }
}
</style>

<style>
/* 全局样式：确保播放器固定在左下角 */
#global-music-player-wrapper {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
}
</style>