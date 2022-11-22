import "bootstrap/dist/css/bootstrap.css";

import { createPinia } from 'pinia';
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios';
import VueAxios from 'vue-axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faComment, faEllipsisVertical, faPlus, faHouse, faRightFromBracket, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as farThumpsUp  } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(faThumbsUp, faComment, faEllipsisVertical, faPlus, faHouse, farThumpsUp, faRightFromBracket, faTrashCan);

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";