<template>

  <div>
    <b-nav align="center" fill>
      <b-nav-item active>Profile</b-nav-item>
    </b-nav>
  <div class="container">
    <div class="row"> 
      <div class="col">
        
      </div>
      <div class="col">
        <b-jumbotron style="color: white" header="Create a Profile " lead="Bootstrap v4 Components for Vue.js 2">
          <p>For more information visit website</p>
          <b-button variant="primary" href="#">More Info</b-button>
      </b-jumbotron>
        <!-- <img src="../assets/background.jpg" alt="" srcset="" class="col2">  -->
      </div>
    </div>
</div>
</div>


</template>

<script>

export default {
  name: 'HomePage',
  data() {
    return {

      };
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-fluid {
  height: 100%
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hero-image {
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  }
.col2{
  width: 50%;
}
</style>
