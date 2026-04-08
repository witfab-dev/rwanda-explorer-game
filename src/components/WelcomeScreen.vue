<template>
  <div class="welcome-screen">
    <div class="welcome-content">
      <div class="welcome-hero">
        <div class="hero-ring ring-1"></div>
        <div class="hero-ring ring-2"></div>
        <div class="welcome-icon">
          <i class="fas fa-compass"></i>
        </div>
      </div>
      
      <h2 class="title-main">Murakaza Neza!</h2>
      <p class="title-sub">Rwanda Explorer: Journey Through the Land of a Thousand Hills</p>
      
      <div class="instruction-cards">
        <div class="instruction-card">
          <div class="card-glow"></div>
          <div class="card-icon">
            <i class="fas fa-map-marked-alt"></i>
          </div>
          <h3>Explore</h3>
          <p>Interact with the map to discover hidden locations across the 5 provinces.</p>
        </div>
        
        <div class="instruction-card">
          <div class="card-glow"></div>
          <div class="card-icon">
            <i class="fas fa-scroll"></i>
          </div>
          <h3>Learn</h3>
          <p>Uncover cultural secrets, historical landmarks, and natural wonders.</p>
        </div>
        
        <div class="instruction-card">
          <div class="card-glow"></div>
          <div class="card-icon">
            <i class="fas fa-tasks"></i>
          </div>
          <h3>Complete</h3>
          <p>Finish missions and solve riddles to earn XP and reach Master status.</p>
        </div>
      </div>

      <div class="fact-module">
        <div class="fact-header">
          <i class="fas fa-lightbulb"></i>
          <span>Urabizi? (Did you know?)</span>
        </div>
        <div class="fact-carousel">
          <Transition name="slide-fade" mode="out-in">
            <div :key="currentFact" class="fact-item">
              {{ facts[currentFact] }}
            </div>
          </Transition>
        </div>
      </div>

      <div class="start-hint">
        <div class="indicator">
          <i class="fas fa-hand-pointer"></i>
        </div>
        <span>The journey begins on the map. Select a region to enter.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const facts = [
  '🇷🇼 Known as "Le Pays des Mille Collines" (Land of a Thousand Hills).',
  '🦍 Home to one-third of the world\'s remaining mountain gorillas.',
  '☕ Rwandan coffee is consistently ranked among the world\'s finest.',
  '🌍 Rwanda is the most densely populated country in mainland Africa.',
  '🏆 Kigali is ranked as Africa\'s cleanest and safest capital city.',
  '🌳 The first country in the world to ban plastic bags completely.',
  '👩‍💼 Over 60% of Rwanda\'s parliament is female—the highest in the world.',
  '🎨 Imigongo art is made using cow dung and natural pigments.'
]

const currentFact = ref(0)
let factInterval = null

onMounted(() => {
  factInterval = setInterval(() => {
    currentFact.value = (currentFact.value + 1) % facts.length
  }, 6000)
})

onUnmounted(() => {
  if (factInterval) clearInterval(factInterval)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

.welcome-screen {
  background: #ffffff;
  border-radius: 32px;
  padding: 40px;
  max-width: 800px;
  margin: auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow: hidden;
  position: relative;
}

.welcome-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

/* --- Hero Icon Animation --- */
.welcome-hero {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #2d6a4f, #1b4332);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: white;
  box-shadow: 0 10px 25px rgba(27, 67, 50, 0.3);
  z-index: 2;
}

.hero-ring {
  position: absolute;
  border: 2px solid #52b788;
  border-radius: 50%;
  animation: ripple 3s infinite ease-out;
  opacity: 0;
}

.ring-2 { animation-delay: 1.5s; }

@keyframes ripple {
  0% { width: 40px; height: 40px; opacity: 0.8; }
  100% { width: 140px; height: 140px; opacity: 0; }
}

/* --- Typography --- */
.title-main {
  color: #1b4332;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -1px;
}

.title-sub {
  color: #526d5e;
  font-size: 1.1rem;
  margin-bottom: 40px;
  font-weight: 500;
}

/* --- Cards Grid --- */
.instruction-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.instruction-card {
  position: relative;
  padding: 24px 16px;
  background: #f8fafc;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.instruction-card:hover {
  transform: translateY(-8px);
  border-color: #b7e4c7;
  background: #ffffff;
  box-shadow: 0 15px 30px rgba(0,0,0,0.08);
}

.card-icon {
  width: 48px;
  height: 48px;
  background: rgba(45, 106, 79, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: #2d6a4f;
  font-size: 20px;
}

.instruction-card h3 {
  color: #1b4332;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.instruction-card p {
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.6;
}

/* --- Fact Carousel --- */
.fact-module {
  background: #f0fdf4;
  border: 1px dashed #b7e4c7;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 30px;
}

.fact-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #1b4332;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.fact-carousel {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fact-item {
  color: #2d6a4f;
  font-size: 1.05rem;
  font-weight: 500;
}

/* --- Start Hint --- */
.start-hint {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: #1b4332;
  border-radius: 100px;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 8px 20px rgba(27, 67, 50, 0.2);
}

.indicator {
  animation: finger-tap 1.5s infinite;
}

@keyframes finger-tap {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2) rotate(-10deg); }
}

/* --- Animations --- */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from { opacity: 0; transform: translateY(10px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-10px); }

@media (max-width: 768px) {
  .instruction-cards { grid-template-columns: 1fr; }
  .welcome-screen { padding: 24px; }
  .title-main { font-size: 1.8rem; }
}
</style>