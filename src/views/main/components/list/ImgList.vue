<script setup>
import { computed, ref, watch } from 'vue'
import {
  getImgApiLsit,
  getImgApiCosWithWH,
  getImgApiCosNoWH,
  getBingImgList,
  getQQInfo
} from '../../../../api/imgs'
import WaterFall from '../../../../libs/WaterFall.vue'
import ImgItem from './ImgItem.vue'
import { isMobileTerminal } from '../../../../utils/flexible'
import InfiniteList from '../../../../libs/InfiniteList.vue'
import { useApiStore } from '../../../../stores/api'
import { useSearchTextStore } from '../../../../stores/searchText'
import { CATEGORY } from '../../../../constants'

const apiStore = useApiStore()
const searchTextStore = useSearchTextStore()

// 数据是否在加载中
const loading = ref(false)
// 数据是否全部加载完成
const isFinished = ref(false)
// 数据源
const imgList = ref([])

const getImgList = async () => {
  // 数据全部加载完成直接 return
  if (isFinished.value) return
  console.log('开始请求图片数据')

  // 搜索模式
  if (searchMode) {
    return searchModeFunc()
  }

  let res = []
  switch (apiStore.currentCategory.id) {
    case CATEGORY.COS:
      res = (await getCosListNoWH()) || (await getCosListWithWH())
      break
    case CATEGORY.BEAUTY:
      res = await getParamsImgList()
      break
    case CATEGORY.CARTOON:
      res = await getParamsImgList()
      break
    case CATEGORY.LANDSCAPE:
      res = await getParamsImgList()
      break
    case CATEGORY.BING:
      res = await getBingImgList()
      isFinished.value = true
      break
    default:
      res = await getParamsImgList()
      break
  }
  imgList.value.push(...res)

  // 由于这里没有真正的分页, 也就没有 total, 数据不会到头
  // if (res.total && imgList.value.length === res.total) {
  //   isFinished.value = true
  // }

  // 修改 loading 标记, 得和 waterfall 耦合了, 定位没好之前就得是 loadering
  // loading.value = false

  console.log(res)
}

const params = {
  fl: 'suiji'
}

// 获取 真人 | 动漫 | 风景 图片
const getParamsImgList = async () => {
  return await getImgApiLsit(params, 10)
}

// 获取有宽高值的 Cos 图片列表
const getCosListWithWH = async () => {
  return await getImgApiCosWithWH(10)
}

// 获取没有宽高值的 Cos 图片列表
const getCosListNoWH = async () => {
  return await getImgApiCosNoWH()
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
  switch (apiStore.currentCategory.id) {
    case CATEGORY.BEAUTY:
      params.fl = 'meizi'
      break
    case CATEGORY.CARTOON:
      params.fl = 'dongman'
      break
    case CATEGORY.LANDSCAPE:
      params.fl = 'fengjing'
      break
    default:
      params.fl = 'suiji'
      break
  }
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
          <ImgItem :data="item" :width="width" :isPicturePreReading="isPicturePreReading"></ImgItem>
        </template>
      </WaterFall>
    </InfiniteList>
  </div>
</template>

<style scoped lang="scss"></style>
