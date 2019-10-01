import Vue from 'vue'
import Router from 'vue-router'
import RequestList from '@/components/RequestList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RequestList',
      component: RequestList
    }
  ]
})
