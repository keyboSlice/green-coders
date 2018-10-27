<template>
  <v-app>
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
        reverse
        justify-center>
        <v-avatar
          :size="128">
          <img :src="activePlant.image">
        </v-avatar>
        <h1 class="drawer__plant-title">{{ activePlant.name }}</h1>
        <p class="drawer__plant-subtitle">Clinging on to life... no thanks to you</p>
      </v-flex>
    </v-navigation-drawer>
    <nuxt />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapState(['drawer']),
        ...mapGetters(['activePlant'])
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
</style>
