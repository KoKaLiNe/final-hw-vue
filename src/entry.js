import App from './App.vue'
import Main from './pages/Main.vue'

// Register local assets & components globally
require('@/utils/register-assets')
require('@/utils/register-components')

new Vue({
    el: '#app',
    render: h => h(App),
  })