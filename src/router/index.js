import VueRouter from "vue-router";
import Main from "../view/Main";
import TasksList from "../view/TasksList";
import Task from "../view/Task";
import User from "../view/User";
import UsersList from "../view/UsersList";
import Edit from "../view/Edit";
import Login from "../view/Login";
import Error404 from "../view/Error404";

Vue.use(VueRouter);
const router = () => {
    return new VueRouter({
        mode: 'hash',
        routes: [
            {
                path: '/tasks-list',
                component: Main,
                props: true,
                children: [
                    {
                        path: '/',
                        name: 'TaskList',
                        component: TasksList,
                        props: true,
                    },
                    {
                        path: 'edit',
                        name: 'AddTask',
                        component: Edit,
                        props: true,
                    },
                    {
                        path: ':taskId',
                        name: 'Task',
                        component: Task,
                        props: true,
                    },
                    {
                        path: ':taskId/edit',
                        name: 'EditTask',
                        component: Edit,
                        props: true,
                    },
                ]
            },
            {
                path: '/users-list',
                component: Main,
                props: true,
                children: [
                    {
                        path: '/',
                        name: 'UsersList',
                        component: UsersList,
                        props: true,
                    },
                    {
                        path: ':userId',
                        name: 'User',
                        component: User,
                        props: true,
                    },
                    {
                        path: ':userId/add-task',
                        name: 'UserAddTask',
                        component: Edit,
                        props: true,
                    },
                ]
            },
            {
                path: '/login',
                name: 'Login',
                component: Login,
                props: true,
            },
            { path: '/', redirect: { name: 'Login' } },
            {
                path: '*',
                name: 'error404',
                component: Error404,
                props: true,
            },

        ]
    })
}

export default router