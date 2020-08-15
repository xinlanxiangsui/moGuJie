import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {
  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2. 通过new可以根据组件构造器创建出来一个组件
  const toast = new toastConstructor()
  // 3. 将组建对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4. toast.$el对应的就是div元素
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}
export default obj
