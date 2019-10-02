<template>
    <b-container class="container-fluid">
      <b-row class="border p-2 mb-2 rounded">
        <b-col class="text-left text-truncate" cols="4" lg="4">{{ request.title | upper }}</b-col>
        <b-col cols="4" sm="3"><b-button class="ml-3 mb-2" @click="toggle_display">Details</b-button></b-col>
        <b-col cols="4"><Flag :priority="request.priority"></Flag></b-col>
      </b-row>
    <b-card class="rounded p-4" v-show="display_details">
      <h4>{{ request.title | upper }}</h4>
      <p class="text-left">{{ request.description }}</p>
      <b-container id="container">
        <b-row class="text-left p-2">
          <b-col>Create Date:</b-col>
          <b-col>{{ request.create_date | timestampformat}}</b-col>
        </b-row>
        <b-row class="text-left p-2">
          <b-col>Customer Target Date:</b-col>
          <b-col>{{ request.target_date | dateformat}}</b-col>
        </b-row>
        <b-row class="text-left p-2">
          <b-col>
            <Deadline :days_left="calc_days_left"></Deadline>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    </b-container>
</template>

<script>
import moment from 'moment'
import Deadline from '@/components/Deadline'
import Flag from '@/components/Flag'

export default {
  name: 'FeatureRequest',
  components: {Flag, Deadline},
  props: ['request'],
  data () {
    return {
      display_details: false,
      priority: {
        1: 'Critical',
        2: 'High',
        3: 'Medium',
        4: 'Low',
        5: 'Undetermined'
      }
    }
  },
  methods: {
    toggle_display: function () {
      this.display_details = !this.display_details
    }
  },
  computed: {
    calc_days_left: function () {
      let target = moment(this.request.target_date).startOf('day')
      return target.diff(moment().startOf('day'), 'seconds') / (60 * 60 * 24)
    },
    priority_str: function () {
      return this.priority[this.request.priority]
    }
  },
  filters: {
    upper: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    },
    timestampformat: function (value) {
      if (!value) return ''
      return moment(String(value)).format('MM/DD/YYYY hh:mm a')
    },
    dateformat: function (value) {
      if (!value) return ''
      return moment(String(value)).format('MM/DD/YYYY')
    }
  }
}
</script>

<style scoped>
h4 {
  font-size: .90rem;
  font-weight: bold;
}
</style>
