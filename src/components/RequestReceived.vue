<template>
    <div>
      <div>
        <b-nav pills>
          <b-nav-item @click="request_list">Request List</b-nav-item>
          <b-nav-item active>New Request</b-nav-item>
        </b-nav>
      </div>
      <h3>Thank you!</h3>
      <p>Your request has been received.  We value your feedback.  Our team will review your feature request.</p>
    </div>
</template>

<script>
export default {
  name: 'RequestReceived',
  methods: {
    request_list: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
