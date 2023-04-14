<template>
  <div class="card">
    <q-btn type="submit" no-caps rounded flat class="">Edit Profile</q-btn>
    <div class="text-center">
      <q-btn round class="shadow-12">
        <q-avatar size="120px" color="white">
          <!-- <q-img src="../assets/student.jpg" /> -->
           <img class="profile-user-img img-fluid img-circle" :src="getProfilePhoto()" alt="User profile picture">
          <!-- <img src="../assets/use.jpg" /> -->
        </q-avatar>
      </q-btn>
      <div class="text-h6 text-weight-bold">{{ profiles.name }}</div>
      <div class="text-body1">Want Mentorship on: <b>{{ profiles.interest }}</b> </div>

      <div class="row">
        <div class="col">
          <div class="q-pa-md q-gutter-sm">
            <q-btn
              label="Add Post"
              icon="edit"
              class="float-right"
              outline
              @click="small = true"
            />
            <q-dialog v-model="small">
              <q-card style="width: 300px">
                <q-card-section>
                  <div class="text-h6">Add Post</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                <q-input v-model="post.text" label="Add Post">
                  <template v-slot:prepend>
                    <q-icon name="edit" />
                  </template>
                </q-input>
                
                 <q-file @change="handleFileUpload" accept=".jpg, .pdf, image/*" v-model="post.file" label="Add Picture">
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>

                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn @click="submitPost" flat label="Post" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>

        <div class="col">
         
          <div class="q-pa-md q-gutter-sm float-left">
              <q-btn
              label="About Me"
              icon="edit"
              class="float-right"
              outline
              @click="medium = true"
            />
            <q-dialog v-model="medium">
              <q-card style="width: 700px">
                <q-card-section>
                  <div class="text-h6">About Me</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  {{profiles.about}}
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>

      <!-- <div class="row">
          <div class="q-pa-md col q-gutter-sm"> 
          <q-btn class="" style="background: #21BA45; color: white" icon="phone"  color="positive">
            {{profiles.number}}
          </q-btn>
          </div>
          </div> -->
      <!-- <div class="text-span text-weight-ligher">
        <span>About Me: </span>{{ profiles.about }}
      </div>
      <div class="text-span text-weight-ligher text-capitalize">
        {{ profiles.years_exp }} Years Experince in Field.
      </div> -->
      <q-separator />
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import { defineComponent, ref } from "vue";
// import photo from '../../../RavServer/public/images'

export default defineComponent({
  name: "Profile",
  data() {
    return {
      post: {
        text: '',
        file: '',
      },
      profiles: {},
      small: ref(false),
      medium: ref(false),
    };
  },
  methods: {
    getProfilePhoto() {
        // this.profiles.file = this.profiles.file.replace(/^\/+|\/+$/g, '')
        // return (`http://localhost:8081/public/images/${this.profiles.file}`)
    },
    handleFileUpload (evt) {
        const file = evt.target.files[0]
        this.file = file
    },
    async submitPost () {
        const formData = new FormData ()
        formData.append('text', this.post.text)
        formData.append('file', this.post.file)
        const areAllFieldsFilledIn = Object.keys(this.post).every((key) => !!this.post[key])
        if(!areAllFieldsFilledIn) {
          this.error
           Notify.create({
            type: 'warning',
            color: 'warning',
            timeout: 1000,
            position: 'center',
            message: 'Please all Field are Required.'
          })
          return
        }
      try {
        const id = this.$route.params.id;
        const response = await this.$api.post(`/post/${id}`, formData)
          // const Userid = response.data.id
          // console.log(response.data)
          Notify.create({
              type: 'positive',
              color: 'positive',
              timeout: 1000,
              position: 'top',
              message: 'Good Job! Register Succeesfully...'
            })
          this.$router.push({
            name: 'Mentors',
            params: {
              id: id
            }
          })
          this.form = ""
          this.error = false
        } catch (error){
          console.log(error)
           Notify.create({
            type: 'warning',
            color: 'warning',
            timeout: 1000,
            position: 'center',
            message: 'Something went wrong please try again...'
          })
          
          this.error = true
        }
    }
    },
    async mounted() {
      const id = this.$route.params.id;
      this.profiles = (await this.$api.get(`/student/${id}`)).data;
    },
});
</script>
<style lang="sass">
.use
  background-color: #21BA45
  width: 20%
  margin: auto
  padding: 10px
  border-radius: 5px
select 
    background-color: #21BA45
    color: white
    padding: 10px
    border-radius: 5px
    border-outline: none
    option 
      background-color: white
      color: black
</style>
