<template>
  <div class="q-pa-md q-gutter-sm form absolute-center shadow-24">
    <div v-if="step === 1">
      <form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      >
        <!-- <i class="fas fa-long-arrow-alt-left"></i> -->
        <p class="text-bold">SignUp as Student</p>
        <q-separator />

        <q-input
          v-model="form.name"
          clearable
          :rules="[val => !!val || 'Field is required']"
          :dense="dense"
          label="Full Name"
        >
          <template v-slot:prepend>
            <q-icon name="far fa-user-circle" />
          </template>
        </q-input>
        <q-input
          v-model="form.email"
          clearable
          :rules="[val => !!val || 'Field is required']"
          type="email"
          :dense="dense"
          label="Email Id"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-at" />
          </template>
        </q-input>
        <q-input
          v-model="form.number"
          clearable
          :rules="[val => !!val || 'Field is required']"
          type="number"
          :dense="dense"
          label="Phone Number"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-phone-alt" />
          </template>
        </q-input>
        <q-input
          v-model="form.password"
          clearable
          :rules="[val => !!val || 'Field is required']"
          :type="isPwd ? 'password' : 'text'"
          :dense="dense"
          label="Password"
        >
          <template v-slot:prepend>
            <q-icon  :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <q-input
          v-model="form.role"
          disable
          clearable
          :rules="[val => !!val || 'Field is required']"
          type="text"
          :dense="dense"
          label="Role"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-user-plus" />
          </template>
        </q-input>
        <br />
        <div>
          <q-btn
            label="Next"
            type="submit"
            @click.prevent="next()"
             style="background: #21BA45; color: white"
          />
          <q-btn
            to="/Preview"
            type="reset"
            flat
            class="q-ml-sm"
            icon="fas fa-long-arrow-alt-left"
            style="background: #21BA45; color: white"
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
          <q-badge color="secondary" multi-line> Kindly Select Field of Interest </q-badge><br>
          <select v-model="form.profession">
            <option v-for="listOfProfession in listOfProfessions" :key="listOfProfession"> {{ listOfProfession }} </option>
          </select> 
          <br><br>
        <q-btn disable style="background: #21BA45; color: white" flat v-if="form.profession">
          {{form.profession}}
        </q-btn>
        
        <br>
        
        <q-badge color="secondary" multi-line>Years of Experience in Field  </q-badge>
        <q-input
          v-model="form.years_exp"
          clearable
          :rules="[val => !!val || 'Field is required']"
          type="number"
          :dense="dense"
          label="Number of Years"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-map-pin" />
          </template>
        </q-input>

        <div>
          <q-btn
            label="Next"
            type="submit"
             style="background: #21BA45; color: white"
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
    <div v-if="step === 3">
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
          v-model="form.profilepicture"
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
          <!-- <q-btn label="Previous" type="submit" color="w/> -->
          <q-btn
            label="Previous"
            color="white"
            @click.prevent="prev()"
             style="background: #21BA45; color: white"
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
        name: "",
        email: "",
        number: "",
        password: "",
        about: "",
        profession: "",
        years_exp: "",
        profilepicture: "",
        role: "Mentor",
      },
      listOfProfessions: ["FontEnd Development", "BackEnd Development", "UI & UX Design", "Digital Marketer", "Graphics Design", "Forex Trader", "Cytpo Currency",
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
      const profilepicture = evt.target.files[0]
      this.profilepicture = profilepicture
    },
    async submit() {
      const formData = new FormData ()
      formData.append('name', this.form.name)
      formData.append('email', this.form.email)
      formData.append('number', this.form.number)
      formData.append('password', this.form.password)
      formData.append('about', this.form.about)
      formData.append('profession', this.form.profession)
      formData.append('years_exp', this.form.years_exp)
      formData.append('role', this.form.role)
      formData.append('profilepicture', this.form.profilepicture)
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
      const response = await this.$api.post('/mentor', formData)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        Notify.create({
            type: 'positive',
            color: 'positive',
            timeout: 1000,
            position: 'top',
            message: 'Good Job! Register Succeesfully...'
          })
        this.$router.push({
          name: 'Login',
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
