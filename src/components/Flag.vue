<template>
<div class="d-flex justify-content-left">
  <!-- This SVG image is from Google's material design icons.  https://material.io/resources/icons/?style=baseline -->
  <div class="align-middle">
  <svg xmlns="http://www.w3.org/2000/svg"  :class="priority_cls" width="24" height="24" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0V0z"/>
    <path  d="M14.4 6l-.24-1.2c-.09-.46-.5-.8-.98-.8H6c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1v-6h5.6l.24 1.2c.09.47.5.8.98.8H19c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1h-4.6z"/>
  </svg>
  </div>
    <div class="align-middle d-none d-sm-block">{{ priority_str}}</div>
  </div>
</template>

<script>
export default {
  name: 'Flag',
  props: ['priority'],
  data () {
    return {
      priority_names: {
        1: 'Critical',
        2: 'High',
        3: 'Medium',
        4: 'Low',
        5: 'Undetermined'
      }
    }
  },
  computed: {
    priority_str: function () {
      if (this.priority === 5) {
        return ''
      } else {
        return this.priority_names[this.priority]
      }
    },
    priority_cls: function () {
      return this.priority_names[this.priority].toLowerCase()
    }
  }
}
</script>

<style scoped>
  .critical {
    fill: red;
  }
  .high {
    fill: #ffb250;
  }
  .medium {
    fill: limegreen;
  }
  .low {
    fill: #78baff;
  }
  .undetermined {
    display: none;
  }
</style>
