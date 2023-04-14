<template>
 <div class="q-pa-md q-gutter-sm">
    <q-btn icon="add_a_photo" color="primary" @click="small = true" />

    <q-dialog
      v-model="small"
    >
      <q-card style="width: 300px;">
        <q-card-section class="q-pt-none">
            <div class="q-pa-md">
              <div class="q-gutter-md" style="max-width: 300px">
                <q-file
                  v-model="file"
                  label="Upload Profile Picture"
                  multiple
                  style="max-width: 200px"
                  @change="handleFileUpload"
                  accept=".jpg, .pdf, image/*"
                >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              </div>
            </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Update" @click="UpdateProfile" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

       <q-card class="my-card">
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom text-h6">
          {{profiles.fullname}}
        </div>
      </q-img>

      <q-card-section>
        {{ profiles.brandname }}
      </q-card-section>
    </q-card>

     </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Profile',
   data () {
    return {
      small: ref(false),
      profiles: {},
      file: {},
      error: null
    }
  },
   methods: {
    handleFileUpload (evt) {
      const file = evt.target.files[0]
      console.log(file)
      this.file = file
    },
    async UpdateProfile () {
      const formData = new FormData()
      formData.append('file', this.file)
      const id = this.$route.params.id
      console.log(id)
      try {
        const response = await this.$api.put(`/upload/${id}`, formData)
        console.log(response)
        } 
        catch (error) {
        console.log(error)
      }
    }
  },
  async mounted () {
    const id = this.$route.params.id
    this.profiles = (await this.$api.get(`/profile/${id}`)).data
  }
})
</script>
