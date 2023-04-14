<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      class="q-gutter-md"
    >
        <q-input filled v-model="form.email" type="email"   lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:before>
          <q-icon name="mail" />
        </template>
      </q-input>

        <q-input filled v-model="form.password" type="password"   lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:before>
          <q-icon name="lock" />
        </template>
      </q-input>

      <div>
        <q-btn label="Login" type="submit"  @click="onSubmit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" @click="onReset" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>
<script>
// import ProfileService from '../boot/ProfileService'
import { defineComponent } from 'vue'
// import { mapActions } from 'vuex'
import { Notify, Loading, QSpinnerGears } from 'quasar'

export default defineComponent({
  name: 'Login',
  data () {
    return {
      profile: {},
      form: [{
        email: '',
        password: '',
        error: null
      }]
    }
  },
  methods: {
    
    // ...mapActions('userAccount', ['USER_LOGIN']),
    async onSubmit () {
      // const _ = this;
      const form = {
        email: this.form.email,
        password: this.form.password
      } 
      try {
       const response = await this.$api.post('/login', form)
      //  Loading.show({
      //   spinner: QSpinnerGears,
      //   timeout: 2,
      //   })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setProfile', response.data.profile)
        const id = response.data.profile.id
         Notify.create({
            type: 'positive',
            color: 'positive',
            timeout: 1000,
            position: 'top',
            message: 'Login Succeesful!'
          })
        this.$router.push({
          name: 'Settings',
          params: {
            id: id
          }
        })
        // Loading.hide()
      } catch (error) {
        
         Notify.create({
          type: 'warning',
          color: 'warning',
          timeout: 1000,
          position: 'center',
          message: 'Opps. Email or Password Not Correct'
        })
        console.log(error)
      }
    },
    onReset () {
      this.form.email = null
      this.form.password = null
    }
    // navigateTo (route) {
    //   this.$router.push(route)
    // }
  }
})
</script>
