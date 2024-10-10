import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import VueApexCharts from "vue3-apexcharts"

const app = createApp(App)
app.use(VueApexCharts)
app.mount('#app')
