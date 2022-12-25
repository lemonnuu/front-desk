<script setup>
import { computed, ref } from 'vue'
import { getImgApiCosWithWH, getImgApiCosNoWH } from '../../../../api/imgs'
import WaterFall from '../../../../libs/WaterFall.vue'
import ImgItem from './ImgItem.vue'
import { isMobileTerminal } from '../../../../utils/flexible'

const imgList = ref([])
// const isPicturePreReading = ref(true)
const getImgList = async () => {
  // const random = Math.floor(Math.random() * 50)
  // console.log('随机个数图片', random)
  // const res = await getImgApiCosWithWH(random)
  const res = (await getImgApiCosNoWH()) || (await getImgApiCosWithWH(10))
  imgList.value = res
  console.log(res)
}

const isPicturePreReading = computed(() => {
  return !imgList.value.every((item) => item.photoWidth && item.photoHeight)
})
getImgList()
</script>

<template>
  <div>
    <WaterFall
      class="px-1 w-full"
      :data="imgList"
      :node-key="'id'"
      :column="isMobileTerminal ? 2 : 5"
      :picture-pre-reading="isPicturePreReading"
    >
      <template v-slot="{ item, width }">
        <ImgItem :data="item" :width="width"></ImgItem>
      </template>
    </WaterFall>
  </div>
</template>

<style scoped lang="scss"></style>
