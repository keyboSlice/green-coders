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
      <v-avatar :size="72">
        <img :src="plant.image">
      </v-avatar>
      <h2>{{ plant.name }}</h2>
      <p>Click on me and maybe I'll survive longer than your last house plant - or don't, whatever.</p>
    </v-card>
    <v-dialog 
      v-model="confirmAddNewPlant" 
      persistent 
      max-width="355">
      <v-btn 
        slot="activator"
        block
        @click="confirmAddNewPlant = true"><p>🌱 Add new plant 🌱</p></v-btn>
      <v-card>
        <v-card-title class="headline"><h3>Are you sure you want to do this?</h3></v-card-title>
        <v-card-text><p>Let's be honest, you can barely keep your current plants alive..</p></v-card-text>
        <v-card-actions>
          <v-btn 
            color="green darken-1" 
            flat 
            @click.native="confirmAddNewPlant = false"><p>bad idea</p></v-btn>
          <br>
          <v-btn 
            color="green darken-1" 
            flat 
            @click.native="addingNewPlant = true"><p>No way, let's do this</p></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer><small>Photo by <a href="https://unsplash.com/@mensroom">Mike Marquez</a> on Unsplash</small></v-footer>
    <v-bottom-sheet
      v-model="addingNewPlant">
      <v-container class="add-plant-form-wrapper">
        <v-form>
          <v-text-field
            v-model="plantName"
            color="#11a300"
            label="Whats your victims name?"
            placeholder="Plant name"
          />
          <v-text-field 
            ref="fileTextField"
            v-model="filename" 
            :disabled="fileInputDisabled" 
            color="#11a300"
            label="A picture to remember it by?"
            placeholder="Plant image"
            prepend-icon="attach_file" 
            single-line
            @click.native="onFocus" />
          <input 
            ref="fileinput" 
            :multiple="false" 
            :disabled="fileInputDisabled" 
            accept="image/*" 
            type="file" 
            @change="onFileChange">
          <v-btn 
            block
            @click.prevent="savePlant">
            <h4>Save the poor thing</h4>
          </v-btn>
        </v-form>
      </v-container>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            confirmAddNewPlant: false,
            addingNewPlant: false,
            fileInputDisabled: false,
            filename: '',
            filereader: null,
            plantName: '',
            plantImage: ''
        }
    },
    computed: {
        ...mapState(['plants']),
        newPlant() {
            return {
                name: this.plantName,
                image: this.plantImage
            }
        }
    },
    watch: {
        value(v) {
            this.filename = v
        }
    },
    beforeMount() {
        this.$store.commit('toggleDrawer', false)
    },
    mounted() {
        this.filereader = new FileReader()

        this.filereader.addEventListener(
            'load',
            () => (this.plantImage = this.filereader.result)
        )
    },
    methods: {
        getFormData(files) {
            this.filereader.readAsDataURL(files[0])
        },
        onFocus() {
            if (!this.fileInputDisabled) {
                this.$refs.fileinput.click()
            }
        },
        onFileChange($event) {
            const files = $event.target.files || $event.dataTransfer.files
            const form = this.getFormData(files)
            this.filename = files[0].name
        },
        savePlant() {
            this.$store.dispatch('savePlant', this.newPlant)

            this.confirmAddNewPlant = false
            this.addingNewPlant = false
            this.filename = false
            this.plantName = ''
            this.plantImage = ''
        }
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

.add-plant-form-wrapper {
    background: #fff;
}

input[type='file'] {
    position: absolute;
    left: -9999px;
}
</style>
