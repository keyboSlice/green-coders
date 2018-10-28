<template>
  <v-container class="temperature">
    <v-btn 
      fab
      small
      class="temperature__back-button"
      @click="$store.commit('toggleDrawer', true)">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    
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
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    async asyncData() {
        const { data } = await axios.get(
            'https://penelope-plant-api.herokuapp.com/getlatest/temperature'
        )

        return { temperature: data.temperature }
    },
    data() {
        return {
            thresholds: {
                cold: 15,
                ambient: 25
            },
            temperature: 28,
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
            }
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
        }
    },
    beforeMount() {
        this.$store.commit('toggleDrawer', false)
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
