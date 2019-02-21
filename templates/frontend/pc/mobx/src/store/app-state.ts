import { observable, action, computed } from 'mobx'

export default class AppState {
	constructor({ name = 'sonacy', count = 0 } = {}) {
		this.name = name
		this.count = count
	}

	@observable name: string
	@observable count: number

	@computed
	get msg() {
		return `${this.name}'s counter is ${this.count}`
	}

	@action
	add = () => {
		this.count++
	}

	@action
	minus = () => {
		this.count--
	}

	toJson() {
		return {
			name: this.name,
			count: this.count,
		}
	}
}
