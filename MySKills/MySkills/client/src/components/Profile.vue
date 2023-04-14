<template>
<b-container>
  <b-row>
    <b-col>
        <div>

          <div v-for="profile in profiles" :key="profile.id">
            {{profile.fullname}} -
            {{profile.proffession}} -
            {{profile.brandname}}

          </div>
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>

</div>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import ProfileService from '@/services/ProfileService'

export default {
  data () {
    return {
      profiles: null
    }
  },
  async mounted () {
    this.profiles = (await ProfileService.index()).data
  }
}

</script>

<style scoped>

</style>
