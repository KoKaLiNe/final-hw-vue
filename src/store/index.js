import Vuex from 'vuex'
import users from './app/users'
import tasks from './app/tasks'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        modules: {
            users,
            tasks,
        }
    })
}

export default store