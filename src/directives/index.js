export default {
  install(app) {
    // import.meta.globEager 为同步导入
    // const directives = import.meta.globEager('./*.js') // globEager 已弃用
    const directives = import.meta.glob('./*.js', { eager: true })
    console.log('directives', directives)
    for (const [key, value] of Object.entries(directives)) {
      // 拼接组件注册的 name
      console.log(key, value)
      const arr = key.split('/')
      const directiveName = arr[arr.length - 1].replace('.js', '')
      // 完成注册
      app.directive(directiveName, value.default)
    }
  }
}
