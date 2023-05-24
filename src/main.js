import Vue from 'vue'
import App from './App.vue'
//用bootstrap还是element UI，先试试elementUI，这个直接对接vue2
/**import BootstrapVue from 'bootstrap-vue'
Vue.use(Bootstrap)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/Bootstrap-vue.css'
*/
import axios from 'axios';
import ElementUI from 'element-ui';            //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式
Vue.use(ElementUI);
import echarts from 'echarts'
 

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;


new Vue({
  render: h => h(App),
  axios
}).$mount('#app')
