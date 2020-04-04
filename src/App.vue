<template>
  <v-app>
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Titillium+Web&display=swap');
html, body {
  font-family: 'Titillium Web', sans-serif;
}

#app {
  font-family: 'Titillium Web', sans-serif;
}
</style>
