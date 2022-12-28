<script setup>
import NavBar from '../../../libs/NavBar.vue'
import SvgIcon from '../../../libs/SvgIcon.vue'
import { isMobileTerminal } from '../../../utils/flexible'
import { useRouter } from 'vue-router'
import ComBtn from '../../../libs/ComBtn.vue'

const router = useRouter()

defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 关闭
const onPop = () => {
  router.back()
}
</script>

<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen text-xl z-20 backdrop-blur-4xl bg-white dark:bg-zinc-800 pb-2 overflow-y-auto xl:p-2 xl:bg-transparent"
  >
    <!-- 移动端下展示 navbar -->
    <NavBar v-if="isMobileTerminal" sticky>
      {{ data.author }}
      <template #right>
        <SvgIcon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></SvgIcon>
      </template>
    </NavBar>

    <!-- pc 端下展示关闭图标 -->
    <SvgIcon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></SvgIcon>

    <!-- 内容区域 -->

    <div class="xl:max-w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex xl:justify-center">
      <img
        class="w-screen mb-2 xl:w-auto xl:max-w-[80%] xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="data.photo"
      />

      <div
        class="xl:min-w-[20%] xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
      >
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <SvgIcon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
          ></SvgIcon>

          <ComBtn
            class=""
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></ComBtn>
        </div>
        <!-- 标题 -->
        <p class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5">
          {{ data.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 px-1">
          <img v-lazy class="h-3 w-3 rounded-full" :src="data.avatar" alt="" />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{ data.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
