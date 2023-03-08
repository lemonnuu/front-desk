<script setup>
import { computed, ref, watch } from 'vue'
import { getImgApiLsit, getQQInfo } from '../../../../api/imgs'
import WaterFall from '../../../../libs/WaterFall.vue'
import ImgItem from './ImgItem.vue'
import { isMobileTerminal } from '../../../../utils/flexible'
import InfiniteList from '../../../../libs/InfiniteList.vue'
import { useApiStore } from '../../../../stores/api'
import { useDetailStore } from '../../../../stores/detail'
import { useSearchTextStore } from '../../../../stores/searchText'
import { CATEGORY, ALL_CATEGORY_ITEM } from '../../../../constants'
import PinsComponent from '../../../pins/components/PinsComponent.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'

const apiStore = useApiStore()
const searchTextStore = useSearchTextStore()
const detailStore = useDetailStore()

// 数据是否在加载中
const loading = ref(false)
// 数据是否全部加载完成
const isFinished = ref(false)
// 数据源
const imgList = ref([])

const params = {
  category: 'random',
  count: 10,
  format: 'json'
}

const getImgList = async () => {
  // 数据全部加载完成直接 return
  if (isFinished.value) return
  console.log('开始请求图片数据')

  // 搜索模式
  if (searchMode) {
    return searchModeFunc()
  }

  const res = await getImgApiLsit(params)
  if (apiStore.currentCategory.id === CATEGORY.BING) {
    isFinished.value = true
  }
  imgList.value.push(...res)

  // 由于这里没有真正的分页, 也就没有 total, 数据不会到头
  // if (res.total && imgList.value.length === res.total) {
  //   isFinished.value = true
  // }

  // 修改 loading 标记, 得和 waterfall 耦合了, 定位没好之前就得是 loadering
  // loading.value = false

  console.log('图片数据', res)
}

const isPicturePreReading = computed(() => {
  return !imgList.value[0] || !imgList.value[0].photoWidth || !imgList.value[0].photoHeight
})

const onRenderFinished = () => {
  loading.value = false
}

/**
 * 此方法根据 category 发送不同的请求
 */
const resetImgList = () => {
  // 重置数据
  isFinished.value = false
  imgList.value = []
  currentSearchCount = ''
  params.category = apiStore.currentCategory.id
  if (apiStore.currentCategory.id === ALL_CATEGORY_ITEM.id) {
    params.category = 'random'
  }
  params.count = apiStore.currentCategory.id === CATEGORY.BING ? 8 : 10
}

/**
 * 监听 currentCategory 的变化
 */
watch(
  () => apiStore.currentCategory,
  () => {
    searchMode = false
    searchTextStore.changeSearchText('')
    resetImgList()
  }
)

let searchMode = false

let currentSearchCount = ''
const searchModeFunc = async () => {
  if (!currentSearchCount) {
    currentSearchCount = searchTextStore.searchText
  }
  // 这个接口也会返回头像, 但是好模糊, 不用它的
  const { name } = (await getQQInfo(currentSearchCount)).data
  const url = `https://imgapi.cn/qq.php?qq=${currentSearchCount}`
  const res = {
    id: url,
    photo: url,
    title: name,
    author: currentSearchCount,
    avatar: url
  }
  currentSearchCount = parseInt(currentSearchCount) - 1
  imgList.value.push(res)
  console.log('搜索模式', typeof res)
}

/**
 * 监听 searchText 的变化
 */
watch(
  () => searchTextStore.searchText,
  (val) => {
    searchMode = val ? true : false
    console.log('监听搜索', val)
    resetImgList()
  }
)

// 控制 Pins 展示
const isVisiblePins = ref(false)
// 当前选中的 pins 属性
const currentPins = ref({})

/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})

/**
 * 点击图片项, 进入详情
 */
const onToPins = (item) => {
  detailStore.changeLastDetail(item.data)
  // 修改浏览器的 URL
  const virtualID = item.data.id
    .replaceAll('https://', '')
    .replaceAll('/', '-')
    .replaceAll('.', '_')
  let baseUrl = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL
  history.pushState(null, null, `${baseUrl}/pins/${virtualID}`)
  isVisiblePins.value = true
  currentPins.value = item

  console.log(currentPins.value.location?.translateX, currentPins.value.location?.translateY)
}

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.3,
    translateX: 0,
    translateY: 0,
    opacity: 1,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    scaleX: 0,
    scaleY: 0,
    duration: 0.3,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 1,
    onComplete: done
  })
}
</script>

<template>
  <div>
    <InfiniteList v-model="loading" :is-finished="isFinished" @onLoad="getImgList">
      <WaterFall
        class="px-1 w-full"
        :data="imgList"
        :node-key="'id'"
        :column="isMobileTerminal ? 2 : 5"
        :picture-pre-reading="isPicturePreReading"
        @onRenderFinished="onRenderFinished"
      >
        <template v-slot="{ item, width }">
          <ImgItem
            :data="item"
            :width="width"
            :isPicturePreReading="isPicturePreReading"
            @click="onToPins"
          ></ImgItem>
        </template>
      </WaterFall>
    </InfiniteList>

    <!-- 详情内容展示 -->
    <Transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <PinsComponent v-if="isVisiblePins" :data="currentPins.data"></PinsComponent>
    </Transition>
  </div>
</template>

<style scoped lang="scss"></style>
