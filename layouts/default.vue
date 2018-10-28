<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      :timeout="8000"
      class="snacky-boy"
      multi-line
      top
    >
      <p>Message sent - bad company is better than no company, right?</p>
      <v-btn
        color="green"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-navigation-drawer
      :value="drawer"
      absolute
      temporary
      stateless
    >
      <v-icon 
        class="drawer__close-button"
        @click="$store.commit('toggleDrawer', false)">cancel</v-icon>
      <v-flex 
        class="drawer__plant-wrapper"
        align-center
        justify-center>
        <v-avatar
          :size="128">
          <img :src="activePlant.image">
        </v-avatar>
        <h1 class="drawer__plant-title">{{ activePlant.name }}</h1>
        <p class="drawer__plant-subtitle">Clinging on to life... no thanks to you</p>
        <p>List of things for you to try and stave off the inevitable onset of death:</p>
        <v-list class="drawer__item-list">
          <v-list-tile 
            to="temperature" 
            nuxt>
            <v-list-tile-avatar>
              🌡️
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title><p>Temperature</p></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile 
            to="humidity" 
            nuxt>
            <v-list-tile-avatar>
              💦
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title><p>Humidity</p></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile 
            to="/" 
            nuxt>
            <v-list-tile-avatar>
              🏠
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title><p>Give up</p></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="sendRandom">
            <v-list-tile-avatar>
              🔀
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title><p>Random message</p></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider inset />
        </v-list>
      </v-flex>
    </v-navigation-drawer>
    <nuxt />
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'

export default {
    data() {
        return {
            snackbar: false
        }
    },
    computed: {
        ...mapState(['drawer']),
        ...mapGetters(['activePlant'])
    },
    methods: {
        sendRandom() {
            axios.get('https://penelope-plant-api.herokuapp.com/random')
            this.snackbar = true
        }
    }
}
</script>

<style lang="scss">
.drawer__close-button {
    margin: 1rem;
}

.drawer__plant-wrapper {
    margin: 1rem;
    text-align: center;
}

.drawer__plant-title {
    text-align: center;
    margin: 0.5rem 0;
}

.drawer__plant-subtitle {
    font-style: italic;
}

.drawer__item-list > div {
    padding: 0.5rem 0;
}
</style>
