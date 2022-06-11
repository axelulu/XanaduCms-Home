import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from "@fortawesome/vue-fontawesome";

export default defineNuxtPlugin((nuxtApp) => {
    config.autoAddCss = false;
    library.add(fas, far, fab);
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
    nuxtApp.vueApp.component('font-awesome-layers', FontAwesomeLayers);
    nuxtApp.vueApp.component('font-awesome-layers-text', FontAwesomeLayersText);
});
