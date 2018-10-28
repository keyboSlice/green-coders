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
        <h1>{{ activePlant.name }} temperature settings</h1>
        <p>{{ temperatureEmoji }} I'm currently {{ temperature }}&deg;C {{ temperatureEmoji }}</p>
        <p class="temperature__comment">{{ temperatureMessage }}</p>
        <v-progress-circular
          :rotate="90"
          :size="128"
          :width="16"
          :value="temperaturePercentage"
          :color="temperatureColour"
          class="temperature__progress">
          <p class="temperature__progress-emoji">{{ temperatureEmoji }}</p>
        </v-progress-circular>
        <v-flex v-if="temperatureKey === 'hot'">
          <h2>{{ fanMessage }}</h2>
          <v-btn 
            :disabled="fanState"
            class="temperature__fan-btn"
            block 
            color="warning"
            @click="fanState = true"><p>{{ fanButtonText }}</p></v-btn>
          <v-progress-linear 
            v-if="fanState"
            :value="fanProgress"
            color="success"
            height="5"
          />
        </v-flex>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="!loaded">
        <h1>Finding out just what a neglectful POS you are..</h1>
        <v-progress-linear 
          indeterminate 
          color="red" />
      </div>
    </transition>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { tween } from 'shifty'

export default {
  data() {
    return {
      thresholds: {
        cold: 15,
        ambient: 25
      },
      temperaturePoll: null,
      temperature: 0,
      temperatureEmojis: {
        cold: '❄️',
        ambient: '☺️',
        hot: '🔥'
      },
      temperatureColours: {
        cold: '#2fcdfa',
        ambient: '#11c16b',
        hot: '#da3e17'
      },
      temperatureMessages: {
        cold: `Hey, don't worry about it, I like slowly freezing to death`,
        ambient: 'Wow, you got something right for once 👍',
        hot: `Too hot, dummy, I'm not a fuckin' cactus`
      },
      fanState: false,
      fanProgress: 0,
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['activePlant']),
    temperatureKey() {
      return this.temperature < this.thresholds.cold
        ? 'cold'
        : this.temperature < this.thresholds.ambient
          ? 'ambient'
          : 'hot'
    },
    temperatureEmoji() {
      return this.temperatureEmojis[this.temperatureKey]
    },
    temperatureMessage() {
      return this.temperatureMessages[this.temperatureKey]
    },
    temperatureColour() {
      return this.temperatureColours[this.temperatureKey]
    },
    temperaturePercentage() {
      return (this.temperature / 40) * 100
    },
    fanMessage() {
      return this.fanState
        ? 'Wow - better late than never to start giving a crap I suppose'
        : `You probably don't care, but if there's any decency left in you then maybe click the button below and turn my fan on for a minute?`
    },
    fanButtonText() {
      return this.fanState ? 'Fan running' : 'Switch fan on'
    }
  },
  watch: {
    fanState(newState) {
      if (newState) {
        tween({
          from: { progress: 0 },
          to: { progress: 100 },
          duration: 30000,
          step: state => (this.fanProgress = state.progress)
        })
      } else {
        this.fanProgress = 0
      }
    },
    fanProgress(newState) {
      if (newState === 100) {
        this.fanState = false
      }
    }
  },
  beforeMount() {
    this.$store.commit('toggleDrawer', false)
  },
  mounted() {
    this.temperaturePoll = setInterval(async () => {
      const { data } = await axios.get(
        'https://penelope-plant-api.herokuapp.com/latest/temperature'
      )

      this.temperature = parseInt(data, 10)
      this.loaded = true
    }, 10000)
  },
  beforeDestroy() {
    this.temperaturePoll = null
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

.temperature__fan-btn {
  font-weight: bold;
  margin: 2rem 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
