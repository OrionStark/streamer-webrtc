<template>
    <v-container>
        <v-card
            max-width="640"
            class="mx-auto">
            <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline">Stream Namespace Secondary</v-list-item-title>
                <v-list-item-subtitle>by Robby</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <v-container>
                <video ref="video" id="vid" playsinline autoplay muted poster="../assets/poster.png">

                </video>
            </v-container>
            <v-card-text>
                This is the primary live stream. It directly connected to the primary broadcaster.
            </v-card-text>

            <v-card-actions>
                <v-btn-toggle
                v-model="text"
                tile
                color="primary"
                group
                    >
                    <v-btn value="play" v-on:click="play()">
                        PLAY
                    </v-btn>

                    <v-btn value="stop" v-on:click="stop()">
                        STOP
                    </v-btn>
                </v-btn-toggle>
            <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="messageView" :timeout="timeout">
            {{ message }}
        </v-snackbar>
    </v-container>
</template>
<script>
import io from 'socket.io-client';
const config = {
	'iceServers': [{
        'urls': ['stun:stun.l.google.com:19302']
    }],
    'iceTransports': 'relay'
}
  export default {
    name: 'StreamSecondary',

    data: () => {
        return {
            video: {},
            peerConnection: {},
            socket: {},
            message: '',
            messageView: false
        }
    },
    methods: {
        socketInit() {
            const self = this;
            self.socket.on('offer', (id, description) => {
                self.peerConnection = new RTCPeerConnection(config);
                self.peerConnection.setRemoteDescription(description)
                .then(() => self.peerConnection.createAnswer())
                .then(sdp => self.peerConnection.setLocalDescription(sdp))
                .then(() => {
                    self.socket.emit('answer', id, self.peerConnection.localDescription);
                })
                self.peerConnection.ontrack = (event) => {
                    self.video.srcObject = event.streams[0]
                }
                self.peerConnection.onicecandidate = (event) => {
                    if ( event.candidate ) {
                        self.socket.emit('candidate', id, event.candidate);
                    }
                }
            });
            self.socket.on('candidate', (id, candidate) => {
                self.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
                .catch(e => console.log(e))
            })
            self.socket.on('connect', () => {
                self.socket.emit('watcher')
            })
            self.socket.on('broadcaster',() => {
                self.socket.emit('watcher')
            })

            self.socket.on('bye', () => {
                console.log('broadcaster died')
                self.peerConnection.close()
                self.stop();
                self.message = 'Broadcaster has been gone';
                self.messageView = true;
            })
        },
        play() {
            this.socket = io.connect('http://localhost:3000/secondary', {reconnect: true, transports: ['websocket']})
            this.socketInit();
        },
        stop() {
            this.socket.disconnect();
            this.video.srcObject && this.video.srcObject.getTracks().map(t => t.stop())
            this.video.load();
        }
    },
    mounted() {
        this.video = this.$refs.video;
    },
    beforeDestroy() {
        console.log('bye');
        this.socket.disconnect();
        this.video.srcObject && this.video.srcObject.getTracks().map(t => t.stop()) // Turn video off
    }
  }
</script>
<style>
video {
  max-width: 100%;
  min-width: 100%;
  height: auto;
  object-fit: fill;
  margin: 0 auto;
}
</style>