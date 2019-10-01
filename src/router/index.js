import Vue from 'vue'
import Router from 'vue-router'
import RequestList from '@/components/RequestList'
import RequestForm from '@/components/RequestForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RequestList',
      component: RequestList
    },
    {
      path: '/request-form',
      name: 'RequestForm',
      component: RequestForm
    }
  ]
})
