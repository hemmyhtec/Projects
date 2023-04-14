<template>
  <q-layout view="lHr lpR lFr">
    <q-header elevated class="bg-black text-white">
      <q-toolbar>
        <q-toolbar-title>
          <span class="gt-sm float-right">{{ $route.name }}</span>
          <q-list>
            
            <q-item :lines="5" clickable v-ripple class="header-icon q-pa-none lt-md inline" :to="{ name: 'Students', param: { id: id } }" >
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
              class="header-icon q-pa-md lt-md inline"
              v-ripple
              exact
              v-if="$store.state.isStudentLoggedIn"
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

          <q-item :lines="5" clickable v-ripple :to="{ name: 'Students', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-h-square" />
            </q-item-section>
            <q-item-section class="text-h6">Home</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'Notifications', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-bell" />
            </q-item-section>
            <q-item-section class="text-h6">Notification</q-item-section>
          </q-item>
         
          <q-item clickable v-ripple :to="{ name: 'Messages', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-sms" />
            </q-item-section>
            <q-item-section class="text-h6">Message</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'Profiles', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-id-badge" />
            </q-item-section>
            <q-item-section class="text-h6">Profile</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'Mores', param: { id: id } }" >
            <q-item-section avatar>
              <q-icon name="fas fa-chevron-circle-down" />
            </q-item-section>
            <q-item-section class="text-h6">More</q-item-section>
          </q-item>

          <q-item
              clickable
              v-ripple
              exact
              v-if="$store.state.isStudentLoggedIn"
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
                <div class="text-caption text-weight-bold">TOP MENTORS</div>
                <div v-for="mentor in mentors" :key="mentor.id" >
                  <!-- <div v-for="mentorprofile in mentorprofiles" :key="mentorprofile.id"> -->
                 <q-list > 
                <q-item>
                <q-item-section top avatar>
                  <q-avatar size="50px" color="white">
                    <img class="profile-user-img img-fluid img-circle" :src="getProfilePhoto()" alt="User profile picture">
                    <!-- <q-img src="../assets/mentor.jpg" /> -->
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label><b>{{mentor.name}}</b></q-item-label>
                  <q-item-label caption lines="2">{{mentor.about}}</q-item-label>

                  <q-btn class="text-overline text-left" size="xs" padding="xs" flat label="Request Mentorship" color="primary" @click="card = true" />

                  <q-dialog v-model="card" >
                    <q-card class="my-card" >
                      <q-img src="../assets/back.jpg" />

                      <q-card-section>
                        <q-btn
                          fab
                          color="primary"
                          icon="place"
                          class="absolute"
                          style="top: 0; right: 12px; transform: translateY(-50%);"
                        />
                      
                        <div class="row no-wrap items-center">
                          <div class="col text-h6 ellipsis">
                            {{mentorprofiles.name}}
                          </div>
                        </div>
                        
                      <q-rating v-model="stars" :max="5" size="32px" />
                      </q-card-section>

                      <q-card-section class="q-pt-none">
                        <div class="text-subtitle1">
                          {{mentorprofiles.profession}}
                        </div>
                        <div class="text-caption text-grey">
                          {{mentorprofiles.about}}
                        </div>
                      </q-card-section>

                      <q-separator />

                      <q-card-actions align="right">
                        <q-btn v-close-popup flat color="primary" label="Request for Mentorship" />
                        <q-btn v-close-popup flat color="primary" round icon="event" />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>

                </q-item-section>
                
              </q-item>
            </q-list>
          </div>
               <!-- </div> -->
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
  data() {
    return {
      mentors: {},
      mentorprofiles: {}
    }
    
  },
  methods: {
    getProfilePhoto() {
      return (`http://localhost:8081/public/images/${this.mentors.file}`)
  }
  
  },
  async mounted() {
    this.mentors = (await this.$api.get('/mentors')).data;
    // const id = this.mentors.data.id;
    const id = this.$route.params.id;
    this.mentorprofiles = (await this.$api.get(`/profile/${id}`)).data;
    console.log(this.mentors)
  },
  
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
      card: ref(false),
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
          padding: 5px
          border-radius: 10px
.header-icon
  position: absolue
  botton: 0
  left: 15%
  tranform: translateX(-20%)
  

</style>
