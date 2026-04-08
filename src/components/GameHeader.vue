<template>
  <header class="game-header">
    <div class="logo-section">
      <div class="logo-icon">
        <i class="fas fa-mountain-sun"></i>
      </div>
      <div class="logo-text">
        <h1>Rwanda Explorer</h1>
        <div class="subtitle">
          <span class="pulse-dot"></span>
          <p>Discover the Land of a Thousand Hills</p>
        </div>
      </div>
    </div>
    
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-icon-wrapper">
          <i class="fas fa-map-location-dot"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Explored</span>
          <span class="stat-value">
            {{ discoveredCount }}<small>/5</small>
          </span>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon-wrapper">
          <i class="fas fa-medal"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Missions</span>
          <span class="stat-value">
            {{ completedMissions }}<small>/{{ totalMissions }}</small>
          </span>
        </div>
      </div>
      
      <div class="stat-card score-card">
        <div class="score-glow"></div>
        <div class="stat-icon-wrapper gold">
          <i class="fas fa-crown"></i>
        </div>
        <div class="stat-info">
          <span class="stat-label">Total XP</span>
          <span class="stat-value">{{ score.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
/**
 * PROPS DEFINITION
 * These values are passed down from the parent RwandaExplorer component
 */
defineProps({
  discoveredCount: {
    type: Number,
    required: true,
    default: 0
  },
  completedMissions: {
    type: Number,
    required: true,
    default: 0
  },
  totalMissions: {
    type: Number,
    required: true,
    default: 5
  },
  score: {
    type: Number,
    required: true,
    default: 0
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

.game-header {
  /* Dark Green Glassmorphism Background */
  background: rgba(13, 46, 32, 0.85);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  padding: 16px 32px;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  animation: slideDown 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 100;
}

/* --- Entrance Animation --- */
@keyframes slideDown {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* --- Logo & Title --- */
.logo-section {
  display: flex;
  align-items: center;
  gap: 18px;
}

.logo-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #40916c, #1b4332);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  box-shadow: 0 8px 20px rgba(45, 106, 79, 0.3);
}

.logo-text h1 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(to right, #ffffff, #b7e4c7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
}

.subtitle p {
  margin: 0;
  opacity: 0.7;
  font-size: 0.85rem;
  font-weight: 500;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #52b788;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(82, 183, 136, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(82, 183, 136, 0); }
  100% { box-shadow: 0 0 0 0 rgba(82, 183, 136, 0); }
}

/* --- Stats Display --- */
.stats-container {
  display: flex;
  gap: 12px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 18px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.2);
}

.stat-icon-wrapper {
  font-size: 1.2rem;
  color: #74c69d;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #94a3b8;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1.1;
  color: #f8fafc;
}

.stat-value small {
  font-size: 0.8rem;
  opacity: 0.5;
  font-weight: 400;
  margin-left: 2px;
}

/* --- Score Card (Specialized) --- */
.score-card {
  background: linear-gradient(135deg, #2d6a4f, #1b4332);
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.score-glow {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.stat-icon-wrapper.gold {
  color: #ffd700;
  filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.4));
}

.score-card .stat-label {
  color: #b7e4c7;
}

/* --- Responsive Layout --- */
@media (max-width: 950px) {
  .game-header {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
  
  .logo-section {
    width: 100%;
    justify-content: center;
  }

  .stats-container {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .stat-card {
    flex: 1;
    min-width: 130px;
  }
}
</style>