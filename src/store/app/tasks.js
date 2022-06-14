
import api from '@/api'

export const mutation = {
    SET_TASKS_LOADING: 'SET_TASKS_LOADING',
    SET_TASKS: 'SET_TASKS',
    SET_TASKS_FILTER: 'SET_TASKS_FILTER',
    SET_TASKS_PAGE: 'SET_TASKS_PAGE',
    SET_TASKS_LIMIT: 'SET_TASKS_LIMIT',
    SET_TASKS_TOTAL: 'SET_TASKS_TOTAL',
    SET_CURRENT_TASKS: 'SET_CURRENT_TASKS',
    SET_TASK_COMMENTS: 'SET_TASK_COMMENTS',
}

export default {
    namespaced: true,
    state: {
        tasksLoading: false,
        tasks: [],
        tasksFilter: {},
        tasksPage: 0,
        tasksLimit: 10,
        tasksTotal: null,
        currentTask: {},
        taskComments: [],
    },

    getters: {
        tasksLoading: state => state.tasksLoading,
        tasks: state => state.tasks,
        tasksFilter: state => state.tasksFilter,
        tasksPage: state => state.tasksPage,
        tasksLimit: state => state.tasksLimit,
        tasksTotal: state => state.tasksTotal,
        currentTask: state => state.currentTask,
        taskComments: state => state.taskComments,
    },

    mutations: {
        [mutation.SET_TASKS_LOADING]: (state, isLoading) => {
            state.tasksLoading = isLoading
        },
        [mutation.SET_TASKS]: (state, data) => {
            state.tasks = data || []
        },
        [mutation.SET_TASKS_FILTER]: (state, data) => {
            state.tasksFilter = data || {}
        },
        [mutation.SET_TASKS_PAGE]: (state, data) => {
            state.tasksPage = data || 0
        },
        [mutation.SET_TASKS_LIMIT]: (state, data) => {
            state.tasksLimit = data || 10
        },
        [mutation.SET_TASKS_TOTAL]: (state, data) => {
            state.tasksTotal = data || null
        },
        [mutation.SET_CURRENT_TASKS]: (state, data) => {
            state.currentTask = data || {}
        },
        [mutation.SET_TASK_COMMENTS]: (state, data) => {
            state.taskComments = data || []
        },
    },

    actions: {
        setTasksLoading: ({ dispatch, commit }, value) => {
            commit(mutation.SET_TASKS_LOADING, value)
        },
        fetchTasks: ({ dispatch, commit, state }) => {
            dispatch('setTasksLoading', true)
            return api.Tasks.getTasks(state.tasksFilter, state.tasksPage, state.tasksLimit)
                .then(({ data }) => {
                    commit(mutation.SET_TASKS, data.data);
                    commit(mutation.SET_TASKS_PAGE, data.page);
                    commit(mutation.SET_TASKS_LIMIT, data.limit);
                    commit(mutation.SET_TASKS_TOTAL, data.total);
                    dispatch('setTasksLoading', false)
                })
        },
        fetchAllTasks: ({ dispatch, commit, state }) => {
            dispatch('setTasksLoading', true)
            return api.Tasks.getTasks({}, 0, 0)
                .then(({ data }) => {
                    commit(mutation.SET_TASKS, data.data);
                    dispatch('setTasksLoading', false)
                })
        },
        setCurrentPage: ({ dispatch, commit }, value) => {
            dispatch('setTasksLoading', true)
            commit(mutation.SET_TASKS_PAGE, value)
            dispatch('fetchTasks')
        },
        getCurrentTask: ({ dispatch, commit }, id) => {
            dispatch('setTasksLoading', true)
            return (api.Tasks.getCurrentTask(id)
                .then(({ data }) => {
                    commit(mutation.SET_CURRENT_TASKS, data);
                    dispatch('setTasksLoading', false)
                })
            )
        },
        editTask: ({ dispatch, commit }, data) => {
            dispatch('setTasksLoading', true)
            return api.Tasks.editTask(data)
        },
        deletTask: ({ dispatch, commit }, taskId) => {
            dispatch('setTasksLoading', true)
            api.Tasks.deletTask(taskId)
                .then(() => dispatch('fetchTasks'))
        },
        editStatus: ({ dispatch, commit }, { taskId, status }) => {
            dispatch('setTasksLoading', true)
            return api.Tasks.editStatus(taskId, status)
                .then(({ data }) => {
                    commit(mutation.SET_CURRENT_TASKS, data);
                })
        },
        filterTasks: ({ dispatch, commit }, { filter }) => {
            dispatch('setTasksLoading', true);
            commit(mutation.SET_TASKS_FILTER, filter)
            commit(mutation.SET_TASKS_PAGE, 0)
            dispatch('fetchTasks')
        },
        fetchTaskComments: ({ dispatch, commit }, taskId) => {
            dispatch('setTasksLoading', true);
            return api.Tasks.getComments(taskId)
                .then(({ data }) => { commit(mutation.SET_TASK_COMMENTS, data) })
                .then(() => dispatch('setTasksLoading', false))
        },
        addComment: ({ dispatch, commit }, { data, taskId }) => {
            dispatch('setTasksLoading', true);
            return api.Tasks.addComment(data)
                .then(() => { dispatch('fetchTaskComments', taskId) })
        },
        deletComment: ({ dispatch, commit }, { id, taskId }) => {
            dispatch('setTasksLoading', true);
            return api.Tasks.deletComment(id)
                .then(() => { dispatch('fetchTaskComments', taskId) })
        },
        addWorktime: ({ dispatch }, { taskId, data }) => {
            dispatch('setTasksLoading', true);
            return api.Tasks.addWorktime(taskId, data)
                .then(() => {
                    dispatch('getCurrentTask', taskId);
                    dispatch('fetchTaskComments', taskId)
                })
                .then(() => dispatch('setTasksLoading', false))
        }
    }
}