<template>
	<div class="app" :class="['app3', {'app2': class2}]" :style="style" :id="app1" @click="onClick">
		<Test />
		<Test2 />
	</div>
</template>

<script>

export default {
	data() {
		return {
			alert: 'Hello <br/>word',
			app1: 'my-app',
			counter: 0,
			arr: [1, 2, 3, 4]
		}
	},

	
	computed: {
		text() {
			return 'Current date' + new Date().toISOString() + '; count: ' + this.counter
		},
		text2() {
			return 'Hello ' + this.text
		},
		class2() {
			return this.counter > 2
		},
		style() {
			return {
				'border': '1px solid red',
				backgroundColor: 'yellow'
			}
		}
	},
	mounted() {
		
	},
	methods: {
		getDate() {
			return new Date()
		},
		onClick(e) {
			this.counter+=1;
		}
	},
}
</script>

<style lang="scss" scoped>
	.app {
		background: pink;
		box-sizing: border-box;

		/deep/ * {
			box-sizing: border-box;
		}
	}

	.app2 {
		background: green;
	}
</style>
