// fetch-and-save.mjs
// 从 members-config.txt 读取配置 → 抓取B站信息 → 下载头像 → 生成JSON文件

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ========== 配置 ==========
const CONFIG_FILE = join(__dirname, 'members-config.txt')
const OUTPUT_JSON = join(__dirname, 'docs', 'public', 'members-data.json')
const AVATARS_DIR = join(__dirname, 'docs', 'public', 'avatars')
const API_BASE = 'https://uapis.cn/api/v1/social/bilibili/userinfo'
const DELAY_MS = 500 // 请求间隔

// ========== 读取配置文件 ==========
function readConfig() {
  console.log('📖 读取配置文件:', CONFIG_FILE)
  
  if (!existsSync(CONFIG_FILE)) {
    console.error('❌ 配置文件不存在:', CONFIG_FILE)
    process.exit(1)
  }
  
  const content = readFileSync(CONFIG_FILE, 'utf-8')
  const lines = content.split('\n').filter(line => line.trim())
  
  const configs = []
  for (const line of lines) {
    const parts = line.trim().split(/\s+/)
    if (parts.length >= 2) {
      configs.push({
        uid: parts[0],
        custom_role: parts.slice(1).join(' ')
      })
    }
  }
  
  console.log(`✅ 读取到 ${configs.length} 个成员配置\n`)
  return configs
}

// ========== 下载头像 ==========
async function downloadAvatar(uid, faceUrl) {
  try {
    // 确保目录存在
    if (!existsSync(AVATARS_DIR)) {
      mkdirSync(AVATARS_DIR, { recursive: true })
    }
    
    const ext = faceUrl.split('.').pop()?.split('?')[0] || 'jpg'
    const filename = `${uid}.${ext}`
    const filepath = join(AVATARS_DIR, filename)
    
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    
    const response = await fetch(faceUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.bilibili.com/'
      }
    })
    
    clearTimeout(timeout)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const buffer = Buffer.from(await response.arrayBuffer())
    writeFileSync(filepath, buffer)
    
    // 返回相对路径
    return `/avatars/${filename}`
  } catch (err) {
    console.log(`   ⚠️ 头像下载失败 (${uid}): ${err.message}`)
    return '/logo.png'
  }
}

// ========== 获取B站用户信息 ==========
async function fetchUser(uid) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch(`${API_BASE}?uid=${uid}`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    })
    
    clearTimeout(timeout)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const data = await response.json()
    
    if (!data || !data.mid) {
      throw new Error('返回数据无效')
    }
    
    return data
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('请求超时')
    }
    throw err
  }
}

// ========== 格式化粉丝数 ==========
const formatFollower = (num) => {
  if (!num && num !== 0) return '?'
  if (num >= 10000) return (num / 10000).toFixed(1) + '万'
  return num.toString()
}

// ========== 延迟函数 ==========
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// ========== 主函数 ==========
async function main() {
  console.log('🍁 枫竹音社 - 成员信息抓取 & 头像下载工具')
  console.log('='.repeat(60))
  
  const memberConfigs = readConfig()
  console.log(`📋 共 ${memberConfigs.length} 位成员待处理\n`)
  
  const members = []
  let successCount = 0
  let avatarSuccessCount = 0
  
  // 确保 avatars 目录存在
  if (!existsSync(AVATARS_DIR)) {
    mkdirSync(AVATARS_DIR, { recursive: true })
    console.log('📁 创建头像目录:', AVATARS_DIR)
  }
  
  for (let i = 0; i < memberConfigs.length; i++) {
    const config = memberConfigs[i]
    const progress = `[${i + 1}/${memberConfigs.length}]`
    
    console.log(`${progress} 📡 获取 UID:${config.uid} (${config.custom_role})...`)
    
    try {
      // 1. 获取B站用户信息
      const data = await fetchUser(config.uid)
      
      // 2. 处理签名（合并多行）
      const cleanSign = (data.sign || '')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      
      // 3. 下载头像到本地
      console.log(`   📥 下载头像...`)
      const localFace = await downloadAvatar(config.uid, data.face)
      if (localFace !== '/logo.png') {
        avatarSuccessCount++
      }
      
      const member = {
        uid: config.uid,
        name: data.name || config.custom_role,
        face: localFace,
        custom_role: config.custom_role,
        sign: cleanSign,
        level: data.level || 0,
        follower: data.follower || 0
      }
      
      members.push(member)
      successCount++
      
      console.log(`   ✅ ${data.name} | Lv.${data.level} | ${formatFollower(data.follower)}粉`)
      console.log(`   🖼️ 头像: ${localFace}`)
      
    } catch (err) {
      console.log(`   ❌ 失败: ${err.message}`)
      
      // 使用备用数据
      const fallbackMember = {
        uid: config.uid,
        name: config.custom_role,
        face: '/logo.png',
        custom_role: config.custom_role,
        sign: '',
        level: 0,
        follower: 0
      }
      
      members.push(fallbackMember)
      console.log(`   ⚠️ 已使用备用数据`)
    }
    
    // 请求间隔
    if (i < memberConfigs.length - 1) {
      await delay(DELAY_MS)
    }
    
    console.log('')
  }
  
  // 按角色排序
  const roleOrder = ['官号', '团长', '副团长', '策划', '混音', '剪辑', '主唱', '鼓手', '吉他手', '贝斯手']
  members.sort((a, b) => {
    return roleOrder.indexOf(a.custom_role) - roleOrder.indexOf(b.custom_role)
  })
  
  // 保存 JSON 文件
  writeFileSync(OUTPUT_JSON, JSON.stringify(members, null, 2), 'utf-8')
  
  // 输出统计
  console.log('='.repeat(60))
  console.log('📊 处理完成统计:')
  console.log(`   ✅ 成员信息获取: ${successCount}/${memberConfigs.length}`)
  console.log(`   🖼️ 头像下载成功: ${avatarSuccessCount}/${memberConfigs.length}`)
  console.log(`   💰 API消耗积分: ${successCount * 4}`)
  console.log(`   📁 JSON文件: ${OUTPUT_JSON}`)
  console.log(`   📁 头像目录: ${AVATARS_DIR}`)
  console.log('='.repeat(60))
  console.log('\n✅ 全部完成！现在可以刷新网页查看效果了。')
}

// 运行
main().catch(err => {
  console.error('💥 脚本运行出错:', err)
  process.exit(1)
})