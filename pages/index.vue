<template>
  <v-container class="app-background">
    <v-card class="app-intro">
      <h1><strong>PAPP</strong><br>The passive aggressive potted plant</h1>
    </v-card>
  </v-container>
</template>

<script>
export default {}
</script>

<style lang="scss">
.app-background {
    background-image: url('/papp.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    font-family: 'Amatic SC', cursive;
    text-align: center;
    font-weight: normal !important;

    strong {
        font-weight: bold;
    }
}
</style>
