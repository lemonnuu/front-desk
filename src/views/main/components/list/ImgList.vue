<script setup>
import { computed, ref } from 'vue'
import { getImgApiCosWithWH, getImgApiCosNoWH } from '../../../../api/imgs'
import WaterFall from '../../../../libs/WaterFall.vue'
import ImgItem from './ImgItem.vue'
import { isMobileTerminal } from '../../../../utils/flexible'
import InfiniteList from '../../../../libs/InfiniteList.vue'

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

  // const random = Math.floor(Math.random() * 50)
  // console.log('随机个数图片', random)
  // const res = await getImgApiCosWithWH(10)
  const res = (await getImgApiCosNoWH()) || (await getImgApiCosWithWH(10))
  imgList.value.push(...res)

  // 由于这里没有真正的分页, 也就没有 total, 数据不会到头
  // if (res.total && imgList.value.length === res.total) {
  //   isFinished.value = true
  // }

  // 修改 loading 标记, 得和 waterfall 耦合了, 定位没好之前就得是 loadering
  // loading.value = false

  console.log(res)
}

const isPicturePreReading = computed(() => {
  return !imgList.value[0] || !imgList.value[0].photoWidth || !imgList.value[0].photoHeight
  // return !imgList.value.every((item) => item.photoWidth && item.photoHeight)
})

const onRenderFinished = () => {
  loading.value = false
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
          <ImgItem :data="item" :width="width" :isPicturePreReading="isPicturePreReading"></ImgItem>
        </template>
      </WaterFall>
    </InfiniteList>
  </div>
</template>

<style scoped lang="scss"></style>
