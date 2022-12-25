<script setup>
import { computed } from 'vue'
import ComBtn from '@/libs/ComBtn.vue'
import { randomRGB } from '@/utils/color'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number,
    default: 0
  },
  // 得用它控制图片是否懒加载, 如果得计算宽高就不能懒加载
  isPicturePreReading: {
    type: Boolean,
    default: true
  }
})

const imgStyle = computed(() => {
  if (props.data.photoWidth && props.data.photoHeight) {
    return { height: (props.width / props.data.photoWidth) * props.data.photoHeight + 'px' }
  } else {
    return {}
  }
})
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{
        backgroundColor: randomRGB()
      }"
    >
      <!-- 图片 -->
      <img
        v-lazy="isPicturePreReading"
        class="w-full rounded bg-transparent m-waterfall-item-img"
        :src="data.photo"
        :style="imgStyle"
        alt=""
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <ComBtn class="absolute top-1.5 left-1.5">分享</ComBtn>
        <!-- 点赞 -->
        <ComBtn
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          icon-class="fill-zinc-900 dark:fill-zinc-200"
        ></ComBtn>
        <!-- 下载 -->
        <ComBtn
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          icon-class="fill-zinc-900 dark:fill-zinc-200"
        ></ComBtn>
        <!-- 全屏 -->
        <ComBtn
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          icon-class="fill-zinc-900 dark:fill-zinc-200"
        ></ComBtn>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">{{ data.title }}</p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy class="h-2 w-2 rounded-full" :src="data.avatar" alt="" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
