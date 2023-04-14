<template>
    <v-app-bar
        style="padding: 0px 80px"
      app
      color="white"
      light
      elevation="6"
      elevate-on-scroll
    >
    <v-toolbar-title>
      BusProfile
    </v-toolbar-title>
    <v-spacer/>
    <v-list class="d-flex align-center"> 
      <v-list-item link v-for="(menu, index) in menus" :key="index" :to="menu.route">
        <v-list-item-title>
          {{menu.title}}
        </v-list-item-title>
      </v-list-item>
      <v-btn outlined color="success">Get Started</v-btn>
    </v-list>



    
    </v-app-bar>
    
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menus: [
        { title: "Home", route: "home" },
        { title: "About Us", route: "about-us" },
        { title: "Profiles", route: "profiles" },
        { title: "Hire Us", route: "hireus" },
      ],
    };
  },
};
</script>
