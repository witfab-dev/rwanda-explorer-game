<template>
  <transition name="notification-slide">
    <div v-if="show" class="achievement-toast" role="alert">
      <div class="toast-shimmer"></div>

      <div class="icon-container">
        <div class="icon-hexagon">
          <i class="fas fa-trophy"></i>
        </div>
        <div class="icon-pulse"></div>
      </div>

      <div class="toast-body">
        <span class="toast-label">New Milestone</span>
        <h4 class="toast-message">{{ message }}</h4>
      </div>

      <button @click="handleClose" class="btn-close" aria-label="Close">
        <i class="fas fa-xmark"></i>
      </button>

      <div class="timer-track">
        <div 
          class="timer-bar" 
          :style="{ animationDuration: duration + 'ms' }"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 4000 // 4 seconds before auto-close
  }
});

const emit = defineEmits(['close']);

let timeout = null;

const handleClose = () => {
  if (timeout) clearTimeout(timeout);
  emit('close');
};

// Auto-dismiss logic whenever the notification is shown
watch(() => props.show, (newVal) => {
  if (newVal) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      handleClose();
    }, props.duration);
  }
});

onUnmounted(() => {
  if (timeout) clearTimeout(timeout);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;800&display=swap');

.achievement-toast {
  position: fixed;
  top: 100px;
  right: 30px;
  width: 360px;
  background: rgba(27, 67, 50, 0.95); /* Deep Emerald */
  backdrop-filter: blur(12px);
  padding: 18px 22px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 9999;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow: hidden;
}

/* --- Shimmer Animation --- */
.toast-shimmer {
  position: absolute;
  top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
  transform: skewX(-20deg);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  to { left: 200%; }
}

/* --- Icon Styling --- */
.icon-container {
  position: relative;
  flex-shrink: 0;
}

.icon-hexagon {
  width: 48px;
  height: 48px;
  background: #fbbf24; /* Gold */
  color: #1b4332;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 14px;
  transform: rotate(-5deg);
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
}

.icon-pulse {
  position: absolute;
  inset: -4px;
  border: 2px solid #fbbf24;
  border-radius: 18px;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.4); opacity: 0; }
}

/* --- Body Text --- */
.toast-body {
  flex: 1;
}

.toast-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #52b788;
  margin-bottom: 2px;
}

.toast-message {
  margin: 0;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
}

/* --- Close Button --- */
.btn-close {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  transition: all 0.2s;
}

.btn-close:hover {
  background: #ef4444;
  transform: rotate(90deg);
}

/* --- Progress Timer --- */
.timer-track {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
}

.timer-bar {
  height: 100%;
  background: #fbbf24;
  width: 100%;
  transform-origin: left;
  animation: drain linear forwards;
}

@keyframes drain {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

/* --- Transition --- */
.notification-slide-enter-active {
  animation: slide-in-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.notification-slide-leave-active {
  transition: all 0.4s ease-in;
}

.notification-slide-leave-to {
  transform: translateX(120%) scale(0.8);
  opacity: 0;
}

@keyframes slide-in-bounce {
  0% { transform: translateX(120%) skewX(10deg); opacity: 0; }
  100% { transform: translateX(0) skewX(0); opacity: 1; }
}
</style>