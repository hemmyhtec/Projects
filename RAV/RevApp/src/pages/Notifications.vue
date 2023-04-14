<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered>
        <div v-for="notification in notifications" :key="notification.id"> 
      <q-item clickable v-ripple>
        <q-item-section>{{notification.text}}</q-item-section>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="../assets/mentor.jpg">

          </q-avatar>
        </q-item-section>
      </q-item>
          <q-separator />
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
      notifcations: {},
    };
  },
  async mounted() {
    // const id = this.$route.params.id;
    this.notifcations = (await this.$api.get(`/notifications`)).data;
  },
});
</script>
<style lang="sass">

</style>
