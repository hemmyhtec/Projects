<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
    <div class="col">
      <q-input
        filled
        bottom-slots
        v-model='text'
        autogrow
        label="Update your New Offer or Sells"
        counter
        maxlength="360"
        :dense='dense'
        class="textArea"
      >
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
       <q-btn round dense color="primary" @click="submitPost" icon="send" :disable="!text" class="q-mb-lg" />
    </div>
    </div>
    <q-separator class="divider" size="10px" color="grey-2" />

    <q-list bordered class="rounded-borders">
      <div v-for="mentor in mentors" :key="mentor.id">
        <div v-for="post in mentor.MentorsPosts" :key="post.id">

        
      <q-item-label header class="text-primary">New Updates</q-item-label>
      <q-item clickable class="q-py-md">
        <q-item-section avatar top>
          <q-avatar>
            <img class="profile-user-img img-fluid img-circle" :src="`http://localhost:8081/images/${mentor.file}`" alt="User profile picture">
          </q-avatar>
        </q-item-section>

        <q-item-section >
          <q-item-label class="text-subtitle1">
          <strong>{{mentor.name}}</strong>
            <span class="text-grey-7">
           @{{ mentor.profession}}
            </span>
          </q-item-label>
          <q-item-section side top>
          {{mentor.updatedAt}}
        </q-item-section>
        
          <q-item-label class="newLine text-body1 text-justify">
           {{ post.text }}
          </q-item-label>
          
          <q-item-label class="newLine text-body1 text-justify">
             <q-img
              :src="`http://localhost:8081/images/${post.file}`"
              style="max-width: 400px; height: 300px;"
              fit="scale-down"
              class="rounded-borders"
            >
        </q-img>
          </q-item-label>
          <div class="update-icons row justify-between q-mt-sm">
            <q-btn flat round color="primary" size="sm" icon="far fa-comment">
              <q-popup-proxy>
              <q-banner>
                <!-- <q-input outlined v-model="comments" label="Comment"/> -->
                <q-btn color="primary" flat icon="send"  @click="getDatas" to="/Message" />
              </q-banner>
            </q-popup-proxy>
             </q-btn>
            <q-btn flat round color="primary" size="sm" icon="fas fa-retweet" @click="sharedBy"/>
            <q-btn flat round color="primary" size="sm" icon="far fa-heart" @click="likedBy" />
            <!-- <q-btn flat round color="primary" size="sm" icon="fas fa-trash" /> -->
          </div>
        </q-item-section>
      </q-item>
      </div>
  </div>
</q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { Notify, useQuasar } from 'quasar'

export default defineComponent({
  name: 'PageIndex',
  data () {
    return {
      text: '',
      comments: '',
      postId: '',
      file: {},
      mentors: {},
      // error: false,
    }  
  },
    methods: {
    async getDatas (){
     await this.$api.get('/mentors')
      .then((response) => {
        const UserId = response.data.MentorsProfile.id
        const PostId = response.data.MentorsPosts.id
        this.updateComment(UserId, PostId)
      })
      .catch((err)=> {
        console.log(err)
      })
    },
    handleFileUpload (evt) {
      const file = evt.target.files[0]
      this.file = file
      // this.error = false
    },
    async likedBy () {
      const id = this.$route.params.id
      const likedBy = await this.$api.post(`/liked/${id}`)
      try {
        console.log('Post Liked by', likedBy.data.id)
      } catch (error) {
        console.log('Error Liking this post', error)
      }
    },
    async updateComment (UserId, PostId) {
          try {
            const postComment = await this.$api.post(`/comments/${UserId, PostId}`, this.comments)
            console.log('Post Commented by', postComment.data.id)
          } catch (error) {
            console.log('Error Liking this post', error)
          }
    },
    async submitPost () {
      const formData = new FormData()
        formData.append('text', this.text)
        formData.append('file', this.file)
          const id = this.$route.params.id

      try {  
        const response = await this.$api.post(`/mentorpost/${id}`, formData) 
        const PostId = response.data.id
        // this.PostId = PostId
        console.log(this.PostId)

        Notify.create({
            type: 'positive',
            color: 'positive',
            timeout: 1000,
            position: 'center',
            message: 'Yeah. Data saved. Great Job!'
          })
          
        this.$router.push({
          name: 'Mentors'
        })
        this.file = ""
        this.posts = ""
        this.error = false
        // useQuasar.loadingBar.stop()
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
    this.mentors = (await this.$api.get('/mentors')).data
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
.img-fluid
  width: 300px
  height: 300px


</style>
