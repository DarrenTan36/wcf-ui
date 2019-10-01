<template>
  <div>
    <b-card>
    <h2>{{ name }}</h2>
    <b-button @click="hello" class="mb-3">Request Feature</b-button>
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
      name: 'Workers Compensation Fund',
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
