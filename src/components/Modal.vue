<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const closeOnEscape = (event) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', closeOnEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape)
})
</script>

<template>
  <div
    v-if="isOpen"
    class="backdrop"
    @click.self="emit('close')"
  >
    <div class="modal">
      <button
        type="button"
        class="close-button"
        @click="emit('close')"
      >
        ×
      </button>
    <slot/>
    </div>
  </div>
</template>
<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(0, 0, 0, 0.65);

  box-sizing: border-box;
}

.modal {
  position: relative;

  width: 100%;
  max-width: 440px;
  padding: 50px;

  border-radius: 24px;
  background: #ffffff;

  box-sizing: border-box;
}

.close-button {
  position: absolute;
  top: 18px;
  right: 20px;

  width: 28px;
  height: 28px;

  padding: 0;

  border: none;
  background: transparent;

  color: #191a2a;
  font-size: 30px;
  font-weight: 300;
  line-height: 1;

  cursor: pointer;
}

.close-button:hover {
  color: #000000;
}

@media (max-width: 480px) {
  .modal {
    padding: 40px 24px 30px;
    border-radius: 20px;
  }
}
</style>
