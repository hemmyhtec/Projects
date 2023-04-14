<template>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about" v-if="isProfileLoggedIn">About</router-link>
      <router-link to="/login" v-else>Login</router-link>
      <button type="button" @click="logout()" v-if="isProfileLoggedIn">
        Logout
      </button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
// import axios from 'axios'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'PageIndex',
  computed: {
    ...mapGetters([
      'isLogged'
    ])
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
