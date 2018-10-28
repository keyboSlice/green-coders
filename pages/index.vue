<template>
  <v-container class="app-background">
    <v-card class="app-intro">
      <h1><strong>🌿 PAPP 🌿</strong><br>Passive aggressive potted plant</h1>
      <p>List of plants for you to neglect:</p> 
    </v-card>
    <v-card
      v-for="plant in plants"
      :key="plant.id"
      class="plant-card"
      @click.native="$store.dispatch('setActivePlant', plant.id)">    
      <v-avatar :size="96">
        <img :src="plant.image">
      </v-avatar>
      <h2>{{ plant.name }}</h2>
      <p>Click on me and maybe I'll survive longer than your last house plant - or don't, whatever.</p>
    </v-card>
    <v-footer><small>Photo by <a href="https://unsplash.com/@mensroom">Mike Marquez</a> on Unsplash</small></v-footer>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['plants'])
    },
    beforeMount() {
        this.$store.commit('toggleDrawer', false)
    }
}
</script>

<style lang="scss">
.app-background {
    background-image: url('/papp.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: #fff;
        content: '';
        opacity: 0.25;
    }

    > * {
        z-index: 2;
    }
}

.app-intro {
    text-align: center;
    h1 {
        font-weight: normal !important;
        padding: 0 1rem;

        strong {
            font-weight: bold;
        }
    }
    p {
        text-transform: uppercase;
        margin-bottom: 1rem;
    }
}

.plant-card {
    padding: 1rem;
    text-align: center;
}

.v-footer small {
    width: 100%;
    text-align: center;
}
</style>
