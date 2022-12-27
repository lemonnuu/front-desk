<script setup>
import SvgIcon from '../../../../libs/SvgIcon.vue'
import { useSearchStore } from '../../../../stores/search'
import { confirm } from '../../../../libs'

const emit = defineEmits(['onClickItem'])

const searchStore = useSearchStore()

const onHandleDeleteAll = () => {
  confirm(' ', '你真的要删除所有的记录嘛?', '不删了', '删了吧')
    .then(() => {
      searchStore.deleteAllHistory()
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}

const onHandleDelete = (index) => {
  searchStore.deleteHistory(index)
}

const onHandleClickItem = (item) => {
  emit('onClickItem', item)
}
</script>

<template>
  <div>
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <SvgIcon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fill-class="fill-zinc-400"
        @click="onHandleDeleteAll"
      ></SvgIcon>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in searchStore.historys"
        :key="item"
        @click="onHandleClickItem(item)"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
      >
        <span>{{ item }}</span>
        <SvgIcon
          name="input-delete"
          @click.stop="onHandleDelete(index)"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
        ></SvgIcon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
