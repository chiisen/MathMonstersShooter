<script setup>
defineEmits(['start'])
</script>

<template>
  <div class="start-screen glass">
    <h1 class="neon-text">MATH MONSTERS</h1>
    <h2 class="neon-text">SHOOTER</h2>
    <p>Math Calculation Fighter</p>
    <button class="neon-button" @click="$emit('start')">START MISSION</button>
  </div>
</template>

<style scoped>
.start-screen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem;
  text-align: center;
  border-radius: 20px;
  border: 1px solid var(--primary-color);
  background: rgba(11, 15, 41, 0.8);
  box-shadow: 0 0 50px rgba(0, 243, 255, 0.2);
  z-index: 10;
}

h1 {
  font-size: 3rem;
  margin: 0;
  color: var(--primary-color);
  letter-spacing: 2px;
}
h2 {
  font-size: 2.5rem;
  margin: 0 0 2rem 0;
  color: var(--secondary-color);
  letter-spacing: 4px;
}
p {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #aaa;
}

.neon-button {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  padding: 1rem 3rem;
  font-size: 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px var(--primary-color);
  font-family: inherit;
}

.neon-button:hover {
  background: var(--primary-color);
  color: #0b0f29;
  box-shadow: 0 0 30px var(--primary-color);
}
</style>
