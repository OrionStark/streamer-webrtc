import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import StreamPrimary from './components/StreamPrimary.vue';
import StreamSecondary from './components/StreamSecondary.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: HelloWorld,
            name: 'HELLO WORLD'
        },
        {
            path: '/primary',
            component: StreamPrimary,
            name: 'STREAM PRIMARY'
        },
        {
            path: '/secondary',
            component: StreamSecondary,
            name: 'STREAM SECONDARY'
        }
    ]
})