<template>
  <div class="quest-panel" :class="{ 'is-completed': isCompleted }">
    <div class="quest-header" :class="{ 'header-success': isCompleted }">
      <div class="header-left">
        <div class="status-badge">
          <i :class="isCompleted ? 'fas fa-check-double' : 'fas fa-bolt-lightning'"></i>
          <span>{{ isCompleted ? 'Umukoro Warangiye' : 'Active Mission' }}</span>
        </div>
      </div>
      <div class="header-right">
        <div class="reward-tag" v-if="!isCompleted">
          <i class="fas fa-gem"></i>
          <span>100 XP</span>
        </div>
        <div class="reward-tag completed" v-else>
          <i class="fas fa-circle-check"></i>
          <span>Earned</span>
        </div>
      </div>
    </div>

    <div class="quest-body">
      <div class="mission-intro">
        <h3 class="quest-title">{{ questData.title }}</h3>
        <p class="quest-desc">{{ questData.description }}</p>
      </div>

      <Transition name="content-fade" mode="out-in">
        <div v-if="!isCompleted" class="challenge-area">
          <div class="question-box">
            <div class="q-icon"><i class="fas fa-quote-left"></i></div>
            <p>{{ questData.question }}</p>
          </div>

          <div class="options-grid">
            <button
              v-for="(option, index) in questData.options"
              :key="index"
              @click="selectOption(option)"
              :class="['option-card', {
                'is-selected': selectedOption === option,
                'is-correct': showResult && option === questData.correct,
                'is-incorrect': showResult && selectedOption === option && option !== questData.correct
              }]"
              :disabled="showResult"
            >
              <div class="option-index">{{ String.fromCharCode(65 + index) }}</div>
              <div class="option-text">{{ option }}</div>
              <div class="option-marker">
                <i v-if="showResult && option === questData.correct" class="fas fa-check"></i>
                <i v-if="showResult && selectedOption === option && option !== questData.correct" class="fas fa-times"></i>
              </div>
            </button>
          </div>

          <div class="action-footer">
            <Transition name="slide-up">
              <div v-if="feedback" :class="['feedback-toast', feedbackType]">
                <i :class="feedbackType === 'success' ? 'fas fa-circle-check' : 'fas fa-circle-exclamation'"></i>
                {{ feedback }}
              </div>
            </Transition>

            <div class="button-group">
              <button
                v-if="!showResult"
                @click="submitAnswer"
                class="btn-primary"
                :disabled="!selectedOption"
              >
                <span>Confirm Selection</span>
                <i class="fas fa-arrow-right"></i>
              </button>

              <button
                v-if="showResult && !isCorrect"
                @click="resetQuest"
                class="btn-retry"
              >
                <i class="fas fa-rotate-right"></i>
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>

        <div v-else class="celebration-area">
          <div class="trophy-wrapper">
            <div class="confetti-ring"></div>
            <i class="fas fa-award"></i>
          </div>
          <h4>Wabikoze neza!</h4>
          <p>You have mastered the knowledge of <strong>{{ districtId }}</strong>.</p>
          
          <div class="unlock-card">
            <div class="unlock-icon"><i class="fas fa-unlock"></i></div>
            <div class="unlock-info">
              <span class="unlock-label">New Entry Added</span>
              <span class="unlock-val">Rwanda Cultural Archive</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  districtId: { type: String, required: true },
  questData: { type: Object, required: true },
  isCompleted: { type: Boolean, default: false }
})

const emit = defineEmits(['quest-complete', 'answer-submitted'])

const selectedOption = ref('')
const showResult = ref(false)
const feedback = ref('')
const feedbackType = ref('')
const isCorrect = ref(false)

const selectOption = (option) => {
  if (!showResult.value) {
    selectedOption.value = option
    feedback.value = ''
  }
}

const submitAnswer = () => {
  if (!selectedOption.value) return
  isCorrect.value = selectedOption.value === props.questData.correct
  showResult.value = true

  if (isCorrect.value) {
    feedback.value = 'Correct! Outstanding work.'
    feedbackType.value = 'success'
    emit('quest-complete', props.districtId)
    emit('answer-submitted', true)
  } else {
    feedback.value = 'That is not quite it. Try again.'
    feedbackType.value = 'error'
    emit('answer-submitted', false)
  }
}

