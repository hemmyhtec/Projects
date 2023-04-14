<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="gt-sm" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{$route.name}}</span>
            <q-list>

              <q-item clickable class="header-icon q-pa-md lt-md inline" v-ripple exact 
              :to="{ name: 'Home', params: { profileId: profileId } }">
              <q-item-section avatar>
                <q-icon name="fab fa-houzz" />
              </q-item-section>
            </q-item>
              <q-item clickable class="header-icon q-pa-md lt-md inline" v-ripple exact 
              :to="{ name: 'Profile', params: { profileId: profileId } }">
              <q-item-section avatar>
                <q-icon name="fas fa-user-tie " />
              </q-item-section>
            </q-item>
              <q-item clickable class="header-icon q-pa-md lt-md inline" v-ripple exact 
              :to="{ name: 'Settings', params: { profileId: profileId } }">
              <q-item-section avatar>
                 <q-icon name="fas fa-toolbox" />
              </q-item-section>
            </q-item>
              <q-item clickable class="header-icon q-pa-md lt-md inline" v-ripple exact
               v-if="$store.state.isProfileLoggedIn" @click="logout">
              <q-item-section avatar>
                 <q-icon name="fas fa-sign-out-alt " />
              </q-item-section>
            </q-item>
          </q-list>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
    show-if-above
    v-model="leftDrawerOpen"
    side="left"
    bordered
    :width="253"
    >
      <q-icon
      class="q-pa-md"
      name="fas fa-h-square"
      size="lg"
      color="primary"
      />
      <q-list>
      <q-item 
      clickable 
      v-ripple 
      exact 
      :to="{
        name: 'Home',
         params: {
            profileId: profileId
          }
      }">
        <q-item-section avatar>
          <q-icon name="fab fa-houzz" />
        </q-item-section>

        <q-item-section class="text-weight-bold">Home</q-item-section>
      </q-item>
    
      <q-item 
      clickable 
      v-ripple 
      exact 
      :to="{
        name: 'Profile',
         params: {
            profileId: profileId
          }
      }">
        <q-item-section avatar>
          <q-icon name="fas fa-user-tie " />
        </q-item-section>

        <q-item-section class="text-weight-bold">Profile Card</q-item-section>
          </q-item>
          <q-item 
          clickable 
          v-ripple 
          exact 
          :to="{
            name: 'Settings',
            params: {
                profileId: profileId
              }
          }">
        <q-item-section avatar>
          <q-icon name="fas fa-toolbox" />
        </q-item-section>

        <q-item-section class="text-weight-bold">Settings</q-item-section>
      </q-item>
          <q-item 
          clickable 
          v-ripple 
          exact 
          v-if="$store.state.isProfileLoggedIn"
          @click="logout"
          >
        <q-item-section avatar>
          <q-icon name="fas fa-sign-out-alt " />
        </q-item-section>

        <q-item-section class="text-weight-bold">Logout</q-item-section>
      </q-item>
    </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
       <q-input class="q-ma-md" outlined rounded placeholder="Search Feed">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list padding seperator>
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Graphics Design</q-item-label>
          <q-item-label class="text-weight-bold">Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Graphics Design</q-item-label>
          <q-item-label class="text-weight-bold">Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Graphics Design</q-item-label>
          <q-item-label class="text-weight-bold">Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>

      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)


    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setProfile', null)

        this.$router.push({
          name: '',
        })
      }
    }
  }
}
</script>

<style lang="sass">
.header-icon
  position: absolue
  botton: 0
  left: 10%
  tranform: translateX(-10%)
</style>
