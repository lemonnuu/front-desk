import { toKebabCase } from '../utils/flexible'
import { defineAsyncComponent } from 'vue'
export { confirm } from '../utils/confirm'
export { message } from '../utils/message'

export default {
  install(app) {
    // 1. 获取所有的组件
    const components = import.meta.glob('./*.vue')
    console.log('components', components)
    // 2. 遍历组件模块
    for (const [fullPath, fn] of Object.entries(components)) {
      // 3. 通过 defineAsyncComponent 异步导入指定路径下的组件
      let componentName = toKebabCase(fullPath.split('/')[1].split('.')[0])
      componentName.startsWith('-') && (componentName = componentName.substring(1))
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
