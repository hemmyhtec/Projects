<template>
    <v-container> 
        <v-row>
            <v-col lg="6"> 
                <span>Create a</span> <h1 class="intro-text">Socail Profile</h1>
                <h3 class="sub-hero">of your Business.</h3>
                <p class="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem adipisci esse quibusdam ut, 
                    nemo accusamus aliquid consequatur expedita voluptas tenetur enim officia, ab repudiandae.
                     Accusantium repellat quo optio veritatis aliquam.</p>
                <v-btn color="success" rounded> Get Started</v-btn>
                
            </v-col>
            <v-col lg="6" class="d-none d-lg-flex d-md-flex"> 
                <img width="100%" src="../assets/profile.png" alt="" srcset="">
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'HeroComponent',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
h1.intro-text {
    font-size: 60px;
    font-weight: bold;
    font-family: cursive;
    margin-top: -20px;
    color: #4caf50
}
p.description {
    font-size: 19px;
    font-family: cursive;
    margin: 32px 0px;
    color: rgb(77, 77, 77);
}
span {
    font-size: 30px;
    /* font-weight: bold; */
    font-family: monospace;
}
h3.sub-hero {
    font-family: monospace;
    font-size: 20px;
}
</style>