import { ref } from 'vue'

export function useGameState() {
  const currentDistrict = ref(null)
  const activeTab = ref('culture')
  const discoveredLocations = ref([])
  const completedQuests = ref([])
  const score = ref(0)
  const showAchievement = ref(false)
  const achievementMessage = ref('')
  const gameCompleted = ref(false)

  const totalMissions = 5

  const handleDistrictSelect = (districtId) => {
    currentDistrict.value = districtId
    activeTab.value = 'culture'
    
    if (!discoveredLocations.value.includes(districtId)) {
      discoveredLocations.value.push(districtId)
      score.value += 50
      showAchievementMessage(`Discovered ${districtId}! +50 points`)
    }
  }

  const handleQuestComplete = (districtId) => {
    if (!completedQuests.value.includes(districtId)) {
      completedQuests.value.push(districtId)
      score.value += 100
      showAchievementMessage(`Mission Complete in ${districtId}! +100 points`)
      
      if (completedQuests.value.length === totalMissions) {
        setTimeout(() => {
          gameCompleted.value = true
        }, 1000)
      }
    }
  }

  const handleAnswerSubmitted = (isCorrect) => {
    if (isCorrect) {
      handleQuestComplete(currentDistrict.value)
    }
  }

  const isQuestCompleted = (districtId) => {
    return completedQuests.value.includes(districtId)
  }

  const showAchievementMessage = (message) => {
    achievementMessage.value = message
    showAchievement.value = true
    setTimeout(() => {
      showAchievement.value = false
    }, 3000)
  }

  const resetGame = () => {
    currentDistrict.value = null
    discoveredLocations.value = []
    completedQuests.value = []
    score.value = 0
    gameCompleted.value = false
    activeTab.value = 'culture'
  }

  return {
    currentDistrict,
    activeTab,
    discoveredLocations,
    completedQuests,
    score,
    showAchievement,
    achievementMessage,
    gameCompleted,
    totalMissions,
    handleDistrictSelect,
    handleQuestComplete,
    handleAnswerSubmitted,
    isQuestCompleted,
    resetGame
  }
}