<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
    <div class="col">
      <q-input
        filled
        bottom-slots
        v-model='posts'
        autogrow
        label="Update your New Offer or Sells"
        counter
        maxlength="360"
        :dense='dense'
        class="textArea"
      >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="../assets/avatar.svg" />
          </q-avatar>
        </template>
      </q-input>
      <q-file
        v-model="file"
        label="Pick Advert Picture"
        multiple
        style="max-width: 200px"
        accept=".jpg, .pdf, image/*"
        @change="handleFileUpload"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
    </div>


    <div class="col col-shrink">
       <q-btn round dense color="primary" @click="postUpdate" icon="send" :disable="!posts" class="q-mb-lg" />
    </div>
    </div>
    <q-separator class="divider" size="10px" color="grey-2" />

    <q-list bordered class="rounded-borders">
      <div v-for="profile in profiles" :key="profile.id">
      <q-item-label header class="text-primary">New Updates</q-item-label>
      <q-item class="q-py-md">
        <q-item-section avatar top>
          <q-avatar>
            <img src="../assets/avatar.svg" />
          </q-avatar>
        </q-item-section>

        <q-item-section >
          <q-item-label class="text-subtitle1">
          <strong>{{profile.fullname}}</strong>
            <span class="text-grey-7">
           @{{ profile.skill}}
            </span>
          </q-item-label>
          <q-item-section side top>
          {{profile.updatedAt}}
        </q-item-section>

          <q-item-label class="newLine text-body1 text-justify">
            -- I'll be in your neighborhood doing errands this
            weekend. Do you want to grab brunch?  -- I'll be in your neighborhood doing errands this
            weekend. Do you want to grab brunch?

            -- I'll be in your neighborhood doing errands this
            weekend. Do you want to grab brunch? -- I'll be in your neighborhood doing errands this
            weekend. Do you want to grab brunch?
          </q-item-label>
          <div class="update-icons row justify-between q-mt-sm">
            <q-btn flat round color="primary" size="sm" icon="far fa-comment" />
            <q-btn flat round color="primary" size="sm" icon="fas fa-retweet" />
            <q-btn flat round color="primary" size="sm" icon="far fa-heart" />
            <q-btn flat round color="primary" size="sm" icon="fas fa-trash" />
          </div>
        </q-item-section>



      </q-item>
  </div>
</q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      posts: '',
      file: {},
      profiles: {},
      // error: false,
    }
  },
    methods: {
    handleFileUpload (evt) {
      const file = evt.target.files[0]
      this.file = file
      // this.error = false
    },
    async postUpdate () {
      const formData = new FormData()
      formData.append('posts', this.posts)
      formData.append('file', this.file)
      const ProfileId = this.$route.params.id
      console.log(ProfileId)
      try {
        const response = await this.$api.post(`/posts/${ProfileId}`, formData) 
        Notify.create({
            type: 'positive',
            color: 'positive',
            timeout: 1000,
            position: 'center',
            message: 'Yeah. Data saved. Great Job!'
          })
          
        this.$router.push({
          name: 'Home'
        })
        this.file = ""
        this.posts = ""
        this.error = false
        } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          color: 'warning',
          timeout: 1000,
          position: 'center',
          message: 'File to Large...Max 3MB'
        })
        this.file = ""
        this.posts = ""
        this.error = true
      }
    }
  },
  async mounted () {
    this.profiles = (await this.$api.get('/profile')).data
  }
})
</script>

<style lang="sass">
.textArea
  textarea
    font-size: 20px
    line-height: 1.4 !important
.divider
  border-bottom: 1px solid
  border-color: $primary
.newLine
  white-space: pre-line
.update-icons
  margin-left: -5px
</style>
