<script setup>
import { useI18n } from 'vue-i18n'
import { TTSManager } from '../logic/TTSManager.js'

const props = defineProps({
  score: Number,
  lives: Number
})

const emit = defineEmits(['pause'])
const { t, locale } = useI18n()

const onPauseClick = () => {
    TTSManager.speak(t('paused'), locale.value)
    emit('pause')
}
</script>

<template>
  <div class="hud">
    <div class="score">{{ $t('score') }} <span class="val">{{ score }}</span></div>
    <div class="lives-container">
        <button class="pause-btn" @click="onPauseClick">⏸</button>
        <div class="lives">
        {{ $t('lives') }} 
        <span v-for="n in lives" :key="n" class="heart">❤️</span>
        </div>
    </div>
  </div>
</template>

<style scoped>
.hud {
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  z-index: 5;
  gap: 5px;
}

.score {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
}

.lives-container {
    display: flex;
    align-items: center;
    gap: 15px; /* Space between pause button and lives text */
}

.lives {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff3366;
}

.val {
  color: #fff;
}

.heart {
  margin-left: 5px;
}

.pause-btn {
    pointer-events: auto;
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    font-size: 1.2rem;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    /* Removed absolute positioning */
}
.pause-btn:hover {
    background: var(--primary-color);
    color: #000;
}
</style>
