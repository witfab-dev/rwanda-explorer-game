<template>
  <div class="district-info">
    <div class="district-header">
      <div class="header-main">
        <div class="title-group">
          <h2>{{ district.name }}</h2>
          <span class="district-nickname">{{ district.nickname }}</span>
        </div>
        <div v-if="isQuestCompleted" class="completed-badge">
          <div class="badge-glow"></div>
          <i class="fas fa-certificate"></i>
          <span>Region Mastered</span>
        </div>
      </div>
    </div>

    <div class="info-tabs">
      <button 
        @click="$emit('tab-change', 'culture')" 
        :class="['tab-btn', { active: activeTab === 'culture' }]"
      >
        <i class="fas fa-feather-pointed"></i>
        <span>Legacy & Culture</span>
      </button>
      <button 
        @click="$emit('tab-change', 'quest')" 
        :class="['tab-btn mission-tab', { active: activeTab === 'quest' }]"
      >
        <i class="fas fa-shield-halved"></i>
        <span>Active Mission</span>
        <span v-if="!isQuestCompleted" class="notification-dot"></span>
      </button>
    </div>

    <Transition name="fade-slide" mode="out-in">
      <div class="tab-content" v-if="activeTab === 'culture'" :key="'culture'">
        <div class="description-card">
          <div class="card-icon"><i class="fas fa-quote-left"></i></div>
          <p>{{ district.description }}</p>
        </div>

        <div class="info-grid">
          <div class="content-section facts-box">
            <h3>
              <i class="fas fa-seedling"></i>
              Local Insight
            </h3>
            <ul class="facts-list">
              <li v-for="(fact, index) in district.facts" :key="index">
                <div class="list-marker"></div>
                <span>{{ fact }}</span>
              </li>
            </ul>
          </div>

          <div class="content-section">
            <h3>
              <i class="fas fa-map-location-dot"></i>
              Key Landmarks
            </h3>
            <div class="attractions-grid">
              <span 
                v-for="(attraction, index) in district.attractions" 
                :key="index"
                class="attraction-tag"
              >
                <i class="fas fa-diamond"></i>
                {{ attraction }}
              </span>
            </div>
          </div>
        </div>

        <div class="cultural-note">
          <div class="note-icon"><i class="fas fa-earth-africa"></i></div>
          <p>{{ getCulturalNote() }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  district: { type: Object, required: true },
  activeTab: { type: String, required: true },
  isQuestCompleted: { type: Boolean, default: false }
})

defineEmits(['tab-change'])

const getCulturalNote = () => {
  const notes = [
    'Rwanda is celebrated globally for "Umuganda"—a monthly day of community service.',
    'Traditional Imigongo art originated here, using organic materials to create geometric patterns.',
    'Agaseke baskets are symbols of peace and are often gifted at traditional weddings.',
    'The "Land of a Thousand Hills" is a world leader in digital transformation and green energy.'
  ]
  return notes[Math.floor(Math.random() * notes.length)]
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

.district-info {
  background: #ffffff;
  border-radius: 28px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  font-family: 'Plus Jakarta Sans', sans-serif;
  border: 1px solid #f1f5f9;
}

/* --- Header Section --- */
.district-header {
  margin-bottom: 28px;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.district-header h2 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 800;
  color: #1b4332;
  letter-spacing: -1px;
}

.district-nickname {
  color: #52b788;
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.completed-badge {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #1b4332;
  color: #fff;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.85rem;
  overflow: hidden;
}

.badge-glow {
  position: absolute;
  top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shine 3s infinite;
}

@keyframes shine {
  to { left: 100%; }
}

/* --- Tabs System --- */
.info-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  padding: 6px;
  background: #f8fafc;
  border-radius: 20px;
}

.tab-btn {
  flex: 1;
  padding: 14px;
  border: none;
  background: transparent;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 700;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.tab-btn.active {
  background: #ffffff;
  color: #1b4332;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.mission-tab.active {
  color: #2d6a4f;
}

.notification-dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 15px;
  border: 2px solid #f8fafc;
}

/* --- Content Styling --- */
.description-card {
  background: #f0fdf4;
  padding: 24px;
  border-radius: 24px;
  margin-bottom: 32px;
  display: flex;
  gap: 20px;
  border-left: 6px solid #2d6a4f;
}

.card-icon {
  font-size: 1.5rem;
  color: #b7e4c7;
}

.description-card p {
  margin: 0;
  line-height: 1.7;
  color: #1e293b;
  font-size: 1.05rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
}

.content-section h3 {
  font-size: 1.1rem;
  font-weight: 800;
  color: #1b4332;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.facts-list {
  list-style: none;
  padding: 0;
}

.facts-list li {
  padding: 12px 0;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  color: #475569;
  font-size: 0.95rem;
  border-bottom: 1px solid #f1f5f9;
}

.list-marker {
  min-width: 8px;
  height: 8px;
  background: #52b788;
  border-radius: 2px;
  margin-top: 6px;
}

.attractions-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.attraction-tag {
  padding: 10px 18px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.attraction-tag i {
  font-size: 8px;
  color: #52b788;
}

.attraction-tag:hover {
  background: #1b4332;
  color: white;
  border-color: #1b4332;
}

.cultural-note {
  background: #1b4332;
  padding: 24px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #fff;
}

.note-icon {
  width: 50px;
  height: 50px;
  background: rgba(255,255,255,0.1);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.cultural-note p {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  opacity: 0.9;
}

/* --- Transitions --- */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from { opacity: 0; transform: translateX(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-20px); }

@media (max-width: 768px) {
  .info-grid { grid-template-columns: 1fr; }
  .district-header h2 { font-size: 1.8rem; }
}
</style>