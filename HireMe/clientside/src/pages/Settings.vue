<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn icon="update" color="primary" @click="small = true" />
 

    <q-dialog
      v-model="small"
    >
      <q-card style="width: 300px;">
        <q-card-section>
          <div class="text-h6">Update Profile</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="q-pa-md">
              <div class="q-gutter-md" style="max-width: 300px">
                <q-input v-model="form.fullname" label="Fullname" />
                <q-input
                    v-model="form.phonenumber"
                    label="Phone Number"
                    mask="(###) #### - ####"
                    fill-mask
                    hint="Mask: (080) 5513 - 9724"
                  />
                 <q-input v-model="form.brandname" label="Brandname" />
                 <q-input v-model="form.skill" label="Skill" />
                 <q-input v-model="form.date" type="date" label="Date of Birth" placeholder="none" />
                 <q-input v-model="form.address" label="City, Country" />
                 <q-input v-model="form.socialhandle" label="Social Handle" />

              </div>
            </div>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Update" @click="UpdateProfile" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

     </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { Notify, Loading } from 'quasar'

export default defineComponent({
  name: 'Profile',
   data () {
    return {
      small: ref(false),
      profile: {},
      form: [{
        fullname: '',
        phonenumber: '',
        brandname: '',
        skill: '',
        date: '',
        address: '',
        socialhandle: ''
      }],
      file: ref(null),
      files: ref(null),
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
      this.error = null
      const form = {
        fullname: this.form.fullname,
        phonenumber: this.form.phonenumber,
        brandname: this.form.brandname,
        skill: this.form.skill,
        date: this.form.date,
        address: this.form.address,
        socialhandle: this.form.socialhandle
      }     
      const areAllFieldsFilledIn = Object.keys(this.form).every(
        (key) => !!this.form[key]
      )
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      const id = this.$route.params.id
      console.log(id)
      try {
      const response = await this.$api.put(`/profile/${id}`, form)
       Notify.create({
            type: 'positive',
            color: 'positive',
            timeout: 1000,
            position: 'center',
            message: 'Yeah. Profile saved. You are doing good!'
          })
        this.$router.push({
          name: 'Profile'
        })
      } catch (error) {
        this.error = error.response.data.error
        Notify.create({
          type: 'warning',
          color: 'warning',
          timeout: 1000,
          position: 'center',
          message: 'Something Went Wrong Please...Check your Informations agian.'
        })
        console.log(error)
      }
    }
  },
    async mounted () {
      Notify.create({
      type: 'warning',
      color: 'warning',
      timeout: 2000,
      position: 'center',
      message: 'Please click the Icon to Update Your Information'
      })
  }
})
</script>
