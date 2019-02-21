import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppState from 'src/store/app-state'
import { Button } from 'antd'

interface IProps {
	appState: AppState
}

@inject('appState')
@observer
export default class Main extends Component<IProps> {
	render() {
		const {
			appState: { msg, add, minus },
		} = this.props
		return (
			<div>
				<div>
					<Button type="primary" onClick={add}>
						add
					</Button>
					<span style={{ margin: 10 }}>{msg}</span>
					<Button type="primary" onClick={minus}>
						minus
					</Button>
				</div>
			</div>
		)
	}
}
