<template>
   <b-container>
   <div class="back">
   <div class="form-space">
    <b-row class="my-1">
    <b-col sm="12">
     <div class="icon-pic"></div>
        <h3 style="text-align: center">Login Page</h3>
     <label for="Email">Email</label>
      <b-form-input id="input-small" type="email" size="lg" placeholder="Enter your Email" v-model="email"></b-form-input>
    </b-col>

  </b-row>
   <b-row class="my-1">
    <b-col sm="12">
    <label for="Password">Password</label>
      <b-form-input id="input-small" type="password" size="lg" placeholder="Enter your Password" v-model="password"></b-form-input>
    </b-col>
  </b-row>
           <!-- <b-alert default="false" show variant="warning" v-html="error"></b-alert> -->
            <b-alert class="error" v-if="error" show variant="warning">
          {{ error }}
         </b-alert>

         <b-button class="btn" @click="login">Login</b-button>

        <p class="btn-login" @click="navigateTo({name: 'register'})">Register New Account</p>
    </div>
     </div>

</b-container>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'profile'
        })
      } catch (error) {
        this.error = null
        this.error = error.response.data.error
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
  .back{
    background: white;
  }
  .form-space {
    margin: auto;
    width: 350px;
    height: 550px;
    padding: 40px;
    border-radius: 20px;
    box-sizing: border-box;
    background: #ecf0f3;
    box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
    text-align: left;
    font-weight: bold;
  }
  .icon-pic {
    height: 100px;
    width: 100px;
    background-image: url('../assets/user.png');
    background-size: cover;
    background-position: top;
    margin: auto;
    border-radius: 50%;
    box-sizing: border-box;
    box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
  }
  .person-plus-fill{
    height: 100px;
    widows: 100px;
  }
  #input-small {
    background: #ecf0f3;
    padding: 10px;
    padding-left: 20px;
    height: 50px;
    font-size: 14px;
    border-radius: 50px;
    box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
  }
  label {
    text-align: left;
    font-size: 12px;
  }
  .btn {
    background: rgb(146, 5, 0);
  }
    .btn-login {
    cursor: pointer;
    margin-top: 5px;
  }
  .btn-login:hover {
    padding: 5px;
  }
</style>
