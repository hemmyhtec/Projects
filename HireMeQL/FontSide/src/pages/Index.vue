<template>
  <div class="q-pa-md shadow-10 card" style="max-width: 300px">
       <div class="text-weight-bold text-primary text-h5 ">Let's Get Started</div>
              <div class="text-weight-light text-grey-8">Create an Account with <strong>HireME</strong> to get all features...</div>
       <q-separator /> <br>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
        <q-input rounded outlined v-model="form.email" type="email" label="Enter your Email" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:prepend>
          <q-icon name="mail" color="primary" />
        </template>
      </q-input>

        <q-input rounded outlined  v-model="form.password" type="password" label="Create a Strong" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:prepend>
          <q-icon name="lock" color="primary" />
        </template>
      </q-input>

      <div>
        <q-btn label="Submit" type="submit" @click="onSubmit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat />
      </div>
    </q-form>
    <br>
    <div class="text-primary">
      Already have an account?<q-btn clickable flat label="Login" to="/login" />
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      form: [{
        email: '',
        password: '',
        error: null
      }]
    }
  },
  methods: {
    onSubmit () {
      const form = {
        email: this.form.email,
        password: this.form.password
      }
      axios.post('http://127.0.0.1:8000/api/user', form)
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
</script>

<style lang="sass">
body
  background-color: $grey-3
  color: $primary
.card
  height: auto
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  padding: 20px
  color: $grey-1
  background-color: $grey-1
  border-radius: 10px

</style>
