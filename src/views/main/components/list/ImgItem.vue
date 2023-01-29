<script setup>
import { ref, computed } from 'vue'
import ComBtn from '@/libs/ComBtn.vue'
import { randomRGB } from '@/utils/color'
import { transformImgfromSrc, downloadResource } from '../../../../utils/download'
import { message } from '../../../../libs'
import { saveAs } from 'file-saver'
import { useFullscreen } from '@vueuse/core'
import { downloadBaseUrl } from '../../../../constants'
import { useUserStore } from '../../../../stores/user'

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

const userStore = useUserStore()

const emit = defineEmits(['click'])

const imgStyle = computed(() => {
  if (props.data.photoWidth && props.data.photoHeight) {
    return { height: (props.width / props.data.photoWidth) * props.data.photoHeight + 'px' }
  } else {
    return {}
  }
})

const imgElement = ref(null)

/**
 * 下载按钮点击事件
 */
const onHandleDownload = async () => {
  const tempArr = props.data.photo.split('.')
  const suffix = tempArr[tempArr.length - 1]
  if (saveAs) {
    // 可以使用 file-saver 库, 和下面自己写的是一样的原理, 也不支持跨域的图片
    // saveAs(imgElement.value.src, `${props.data.title}.${suffix}`)
    const baseUrl = `${downloadBaseUrl}?imgurl=${imgElement.value.src}`
    saveAs(baseUrl, `${props.data.title}.${suffix}`)
  } else {
    // 只有每日 bing 图可以下载, 其它的跨域了, 就这样吧, 到时候可能还得开发个服务器, 唉, 到时候再说
    const blobUrl = await transformImgfromSrc(imgElement.value.src).catch((err) => {
      message('error', '图片跨域了, 请右键图片另存为...', 2000)
      console.log(err)
    })
    blobUrl && downloadResource(blobUrl, `${props.data.title}.${suffix}`)
  }
}

/**
 * 全屏
 */
const { enter: onImgFullScreen } = useFullscreen(imgElement)

/**
 * Pins 跳转记录, 记录图片的中心点 (X | Y 位置 + 宽 | 高 一半)
 */
const imgContainerCenter = () => {
  const {
    x: imgContainerX,
    y: imgContainerY,
    width: imgContainerWidth,
    height: imgContainerHeight
  } = imgElement.value.getBoundingClientRect()
  return {
    translateX: parseInt(imgContainerX + imgContainerWidth / 2),
    translateY: parseInt(imgContainerY + imgContainerHeight / 2)
  }
}

/**
 * 进入详情点击事件
 */
const onToPinsClick = () => {
  emit('click', {
    location: imgContainerCenter(),
    data: props.data
  })
}

const onClickShare = () => {
  if (!userStore.token) {
    return message('warn', '请先登录', 2000)
  }
  message('warn', '正在努力升级中....', 2000)
}
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{
        backgroundColor: randomRGB()
      }"
      @click="onToPinsClick"
    >
      <!-- 图片 -->
      <img
        ref="imgElement"
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
        <ComBtn class="absolute top-1.5 left-1.5" @click="onClickShare">分享</ComBtn>
        <!-- 点赞 -->
        <ComBtn
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          @click="onClickShare"
          icon-class="fill-zinc-900 dark:fill-zinc-200"
        ></ComBtn>
        <!-- 下载 -->
        <ComBtn
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          @click="onHandleDownload"
          icon-class="fill-zinc-900 dark:fill-zinc-200"
        ></ComBtn>
        <!-- 全屏 -->
        <ComBtn
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          icon-class="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
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
