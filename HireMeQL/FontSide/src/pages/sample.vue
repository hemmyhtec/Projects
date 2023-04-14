<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
      .then(response => {
        console.log(response)
      })
  }
})
</script>
