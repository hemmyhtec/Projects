<template>
    <div class="q-pa-md q-gutter-sm form absolute-center shadow-24">
        <!-- <i class="fas fa-long-arrow-alt-left"></i> -->
         <p class=" text-h4 text-bold "> Welcome Back!</p> 
         <q-separator />

        <q-input v-model="form.email" clearable type="email" :dense="dense" label="Email Id">
        <template v-slot:prepend>
          <q-icon name="fas fa-at" />
        </template>
         </q-input>

        <q-input v-model="form.password" clearable :type="isPwd ? 'password' : 'text'"  :dense="dense" label="Password">
        <template v-slot:prepend>
          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"/>
        </template>
         </q-input>

       <div>
        <q-btn label="Login" type="submit" @click="onSubmit" style="background: #21BA45; color: white"/>
        <q-btn to="/Preview" type="reset" flat class="q-ml-sm" icon="fas fa-long-arrow-alt-left" />
      </div>
       
     
      <q-separator size="md" />
      
    </div>
</template>
<script>
import { Notify } from 'quasar'
import { ref } from 'vue'

export default {
    data () {
        return {
            user: {},
            form: {
                email: '',
                password: '',
                error: ''
            },
            isPwd: ref(true),
        }
    },
    methods: {
    async onSubmit () {
      const form = {
        email: this.form.email,
        password: this.form.password
      } 
      try {
    const response = await this.$api.post('/loginstudent', form)
       this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        const id = response.data.student.id
        // console.log(id)
         Notify.create({
            type: 'positive',
            color: 'positive',
            timeout: 1000,
            position: 'top',
            message: 'Login Succeesful!'
          })
        // const id = response.data.user.id
        this.$router.push({
          name: 'Students',
          params: {
            id: id
          }
        })
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
    },
}
</script>
<style lang="sass" scoped>
.form 
    width: fit-content
    height: fit-content
    margin: auto
    border-radius: 20px
    padding: 40px


</style>
