<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watchEffect } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const isVisable = useVModel(props, 'modelValue', emit)

const isLocked = useScrollLock(document.body)
watchEffect(() => (isLocked.value = isVisable.value))
</script>

<template>
  <Teleport to="body">
    <Transition name="mask">
      <div
        v-if="isVisable"
        @click="isVisable = false"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </Transition>
    <Transition name="popup-down-up">
      <div
        v-if="isVisable"
        v-bind="$attrs"
        class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.mask-enter-active,
.mask-leave-active {
  transition: all 0.3s;
}

.mask-enter-from,
.mask-leave-to {
  opacity: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
