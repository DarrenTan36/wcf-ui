<template>
<div>
  <b-badge class="p-4 shadow" :variant="variant_str">{{ days_str }}</b-badge>
</div>
</template>

<script>
export default {
  name: 'Deadline',
  props: ['days_left'],
  data () {
    return {
    }
  },
  computed: {
    days_str: function () {
      let plural = (Math.abs(parseInt(this.days_left)) === 1 ? 'Day' : 'Days')
      if (this.days_left >= 1) {
        return this.days_left.toString() + ' ' + plural + ' Left'
      } else if (this.days_left === 0) {
        return 'Due Today'
      } else {
        return Math.abs(parseInt(this.days_left)).toString() + ' ' + plural + ' Overdue'
      }
    },
    variant_str: function () {
      if (this.days_left >= 1) {
        return 'success'
      } else if (this.days_left === 0) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  }
}
</script>

<style scoped>

</style>
