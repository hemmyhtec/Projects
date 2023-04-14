<template>
  <v-app>
    <Header class="hidden-sm-and-down"/>
    <HeaderMobile class="hidden-md-and-up"/>
    <v-main>
    <HeroComponent/>
    </v-main>
  </v-app>
</template>

<script>

import Header from './components/Header.vue'
import HeaderMobile from './components/HeaderMobile.vue'
import HeroComponent from './components/HeroComponent.vue'
export default {
  name: 'App',
  components: {Header, HeroComponent, HeaderMobile},
  data() {
    return {
    };
  },
};
</script>
