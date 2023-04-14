<template>
  <b-container>
    <form enctype="multipart/form-data">
    <div class="back">
      <div class="form-space">
        <div>
          <h3 style="text-align: center">Profile</h3>
           <div class="icon-pic">
           <label for="Password">Upload your Logo / Picture</label>
            <input type="file" ref="file" @change="handleFileUpload"/>
          </div>

          <b-input-group class="mb-2">
            <b-form-input
              id="input-small"
              type="text"
              placeholder="Enter your Name"
              v-model="fullname"
            ></b-form-input>
            <b-form-input
              id="input-small"
              type="text"
              placeholder="Enter your BrandName"
              v-model="brandname"
            ></b-form-input>
          </b-input-group>

          <label for="Password">Your Skill / Your Sales</label>
          <b-input-group class="mb-2">
            <b-form-input
              id="input-small"
              type="text"
              placeholder="Enter your Skill/Sales"
              v-model="skill1"
            ></b-form-input>
            <b-form-input
              id="input-small"
              type="text"
              placeholder="Enter your Skill/Sales"
              v-model="skill2"
            ></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2">
            <b-form-input
              id="input-small"
              type="text"
              placeholder="Enter your Skill/Sales"
              v-model="skill3"
            ></b-form-input>
            <b-form-input
              id="input-small"
              type="text"
              placeholder="Enter your Skill/Sales"
              v-model="skill4"
            ></b-form-input>
          </b-input-group>

          <label for="Password">Your Socail Media Handles</label>
          <b-input-group class="mb-2">
            <b-form-input
              id="input-small"
              type="text"
              placeholder="Enter your Instagram Handle"
              v-model="socail_handle1"
            ></b-form-input>
            <b-form-input
              id="input-small"
              type="number"
              placeholder="Enter your WhatsApp No"
              v-model="socail_handle2"
            ></b-form-input>
          </b-input-group>
        </div>

        <b-alert class="error" v-if="error" show variant="warning">
          {{ error }}
        </b-alert>

        <b-button class="btn" @click="create">Generate</b-button>

      </div>
    </div>
  </form>
  </b-container>
</template>

<script>
import ProfileService from '@/services/ProfileService'

export default {
  data () {
    return {
      fullname: null,
      brandname: null,
      skill1: null,
      skill2: null,
      skill3: null,
      skill4: null,
      socail_handle1: null,
      socail_handle2: null,
      file: null,
      error: null,
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  methods: {
    handleFileUpload () {
      const file = this.$refs.file.files[0]
      console.log(file)
      this.file = file
    },
    async create () {
      this.error = null
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('fullname', this.fullname)
      formData.append('brandname', this.brandname)
      formData.append('skill1', this.skill1)
      formData.append('skill2', this.skill2)
      formData.append('skill3', this.skill3)
      formData.append('skill4', this.skill4)
      formData.append('socail_handle1', this.socail_handle1)
      formData.append('socail_handle2', this.socail_handle2)
      // const areAllFieldsFilledIn = Object.keys(this.profile).every(
      //   (key) => !!this.profile[key]
      // )
      // if (!areAllFieldsFilledIn) {
      //   this.error = 'Please fill in all the required fields.'
      //   return
      // }
      try {
        await ProfileService.post(formData)
        this.$router.push({
          name: 'profile'
        })
      } catch (error) {
        this.error = error.response.data.error
        console.log(error)
      }
    }

  }
}
</script>

<style scoped>
.back {
  background: white;
}
.form-space {
  margin: auto;
  width: 400px;
  height: 600px;
  padding: 40px;
  border-radius: 20px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
  text-align: left;
  font-weight: bold;
}
.person-plus-fill {
  height: 100px;
  widows: 100px;
}
.icon-pic {
  margin: 10px;
}
#input-small {
  background: #ecf0f3;
  padding: 5px;
  padding-left: 10px;
  height: 50px;
  font-size: 14px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
}
label {
  text-align: left;
  font-size: 12px;
}
.btn {
  background: rgb(146, 5, 0);
}
.btn-login {
  cursor: pointer;
  margin-top: 5px;
}
.btn-login:hover {
  padding: 5px;
}
</style>
