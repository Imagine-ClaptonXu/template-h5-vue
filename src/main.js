import './styles/global.less'
import 'vant/es/toast/style'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import {
    Toast,
} from 'vant'

const app = createApp(App)

app.use(router)
// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')

app.use(Toast)
