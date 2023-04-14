<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      class="q-gutter-md"
      autofilled="false"
      autocomplete="false"
    >
        <q-input filled v-model="profile.fullname" type="text" label="Enter your Name" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:before>
          <q-icon name="profile" />
        </template>
      </q-input>
        <q-input filled v-model="profile.email" type="email" label="Enter your Email" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:before>
          <q-icon name="mail" />
        </template>
      </q-input>

        <q-input filled v-model="profile.password" type="password" label="Enter your Password" lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']">
        <template v-slot:before>
          <q-icon name="lock" />
        </template>
      </q-input>

      <div>
        <q-btn label="Register" type="submit"  @click="onSubmit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" @click="onReset" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>
<script>

import { defineComponent } from 'vue'
// import { mapActions } from 'vuex'

export default defineComponent({
  name: 'Register',
  data () {
    return {
      profile: [{
        fullname: '',
        email: '',
        password: '',
        error: null
      }],
    }
  },
  methods: {
    async onSubmit () {
      const data = {
        fullname: this.profile.fullname,
        email: this.profile.email,
        password: this.profile.password
      }          
      const response = await this.$api.post('/profile', data)
        .then(response => {
          this.profile.id = response.data.id;
          console.log(response.data);
            this.$router.push({
            name: 'Login'
        })
      })
        .catch(e => {
          console.log(e);
        });
    },
    onReset () {
      this.form.email = null
      this.form.password = null
    },
  }
})
</script>
