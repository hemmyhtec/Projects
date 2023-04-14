<template>
   <b-container>
   <div class="back">
   <div class="form-space">
    <b-row class="my-1">
    <b-col sm="12">
     <div class="icon-pic"></div>
        <h3 style="text-align: center">Register</h3>
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
           <b-alert default="false" show variant="warning" v-html="error"></b-alert>

         <b-button class="btn" @click="register">Register</b-button>

        <p class="btn-login" @click="navigateTo({name: 'login'})">Click to Login</p>
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
    async register () {
      try {
        await AuthService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
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
    height: 500px;
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
    font-weight: 900px;
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

   <b-container>
   <div class="back">
   <div class="form-space">
   <div>
        <div class="icon-pic"></div>
        <h3 style="text-align: center">Register</h3>

    <b-input-group class="mb-2">
      <b-form-input id="input-small" type="email" placeholder="Enter your Email" v-model="email"></b-form-input>
      <b-form-input id="input-small" type="password" placeholder="Enter your Password" v-model="password"></b-form-input>
    </b-input-group>

      <b-input-group class="mb-2">
      <b-form-input id="input-small" type="text" placeholder="Enter your Name" v-model="fullname"></b-form-input>
      <b-form-input id="input-small" type="text" placeholder="Enter your BrandName" v-model="brandname"></b-form-input>
    </b-input-group>

    <label for="Password">Your Skill / Your Sales</label>
    <b-input-group class="mb-2">
      <b-form-input id="input-small" type="text" placeholder="Enter your Skill/Sales" v-model="skill1"></b-form-input>
      <b-form-input id="input-small" type="text" placeholder="Enter your Skill/Sales" v-model="skill2"></b-form-input>
    </b-input-group>

    <b-input-group class="mb-2">
      <b-form-input id="input-small" type="text" placeholder="Enter your Skill/Sales" v-model="skill3"></b-form-input>
      <b-form-input id="input-small" type="text" placeholder="Enter your Skill/Sales" v-model="skill4"></b-form-input>
    </b-input-group>

  <label for="Password">Your Socail Media Handles</label>
    <b-input-group class="mb-2">
      <b-form-input id="input-small" type="text" placeholder="Enter your Instagram Handle" v-model="socail_handle1"></b-form-input>
      <b-form-input id="input-small" type="number" placeholder="Enter your WhatsApp No" v-model="socail_handle2"></b-form-input>
    </b-input-group>

  </div>
           <b-alert default="false" show variant="warning" v-html="error"></b-alert>

         <b-button class="btn" @click="register">Register</b-button>

        <p class="btn-login" @click="navigateTo({name: 'login'})">Click to Login</p>
    </div>
     </div>

</b-container>