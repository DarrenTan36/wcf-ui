<template>
  <div>
    <div class="ml-2">
      <b-nav pills>
        <b-nav-item @click="nav_list">Request List</b-nav-item>
        <b-nav-item active>New Request</b-nav-item>
      </b-nav>
    </div>
    <h3>Request New Feature</h3>
    <b-form class="pb-4" @submit="submitForm" @reset="resetForm">
      <b-form-group
        id="client-group"
        label="Client Name"
        label-for="client">
        <b-form-select v-model="val_client" :options="clients">
          <template v-slot:first>
            <option :value="null" disabled>--Please select a client--</option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group
        id="project-group"
        label="Project"
        label-for="project">
        <b-form-select v-model="val_project" :options="projects">
          <template v-slot:first>
            <option :value="null" disabled>--Please select a project--</option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group
        id="priority-group"
        label="Priority"
        label-for="request_priority">
        <b-form-select v-model="val_priority" id="request_priority" :options="priority_names">
          <template v-slot:first>
            <option :value="null" disabled>--Please select an option--</option>
          </template>
        </b-form-select>
      </b-form-group>
      <b-form-group
        id="target-date-group"
        label="Target Completion Date"
        label-for="request_target_date">
        <b-form-input
          id="request_target_date"
          placeholder="MM/DD/YYYY">
        </b-form-input>
      </b-form-group>
      <b-form-group
      id="title"
      label="Request Title"
      label-for="request_title">
        <b-form-input id="request_title"
                      :value="title"
                      placeholder="Please enter a brief title for this request here.">
        </b-form-input>
      </b-form-group>
      <b-form-group
      id="description"
      label="Request Description"
      label-for="request_description">
        <b-textarea
          id="request_description"
          placeholder="Please enter a full description of your feature request here."
          :value="val_description"
          rows="10"
          max-rows="15"
        >
        </b-textarea>
      </b-form-group>
      <b-button id="submit">Send Request</b-button> <b-button id="reset">Clear Form</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'RequestForm',
  data () {
    return {
      clients: ['client A', 'client B', 'client C'],
      projects: ['Project A', 'Project B', 'Project C'],
      title: '',
      val_description: '',
      priority_names: {
        1: 'Critical',
        2: 'High',
        3: 'Medium',
        4: 'Low',
        5: 'Undetermined'
      },
      val_priority: null,
      val_client: null,
      val_project: null
    }
  },
  methods: {
    submitForm: function () {
      return ''
    },
    resetForm: function () {
      return ''
    },
    nav_list: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
