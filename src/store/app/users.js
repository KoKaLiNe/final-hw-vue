import api from '@/api'

export const mutation = {
    SET_USERS_LOADING: 'SET_USERS_LOADING',
    SET_USERS: 'SET_USERS',
    SET_USERS_FILTER: 'SET_USERS_FILTER',
    SET_USERS_PAGE: 'SET_USERS_PAGE',
    SET_USERS_LIMIT: 'SET_USERS_LIMIT',
    SET_USERS_TOTAL: 'SET_USERS_TOTAL',
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_LOGGED_USER: 'SET_LOGGED_USER',
}

export default {
    namespaced: true,
    state: {
        usersLoading: false,
        users: [],
        loggedUser: {},
        currentUser: {},
        usersFilter: {},
        usersPage: 0,
        usersLimit: 0,
        usersTotal: null,
    },

    getters: {
        usersLoading: state => state.usersLoading,
        users: state => state.users,
        loggedUser: state => state.loggedUser,
        currentUser: state => state.currentUser,
        usersFilter: state => state.usersFilter,
        usersPage: state => state.usersPage,
        usersLimit: state => state.usersLimit,
        usersTotal: state => state.usersTotal,
    },

    mutations: {
        [mutation.SET_USERS_LOADING]: (state, isLoading) => {
            state.usersLoading = isLoading
        },
        [mutation.SET_USERS]: (state, data) => {
            state.users = data || []
        },
        [mutation.SET_CURRENT_USER]: (state, data) => {
            state.currentUser = data || {}
        },
        [mutation.SET_LOGGED_USER]: (state, data) => {
            state.loggedUser = data || {}
        },
        [mutation.SET_USERS_FILTER]: (state, data) => {
            state.usersFilter = data || {}
        },
        [mutation.SET_USERS_PAGE]: (state, data) => {
            state.usersPage = data || 0
        },
        [mutation.SET_USERS_LIMIT]: (state, data) => {
            state.usersLimit = data || 0
        },
        [mutation.SET_USERS_TOTAL]: (state, data) => {
            state.usersTotal = data || null
        },
    },

    actions: {
        setUsersLoading: ({ dispatch, commit }, value) => {
            commit(mutation.SET_USERS_LOADING, value)
        },
        fetchUsers: ({ dispatch, commit, state },) => {
            dispatch('setUsersLoading', true)
            return api.Users.getUsers(state.usersFilter, state.usersPage, state.usersLimit)
                .then(({ data }) => {
                    commit(mutation.SET_USERS, data.data)
                    commit(mutation.SET_USERS_PAGE, data.page)
                    commit(mutation.SET_USERS_LIMIT, data.limit)
                    commit(mutation.SET_USERS_TOTAL, data.total)
                    dispatch('setUsersLoading', false)
                })
        },
        setUsersLimit: ({ dispatch, commit, state }, limit) => {
            commit(mutation.SET_USERS_LOADING, true)
            commit(mutation.SET_USERS_LIMIT, limit)
            return dispatch('fetchUsers')
        },
        setCurrentUserPage: ({ dispatch, commit }, value) => {
            commit(mutation.SET_USERS_LOADING, true)
            commit(mutation.SET_USERS_PAGE, value)
            return dispatch('fetchUsers')
        },
        getCurrentUser: ({ dispatch, commit }, id) => {
            dispatch('setUsersLoading', true)
            return (api.Users.getCurrentUser(id)
                .then(({ data }) => {
                    commit(mutation.SET_CURRENT_USER, data);
                    dispatch('setUsersLoading', false)
                })
            )
        },
        getLoggedUser: ({ dispatch, commit }, { login, password }) => {
            return (api.Users.loginIn(login, password)
            )
        },
    }
}