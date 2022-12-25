<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  getImgElements,
  onComplateImgElements,
  getMinHeight,
  getMinHeightColumn,
  getMaxHeight
} from '../utils/waterfall'

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: Number,
    default: 2
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否需要进行图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['onRenderFinished'])

// 容器的总高度 = 最高的这一列的高度
const containerHeight = ref(0)
// 记录每列高度的容器 key: 所在列 val: 列高
const columnHeightObj = ref({})
/**
 * 初始化构建记录每列高度的对象
 */
const initColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

// 容器实例
const containerTarget = ref(null)
// 容器总宽度 (不包含 padding、margin、border)
const containerWidth = ref(0)
// 容器的左边距, 计算 item 的 left
const containerLeft = ref(0)
/**
 * 计算容器宽度
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value, null)
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器的宽度, 容器没有 border 所以不用减
  containerWidth.value =
    containerTarget.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}

// 列宽 = (容器的宽度 - 所有的列间距宽度) / 列数
const columnWidth = ref(0)
// 列间距的合计
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
/**
 * 计算列宽
 */
const useColumnWidth = () => {
  // 计算容器宽度
  useContainerWidth()
  // 计算列宽
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  // 计算列宽
  useColumnWidth()
})

// item 高度集合
let itemHeights = []
/**
 * 监听图片加载完成 (需要图片预加载)
 */
const waitImgComplate = () => {
  console.log('图片没有宽高, 需要计算')
  itemHeights = []
  // 拿到所有的元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取到未定位元素的 img 标签
  const imgElements = getImgElements(itemElements)
  // 等待图片加载完成
  onComplateImgElements(imgElements).then(() => {
    // 图片加载完成
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })
    console.log('itemHeights', itemHeights)
    // 渲染位置
    useItemLocation()
  })
}

/**
 * 不需要图片预加载
 */
const useItemHeight = () => {
  console.log('图片有宽高')
  itemHeights = []
  // 拿到所有的元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 计算 item 高度
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}

/**
 * 渲染位置
 */
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) return
    // 生成 style 属性
    item._style = {}
    // left
    item._style.left = getItemLeft()
    // top
    item._style.top = getItemTop()
    // 指定的列高度自增
    increasingHeight(index)
  })
  // 指定容器的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
  emit('onRenderFinished')
}

/**
 * 组件销毁的时候, 清除所有的 _style
 */
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})

/**
 * 返回下一个 item 的 left
 */
const getItemLeft = () => {
  // 拿到最小宽度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  return column * (columnWidth.value + props.columnSpacing) + containerLeft.value
}

/**
 * 返回下一个 item 的 top
 */
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}

/**
 * 指定列高度自增
 */
const increasingHeight = (index) => {
  // 最小高度所在列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 使该列自增
  columnHeightObj.value[minHeightColumn] += itemHeights[index] + props.rowSpacing
}

/**
 * 触发计算
 */
watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      // 第一次获取数据时, 构建高度记录容器
      const resetColumnHeight = newVal.every((item) => !item._style)
      if (resetColumnHeight) {
        // 构建高度记录容器
        initColumnHeightObj()
      }
      console.log('应该不会变', props.picturePreReading)
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * 重新构建瀑布流
 */
const reset = () => {
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth()
    // 重置所有的定位数据
    props.data.forEach((item) => (item._style = null))
  }, 200)
}

/**
 * 监听列数的变化
 */
watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      console.log('props.picturePreReading', props.picturePreReading)
      columnWidth.value = 0
      // 数据改变之后, 视图改变之后的回调
      nextTick(() => {
        reset()
      })
    } else {
      console.log('直接 reset')
      reset()
    }
  }
)
</script>

<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{
      height: containerHeight + 'px'
    }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style ? item._style?.left + 'px' : getItemLeft() + 'px',
          top: item._style ? item._style?.top + 'px' : getItemTop() + 'px'
          // left: item._style?.left + 'px',
          // top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载中 -->
    <div v-else>加载中...</div>
  </div>
</template>

<style scoped lang="scss"></style>
