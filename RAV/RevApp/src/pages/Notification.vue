<template>
  <div class="q-pa-md">
    <q-list bordered class="shadow-3">
        <div v-for="notification in notifications" :key="notification.id">
            <!-- <div v-for="data in notification.MentorProfile" :key="data.id"> -->
                
                <q-item clickable v-ripple :to="{ name: 'Mentors', param: { id: Notid} }">
                <q-item-section>
                <span class="text-primary"> {{notification.message}} from</span>  <b>{{ notification.MentorProfile.name }}</b>  <p class="text-caption"><b class="text-primary">Post:</b> {{ notification.text }}</p> 
                </q-item-section>
                
                <q-item-section avatar>
                <q-avatar rounded>
                    <img class="profile-user-img img-fluid img-circle" :src="`http://localhost:8081/images/${notification.MentorProfile.file}`" alt="User profile picture">
                </q-avatar>
                </q-item-section>
               
            </q-item>
            
          <q-separator />
          <!-- </div> -->
        </div>

    </q-list>
  </div>
</template>

<script>
// import { Notify } from 'quasar'
import { defineComponent, ref } from "vue";
// import photo from '../../../RavServer/public/images'

export default defineComponent({
  name: "Profile",
  data() {
    return {
      notifications: {},
    };
  },
  async mounted() {
    // const id = this.$route.params.id;
    this.notifications = (await this.$api.get(`/notifications`)).data;
  },
});
</script>
<style lang="sass">

</style>