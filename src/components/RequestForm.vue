<template>
  <div>
    <div class="ml-2 ">
      <b-nav pills>
        <b-nav-item @click="nav_list">Request List</b-nav-item>
        <b-nav-item active>New Request</b-nav-item>
      </b-nav>
    </div>
    <h3>Request New Feature</h3>
  <div class="d-flex justify-content-center p-3">

    <b-form class="pb-4">
      <div class="d-flex justify-content-center">
      <b-form-group
        id="client-group"
        class="mr-3 w-50"
        label="Client Name"
        label-for="client">
        <b-form-select
          v-model="$v.request.client.$model"
          :options="clients"
          text-field="name"
          value-field="id">
          <template v-slot:first>
            <option :value="null" disabled>--Please select a client--</option>
          </template>
        </b-form-select>
        <p class="error" v-if="submitted && !$v.request.client.required">Please select a client</p>
      </b-form-group>
      <b-form-group
        id="project-group"
        class="ml-3 w-50"
        label="Project"
        label-for="project">
        <b-form-select
          v-model="$v.request.project.$model"
          :options="projects"
          text-field="name"
          value-field="id">
          <template v-slot:first>
            <option :value="null" disabled>--Please select a project--</option>
          </template>
        </b-form-select>
        <p class="error" v-if="submitted && !$v.request.project.required">Please select a project</p>
      </b-form-group>
    </div>
      <div class="d-flex justify-content-center">
      <b-form-group
        id="priority-group"
        class="mr-3 w-50"
        label="Priority"
        label-for="request_priority">
        <b-form-select v-model="$v.request.priority.$model" id="request_priority" :options="priority_names">
          <template v-slot:first>
            <option :value="null" disabled>--Please select an option--</option>
          </template>
        </b-form-select>
        <p class="error" v-if="submitted && !$v.request.priority.required">Please select a priority</p>
      </b-form-group>
      <b-form-group
        id="target-date-group"
        class="ml-3 w-50"
        label="Target Completion Date"
        label-for="request_target_date">
        <b-form-input
          id="request_target_date"
          placeholder="MM/DD/YYYY" v-model="$v.target_date.$model">
        </b-form-input>
        <p class="error" v-if="submitted && !$v.target_date.validDateFormat">Please enter the date MM/DD/YYYY</p>
      </b-form-group>
      </div>
      <b-form-group
      id="title"
      label="Request Title"
      label-for="request_title">
        <b-form-input
                      v-model="$v.request.title.$model"
                      placeholder="Please enter a brief title for this request here.">
        </b-form-input>
        <p class="error" v-if="submitted && !$v.request.title.required">This is a required field</p>
        <p class="error" v-if="submitted && !$v.request.title.minLength">Field must have at least {{ $v.request.title.$params.minLength.min }} characters.</p>
      </b-form-group>
      <b-form-group
      id="description"
      label="Request Description"
      label-for="request_description">
        <b-textarea
          id="request_description"
          placeholder="Please enter a full description of your feature request here."
          v-model="request.description"
          rows="10"
          max-rows="15"
        >
        </b-textarea>
        <p class="error" v-if="submitted && !$v.request.description.required">This is a required field</p>
        <p class="error" v-if="submitted && !$v.request.description.minLength">Field must have at least {{ $v.request.title.$params.minLength.min }} characters.</p>
      </b-form-group>
      <b-button @click.prevent="submitForm">Send Request</b-button> <b-button @click.prevent="resetForm">Clear Form</b-button>
    </b-form>
  </div>
  </div>
</template>

<script>
import moment from 'moment'
import { required, minLength, between, numeric } from 'vuelidate/lib/validators'
export default {
  name: 'RequestForm',
  data () {
    return {
      clients: ['client A', 'client B', 'client C'],
      projects: ['Project A', 'Project B', 'Project C'],
      priority_names: {
        1: 'Critical',
        2: 'High',
        3: 'Medium',
        4: 'Low',
        5: 'Undetermined'
      },
      submitted: false,
      target_date: null,
      request: {
        client: null,
        project: null,
        priority: null,
        title: null,
        description: null,
        target_date: null
      }
    }
  },
  validations: {
    request: {
      client: {
        required
      },
      project: {
        required
      },
      priority: {
        required,
        between: between(0, 6),
        numeric: numeric
      },
      title: {
        required,
        minLength: minLength(2)
      },
      description: {
        required,
        minLength: minLength(10)
      }
    },
    target_date: {
      validDateFormat (dateStr) {
        if (dateStr == null || dateStr === '') {
          return true
        }
        console.log(dateStr)
        // eslint-disable-next-line no-useless-escape
        let re = '^[0-9]{2}\/[0-9]{2}\/[0-9]{4}'
        let matches = dateStr.match(re)
        console.log(matches)
        if (matches === null) {
          console.log('returning false')
          return false
        } else {
          return true
        }
      }
    }
  },
  methods: {

    submitForm: function (event) {
      const axios = require('axios')
      let self = this
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.request.target_date = moment(this.target_date).format('YYYY-MM-DD')
      axios.post('http://127.0.0.1:8000/api/features/', this.request)
        .then(function (response) {
          self.$router.push('/request-received')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    resetForm: function (event) {
      this.submitted = false
      this.request.client = null
      this.request.project = null
      this.request.priority = null
      this.request.title = ''
      this.request.description = ''
      this.request.target_date = ''
      this.target_date = ''
    },
    nav_list: function () {
      this.$router.push('/')
    }
  },
  mounted () {
    const axios = require('axios')
    var self = this
    axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
      self.projects = response.data
    })
      .catch(error => {
        alert('We received an error ')
        console.log(error)
      })

    axios.get('http://127.0.0.1:8000/api/clients/').then(response => {
      self.clients = response.data
    })
      .catch(error => {
        alert('We received an error ')
        console.log(error)
      })
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>
