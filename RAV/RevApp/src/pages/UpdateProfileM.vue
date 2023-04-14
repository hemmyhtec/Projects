<template>
  <div class="q-pa-md q-gutter-sm form absolute-center shadow-24">
    <div v-if="step === 1">
      <form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      >
        <p class="text-light">Your Personal Details</p>
        <q-separator />
        <q-input
          v-model="form.about"
          type="textarea"
          clearable
          :dense="dense"
          label="About You"
          placeholder="I'm From United Stated, based in California, I possess a wide range of abulities that combines innovative art and design principles.... "
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-question" />
          </template>
        </q-input>
         <br><br>
          <q-badge color="secondary" multi-line> Field of Mentorship </q-badge><br>
          <select v-model="form.profession">
            <option v-for="listOfProfession in listOfProfessions" :key="listOfProfession"> {{ listOfProfession }} </option>
          </select> 
          <br><br>
        <q-btn disable style="background: #21BA45; color: white" flat v-if="form.profession">
          {{form.profession}}
        </q-btn>
        
        <br>
        <q-input
          v-model="form.years_exp"
          clearable
          :rules="[val => !!val || 'Field is required']"
          type="number"
          :dense="dense"
          label="Years of Experince"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-calendar-day" />
          </template>
        </q-input>
        <br />
        <div>
          <q-btn
            label="Next"
            type="submit"
            style="background: #21BA45; color: white"
            flat
            @click.prevent="next()"
          />
          <!-- <q-btn label="Previous" type="submit"  style="background: #21BA45; color: w/> -->
          <q-btn
            label="Previous"
             style="background: #21BA45; color: white"
            @click.prevent="prev()"
            flat
            class="q-ml-sm"
          />
        </div>

        <q-separator size="md" />
      </form>
    </div>
    <div v-if="step === 2">
      <form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      >
        <p class="text-light">Profile Picture</p>
        <q-separator />
        <q-file
          color="white"
          v-model="form.file"
          label="Profile Picture"
          accept=".jpg, .pdf, image/*"
          @change="handleFileUpload"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <br />
        <div>
          <q-btn
            label="Submit"
            type="submit"
             style="background: #21BA45; color: white"
            @click.prevent="submit()"
          />
          <!-- <q-btn label="Previous" type="submit"  style="background: #21BA45; color: white"  class="text-black"/> -->
          <q-btn
            label="Previous"
             style="background: #21BA45; color: white"
            @click.prevent="prev()"
            flat
            class="q-ml-sm"
          />
        </div>

        <q-separator size="md" />
      </form>
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import { ref } from 'vue'

export default {
  data() {
    return {
      step: 1,
      form: {
        about: "",
        profession: "",
        years_exp: "",
        file: "",
      },
      listOfProfessions: ["FontEnd Developer", "BackEnd Developer", "UI & UX Design", "Digital Marketer", "Graphics Design", "Forex Trader", "Cytpo Currency",
      "Educational Mentorship", "Spiritual Mentorship"],
      isPwd: ref(true),
      error: "",
    };
  },
  methods: {
    prev() {
      this.step--
    },
    next() {
        this.step++
    },
    handleFileUpload (evt) {
      const file = evt.target.files[0]
      this.file = file
    },
    async submit() {
      const formData = new FormData ()
      formData.append('about', this.form.about)
      formData.append('profession', this.form.profession)
      formData.append('years_exp', this.form.years_exp)
      formData.append('file', this.form.file)
      const areAllFieldsFilledIn = Object.keys(this.form).every((key) => !!this.form[key])
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
      const response = await this.$api.post(`/mentor/${id}`, formData)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        const Userid = response.data.id
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
};
</script>
<style lang="sass" scoped>
.form
    width: fit-content
    height: fit-content
    margin: auto
    border-radius: 20px
    padding: 40px
select 
  padding: 10px
  border-radius: 5px
  outline-color: #21BA45
</style>
