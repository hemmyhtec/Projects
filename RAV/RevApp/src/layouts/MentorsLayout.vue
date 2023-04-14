<template>
  <q-layout view="lHr lpR lFr">
    <q-header elevated class="bg-black text-white">
      <q-toolbar>
        <q-toolbar-title>
          <span class="gt-sm float-right">{{ $route.name }}</span>
          <q-list>
            
            <q-item :lines="5" clickable v-ripple class="header-icon q-pa-none lt-md inline" :to="{ name: 'Mentors', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon class="q-pa-none"  name="fas fa-h-square" />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="header-icon q-pa-none lt-md inline" :to="{ name: 'Notification', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon size="xm" name="fas fa-bell" />
            </q-item-section>
          </q-item>
         
          <q-item clickable v-ripple class="header-icon q-pa-none lt-md inline" :to="{ name: 'Message', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon size="xm" name="fas fa-sms" />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="header-icon q-pa-none lt-md inline" :to="{ name: 'Profile', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon size="xm" name="fas fa-id-badge" />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="header-icon q-pa-none lt-md inline" :to="{ name: 'More', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-chevron-circle-down" />
            </q-item-section>
          </q-item>

            <q-item
              clickable
              class="header-icon q-pa-none lt-md inline"
              v-ripple
              exact
              v-if="$store.state.isMentorLoggedIn"
              @click="logout"
            >
              <q-item-section avatar>
                <q-icon name="fas fa-sign-out-alt " />
              </q-item-section>
            </q-item>

          </q-list>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="q-pa-md">
        <q-icon class="q-pa-md" name="fab fa-ravelry" size="lg" />

        <q-list style="max-width: 318px" active-class padding class="q-gutter-lg">

          <q-item :lines="5" clickable v-ripple :to="{ name: 'Mentors', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-h-square" />
            </q-item-section>
            <q-item-section class="text-h6">Home</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'Notification', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-bell" />
            </q-item-section>
            <q-item-section class="text-h6">Notification</q-item-section>
          </q-item>
         
          <q-item clickable v-ripple :to="{ name: 'Message', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-sms" />
            </q-item-section>
            <q-item-section class="text-h6">Message</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'Profile', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-id-badge" />
            </q-item-section>
            <q-item-section class="text-h6">Profile</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'More', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-chevron-circle-down" />
            </q-item-section>
            <q-item-section class="text-h6">More</q-item-section>
          </q-item>

          <q-item
              clickable
              v-ripple
              exact
              v-if="$store.state.isMentorLoggedIn"
              @click="logout"
            >
              <q-item-section avatar>
                <q-icon name="fas fa-sign-out-alt " />
              </q-item-section>
               <q-item-section class="text-h6">Sign-Out</q-item-section>
            </q-item>

        </q-list>
      </div>
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
    >
      <div>
          <div class="right-tap">
            <q-input color="teal" rounded outlined v-model="text" placeholder="Search">
                <template v-slot:prepend > 
                <q-icon name="search" />
                </template>
            </q-input>
            <div class="top-posts shadow-15">
                <div class="text-caption text-weight-bold">TOP TREADS</div>
            </div>

          </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
// import { route } from "vuex";
import { Store } from '../store/index'

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      logout () {
        
        Store.dispatch('setToken', null)
        Store.dispatch('setUser', null)

        $router.push({
          name: '',
        })
      }
    };
  },
};
</script>
<style lang="sass" scoped>

  .right-tap
      padding: 15px
      .top-posts 
          height: 500px
          margin-top: 20px
          padding: 10px
          border-radius: 10px
.header-icon
  position: absolue
  botton: 0
  left: 9%
  tranform: translateX(-20%)
  

</style>
