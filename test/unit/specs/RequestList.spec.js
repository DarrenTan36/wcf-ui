import Vue from 'vue'
import RequestList from '@/components/RequestList'

describe('RequestList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(RequestList)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
