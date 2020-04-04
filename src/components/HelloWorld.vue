<template>
<div>
  <v-container fluid class="layout">
    <v-container grid-list-lg class="section_1"> 
        <v-row no-gutters>
            <v-col cols="12" sm="6" md="6">
                <v-container>
                    <h2 class="display-2 indigo--text font-weight-bold">
                        WEB RTC STREAMING TEST</h2>
                        <v-img src="../assets/webrtc.png"></v-img>
                    <p class="font-weight-regular regular-words">
                        This streaming server and client build on the top of the WebRTC. To be connected with the client side, you could click on of these buttons below. Each button provide it's own broadcaster. There are only 2 namespaces right now, but could be possibly increase.
                    </p>
                </v-container>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-container fluid>
                  <v-img src="../assets/development.png"></v-img>
                </v-container>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <br>
              <div class="text-center">
                <router-link to="/primary">
                  <v-btn class="mx-2" fab dark color="indigo">
                    <v-icon dark>mdi-video</v-icon>
                  </v-btn>
                </router-link>
                <router-link to="/secondary">
                  <v-btn class="mx-2" fab dark color="teal">
                    <v-icon dark>mdi-video</v-icon>
                  </v-btn>
                </router-link>
              </div>
            </v-col>
        </v-row>
    </v-container>
  </v-container>
</div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
    }),
  }
</script>
<style>
.layout {
  background: rgb(255, 255, 255);
  height: 100vh;
}
.section_1 {
  margin-top: 10vh;
}
</style>
