<script setup>
import { ref } from 'vue'
import LoginHeader from './components/LoginHeader.vue'
import SliderCaptcha from './components/SliderCaptcha.vue'
import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from 'vee-validate'
import { validateUsername, validatePassword } from './validate'
import ComBtn from '../../libs/ComBtn.vue'

const loginForm = ref({
  username: '',
  password: ''
})

// 控制 SliderCaptcha 是否展示
const isSliderCaptchaVisible = ref(false)
// 滑块拖动成功, 人类行为验证通过
const onCaptchaSuccess = () => {
  isSliderCaptchaVisible.value = false
  // 登录操作
  onLogin()
}

// 触发登录
const onLoginHandler = () => {
  if (loading.value) return
  isSliderCaptchaVisible.value = true
}

// 去注册
const onToRegister = () => {}

/**
 * 登录行为
 */
const loading = ref(false)
const onLogin = () => {
  loading.value = true
  console.log('登录行为')
}
</script>

<template>
  <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
    <!-- 头部图标：PC端 -->
    <LoginHeader></LoginHeader>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3 class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block">
        账号登录
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onLoginHandler">
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          :rules="validateUsername"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          v-model="loginForm.username"
        />
        <vee-error-message class="text-sm text-red-600 block mt-0.5 text-left" name="username">
        </vee-error-message>
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          :rules="validatePassword"
          type="password"
          placeholder="密码"
          autocomplete="on"
          v-model="loginForm.password"
        />
        <vee-error-message class="text-sm text-red-600 block mt-0.5 text-left" name="password">
        </vee-error-message>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="onToRegister"
          >
            去注册
          </a>
        </div>
        <ComBtn
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :loading="loading"
          :isActiveAnim="false"
        >
          登录
        </ComBtn>
      </vee-form>
    </div>

    <!-- 人类行为验证 -->
    <SliderCaptcha
      v-if="isSliderCaptchaVisible"
      @close="isSliderCaptchaVisible = false"
      @success="onCaptchaSuccess"
    ></SliderCaptcha>
  </div>
</template>

<style scoped lang="scss"></style>
