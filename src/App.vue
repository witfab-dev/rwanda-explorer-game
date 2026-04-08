<template>
  <div class="rwanda-explorer">
    <GameHeader 
      :discovered-count="discoveredLocations.length"
      :completed-missions="completedQuests.length"
      :total-missions="totalMissions"
      :score="score"
    />
    
    <div class="game-container">
      <div class="map-viewport">
        <MapExplorer 
          :discovered-locations="discoveredLocations"
          :completed-quests="completedQuests"
          :current-district="currentDistrict"
          :province-data="provinceGeoData"
          @district-selected="handleDistrictSelect"
        />
      </div>
      
      <div class="info-panel">
        <Transition name="fade-slide" mode="out-in">
          <div :key="currentDistrict || 'welcome'" class="interaction-card">
            
            <WelcomeScreen v-if="!currentDistrict" />
            
            <template v-else>
              <div class="district-details">
                <DistrictInfo 
                  :district="currentDistrictData"
                  :active-tab="activeTab"
                  :is-quest-completed="isQuestCompleted(currentDistrict)"
                  @tab-change="activeTab = $event"
                />
                
                <div class="divider">
                  <span><i class="fas fa-scroll"></i> Current Mission</span>
                </div>

                <QuestPanel
                  :district-id="currentDistrict"
                  :quest-data="currentDistrictData.quest"
                  :is-completed="isQuestCompleted(currentDistrict)"
                  @quest-complete="handleQuestComplete"
                  @answer-submitted="handleAnswerSubmitted"
                />
              </div>
            </template>

          </div>
        </Transition>
      </div>
    </div>
    
    <AchievementNotification 
      :show="showAchievement"
      :message="achievementMessage"
      @close="showAchievement = false"
    />
    
    <CompletionModal 
      :show="gameCompleted"
      :score="score"
      @play-again="resetGame"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GameHeader from './components/GameHeader.vue'
import MapExplorer from './components/MapExplorer.vue'
import DistrictInfo from './components/DistrictInfo.vue'
import QuestPanel from './components/QuestPanel.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'
import AchievementNotification from './components/AchievementNotification.vue'
import CompletionModal from './components/CompletionModal.vue'
import { useGameState } from './composables/useGameState'
import { districtData, provinceGeoData } from './data/rwandaData'

const {
  currentDistrict,
  discoveredLocations,
  completedQuests,
  score,
  activeTab,
  showAchievement,
  achievementMessage,
  gameCompleted,
  totalMissions,
  handleDistrictSelect,
  handleQuestComplete,
  handleAnswerSubmitted,
  isQuestCompleted,
  resetGame
} = useGameState()

const currentDistrictData = computed(() => {
  return currentDistrict.value ? districtData[currentDistrict.value] : null
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

.rwanda-explorer {
  max-width: 1600px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  /* Deep Rwandan Forest Gradient */
  background: radial-gradient(circle at top left, #1b4332, #081c15);
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
}

.game-container {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  margin-top: 20px;
}

/* Map Section */
.map-viewport {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: fit-content;
}

/* Info Side Panel */
.info-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.interaction-card {
  background: #ffffff;
  border-radius: 30px;
  min-height: 600px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  color: #1a1a1a;
  overflow: hidden;
}

.district-details {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Visual Divider for Mission Section */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px;
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider span {
  padding: 0 15px;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Responsive Scaling */
@media (max-width: 1200px) {
  .game-container {
    grid-template-columns: 1fr;
  }
  
  .map-viewport {
    height: 500px;
  }

  .rwanda-explorer {
    padding: 10px;
  }
}

/* Scrollbar Styles */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: #40916c;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #52b788;
}
</style>