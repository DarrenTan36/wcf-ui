<template>
  <div>
    <div class="ml-2">
    <b-nav pills>
      <b-nav-item active>Request List</b-nav-item>
      <b-nav-item @click="new_request">New Request</b-nav-item>
    </b-nav>
    </div>
    <b-card class="mt-3">
    <h2 class="p-3">{{ name }}</h2>
      <div v-for="item in requests" :key="item.id">
      <feature-request :request="item"></feature-request>
      </div>
    </b-card>
  </div>
</template>

<script>
import FeatureRequest from '@/components/FeatureRequest'

export default {
  name: 'RequestList',
  components: {FeatureRequest},
  data () {
    return {
      name: 'Software Feature Request System',
      fields: [{
        key: 'title'
      }, {
        key: 'target_date'
      }, {
        key: 'priority'
      }, {
        key: 'project'
      }, {
        key: 'client'
      }],
      requests: [],
      pages: 0,
      next: null,
      previous: null,
      current_page: 1
    }
  },
  methods: {
    new_request: function () {
      this.$router.push('/request-form')
    }
  },
  mounted: function () {
    const axios = require('axios')
    var self = this
    axios.get('http://127.0.0.1:8000/api/features/').then(response => {
      self.requests = response.data
    })
      .catch(error => {
        alert('We received an error ')
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
