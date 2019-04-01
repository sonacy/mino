import React, { PureComponent } from 'react'
import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom'
import Main from './main'
import About from './about'

export default class Routes extends PureComponent {
	render() {
		return (
			<BrowserRouter>
				<div>
					<nav style={{ height: 64, lineHeight: 1 }}>
						<NavLink
							style={{ fontSize: 32, padding: 8 }}
							activeStyle={{ color: 'red' }}
							to="/main"
						>
							main
						</NavLink>
						<NavLink
							style={{ fontSize: 32, padding: 8 }}
							activeStyle={{ color: 'red' }}
							to="/about"
						>
							about
						</NavLink>
					</nav>
					<Route path="/" exact={true} render={() => <Redirect to="/main" />} />
					<Route path="/main" exact={true} component={Main} />
					<Route path="/about" exact={true} component={About} />
				</div>
			</BrowserRouter>
		)
	}
}
