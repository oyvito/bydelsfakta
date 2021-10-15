import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import VueMeta from 'vue-meta';
import VueResize from 'vue-resize';
import { Icon } from 'leaflet';
import * as Sentry from '@sentry/vue';
import VueSkipTo from 'vue-skip-to';
import './util/polyfills';
import App from './App.vue';
import router from './router';
import store from './store';
import clickOutside from './directives/clickOutside';
import i18n from './i18n';

import 'vue-resize/dist/vue-resize.css';
import 'leaflet/dist/leaflet.css';

import './styles/main.scss';

const production = import.meta.NODE_ENV === 'production';
const envs = production ? JSON.parse(window.__GLOBAL_ENVS__) : {};

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Vue.use(VueMeta);
Vue.use(VueResize);
Vue.use(VueSkipTo);

Vue.config.productionTip = false;
Vue.config.devtools = !production;
Vue.config.performance = !production;

// Directive to detect clicks outside of an element
Vue.directive('click-outside', clickOutside);

Vue.use(VueAnalytics, {
  id: production ? envs.VITE_GOOGLE_ANALYTICS_ID : import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  router,
  debug: {
    sendHitTask: production,
  },
});

if (production) {
  Sentry.init({
    Vue,
    dsn: production ? envs.VITE_SENTRY_DSN : import.meta.env.VITE_SENTRY_DSN,
    logErrors: true,
    autoSessionTracking: false,
  });
}

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
