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
		}
}