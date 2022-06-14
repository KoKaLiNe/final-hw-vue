export default api => {
	api.Tasks = {
		getTasks(filter, page, limit) {
			return api.instance.request({
				method: 'post',
				url: 'tasks',
				data: {
					'filter': filter,
					'page': page,
					'limit': limit
				}
			})
		},
		getCurrentTask(id) {
			return api.instance.request({
				method: 'get',
				url: `tasks/${id}`,
			})
		},
		editTask(data) {
			return api.instance.request({
				method: 'put',
				url: 'tasks/createOrEdit',
				data: {
					...data,
					"dateOfUpdate": new Date(),
					'timeInMinutes': 0,
				}
			})
		},
		deletTask(taskId) {
			return api.instance.request({
				method: 'delete',
				url: `tasks/${taskId}`
			})
		},
		editStatus: (taskId, status) => {
			return api.instance.request({
				method: 'patch',
				url: `tasks/${taskId}/status/${status}`
			})
		},
		getComments(taskId) {
			return api.instance.request({
				method: 'get',
				url: `comments/${taskId}`
			})
		},
		addComment(data) {
			return api.instance.request({
				method: 'put',
				url: `comments/createOrEdit`,
				data
			})
		},
		deletComment(id) {
			return api.instance.request({
				method: 'delete',
				url: `comments/${id}`,
			})
		},
		addWorktime(taskId, data) {
			return api.instance.request({
				method: 'patch',
				url: `tasks/${taskId}/worktime`,
				data
			})
		}
	},

		api.Users = {
			getUsers(filter, page, limit) {
				return api.instance.request({
					method: 'post',
					url: 'users',
					data: {
						'filter': filter,
						'page': page,
						'limit': limit
					}
				})
			},
			getCurrentUser(userId) {
				return api.instance.request({
					method: 'get',
					url: `users/${userId}`,
				})
			},
			loginIn(login, password) {
				return api.instance.request({
					method: 'post',
					url: `users/login`,
					data: {
						'login': `${login}`,
						'password': `${password}`
					}
				})
			},
			editUser(data) {
				return api.instance.request({
					method: 'put',
					url: `users/edit`,
					data: {
						...data
					}
				})

			}
		}
}