const resetQuest = () => {
  selectedOption.value = ''
  showResult.value = false
  feedback.value = ''
  feedbackType.value = ''
  isCorrect.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

.quest-panel {
  background: #ffffff;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
  font-family: 'Plus Jakarta Sans', sans-serif;
  border: 1px solid #f1f5f9;
}

/* --- Header --- */
.quest-header {
  background: #1e293b;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.header-success {
  background: #065f46;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.reward-tag {
  background: rgba(255, 215, 0, 0.15);
  padding: 6px 14px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.8rem;
  color: #fbbf24;
  border: 1px solid rgba(255, 215, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 6px;
}

.reward-tag.completed {
  background: rgba(255,255,255,0.1);
  color: #fff;
  border-color: rgba(255,255,255,0.2);
}

/* --- Body --- */
.quest-body {
  padding: 32px;
}

.mission-intro {
  margin-bottom: 28px;
}

.quest-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
}

.quest-desc {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* --- Question Box --- */
.question-box {
  background: #f8fafc;
  padding: 24px;
  border-radius: 20px;
  margin-bottom: 24px;
  position: relative;
  border: 1px solid #e2e8f0;
}

.q-icon {
  color: #cbd5e1;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.question-box p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #334155;
  line-height: 1.5;
}

/* --- Options Grid --- */
.options-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-card {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 16px;
  border: 2px solid #f1f5f9;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  width: 100%;
}

.option-card:hover:not(:disabled) {
  border-color: #94a3b8;
  transform: translateX(4px);
}

.option-index {
  width: 32px;
  height: 32px;
  background: #f1f5f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.8rem;
  margin-right: 16px;
  color: #64748b;
}

.option-text {
  flex: 1;
  font-weight: 600;
  color: #475569;
}

.option-card.is-selected {
  border-color: #3b82f6;
  background: #eff6ff;
}

.option-card.is-correct {
  border-color: #10b981;
  background: #f0fdf4;
}

.option-card.is-correct .option-text { color: #065f46; }

.option-card.is-incorrect {
  border-color: #ef4444;
  background: #fef2f2;
}

.option-card.is-incorrect .option-text { color: #991b1b; }

/* --- Footer --- */
.action-footer {
  margin-top: 32px;
}

.feedback-toast {
  padding: 14px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.feedback-toast.success { background: #dcfce7; color: #166534; }
.feedback-toast.error { background: #fee2e2; color: #991b1b; }

.btn-primary {
  width: 100%;
  padding: 18px;
  border-radius: 16px;
  border: none;
  background: #1b4332;
  color: white;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s;
}

.btn-primary:disabled {
  background: #e2e8f0;
  cursor: not-allowed;
  color: #94a3b8;
}

.btn-primary:hover:not(:disabled) {
  background: #2d6a4f;
  box-shadow: 0 10px 20px rgba(45, 106, 79, 0.2);
  transform: translateY(-2px);
}

.btn-retry {
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  font-weight: 700;
  cursor: pointer;
}

/* --- Celebration Area --- */
.celebration-area {
  text-align: center;
  padding: 20px 0;
}

.trophy-wrapper {
  font-size: 4rem;
  color: #fbbf24;
  margin-bottom: 24px;
  position: relative;
  display: inline-block;
}

.celebration-area h4 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #065f46;
  margin: 0 0 12px;
}

.unlock-card {
  margin-top: 32px;
  background: #f8fafc;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #e2e8f0;
}

.unlock-icon {
  width: 44px;
  height: 44px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.unlock-label {
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
}

.unlock-val {
  font-weight: 800;
  color: #334155;
}

/* --- Transitions --- */
.content-fade-enter-active, .content-fade-leave-active { transition: all 0.3s ease; }
.content-fade-enter-from, .content-fade-leave-to { opacity: 0; transform: translateY(10px); }

.slide-up-enter-active { transition: all 0.3s ease-out; }
.slide-up-enter-from { opacity: 0; transform: translateY(10px); }
</style>