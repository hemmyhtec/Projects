<template>
    <div class="q-pa-md q-gutter-sm host absolute-center shadow-24">
      <q-btn flat round
        @click="$q.dark.toggle()"
        :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
      />
         <div class="text-h6 text-center text-weight-bolder">MENTOR-ME </div>
         <p class="text-bold text-center"> Connect | Mentorship | Learning</p>
         <q-separator color="white" />

      <div class="col preview">
        <q-btn
          rounded
          style="background: #21BA45; color: white"
          size="md"
          label="Sign Up as a Mentor"
         to="/SignUpMentor"
        />
      </div>
      <div class="col preview">
        <q-btn
          outline style="color: #21BA45;"
          rounded
          size="md"
          label="Sign Up as a Student"
          to="/SignUp"
        />
      </div>
      <div class="col preview">

      <q-btn-dropdown size="md" rounded style="background: #21BA45; color: white" label="Exiting User - Sign-In">
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick" to="/login">
          <q-item-section>
            <q-item-label>Sign In as Mentor</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick" to="/loginstudent">
          <q-item-section>
            <q-item-label>Sign In as Student</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-btn-dropdown>
      </div>
      <br><br>
      <q-separator color="white" size="md" />
      <p class="text-caption text-center">It good to have to here as <br>  Part of the Family...</p>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="sass" scoped>

.host 
    width: fit-content
    height: fit-content
    margin: auto
    border-radius: 20px
    padding: 20px
.preview 
    text-align: center
    margin: auto
    margin-right: 50px
    margin-left: 50px
    margin-top: 40px

</style>
