<script setup>
import PopOver from '@/libs/PopOver.vue'
import ComBtn from '../../../../libs/ComBtn.vue'
import SvgIcon from '../../../../libs/SvgIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/memeber'
  },
  {
    id: 2,
    title: '个人资料',
    icon: 'logout',
    path: ''
  }
]

const onToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <pop-over class="guide-my flex items-center" placement="bottom-left">
    <template #reference>
      <div
        v-if="false"
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          src="http://img.touxiangwu.com/zb_users/upload/2022/12/202212211671618430729843.jpg"
          alt=""
        />
        <!-- 下箭头 -->
        <svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fill-class="fill-zinc-900 dark:fill-zinc-300"
        ></svg-icon>
        <!-- VIP -->
        <svg-icon
          class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          name="vip"
          fill-class="fill-zinc-900"
        ></svg-icon>
      </div>
      <div v-else>
        <ComBtn icon="profile" icon-color="#fff" @click="onToLogin"></ComBtn>
      </div>
    </template>
    <!-- 气泡 -->
    <template v-if="false" #default>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          v-for="item in menuArr"
          :key="item.id"
        >
          <svg-icon
            class="h-1.5 w-1.5 mr-1"
            :name="item.icon"
            fill-class="fill-zinc-900 dark:fill-zinc-300"
          ></svg-icon>
          <span class="text-zinc-800 text-sm dark:text-zinc-300">{{ item.title }}</span>
        </div>
      </div>
    </template>
  </pop-over>
</template>

<style scoped lang="scss"></style>
