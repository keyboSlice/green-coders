<template>
  <v-container class="temperature">
    <v-btn 
      fab
      small
      class="temperature__back-button"
      @click="$store.commit('toggleDrawer', true)">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <transition name="fade">
      <div v-if="loaded">
        <h1>{{ activePlant.name }} humidity settings</h1>
        <p>{{ humidityEmoji }} The relative humidity around me is currently {{ humidity }}% {{ humidityEmoji }}</p>
        <p class="temperature__comment">{{ humidityMessage }}</p>
        <v-progress-circular
          :rotate="90"
          :size="128"
          :width="16"
          :value="humidity"
          :color="humidityColour"
          class="temperature__progress">
          <p class="temperature__progress-emoji">{{ humidityEmoji }}</p>
        </v-progress-circular>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="!loaded">
        <h1>Asking {{ activePlant.name }} just how much of a neglectful POS you are..</h1>
        <v-progress-linear 
          indeterminate 
          color="red" />
      </div>
    </transition>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      loaded: false,
      thresholds: {
        dry: 35,
        ambient: 65
      },
      humidityPoll: null,
      humidityEmojis: {
        dry: '🏜️',
        ambient: '🏖️',
        wet: '☔'
      },
      humidityMessages: {
        dry: 'Thirstier than your mum at a Magic Mike show over here',
        ambient: `👏 maybe there's hope for you yet... maybe`,
        wet: 'Drowning in a sea of indifference... and water'
      },
      humidityColours: {
        dry: '#F5F5DC',
        ambient: '#11c16b',
        wet: '#2fcdfa'
      }
    }
  },
  computed: {
    ...mapGetters(['activePlant']),
    humidityKey() {
      return this.humidity < this.thresholds.dry
        ? 'dry'
        : this.humidity < this.thresholds.ambient
          ? 'ambient'
          : 'wet'
    },
    humidityColour() {
      return this.humidityColours[this.humidityKey]
    },
    humidityMessage() {
      return this.humidityMessages[this.humidityKey]
    },
    humidityEmoji() {
      return this.humidityEmojis[this.humidityKey]
    }
  },
  beforeMount() {
    this.$store.commit('toggleDrawer', false)
  },
  mounted() {
    this.humidityPoll = setInterval(async () => {
      const { data } = await axios.get(
        'https://penelope-plant-api.herokuapp.com/latest/humidity'
      )

      this.humidity = parseInt(data, 10)
      this.loaded = true
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.humidityPoll)
    this.humidityPoll = null
  }
}
</script>


<style lang="scss">
.temperature {
  text-align: center;
}

.temperature__progress {
  width: 128px;
  height: 128px;
  margin: 2rem 0;
}

.temperature__progress-emoji {
  font-size: 48px;
  margin-top: 15px;
}
</style>
