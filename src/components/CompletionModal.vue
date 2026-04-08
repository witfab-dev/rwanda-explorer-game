<template>
  <transition name="modal-bounce">
    <div v-if="show" class="modal-overlay" @click.self="$emit('play-again')">
      <div class="completion-card">
        <div class="modal-header">
          <div class="victory-crown">
            <i class="fas fa-crown"></i>
            <div class="crown-glow"></div>
          </div>
          <h2 class="victory-title">Wabikoze neza!</h2>
          <p class="victory-subtitle">Grand Explorer Achievement Unlocked</p>
        </div>
        
        <div class="modal-body">
          <div class="stats-grid">
            <div class="stat-pill">
              <i class="fas fa-map-location-dot"></i>
              <div class="stat-text">
                <span class="stat-label">Provinces</span>
                <span class="stat-val">5 / 5</span>
              </div>
            </div>
            <div class="stat-pill">
              <i class="fas fa-scroll"></i>
              <div class="stat-text">
                <span class="stat-label">Missions</span>
                <span class="stat-val">100%</span>
              </div>
            </div>
          </div>

          <div class="score-banner">
            <div class="score-label">Final Explorer Rating</div>
            <div class="score-value">{{ score }}</div>
            <div class="stars">
              <i v-for="i in 5" :key="i" class="fas fa-star"></i>
            </div>
          </div>
          
          <p class="summary-text">
            You've successfully traversed the Land of a Thousand Hills and mastered every challenge. 
            You are now an official Ambassador of Rwanda's Culture!
          </p>
          
          <div class="badge-shelf">
            <div 
              class="badge-item" 
              v-for="i in 5" 
              :key="i"
              :style="{ animationDelay: (i * 0.1) + 's' }"
            >
              <div class="badge-icon">
                <i class="fas fa-medal"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="$emit('play-again')" class="btn-restart">
            <i class="fas fa-rotate-right"></i>
            Explore Again
          </button>
          <button class="btn-share" @click="shareAchievement">
            <i class="fas fa-share-nodes"></i>
            Share Rank
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['play-again'])

const shareAchievement = () => {
  const text = `I just mastered the Rwanda Explorer game with a score of ${props.score}! 🇷🇼✨`
  
  if (navigator.share) {
    navigator.share({
      title: 'Rwanda Explorer Master',
      text: text,
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err))
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(text)
    alert('Achievement copied to clipboard! Share it with your friends.')
  }
}
</script>

<style scoped>
/* Overlay Backdrop */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  padding: 20px;
}

/* Card Styling */
.completion-card {
  background: #ffffff;
  border-radius: 40px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 30px 100px rgba(0,0,0,0.5);
  text-align: center;
  overflow: hidden;
}

/* Victory Icon */
.victory-crown {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #fbbf24, #d97706);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 36px;
  color: white;
  position: relative;
}

.crown-glow {
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%);
  animation: pulse-glow 2s infinite;
}

/* Typography */
.victory-title {
  color: #1b4332;
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
}

.victory-subtitle {
  color: #52b788;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  margin-top: 5px;
}

/* Stats Layout */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 30px 0;
}

.stat-pill {
  background: #f8fafc;
  padding: 15px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  border: 1px solid #e2e8f0;
}

.stat-pill i { color: #2d6a4f; }
.stat-label { display: block; font-size: 0.65rem; color: #64748b; font-weight: 700; text-transform: uppercase; }
.stat-val { font-weight: 800; color: #0f172a; }

/* Score Section */
.score-banner {
  background: #1b4332;
  border-radius: 24px;
  padding: 24px;
  color: white;
  margin-bottom: 25px;
}

.score-value {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  margin: 10px 0;
  color: #fbbf24;
}

.stars { color: #fbbf24; display: flex; justify-content: center; gap: 5px; }

/* Medals Section */
.badge-shelf {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
}

.badge-item {
  width: 45px;
  height: 45px;
  background: #f0fdf4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  border: 2px solid #b7e4c7;
  animation: badge-float 3s infinite ease-in-out;
}

/* Actions */
.modal-footer {
  display: flex;
  gap: 12px;
}

.btn-restart, .btn-share {
  flex: 1;
  padding: 16px;
  border-radius: 18px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  border: none;
}

.btn-restart { background: #1b4332; color: white; }
.btn-share { background: #f1f5f9; color: #475569; }

.btn-restart:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(27, 67, 50, 0.2);
}

/* Animations */
@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

@keyframes badge-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Modal Transition */
.modal-bounce-enter-active {
  animation: bounce-in 0.5s;
}
.modal-bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}
</style>