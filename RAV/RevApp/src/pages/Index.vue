<template>
  <div class="q-pa-md">
    <q-carousel
      arrows
      animated
      fullscreen
      v-model="slide"
      height="400px"
      transition-prev="slide-left"
      transition-next="slide-right"
      :autoplay="2500"
    >
      <q-carousel-slide name="first" img-src="../assets/back3.jpg">
        <div class="absolute-center custom-caption">
          <div class="text-h4 text-center text-grey-2">Welcome to </div>
          <div class="text-h1 text-weight-bolder text-center text-grey-2">RAV</div>
           <q-btn color="white" text-color="black" label="Get Started" class="" to="/Preview" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="../assets/back3.jpg">
        <div class="absolute-center custom-caption">
          <div class="text-h4 text-center text-grey-2">Welcome to </div>
          <div class="text-h1 text-weight-bolder text-center text-grey-2">RAV</div>
           <q-btn color="white" text-color="black" label="Get Started" to="/Preview" />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      slide: ref('first')
    }
  }
}
</script>
<style lang="sass">
  
</style>