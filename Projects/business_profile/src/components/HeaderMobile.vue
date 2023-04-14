<template>
  <div>
    <v-app-bar
        app
      color="white"
      light
      elevation="6"
      elevate-on-scroll
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>BusProfile</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

         <v-list> 
      <v-list-item link v-for="(menu, index) in menus" :key="index" :to="menu.route" @click="() => {}">
        <v-list-item-title>
          {{menu.title}}
        </v-list-item-title>
      </v-list-item>
      <v-btn small outlined color="success">Get Started</v-btn>
    </v-list>
      </v-menu>
    </v-app-bar>
  </div>
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
